import { NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";
import { isValidYouTubeUrl } from "@/util/validateUrl";
export interface TranscriptResponse {
  transcript: string;
}

export interface ErrorResponse {
  error: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { videoUrl }: { videoUrl: string } = await request.json();

    if (!videoUrl || !isValidYouTubeUrl(videoUrl)) {
      return NextResponse.json<ErrorResponse>(
        { error: "Invalid YouTube URL provided." },
        { status: 400 }
      );
    }
    const videoId = new URL(videoUrl).searchParams.get("v")!;
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
