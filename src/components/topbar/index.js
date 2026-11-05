"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

export default function Topbar({
  workspaceName = "Workspace",
  currentPage = "Overview",
  onSearch,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };

  return (
    <header className="h-16 bg-[#139a6c] px-8 flex items-center justify-between text-white shadow-xs shrink-0 sticky top-0 z-20">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-emerald-100/90 font-normal hover:text-white transition-colors cursor-pointer">
          {workspaceName}
        </span>
        <span className="text-emerald-200/60 text-xs select-none">&gt;</span>
        <span className="text-white font-medium tracking-tight">
          {currentPage}
        </span>
      </div>

      {/* Search Input Bar */}
      <div className="relative w-64 md:w-72 lg:w-80">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" strokeWidth={2} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search anything..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-white text-slate-800 placeholder:text-slate-400 rounded-lg outline-none focus:ring-2 focus:ring-white/40 focus:bg-white shadow-xs transition-all"
        />
      </div>
    </header>
  );
}

