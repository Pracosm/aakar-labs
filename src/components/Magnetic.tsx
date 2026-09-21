"use client";

import type { ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export default function Magnetic({
  children,
  className,
}: MagneticProps) {
  return (
    <div
      className={className}
      style={{ display: className ? undefined : "inline-block" }}
    >
      {children}
    </div>
  );
}
