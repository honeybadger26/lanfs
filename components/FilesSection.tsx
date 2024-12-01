import { Button } from "@/components/Button";
import { DeleteAllButton } from '@/components/DeleteAllButton';
import { DeleteButton } from '@/components/DeleteButton';
import { DownloadFileButton } from '@/components/DownloadFileButton';
import { Row } from '@/components/Row';
import { UploadFileButton } from '@/components/UploadFileButton';
import fs from 'fs';
import Link from 'next/link';
import { Cell } from './Cell';

export function FilesSection({ className = "" }: { className?: string }) {
  const files = fs.readdirSync("./tmp/files/");

  return (
    <table className={`w-full ${className}`}>
      <thead>
        <tr>
          <Cell colSpan={3} className="text-center text-3xl font-semibold">
            Files
          </Cell>
        </tr>
      </thead>
      <tbody>
        {files.length === 0 ? (
          <tr>
            <Cell>No files</Cell>
          </tr>
        ) : (
          <>
            {files.map((fileName) => (
              <tr key={fileName}>
                <Cell className="w-full text-ellipsis">{fileName}</Cell>
                <Cell>
                  <DownloadFileButton fileName={fileName} />
                </Cell>
                <Cell>
                  <DeleteButton type="file" id={fileName} />
                </Cell>
              </tr>
            ))}
            <tr>
              <Cell colSpan={3}>
                <DeleteAllButton className="w-full" type="text" />
              </Cell>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
}

export const dynamic = "force-dynamic";
