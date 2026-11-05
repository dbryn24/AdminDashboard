"use client";

import React from "react";
import { Calendar, Plus } from "lucide-react";

export default function OverviewHeader({
  title = "Business overview",
  dateRange = "Oct 1 – 31, 2026",
  onDateClick,
  onAddTransactionClick,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-8 pt-8 pb-6 bg-white border-b border-slate-100">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
        {title}
      </h1>

      {/* Action Controls */}
      <div className="flex items-center gap-3">
        {/* Date Filter Button */}
        <button
          type="button"
          onClick={onDateClick}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200/90 rounded-lg shadow-2xs hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-slate-500" strokeWidth={1.8} />
          <span>{dateRange}</span>
        </button>

        {/* Add Transaction Button */}
        <button
          type="button"
          onClick={onAddTransactionClick}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-[#0f766e] hover:bg-[#0d6861] active:bg-[#0b5852] rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" strokeWidth={2.2} />
          <span>Add transaction</span>
        </button>
      </div>
    </div>
  );
}

