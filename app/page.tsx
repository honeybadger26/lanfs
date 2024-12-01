import { FilesSection } from '@/components/FilesSection';
import { TextSection } from '@/components/TextSection';

export default function Home() {
  return (
    <div className="w-full px-4 flex flex-col items-center">
      <TextSection className="mt-4" />
      <FilesSection className="mt-14" />
    </div>
  );
}
