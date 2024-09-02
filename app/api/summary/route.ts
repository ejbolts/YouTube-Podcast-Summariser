import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

import { NextRequest } from "next/server";
import { ErrorResponse } from "../transcript/route";

export async function POST(request: NextRequest) {
  try {
    const { transcript } = await request.json();
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Give me a 2 sentence summary of this transcript from a video: ${transcript}`,
        },
      ],
    });

    return NextResponse.json({ summary: response.choices[0]?.message.content });
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json<ErrorResponse>(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
