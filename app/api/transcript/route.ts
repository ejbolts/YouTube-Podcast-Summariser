import { NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";

export interface TranscriptResponse {
  transcript: string;
}

export interface ErrorResponse {
  error: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { videoUrl } = await request.json();
    const videoId = videoUrl.split("=")[1].split("&")[0];
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);

    let fulltext = "";
    for (let item of transcript) {
      fulltext += item.text.replace(/&amp;#39;/g, "'") + " ";
    }

    return NextResponse.json<TranscriptResponse>({ transcript: fulltext });
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
