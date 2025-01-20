import { cn } from "@/lib/utils";

type TextareaProps = React.ComponentPropsWithRef<"textarea">;

export const Textarea = ({
  className,
  ["aria-invalid"]: ariaInvalid,
  ...props
}: TextareaProps) => {
  return (
    <textarea
      className={cn(
        "border-border text-main flex min-h-[80px] w-full rounded-[8px] border bg-background px-3 py-2 text-sm shadow-sm",
        "focus-visible:focus-input-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        ariaInvalid && "focus-visible:focus-input-ring-error border-error",
        className
      )}
      {...props}
    />
  );
};
