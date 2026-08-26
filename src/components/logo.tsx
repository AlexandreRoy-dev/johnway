import Image from "next/image";

import { cn } from "@/lib/utils";

export function Logo({
  className,
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  return (
    <Image
      src={invert ? "/brand/johnway-logo-light.svg" : "/brand/johnway-logo-dark.svg"}
      alt="Johnway."
      width={3184}
      height={756}
      priority
      className={cn("h-[1.7rem] w-auto", className)}
    />
  );
}
