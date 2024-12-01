import { CopyTextButton } from '@/components/CopyTextButton';
import { DeleteAllButton } from '@/components/DeleteAllButton';
import { DeleteButton } from '@/components/DeleteButton';
import fs from 'fs';
import { Cell } from './Cell';

export function TextSection({ className = "" }: { className?: string }) {
  // TODO: Think about using websockets to refresh
  const fileNames = fs.readdirSync("./tmp/text/");

  const fileContents = fileNames.map((fileName) => {
    const contents = fs.readFileSync(`./tmp/text/${fileName}`);
    return {
      id: fileName,
      contents: '' + contents, // Converts Buffer to string
    };
  });

  return (
    <table className={`w-full ${className}`}>
      <thead>
        <tr>
          <Cell colSpan={3} className="text-center text-3xl font-semibold">
            Text
          </Cell>
        </tr>
      </thead>
      <tbody>
        {fileContents.length === 0 ? (
          <tr>
            <td>No files</td>
          </tr>
        ) : (
          <>
            {fileContents.map(({ id, contents }) => (
              <tr key={id}>
                {/* TODO: Detect hyperlinks */}
                <Cell className="w-full text-ellipsis">{contents}</Cell>
                <Cell>
                  <CopyTextButton text={contents} />
                </Cell>
                <Cell>
                  <DeleteButton type="text" id={id} />
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
