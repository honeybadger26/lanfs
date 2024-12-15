import { ReactNode } from "react";

type RowProps = { children: ReactNode; className?: string };

export const Row = ({ children, className = "" }: RowProps) => {
  return (
    <div className={`flex gap-5 justify-center ${className}`}>{children}</div>
  );
};
