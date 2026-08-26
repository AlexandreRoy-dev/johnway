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
        "inline-flex items-baseline font-display text-[1.7rem] leading-none font-bold uppercase",
        invert ? "text-beige" : "text-chocolate-deep",
        className,
      )}
    >
      Johnway
      <span className={invert ? "text-forest-bright" : "text-forest"}>.</span>
    </span>
  );
}
