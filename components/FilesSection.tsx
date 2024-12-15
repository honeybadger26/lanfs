import { DeleteButton } from "@/components/DeleteButton";
import { DownloadFileButton } from "@/components/DownloadFileButton";
import { UploadFileButton } from "@/components/UploadFileButton";
import fs from "fs";
import { Cell } from "./Cell";

export function FilesSection({ className = "" }: { className?: string }) {
  const files = fs.readdirSync("./tmp/files/");
  const hasFiles = files.length > 0;

  return (
    <table className={`w-full md:w-fit ${className}`}>
      <thead>
        <tr>
          <Cell colSpan={2} className="text-center text-3xl font-semibold">
            Files
          </Cell>
          {hasFiles && (
            <Cell>
              <DeleteButton type="file" all />
            </Cell>
          )}
        </tr>
      </thead>
      <tbody>
        {hasFiles &&
          files.map((fileName) => (
            <tr key={fileName}>
              <Cell className="max-w-0 md:max-w-full w-full whitespace-pre-line overflow-auto">
                {fileName}
              </Cell>
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
            <UploadFileButton />
          </Cell>
        </tr>
      </tbody>
    </table>
  );
}
