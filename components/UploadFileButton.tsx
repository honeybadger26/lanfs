"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from 'react';
import { Button } from './Button';
import Image from 'next/image';

export function UploadFileButton({ className = "" }: { className?: string }) {
  const [uploadState, setUploadState] = useState<{ done: number; total: number } | null>(null);
  const router = useRouter();

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    // TODO: Loading state
    const selectedFiles = e.target.files;

    if (!selectedFiles) {
      return;
    }

    for (let i = 0; i < selectedFiles.length; i++) {
      setUploadState({ done: i, total: selectedFiles.length });
      const formData = new FormData();
      formData.append("file", selectedFiles[i])

      await fetch("/api/files", {
        method: "POST",
        body: formData,
      });
    }

    setUploadState(null);
    router.refresh();
  }

  if (uploadState) {
    return (
      <div className="w-full text-center text-slate-500">
        {`Uploading: ${uploadState.done + 1}/${uploadState.total}`}
      </div>
    );
  }

  return (
    <div className={className}>
      <input type="file" id="upload-button" hidden multiple onChange={handleChange} />
      <label
        htmlFor="upload-button"
        className="px-6 py-3 flex items-center justify-center bg-blue-500 active:bg-blue-600 text-slate-100 cursor-pointer"
      >
        <Image
          className="min-h-8 min-w-8"
          color="#fff"
          src="/upload.svg"
          alt="Upload symbol"
          width="32"
          height="32"
        />
        {/* Upload file */}
      </label>
    </div>
  );
}
