import { Button } from "@/components/Button";
import { DeleteAllButton } from '@/components/DeleteAllButton';
import { DeleteButton } from '@/components/DeleteButton';
import { DownloadFileButton } from '@/components/DownloadFileButton';
import { Row } from '@/components/Row';
import { UploadFileButton } from '@/components/UploadFileButton';
import fs from 'fs';
import Link from 'next/link';
import { ReactNode } from 'react';

type CellProps = {
  className?: string;
  children: ReactNode;
};

// TODO: Duplicated
function Cell({ className, children }: CellProps) {
  return (
    <td className={`border-2 p-2 whitespace-pre ${className}`}>{children}</td>
  );
}

export default function Files() {
  const files = fs.readdirSync("./tmp/files/");

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold">Files</h2>
      {files.length > 0 && (
        <table className="mt-4">
          <tbody>
            {files.map((fileName) => (
              <tr key={fileName}>
                <Cell>{fileName}</Cell>
                <Cell>
                  <DownloadFileButton fileName={fileName} />
                </Cell>
                <Cell>
                  <DeleteButton type="file" id={fileName} />
                </Cell>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <UploadFileButton className="pt-6" />
      <Row className="mt-6">
        <Link href="/">
          <Button>Back</Button>
        </Link>
        {files.length > 0 && <DeleteAllButton type="files" />}
      </Row>
    </div>
  );
}

export const dynamic = "force-dynamic";
