import { cn } from "@/lib/utils";

export function Logo({
  className,
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        invert ? "text-beige" : "text-chocolate-deep",
        className,
      )}
    >
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
      >
        <path
          d="M4 30 L20 8 L36 30 H28 L20 18 L12 30 Z"
          fill={invert ? "#2f8f55" : "#1f5c3a"}
        />
        <path
          d="M12 30 H28 L20 18 Z"
          fill={invert ? "#f4ebcf" : "#4a2c1a"}
        />
      </svg>
      <span className="font-display text-[1.7rem] leading-none font-bold tracking-[0.18em] uppercase">
        Johnway
      </span>
    </span>
  );
}
