import type { ReactNode } from "react";

type ResponsiveContainerProps = {
  children: ReactNode;
  className?: string;
};

export function ResponsiveContainer({
  children,
  className = "",
}: ResponsiveContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
