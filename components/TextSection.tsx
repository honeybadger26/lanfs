import { CopyTextButton } from '@/components/CopyTextButton';
import { DeleteButton } from '@/components/DeleteButton';
import fs from 'fs';
import { Cell } from './Cell';
import { TextForm } from './TextForm';

export function TextSection({ className = "" }: { className?: string }) {
  // TODO: Think about using websockets to refresh
  const fileNames = fs.readdirSync("./tmp/text/");
  const hasFiles = fileNames.length > 0;

  const fileContents = fileNames.map((fileName) => {
    const contents = fs.readFileSync(`./tmp/text/${fileName}`);
    return {
      id: fileName,
      contents: '' + contents, // Converts Buffer to string
    };
  });


  return (
    <table className={`w-full md:w-fit ${className}`}>
      <thead>
        <tr>
          <Cell colSpan={2} className="text-center text-3xl font-semibold">
            Text
          </Cell>
          {hasFiles && (
            <Cell>
              <DeleteButton type="text" all />
            </Cell>
          )}
        </tr>
      </thead>
      <tbody>
        {hasFiles && (
          fileContents.map(({ id, contents }) => (
            <tr key={id}>
              {/* TODO: Detect hyperlinks */}
              <Cell
                className="max-w-0 md:max-w-full w-full whitespace-pre-line overflow-auto"
              >
                {contents}
              </Cell>
              <Cell>
                <CopyTextButton text={contents} />
              </Cell>
              <Cell>
                <DeleteButton type="text" id={id} />
              </Cell>
            </tr>
          ))
        )}
        <TextForm hasFiles={hasFiles} />
      </tbody>
    </table>
  );
}

export const dynamic = "force-dynamic";
