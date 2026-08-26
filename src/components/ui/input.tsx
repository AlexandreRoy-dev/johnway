import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-md border border-input bg-card px-3.5 text-base text-foreground transition-colors outline-none placeholder:text-muted-foreground/70 focus-visible:border-forest focus-visible:ring-3 focus-visible:ring-forest/25 disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
