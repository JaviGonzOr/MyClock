import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

export function AppCard({
  children,
  className,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={cn(
        "rounded-[32px]",
        "border border-slate-200",
        "bg-white",
        "shadow-xl",
        "p-6",
        className
      )}
    >
      {children}
    </motion.div>
  );
}