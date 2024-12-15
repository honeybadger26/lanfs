"use client";

import { Button } from "./Button";

export function CopyTextButton({ text }: { text: string }) {
  async function handleClick() {
    navigator.clipboard.writeText(text);
  }

  return (
    <Button
      icon={{ src: "/copy.svg", alt: "Copy documents" }}
      onClick={handleClick}
    />
  );
}
