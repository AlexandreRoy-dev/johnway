import * as React from "react";

import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "mb-1.5 block text-xs font-semibold tracking-[0.16em] text-chocolate uppercase",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
