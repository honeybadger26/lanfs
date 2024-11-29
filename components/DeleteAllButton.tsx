"use client";

import { Button } from './Button';
import { useRouter } from 'next/navigation';

export function DeleteAllButton({ type }: { type: 'text' | 'files' }) {
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
    <Button color="red" onClick={handleClick}>
      Delete all
    </Button>
  );
}
