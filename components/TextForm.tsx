"use client";

import { Button } from "@/components/Button";
import { Row } from "@/components/Row";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function TextForm({ className }: { className?: string }) {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>();
  const textareaOriginalHeight = useRef(0);
  const [newText, setNewText] = useState("");

  useEffect(() => {
    if (textareaRef.current) {
      if (textareaOriginalHeight.current === 0) {
        textareaOriginalHeight.current = textareaRef.current.clientHeight;
      }

      const scrollHeight = textareaRef.current.scrollHeight;

      if (scrollHeight > textareaOriginalHeight.current) {
        textareaRef.current.style.height = "0px";
        const newScrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = `${newScrollHeight}px`;
      }
    }
  }, [newText]);

  const submitText = async () => {
    await fetch("/api/text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newText }),
    });

    setNewText("");
    router.refresh();
  };

  return (
    <Row className={className}>
      <textarea
        // @ts-expect-error ref type is valid
        ref={textareaRef}
        className="min-h-8 text-black"
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
      />
      <Button className="self-center" onClick={submitText}>Send</Button>
    </Row>
  );
}
