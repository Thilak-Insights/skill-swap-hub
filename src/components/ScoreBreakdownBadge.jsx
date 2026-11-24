import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, CheckCircle2, ArrowRightLeft } from 'lucide-react';

export default function ScoreBreakdownBadge({ matchInfo }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!matchInfo) return null;

  const { totalScore, matchBadge, isReciprocal, breakdown } = matchInfo;

  // Badge background & text color based on score tier
  let badgeColor = "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";
  let progressColor = "bg-slate-500";

  if (totalScore >= 80) {
    badgeColor = "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800";
    progressColor = "bg-emerald-500";
  } else if (totalScore >= 60) {
    badgeColor = "bg-teal-50 text-teal-700 border-teal-300 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-800";
    progressColor = "bg-teal-500";
  } else if (totalScore >= 40) {
    badgeColor = "bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800";
    progressColor = "bg-amber-500";
  }

  return (
    <div className="flex flex-col items-end">
      {/* Main Score Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-semibold transition-all shadow-sm hover:scale-105 ${badgeColor}`}
        title="Click to view AI compatibility calculation breakdown"
      >
        <Sparkles className="w-4 h-4" />
        <span>{totalScore}% Match</span>
        {isReciprocal && (
          <span className="hidden sm:inline-flex items-center text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-1.5 py-0.5 rounded-md font-medium">
            <ArrowRightLeft className="w-3 h-3 mr-1" /> 2-Way Swap
          </span>
        )}
        {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {/* Expandable Mathematical Breakdown */}
      {isOpen && (
        <div className="mt-2 w-72 p-3 text-left bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl text-xs z-10 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-100 dark:border-slate-700">
            <span className="font-semibold text-slate-700 dark:text-slate-200">Scoring Breakdown</span>
            <span className="text-slate-400 dark:text-slate-500 text-[10px]">Weighted Model</span>
          </div>

          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300 mb-0.5">
                <span>Teach Fit (w₁: 35%)</span>
                <span className="font-semibold">{breakdown.teachPoints} / 35 pts</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-1.5 rounded-full"
                  style={{ width: `${(breakdown.teachPoints / 35) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300 mb-0.5">
                <span>Learn Fit (w₂: 35%)</span>
                <span className="font-semibold">{breakdown.learnPoints} / 35 pts</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-teal-500 h-1.5 rounded-full"
                  style={{ width: `${(breakdown.learnPoints / 35) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300 mb-0.5">
                <span>Category Synergy (w₃: 15%)</span>
                <span className="font-semibold">{breakdown.categoryPoints} / 15 pts</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-sky-500 h-1.5 rounded-full"
                  style={{ width: `${(breakdown.categoryPoints / 15) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300 mb-0.5">
                <span>Reciprocity Bonus (w₄: 15%)</span>
                <span className="font-semibold">{breakdown.reciprocityPoints} / 15 pts</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-purple-500 h-1.5 rounded-full"
                  style={{ width: `${(breakdown.reciprocityPoints / 15) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400">
            {isReciprocal ? (
              <span className="flex items-center text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 inline" />
                Both users satisfy each other's needs!
              </span>
            ) : (
              <span>One-way match. Try finding a 3-way swap chain!</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

