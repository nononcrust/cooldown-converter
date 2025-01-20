import { cn } from "@/lib/utils";
import { clamp } from "es-toolkit";

type InputProps = React.ComponentPropsWithRef<"input"> & {
  allowNumberOnly?: boolean;
};

export const Input = ({
  className,
  ["aria-invalid"]: ariaInvalid,
  allowNumberOnly = false,
  max,
  ...props
}: InputProps) => {
  const onInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (allowNumberOnly) {
      const numericOnly = event.target.value.replace(/[^0-9]/g, "");

      const clamped = max
        ? clamp(Number(numericOnly), Number(max))
        : numericOnly;

      event.target.value = String(clamped);
    }
  };

  return (
    <input
      onInput={onInput}
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
