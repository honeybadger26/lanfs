"use client";

import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

type TextFormProps = { className?: string };

export function TextForm({ className = "" }: TextFormProps) {
  const router = useRouter();
  const [newText, setNewText] = useState("");

  async function submitText() {
    await fetch("/api/text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newText }),
    });

    setNewText("");
    router.refresh();
  }

  function handleTextChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewText(event.target.value);
  }

  return (
    <div className={`flex ${className}`}>
      <textarea
        placeholder="Enter text"
        className="w-full min-h-8 text-black"
        value={newText}
        onChange={handleTextChange}
      />
      <Button
        icon={{ src: "/upload.svg", alt: "Upload symbol" }}
        onClick={submitText}
      />
    </div>
  );
}
