"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { motionTokens } from "@/lib/motion";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface ArcAccordionProps {
  items: AccordionItem[];
  defaultOpen?: string | null;
  className?: string;
  variant?: "bordered" | "separated";
}

export function ArcAccordion({
  items,
  defaultOpen = null,
  className = "",
  variant = "separated",
}: ArcAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpen);
  const shouldReduceMotion = useReducedMotion();

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={`w-full space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`rounded-2xl transition-colors duration-200 ${
              variant === "separated"
                ? "bg-white border border-slate-200/90 shadow-xs hover:border-emerald-300"
                : "border-b border-slate-200 last:border-none"
            } ${isOpen ? "ring-2 ring-emerald-500/20 border-emerald-500/40" : ""}`}
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-emerald-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                {item.icon && <span className="shrink-0">{item.icon}</span>}
                <span className="text-sm sm:text-base">{item.title}</span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : motionTokens.spring.snappy}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { height: 0, opacity: 0 }
                  }
                  animate={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { height: "auto", opacity: 1 }
                  }
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0.1 }
                      : {
                          height: motionTokens.spring.smooth,
                          opacity: { duration: 0.2 },
                        }
                  }
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/80">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
