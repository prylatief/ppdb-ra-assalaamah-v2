"use client";
import React, { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { motionTokens } from "@/lib/motion";

export interface TabOption {
  id: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface ArcTabsProps {
  options: TabOption[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "pill" | "underline" | "card";
}

export function ArcTabs({
  options,
  activeId,
  onChange,
  className = "",
  size = "md",
  variant = "pill",
}: ArcTabsProps) {
  const layoutId = useId();
  const shouldReduceMotion = useReducedMotion();

  const sizeClasses = {
    sm: "py-1.5 px-3 text-xs min-h-[36px]",
    md: "py-2.5 px-4 text-sm min-h-[44px]",
    lg: "py-3 px-5 text-base min-h-[48px]",
  };

  return (
    <div
      role="tablist"
      className={`relative inline-flex max-w-full items-center p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/80 backdrop-blur-xs ${className}`}
    >
      {options.map((opt) => {
        const isActive = activeId === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt.id)}
            className={`relative z-10 flex-1 inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-colors duration-200 ${
              sizeClasses[size]
            } ${
              isActive
                ? "text-blue-950"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {/* Sliding Pill Indicator (Arc UI signature) */}
            {isActive && (
              <motion.div
                layoutId={`tab-pill-${layoutId}`}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : motionTokens.spring.morph
                }
                className="absolute inset-0 z-0 bg-white rounded-xl shadow-xs border border-slate-200/90 ring-1 ring-slate-950/5"
              />
            )}

            <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
              {opt.icon && <span className="shrink-0">{opt.icon}</span>}
              <span>{opt.label}</span>
              {opt.sublabel && (
                <span
                  className={`text-[11px] font-normal transition-opacity ${
                    isActive ? "opacity-80 text-blue-900" : "opacity-60"
                  }`}
                >
                  {opt.sublabel}
                </span>
              )}
              {opt.badge && (
                <span className="ml-1 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800">
                  {opt.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
