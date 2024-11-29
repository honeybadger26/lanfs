import { Button } from "@/components/Button";
import { Row } from "@/components/Row";
import Link from 'next/link';

export default function Home() {
  return (
    <Row className="pt-4">
      <Link href="/text">
        <Button icon={{ src: "/text.svg", alt: "Lines of text", size: 'large' }}>
          Text
        </Button>
      </Link>
      <Link href="/files">
        <Button icon={{ src: "/file.svg", alt: "A computer file", size: 'large' }}>
          Files
        </Button>
      </Link>
    </Row>
  );
}
