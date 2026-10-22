import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const MODEL = "@cf/black-forest-labs/flux-1-schnell";

export async function POST(req: NextRequest) {
  try {
    if (!ACCOUNT_ID || !API_TOKEN) {
      console.error("Missing Cloudflare Workers AI environment variables.");
      return NextResponse.json(
        { error: "Image generation is not configured. Please check the server environment variables." },
        { status: 500 }
      );
    }

    const body: unknown = await req.json();
    if (!body || typeof body !== "object" || !("prompt" in body)) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    if (prompt.length > 2048) {
      return NextResponse.json(
        { error: "Prompt is too long. Please keep it under 2,048 characters." },
        { status: 400 }
      );
    }

    // Cloudflare's FLUX.1 Schnell schema supports prompt and steps.
    // Do not send width, height, or seed: the model rejects these fields.
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/${MODEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, steps: 4 }),
      }
    );

    const contentType = response.headers.get("content-type") ?? "";

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Cloudflare Workers AI error:", response.status, errorText);

      let providerMessage = "";
      try {
        const parsed = JSON.parse(errorText);
        providerMessage = Array.isArray(parsed.errors)
          ? parsed.errors.map((item: { message?: string }) => item.message).filter(Boolean).join("; ")
          : typeof parsed.error === "string"
            ? parsed.error
            : "";
      } catch {
        // Keep provider details out of the client response if the body isn't JSON.
      }

      return NextResponse.json(
        { error: providerMessage || "The image provider could not generate this wallpaper. Please try again." },
        { status: response.status >= 400 && response.status < 600 ? response.status : 502 }
      );
    }

    // Some Workers AI responses are binary image data.
    if (contentType.startsWith("image/")) {
      const image = await response.arrayBuffer();
      return new NextResponse(Buffer.from(image), {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "no-store",
        },
      });
    }

    const result: unknown = await response.json();
    if (!result || typeof result !== "object") {
      return NextResponse.json({ error: "The image provider returned an invalid response." }, { status: 502 });
    }

    const payload = result as {
      success?: boolean;
      errors?: Array<{ message?: string }>;
      result?: { image?: string };
      image?: string;
    };

    if (payload.success === false) {
      const message = payload.errors?.map((item) => item.message).filter(Boolean).join("; ");
      return NextResponse.json(
        { error: message || "The image provider could not generate this wallpaper. Please try again." },
        { status: 502 }
      );
    }

    const base64Image = payload.result?.image || payload.image;
    if (!base64Image) {
      console.error("Cloudflare Workers AI response did not contain an image.");
      return NextResponse.json(
        { error: "No image was returned. Please try again." },
        { status: 502 }
      );
    }

    return new NextResponse(Buffer.from(base64Image, "base64"), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Wallpaper generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate wallpaper. Please try again." },
      { status: 500 }
    );
  }
}
