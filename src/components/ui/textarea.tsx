import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-32 w-full rounded-md border border-input bg-card px-3.5 py-3 text-base text-foreground transition-colors outline-none placeholder:text-muted-foreground/70 focus-visible:border-forest focus-visible:ring-3 focus-visible:ring-forest/25 disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
