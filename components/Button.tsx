import Image from 'next/image';
import { ReactNode } from "react";

const COLOR_CLASSES = {
  blue: "bg-blue-500 active:bg-blue-600 disabled:bg-blue-400",
  red: "bg-red-500 active:bg-red-600 disabled:bg-blue-400",
};

type ButtonProps = {
  padding?: string;
  className?: string;
  color?: 'blue' | 'red';
  children?: ReactNode;
  icon?: { src: string; alt: string; size: 'normal' | 'large' };
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({
  padding = "px-6 py-3",
  className = "",
  color = 'blue',
  children,
  icon,
  disabled = false,
  onClick,
}: ButtonProps) {
  const colorClasses = COLOR_CLASSES[color];

  return (
    <button
      disabled={disabled}
      className={`${padding} flex flex-col items-center gap-1 text-slate-100 disabled:text-slate-300 disabled:cursor-not-allowed ${colorClasses} ${className}`}
      onClick={onClick}
    >
      {icon && (
        <Image
          color="#fff"
          src={icon.src}
          alt={icon.alt}
          width={icon.size === 'large' ? "64" : "32"}
          height={icon.size === 'large' ? "64" : "32"}
        />
      )}
      <div>{children}</div>
    </button>
  );
}
