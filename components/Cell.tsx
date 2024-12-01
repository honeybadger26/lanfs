import { ReactNode } from 'react';

type CellProps = {
  colSpan?: number;
  className?: string;
  children: ReactNode;
};

export function Cell({ colSpan, className = "", children }: CellProps) {
  return (
    <td
      colSpan={colSpan}
      className={`border-2 p-2 ${className}`}
    >
      {children}
    </td>
  );
}
