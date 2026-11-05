"use client";

import React from "react";
import {
  TrendingUp,
  Armchair,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  PackageCheck,
} from "lucide-react";

export default function OverviewMetrics({ metrics }) {
  const defaultMetrics = [
    {
      title: "Total Revenue",
      value: "Rp 142.850.000",
      change: "+12.5%",
      isPositive: true,
      timeframe: "vs last month",
      icon: DollarSign,
      iconColor: "text-emerald-600 bg-emerald-50",
    },
    {
      title: "Sofa Sold",
      value: "38 Units",
      change: "+8.2%",
      isPositive: true,
      timeframe: "vs last month",
      icon: Armchair,
      iconColor: "text-teal-600 bg-teal-50",
    },
    {
      title: "Warehouse Stock",
      value: "54 Sofas",
      change: "4 Low stock",
      isPositive: false,
      timeframe: "ready for delivery",
      icon: PackageCheck,
      iconColor: "text-blue-600 bg-blue-50",
    },
    {
      title: "Operating Expenses",
      value: "Rp 34.200.000",
      change: "-3.4%",
      isPositive: true,
      timeframe: "within budget",
      icon: TrendingUp,
      iconColor: "text-amber-600 bg-amber-50",
    },
  ];

  const data = metrics || defaultMetrics;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {data.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-2xs hover:shadow-xs transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                {item.title}
              </span>
              <div className={`p-2 rounded-lg ${item.iconColor}`}>
                <Icon className="w-4 h-4" strokeWidth={2} />
              </div>
            </div>

            <div className="mt-3">
              <div className="text-2xl font-bold text-slate-800">
                {item.value}
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs">
                <span
                  className={`inline-flex items-center font-semibold ${
                    item.isPositive ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {item.isPositive ? (
                    <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                  )}
                  {item.change}
                </span>
                <span className="text-slate-400">{item.timeframe}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

