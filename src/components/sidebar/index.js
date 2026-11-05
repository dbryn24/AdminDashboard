"use client";

import React, { useState } from "react";
import {
  LayoutGrid,
  Package,
  Armchair,
  Receipt,
  Banknote,
  BarChart3,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";

export default function Sidebar({ activeItem = "Overview", onItemClick }) {
  const [expensesOpen, setExpensesOpen] = useState(true);
  const [selected, setSelected] = useState(activeItem);

  const handleSelect = (name) => {
    setSelected(name);
    if (onItemClick) onItemClick(name);
  };

  const navItems = [
    { name: "Overview", icon: LayoutGrid },
    { name: "Inventory", icon: Package },
    { name: "Sofa Stock", icon: Armchair },
    { name: "Sales", icon: Receipt },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 min-h-screen flex flex-col shrink-0 select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 gap-3 border-b border-slate-100">
        {/* Logo Badge */}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 via-emerald-500 to-amber-300 flex items-center justify-center shadow-xs">
          <div className="w-4 h-4 rounded-xs bg-white/90 flex items-center justify-center">
            <div className="w-2 h-2 rounded-xs bg-emerald-600" />
          </div>
        </div>
        {/* Brand Name */}
        <span className="font-semibold text-slate-800 text-[15px] tracking-tight">
          Duta Sofa Manado
        </span>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-4 space-y-6">
        <div>
          <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Workspace
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = selected === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => handleSelect(item.name)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#e8f7f0] text-[#139a6c]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon
                    className={`w-[18px] h-[18px] ${
                      isActive ? "text-[#139a6c]" : "text-slate-500"
                    }`}
                    strokeWidth={1.8}
                  />
                  <span>{item.name}</span>
                </button>
              );
            })}

            {/* Expenses with collapsible sub-items */}
            <div>
              <button
                onClick={() => {
                  setExpensesOpen(!expensesOpen);
                  handleSelect("Expenses");
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  selected === "Expenses"
                    ? "bg-[#e8f7f0] text-[#139a6c]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Banknote
                    className={`w-[18px] h-[18px] ${
                      selected === "Expenses"
                        ? "text-[#139a6c]"
                        : "text-slate-500"
                    }`}
                    strokeWidth={1.8}
                  />
                  <span>Expenses</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    expensesOpen ? "rotate-0" : "-rotate-90"
                  }`}
                  strokeWidth={2}
                />
              </button>

              {expensesOpen && (
                <div className="mt-1 ml-9 space-y-1 border-l-2 border-slate-100 pl-2">
                  <button
                    onClick={() => handleSelect("Daily expenses")}
                    className={`w-full text-left px-2 py-1.5 rounded-md text-[13px] transition-colors cursor-pointer ${
                      selected === "Daily expenses"
                        ? "text-[#139a6c] font-medium bg-emerald-50/50"
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    Daily expenses
                  </button>
                  <button
                    onClick={() => handleSelect("Monthly expenses")}
                    className={`w-full text-left px-2 py-1.5 rounded-md text-[13px] transition-colors cursor-pointer ${
                      selected === "Monthly expenses"
                        ? "text-[#139a6c] font-medium bg-emerald-50/50"
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    Monthly expenses
                  </button>
                </div>
              )}
            </div>

            {/* Reports */}
            <button
              onClick={() => handleSelect("Reports")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                selected === "Reports"
                  ? "bg-[#e8f7f0] text-[#139a6c]"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <BarChart3
                className={`w-[18px] h-[18px] ${
                  selected === "Reports" ? "text-[#139a6c]" : "text-slate-500"
                }`}
                strokeWidth={1.8}
              />
              <span>Reports</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Bottom Settings Link */}
      <div className="p-4 border-t border-slate-100">
        <button
          onClick={() => handleSelect("Settings")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            selected === "Settings"
              ? "bg-[#e8f7f0] text-[#139a6c]"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          <SlidersHorizontal
            className={`w-[18px] h-[18px] ${
              selected === "Settings" ? "text-[#139a6c]" : "text-slate-500"
            }`}
            strokeWidth={1.8}
          />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}

