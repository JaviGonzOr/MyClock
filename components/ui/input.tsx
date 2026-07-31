import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      className={cn(
        "h-12 w-full rounded-xl",
        "border border-slate-300",
        "bg-white",
        "px-4",
        "text-slate-900",
        "placeholder:text-slate-400",
        "outline-none",
        "transition",
        "focus:border-violet-600",
        "focus:ring-4",
        "focus:ring-violet-200",
        className
      )}
      {...props}
    />
  );
}

export { Input };