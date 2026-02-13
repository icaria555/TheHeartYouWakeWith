import * as React from "react";
import { cn } from "../../../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "choice" | "ghost";
  size?: "default" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 disabled:opacity-50 disabled:pointer-events-none ring-offset-white",
          {
            "bg-pink-600 text-white hover:bg-pink-700 shadow-sm":
              variant === "primary",
            "bg-white text-pink-600 border-2 border-pink-100 hover:bg-pink-50":
              variant === "secondary",
            "bg-white text-gray-900 border border-gray-200 hover:border-pink-300 hover:bg-pink-50 w-full justify-center py-4 text-lg":
              variant === "choice",
            "bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100":
              variant === "ghost",
            "h-12 px-6 py-2 text-lg": size === "default" && variant !== "choice",
            "h-14 px-8 text-xl": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
