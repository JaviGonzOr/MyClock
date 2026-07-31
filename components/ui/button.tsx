import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-violet-600 text-white hover:bg-violet-700 shadow-md hover:shadow-lg",

        secondary:
          "bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700",

        outline:
          "border border-zinc-700 bg-transparent text-white hover:bg-zinc-800",

        ghost:
          "text-zinc-300 hover:bg-zinc-800 hover:text-white",

        destructive:
          "bg-red-600 text-white hover:bg-red-700",

        link:
          "text-violet-400 underline-offset-4 hover:underline",
      },

      size: {
        sm: "h-9 px-3",
        default: "h-11 px-5",
        lg: "h-12 px-6 text-base",
        icon: "h-11 w-11 p-0",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };