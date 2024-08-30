"use client";

import { FormEvent, RefObject, useRef, useState } from "react";

export default function Home() {
  const [summary, setSummary] = useState("");
  const videoUrlRef = useRef<HTMLInputElement>(null);

  async function handleSummary(
    event: FormEvent<HTMLFormElement>,
    videoUrlRef: RefObject<HTMLInputElement>
  ) {
    event.preventDefault();
    try {
      const transcriptResponse = await fetch("/api/transcript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoUrl: `${videoUrlRef.current?.value}`,
        }),
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
      <form onSubmit={(event) => handleSummary(event, videoUrlRef)}>
        <input
          type="text"
          placeholder="Enter a YouTube video URL:"
          className="border border-gray-300 rounded-lg p-2"
          ref={videoUrlRef}
        />
        <button className="p-4">Summarise</button>
      </form>
      <p>Summary:</p>
      {summary && <p>{summary}</p>}
    </main>
  );
}
