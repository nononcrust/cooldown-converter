import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";

const chipButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full border border-transparent font-medium",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        primaryLow: "border-primary bg-primary-lighter text-primary",
        secondary: "bg-secondary",
      },
      size: {
        xsmall: "h-7 gap-0.5 px-2.5 text-[12px]",
        small: "h-8 gap-1 px-3 text-[13px]",
        medium: "h-9 gap-1.5 px-3.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
);

type ChipButtonProps = React.ComponentPropsWithRef<"button"> &
  VariantProps<typeof chipButtonVariants> & {
    asChild?: boolean;
  };

export const ChipButton = ({
  className,
  asChild = false,
  variant,
  size,
  children,
  ...props
}: ChipButtonProps) => {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={cn(chipButtonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Component>
  );
};
