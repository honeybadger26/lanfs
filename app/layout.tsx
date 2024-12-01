import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LAN File Transfer",
  description: "Transfer files and text within your LAN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="w-full pt-5 pb-14 bg-slate-900 flex flex-col items-center font-mono text-slate-300 antialiased"
      >
        <h1 className="mb-2 text-4xl font-semibold">LANFS</h1>
        <p className="mb-6 text-sm">By Simon Schippl</p>
        {children}
      </body>
    </html>
  );
}
