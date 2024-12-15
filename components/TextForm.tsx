"use client";

import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { Cell } from "./Cell";

export function TextForm({ hasFiles }: { hasFiles: boolean }) {
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
    <tr>
      <Cell className="w-full" colSpan={hasFiles ? 2 : undefined}>
        <textarea
          // @ts-expect-error ref type is valid
          ref={textareaRef}
          placeholder="Enter text"
          className="w-full min-h-8 text-black"
          value={newText}
          onChange={handleTextChange}
        />
      </Cell>
      <Cell>
        <Button
          icon={{ src: "/upload.svg", alt: "Upload symbol" }}
          onClick={submitText}
        />
      </Cell>
    </tr>
  );
}
