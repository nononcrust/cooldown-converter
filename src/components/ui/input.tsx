import { cn } from "@/lib/utils";

type InputProps = React.ComponentPropsWithRef<"input">;

export const Input = ({
  className,
  ["aria-invalid"]: ariaInvalid,
  ...props
}: InputProps) => {
  return (
    <input
      className={cn(
        "flex h-9 w-full rounded-[8px] border border-border bg-background px-3 text-sm text-main shadow-sm",
        "focus-visible:focus-input-ring",
        "placeholder-placeholder",
        "disabled:pointer-events-none disabled:opacity-50",
        ariaInvalid && "focus-visible:focus-input-ring-error border-error",
        className
      )}
      {...props}
    />
  );
};
