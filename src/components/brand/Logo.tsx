import { cn } from "@/utils/cn";

export function Logo({
  className,
  withWordmark = false,
}: {
  className?: string;
  withWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        role="img"
        aria-label="Nikhil Rajput logo"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <defs>
          <linearGradient id="logo-n" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#7c3aed" />
            <stop offset="0.5" stopColor="#06b6d4" />
            <stop offset="1" stopColor="#ec4899" />
          </linearGradient>
          <radialGradient id="logo-spark" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#ec4899" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ec4899" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          d="M9 23 V11 L21 21 V9"
          fill="none"
          stroke="url(#logo-n)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="21" cy="9" r="6" fill="url(#logo-spark)" />
        <circle cx="21" cy="9" r="2.2" fill="#ec4899" />
      </svg>
      {withWordmark ? (
        <span className="gradient-text font-mono text-lg leading-none font-semibold tracking-tight">
          nixrajput
        </span>
      ) : null}
    </span>
  );
}
