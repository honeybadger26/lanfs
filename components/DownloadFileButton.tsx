"use client";

import { Button } from './Button';

export function DownloadFileButton({ fileName }: { fileName: string }) {
  return (
    <a href={`/api/files/${fileName}`} download>
      <Button
        icon={{ src: "/download.svg", alt: "Download symbol", size: 'normal' }}
      />
    </a>
  );
}
