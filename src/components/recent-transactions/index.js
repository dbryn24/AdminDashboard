"use client";

import React, { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Tag } from "lucide-react";

/**
 * @param {Object} props
 * @param {any[]} [props.transactions]
 * @param {string} [props.searchQuery]
 */
export default function RecentTransactions({ transactions = [], searchQuery = "" }) {
  const [filterType, setFilterType] = useState("all");

  const filteredTransactions = transactions.filter((tx) => {
    const matchesFilter =
      filterType === "all" || tx.type.toLowerCase() === filterType.toLowerCase();

    const matchesSearch =
      searchQuery === "" ||
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
      {/* Header & Tabs */}
      <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-800">
            Recent Transactions
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Overview of sofa sales and workshop expenses
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-lg self-start sm:self-auto">
          {["all", "sale", "expense"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-all cursor-pointer ${
                filterType === type
                  ? "bg-white text-slate-800 shadow-2xs font-semibold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {type === "all" ? "All Activity" : `${type}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-50/50">
              <th className="py-3 px-6">Description / Item</th>
              <th className="py-3 px-6">Customer / Vendor</th>
              <th className="py-3 px-6">Category</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6 text-right">Amount</th>
              <th className="py-3 px-6 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Tag className="w-8 h-8 text-slate-300" />
                    <p className="text-sm">No transactions found</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredTransactions.map((tx) => {
                const isSale = tx.type.toLowerCase() === "sale";
                return (
                  <tr
                    key={tx.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                            isSale
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-amber-50 text-amber-600"
                          }`}
                        >
                          {isSale ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                        </div>
                        <span className="font-medium text-slate-800">
                          {tx.description}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 text-slate-600 text-xs sm:text-sm">
                      {tx.customer}
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600">
                        {tx.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-xs text-slate-500 whitespace-nowrap">
                      {tx.date}
                    </td>
                    <td
                      className={`py-3.5 px-6 text-right font-semibold whitespace-nowrap ${
                        isSale ? "text-emerald-600" : "text-slate-800"
                      }`}
                    >
                      {isSale ? `+${tx.amount}` : `-${tx.amount}`}
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                          tx.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700"
                            : tx.status === "In Production"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
