"use client";

import React from "react";
import { X, Calendar as CalendarIcon, Check } from "lucide-react";

export default function DateFilterModal({ isOpen, onClose, selectedRange, onSelect }) {
  if (!isOpen) return null;

  const presets = [
    { label: "Today", value: "Nov 5, 2026" },
    { label: "This Week", value: "Nov 1 – 7, 2026" },
    { label: "October 2026 (Selected)", value: "Oct 1 – 31, 2026" },
    { label: "September 2026", value: "Sep 1 – 30, 2026" },
    { label: "Third Quarter 2026", value: "Jul 1 – Sep 30, 2026" },
    { label: "Full Year 2026", value: "Jan 1 – Dec 31, 2026" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-emerald-600" />
            <h3 className="font-semibold text-slate-800 text-sm">
              Select Reporting Period
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 space-y-1">
          {presets.map((p) => {
            const isSelected = selectedRange === p.value;
            return (
              <button
                key={p.value}
                onClick={() => {
                  onSelect(p.value);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm text-left transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#e8f7f0] text-[#139a6c] font-medium"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>{p.label}</span>
                {isSelected && <Check className="w-4 h-4 text-[#139a6c]" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

