"use client";

import React, { useState } from "react";
import Sidebar from "@/src/components/sidebar";
import Topbar from "@/src/components/topbar";
import OverviewHeader from "@/src/components/overview-header";
import OverviewContent from "@/src/components/overview-content";
import AddTransactionModal from "@/src/components/add-transaction-modal";
import DateFilterModal from "@/src/components/date-filter-modal";

export interface Transaction {
  id: number;
  type: "sale" | "expense" | string;
  description: string;
  customer: string;
  category: string;
  amount: string;
  date: string;
  status: string;
}

const initialTransactions: Transaction[] = [
  {
    id: 1,
    type: "sale",
    description: "Sofa Chesterfield 3-Seater (Velvet Emerald)",
    customer: "Bpk. Ronald Pangemanan - Malalayang",
    category: "Sofa Sale",
    amount: "Rp 8.500.000",
    date: "Oct 28, 2026",
    status: "Completed",
  },
  {
    id: 2,
    type: "sale",
    description: "Sofa L-Shape Scandinavian (Beige Grey)",
    customer: "Ibu Grace Wowor - Wanea",
    category: "Sofa Sale",
    amount: "Rp 12.800.000",
    date: "Oct 26, 2026",
    status: "Completed",
  },
  {
    id: 3,
    type: "expense",
    description: "High Density Royal Foam & Teak Framing Wood",
    customer: "PT Busa Indo Prima",
    category: "Raw Materials",
    amount: "Rp 6.450.000",
    date: "Oct 24, 2026",
    status: "Completed",
  },
  {
    id: 4,
    type: "sale",
    description: "Sofa Bed Minimalis Multifungsi (Dark Navy)",
    customer: "Bpk. Kevin Sumual - Winangun",
    category: "Sofa Sale",
    amount: "Rp 5.200.000",
    date: "Oct 22, 2026",
    status: "In Production",
  },
  {
    id: 5,
    type: "expense",
    description: "Workshop Monthly Electricity & Operational",
    customer: "PLN Suluttenggo",
    category: "Daily Operational",
    amount: "Rp 1.850.000",
    date: "Oct 20, 2026",
    status: "Completed",
  },
  {
    id: 6,
    type: "sale",
    description: "Sofa Recliner 1-Seater (Genuine Leather)",
    customer: "Ibu Meiske Lumentut - Tikala",
    category: "Custom Order",
    amount: "Rp 9.600.000",
    date: "Oct 18, 2026",
    status: "Completed",
  },
];

export default function Home() {
  const [activeWorkspaceItem, setActiveWorkspaceItem] = useState("Overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("Oct 1 – 31, 2026");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [canvasViewMode, setCanvasViewMode] = useState<"dashboard" | "blank">("dashboard");

  const handleAddTransaction = (newTx: Transaction) => {
    setTransactions((prev) => [newTx, ...prev]);
  };

  return (
    <div className="h-screen w-full flex bg-slate-50 text-slate-800 overflow-hidden">
      {/* 1. Left Sidebar Component - Stays fixed on the left */}
      <Sidebar
        activeItem={activeWorkspaceItem}
        onItemClick={(item: string) => setActiveWorkspaceItem(item)}
      />

      {/* Main Column - Full viewport height flex column */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        {/* 2. Top Header Navigation Bar Component - Stays fixed at the top */}
        <Topbar
          workspaceName="Workspace"
          currentPage={activeWorkspaceItem}
          onSearch={(query: string) => setSearchQuery(query)}
        />

        {/* 3. Moving / Scrollable Area - ONLY this section scrolls */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 flex flex-col">
          {/* Overview Page Header Component */}
          <OverviewHeader
            title="Business overview"
            dateRange={dateRange}
            onDateClick={() => setIsDateModalOpen(true)}
            onAddTransactionClick={() => setIsAddModalOpen(true)}
          />

          {/* View Mode Switcher */}
          <div className="px-8 pt-4 pb-2 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-medium text-slate-600">View mode:</span>
              <div className="inline-flex rounded-lg bg-slate-200/70 p-0.5">
                <button
                  type="button"
                  onClick={() => setCanvasViewMode("dashboard")}
                  className={`px-2.5 py-1 rounded-md font-medium text-xs transition-all cursor-pointer ${
                    canvasViewMode === "dashboard"
                      ? "bg-white text-slate-800 shadow-2xs font-semibold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Full Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => setCanvasViewMode("blank")}
                  className={`px-2.5 py-1 rounded-md font-medium text-xs transition-all cursor-pointer ${
                    canvasViewMode === "blank"
                      ? "bg-white text-slate-800 shadow-2xs font-semibold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Blank Canvas (Screenshot Mode)
                </button>
              </div>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Duta Sofa Manado &bull; Management Dashboard
            </span>
          </div>

          {/* 4. Main Overview Content */}
          <div className="flex-1">
            <OverviewContent
              transactions={transactions}
              searchQuery={searchQuery}
              isEmptyCanvas={canvasViewMode === "blank"}
            />
          </div>
        </main>
      </div>

      {/* 5. Add Transaction Modal Component */}
      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTransaction}
      />

      {/* 6. Date Range Selection Modal Component */}
      <DateFilterModal
        isOpen={isDateModalOpen}
        onClose={() => setIsDateModalOpen(false)}
        selectedRange={dateRange}
        onSelect={(range: string) => setDateRange(range)}
      />
    </div>
  );
}
