import { CopyTextButton } from "@/components/CopyTextButton";
import { DeleteButton } from "@/components/DeleteButton";
import fs from "fs";
import { Cell } from "./Cell";
import { TextForm } from "./TextForm";

export function TextSection({ className = "" }: { className?: string }) {
  // TODO: Think about using websockets to refresh?
  const fileNames = fs.readdirSync("./tmp/text/");
  const hasFiles = fileNames.length > 0;

  const fileContents = fileNames.map((fileName) => {
    // Adding an empty string will convert Buffer to string
    const contents = "" + fs.readFileSync(`./tmp/text/${fileName}`);
    return {
      id: fileName,
      isLink: /^(https?:\/\/[^\s]+)$/.test(contents),
      contents: contents,
    };
  });

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      <h2 className="text-3xl">Text</h2>
      {hasFiles && (
        <table className="mt-4 w-full md:w-fit">
          <tbody>
            {fileContents.map(({ id, isLink, contents }) => (
              <tr key={id}>
                <Cell className="w-full whitespace-pre-line overflow-auto">
                  {isLink ? (
                    <a className="underline" href={contents}>
                      {contents}
                    </a>
                  ) : (
                    contents
                  )}
                </Cell>
                <Cell>
                  <CopyTextButton text={contents} />
                </Cell>
                <Cell>
                  <DeleteButton type="text" id={id} />
                </Cell>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="pt-4 flex gap-2">
        <TextForm />
        {hasFiles && (
          <DeleteButton type="text" all />
        )}
      </div>
    </div>
  );
}
