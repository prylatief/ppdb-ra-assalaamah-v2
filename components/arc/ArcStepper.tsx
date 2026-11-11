"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { motionTokens } from "@/lib/motion";

export interface StepItem {
  id: string | number;
  label: string;
  sublabel?: string;
  description?: string;
  icon?: React.ReactNode;
}

interface ArcStepperProps {
  steps: StepItem[];
  currentStep: number; // 1-indexed
  onSelectStep?: (index: number) => void;
  className?: string;
}

export function ArcStepper({
  steps,
  currentStep,
  onSelectStep,
  className = "",
}: ArcStepperProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`w-full ${className}`}>
      {/* Mobile Stepper: Connected vertical steps (< 640px) */}
      <div className="sm:hidden space-y-3">
        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div
              key={step.id}
              className={`p-4 rounded-2xl border transition-all ${
                isCurrent
                  ? "bg-white shadow-xs border-2 border-amber-400 ring-2 ring-amber-100/60"
                  : isCompleted
                  ? "bg-emerald-50/50 border-emerald-200"
                  : "bg-white border-slate-200/80"
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5 ${
                    isCompleted
                      ? "bg-emerald-600 text-white"
                      : isCurrent
                      ? "bg-blue-900 text-amber-400 ring-2 ring-amber-200"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : stepNum}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider ${
                        isCurrent
                          ? "text-blue-900"
                          : isCompleted
                          ? "text-emerald-700"
                          : "text-slate-400"
                      }`}
                    >
                      {step.sublabel || `Langkah ${stepNum}`}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                        Tahap Ini
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5 leading-snug">
                    {step.label}
                  </h4>
                  {step.description && (
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop & Tablet Stepper View (>= 640px) */}
      <div className="hidden sm:grid grid-cols-4 gap-4 relative">
        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          const isUpcoming = stepNum > currentStep;

          return (
            <div
              key={step.id}
              onClick={() => {
                if (onSelectStep && (isCompleted || isCurrent)) {
                  onSelectStep(stepNum);
                }
              }}
              className={`group relative flex flex-col items-center text-center p-4 rounded-2xl transition-all duration-300 ${
                onSelectStep && (isCompleted || isCurrent) ? "cursor-pointer" : ""
              } ${
                isCurrent
                  ? "bg-white shadow-md border-2 border-amber-400/90 ring-4 ring-amber-100/50"
                  : isCompleted
                  ? "bg-emerald-50/50 border border-emerald-200/80 hover:bg-emerald-50"
                  : "bg-slate-50 border border-slate-200/70 opacity-75"
              }`}
            >
              {/* Step Circle Marker */}
              <div className="relative mb-3">
                <motion.div
                  initial={false}
                  animate={
                    isCurrent
                      ? { scale: [1, 1.06, 1] }
                      : { scale: 1 }
                  }
                  transition={
                    isCurrent && !shouldReduceMotion
                      ? { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
                      : undefined
                  }
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-sm transition-colors duration-300 shadow-xs ${
                    isCompleted
                      ? "bg-emerald-600 text-white ring-4 ring-emerald-100"
                      : isCurrent
                      ? "bg-blue-900 text-amber-400 ring-4 ring-amber-200"
                      : "bg-slate-200 text-slate-500 ring-4 ring-slate-100"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 stroke-[3]" />
                  ) : (
                    <span>{step.icon || stepNum}</span>
                  )}
                </motion.div>
              </div>

              {/* Step Title & Sublabel */}
              <p
                className={`text-xs font-extrabold uppercase tracking-wider mb-0.5 ${
                  isCurrent
                    ? "text-blue-900"
                    : isCompleted
                    ? "text-emerald-700"
                    : "text-slate-400"
                }`}
              >
                {step.sublabel || `Langkah ${stepNum}`}
              </p>
              <h4
                className={`text-sm font-bold leading-tight ${
                  isCurrent ? "text-slate-900" : isCompleted ? "text-slate-800" : "text-slate-500"
                }`}
              >
                {step.label}
              </h4>
              {step.description && (
                <p className="text-xs text-slate-500 mt-1 leading-snug line-clamp-2">
                  {step.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
