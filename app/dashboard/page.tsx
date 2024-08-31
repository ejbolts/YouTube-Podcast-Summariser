"use client";

import { isValidYouTubeUrl } from "@/util/validateUrl";
import { FormEvent, RefObject, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const videoUrlRef = useRef<HTMLInputElement>(null);

  async function handleSummary(
    event: FormEvent<HTMLFormElement>,
    videoUrlRef: RefObject<HTMLInputElement>
  ) {
    event.preventDefault();

    const videoUrl = videoUrlRef.current?.value;

    if (!videoUrl || !isValidYouTubeUrl(videoUrl)) {
      setError("Please enter a valid YouTube video URL.");
      return;
    }

    setError("");

    try {
      const transcriptResponse = await fetch("/api/transcript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoUrl }),
      });

      const { transcript } = await transcriptResponse.json();

      const summaryResponse = await fetch("/api/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcript }),
      });

      const { summary } = await summaryResponse.json();
      setSummary(summary);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-24">
      <h1 className="text-4xl font-bold">Summarize a Video</h1>

      <form
        className="flex flex-row gap-3"
        onSubmit={(event) => handleSummary(event, videoUrlRef)}
      >
        <Input
          type="text"
          placeholder="Enter a YouTube video URL:"
          ref={videoUrlRef}
        />
        <Button className="p-4 ">Summarise</Button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <p>Summary:</p>
      {summary && <p>{summary}</p>}
    </main>
  );
}
