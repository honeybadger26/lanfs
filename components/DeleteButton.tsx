"use client";

import { Button } from "./Button";
import { useRouter } from "next/navigation";

type DeleteButtonProps = {
  type: "file" | "text";
  all?: boolean;
  id?: string;
};

export function DeleteButton({ type, all = false, id }: DeleteButtonProps) {
  const router = useRouter();

  async function handleClick() {
    if (type === "file") {
      if (all) {
        await fetch(`/api/files`, { method: "DELETE" });
      } else {
        await fetch(`/api/files/${id}`, { method: "DELETE" });
      }
    } else {
      if (all) {
        await fetch(`/api/text`, { method: "DELETE" });
      } else {
        await fetch(`/api/text/${id}`, { method: "DELETE" });
      }
    }

    router.refresh();
  }

  return (
    <Button
      color="red"
      icon={{ src: "/bin.svg", alt: "Trash bin" }}
      onClick={handleClick}
    />
  );
}
