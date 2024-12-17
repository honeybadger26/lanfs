"use client";

import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";

type TextFormProps = { className?: string };

export function TextForm({ className = "" }: TextFormProps) {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>();
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
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }

  return (
    <div className={`flex ${className}`}>
      <textarea
        // @ts-expect-error ref type is valid
        ref={textareaRef}
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
