import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  fade?: boolean;
}

/** Infinitely scrolling row. Duplicates children for seamless loop. */
export function Marquee({ children, className = "", fade = true }: MarqueeProps) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={
        fade
          ? {
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }
          : undefined
      }
    >
      <div className="flex w-max animate-marquee gap-12 pr-12">
        <div className="flex items-center gap-12 shrink-0">{children}</div>
        <div className="flex items-center gap-12 shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
