import * as React from "react";
import { cn } from "../../../lib/utils";
import { motion } from "motion/react";

interface CardOptionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  microcopy?: string;
  selected?: boolean;
}

export const CardOption = React.forwardRef<HTMLDivElement, CardOptionProps>(
  ({ title, microcopy, selected, className, onClick, ...props }, ref) => {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={cn(
          "bg-white rounded-[16px] p-6 shadow-sm border-2 cursor-pointer transition-all w-full text-left",
          selected
            ? "border-pink-500 ring-2 ring-pink-200"
            : "border-transparent hover:border-pink-200",
          className
        )}
        ref={ref}
        {...props}
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        {microcopy && <p className="text-gray-500 text-sm">{microcopy}</p>}
      </motion.div>
    );
  }
);
CardOption.displayName = "CardOption";
