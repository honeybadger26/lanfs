"use client";

import { Button } from './Button';
import { useRouter } from 'next/navigation';

type DeleteButtonProps = {
  type: 'file' | 'text';
  id: string;
};

export function DeleteButton({ type, id }: DeleteButtonProps) {
  const router = useRouter();

  async function handleClick() {
    if (type === 'file') {
      await fetch(`/api/files/${id}`, { method: "DELETE" });
    } else {
      await fetch(`/api/text/${id}`, { method: "DELETE" });
    }

    router.refresh();
  }

  return (
    <Button
      color="red"
      icon={{ src: "/bin.svg", alt: "Trash bin", size: 'normal' }}
      onClick={handleClick}
    />
  );
}
