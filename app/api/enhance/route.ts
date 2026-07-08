import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt || prompt.trim() === "") {
      return NextResponse.json(
        {
          error: "Prompt is required.",
        },
        {
          status: 400,
        }
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are an expert AI prompt engineer.

Convert the following simple wallpaper idea into a professional AI image generation prompt.

Rules:

- Keep the original idea.
- Make it cinematic.
- Add realistic lighting.
- Add rich details.
- Mention masterpiece quality.
- Mention ultra detailed.
- Mention 8K.
- Mention wallpaper composition.
- Keep it below 120 words.
- Return ONLY the final prompt.

User Prompt:

${prompt}
      `,
    });

    return NextResponse.json({
      prompt: response.text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to enhance prompt.",
      },
      {
        status: 500,
      }
    );
  }
}