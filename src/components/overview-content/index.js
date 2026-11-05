"use client";

import React from "react";
import OverviewMetrics from "../overview-metrics";
import RecentTransactions from "../recent-transactions";

/**
 * @param {Object} props
 * @param {any} [props.metrics]
 * @param {any[]} [props.transactions]
 * @param {string} [props.searchQuery]
 * @param {boolean} [props.isEmptyCanvas]
 */
export default function OverviewContent({
  metrics,
  transactions = [],
  searchQuery = "",
  isEmptyCanvas = false,
}) {
  if (isEmptyCanvas) {
    return (
      <div className="flex-1 p-8 bg-white min-h-[calc(100vh-140px)] flex items-center justify-center">
        <div className="text-center text-slate-400">
          <p className="text-sm">Blank canvas overview mode active</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 bg-slate-50/60 min-h-[calc(100vh-140px)]">
      {/* KPI Stats Grid */}
      <OverviewMetrics metrics={metrics} />

      {/* Recent Transactions & Stock Activity */}
      <RecentTransactions
        transactions={transactions}
        searchQuery={searchQuery}
      />
    </div>
  );
}
