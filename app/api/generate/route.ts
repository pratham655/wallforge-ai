import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID!;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN!;

const MODEL = "@cf/black-forest-labs/flux-1-schnell";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      prompt,
      width = 1024,
      height = 1792,
    } = body;

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        {
          error: "Prompt is required.",
        },
        {
          status: 400,
        }
      );
    }

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/${MODEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          width,
          height,
          steps: 4,
          seed: Math.floor(Math.random() * 1000000),
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error("Cloudflare Error:", errorText);

      return NextResponse.json(
        {
          error: errorText,
        },
        {
          status: response.status,
        }
      );
    }

    const contentType = response.headers.get("content-type") ?? "";

    // Cloudflare returned an image directly
    if (contentType.startsWith("image/")) {
      const image = await response.arrayBuffer();

      return new NextResponse(Buffer.from(image), {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "no-store",
        },
      });
    }

    // Cloudflare returned JSON
    const result = await response.json();

    if (!result.success) {
      return NextResponse.json(result, {
        status: 500,
      });
    }

    const base64Image =
      result.result?.image ||
      result.image;

    if (!base64Image) {
      return NextResponse.json(
        {
          error: "No image returned from Cloudflare.",
        },
        {
          status: 500,
        }
      );
    }

    const buffer = Buffer.from(base64Image, "base64");

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to generate wallpaper.",
      },
      {
        status: 500,
      }
    );
  }
}