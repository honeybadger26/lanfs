import { Button } from "@/components/Button";
import { CopyTextButton } from '@/components/CopyTextButton';
import { DeleteAllButton } from '@/components/DeleteAllButton';
import { DeleteButton } from '@/components/DeleteButton';
import { Row } from '@/components/Row';
import { TextForm } from '@/components/TextForm';
import fs from 'fs';
import Link from 'next/link';
import { ReactNode } from 'react';

function Cell({ children }: { children: ReactNode }) {
  return (
    <td className="border-2 p-2 whitespace-pre">{children}</td>
  );
}

export default function Text() {
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
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold">Text</h2>
      {fileContents.length > 0 && (
        <table className="mt-4">
          <tbody>
            {fileContents.map(({ id, contents }) => (
              <tr key={id}>
                <Cell>{contents}</Cell>
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
      <TextForm className="mt-6" />
      <Row className="mt-6">
        <Link href="/">
          <Button>Back</Button>
        </Link>
        {fileContents.length > 0 && <DeleteAllButton type="text" />}
      </Row>
    </div>
  );
}
