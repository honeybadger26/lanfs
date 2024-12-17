import { DeleteButton } from "@/components/DeleteButton";
import { UploadFileButton } from "@/components/UploadFileButton";
import fs from "fs";
import { Cell } from "./Cell";

export function FilesSection({ className = "" }: { className?: string }) {
  const files = fs.readdirSync("./tmp/files/");
  const hasFiles = files.length > 0;

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      <h2 className="text-3xl">Files</h2>
      {hasFiles && (
        <table className="mt-4 w-full md:w-fit">
          <tbody>
            {files.map((fileName) => (
              <tr key={fileName}>
                <Cell className="max-w-0 md:max-w-full w-full whitespace-pre-line overflow-auto">
                  <a
                    className="underline"
                    href={`/api/files/${fileName}`}
                    download
                  >
                    {fileName}
                  </a>
                </Cell>
                <Cell>
                  <DeleteButton type="file" id={fileName} />
                </Cell>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="pt-4 flex gap-2">
        <UploadFileButton />
        {hasFiles && <DeleteButton type="file" all />}
      </div>
    </div>
  );
}
