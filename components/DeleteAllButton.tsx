"use client";

import { Button } from './Button';
import { useRouter } from 'next/navigation';

type DeleteAllButtonProps = {
  className?: string;
  type: 'text' | 'files';
}

export function DeleteAllButton({ className = "", type }: DeleteAllButtonProps) {
  const router = useRouter();

  async function handleClick() {
    if (type === 'text') {
      await fetch(`/api/text`, { method: "DELETE" });
    } else {
      await fetch(`/api/files`, { method: "DELETE" });
    }

    router.refresh();
  }

  return (
    <Button className={className} color="red" onClick={handleClick}>
      Delete all
    </Button>
  );
}
