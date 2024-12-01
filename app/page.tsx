import { FilesSection } from '@/components/FilesSection';
import { TextForm } from '@/components/TextForm';
import { TextSection } from '@/components/TextSection';
import { UploadFileButton } from '@/components/UploadFileButton';

export default function Home() {
  return (
    <div className="w-full px-4 flex flex-col items-center">
      <div className="w-full">
        <TextForm className="pt-4" />
        <UploadFileButton className="pt-4" />
      </div>
      <TextSection className="mt-6" />
      <FilesSection className="mt-6" />
    </div>
  );
}
