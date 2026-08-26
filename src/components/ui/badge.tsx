import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.14em] uppercase",
  {
    variants: {
      variant: {
        default: "bg-forest text-beige",
        outline: "border border-current",
        beige: "bg-beige text-chocolate",
        gold: "bg-gold/20 text-chocolate",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
