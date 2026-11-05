"use client";

import React, { useState } from "react";
import { X, Plus, DollarSign, Tag, User, Calendar } from "lucide-react";

export default function AddTransactionModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    type: "sale",
    description: "",
    customer: "",
    category: "Sofa Sale",
    amount: "",
    date: "Oct 28, 2026",
    status: "Completed",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    const formattedAmount = Number(
      formData.amount.replace(/[^0-9]/g, "")
    ).toLocaleString("id-ID");

    onAdd({
      id: Date.now(),
      type: formData.type,
      description: formData.description,
      customer: formData.customer || "General Customer",
      category: formData.category,
      amount: `Rp ${formattedAmount}`,
      date: formData.date,
      status: formData.status,
    });

    // Reset form
    setFormData({
      type: "sale",
      description: "",
      customer: "",
      category: "Sofa Sale",
      amount: "",
      date: "Oct 28, 2026",
      status: "Completed",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-slate-800 text-lg">
              Add New Transaction
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Type Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    type: "sale",
                    category: "Sofa Sale",
                  })
                }
                className={`py-2 px-4 rounded-lg text-sm font-medium border text-center transition-all cursor-pointer ${
                  formData.type === "sale"
                    ? "border-emerald-600 bg-emerald-50/60 text-emerald-700 font-semibold"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                Sale (Income)
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    type: "expense",
                    category: "Raw Materials",
                  })
                }
                className={`py-2 px-4 rounded-lg text-sm font-medium border text-center transition-all cursor-pointer ${
                  formData.type === "expense"
                    ? "border-amber-600 bg-amber-50/60 text-amber-700 font-semibold"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                Expense (Cost)
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Item / Description
            </label>
            <div className="relative">
              <Tag className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                required
                placeholder={
                  formData.type === "sale"
                    ? "e.g., Sofa Chesterfield 3-Seater"
                    : "e.g., High Density Foam & Wood"
                }
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          {/* Customer / Vendor */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              {formData.type === "sale" ? "Customer Name" : "Vendor / Supplier"}
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder={
                  formData.type === "sale"
                    ? "e.g., Bpk. Hendra - Malalayang"
                    : "e.g., PT Busa Nusantara"
                }
                value={formData.customer}
                onChange={(e) =>
                  setFormData({ ...formData, customer: e.target.value })
                }
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Amount */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Amount (Rp)
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. 7500000"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-white"
              >
                {formData.type === "sale" ? (
                  <>
                    <option value="Sofa Sale">Sofa Sale</option>
                    <option value="Custom Order">Custom Order</option>
                    <option value="Sofa Reupholstery">Sofa Reupholstery</option>
                    <option value="Accessories">Accessories</option>
                  </>
                ) : (
                  <>
                    <option value="Raw Materials">Raw Materials</option>
                    <option value="Daily Operational">Daily Operational</option>
                    <option value="Delivery / Fuel">Delivery / Fuel</option>
                    <option value="Workshop Tools">Workshop Tools</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-white"
              >
                <option value="Completed">Completed</option>
                <option value="In Production">In Production</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-[#0f766e] hover:bg-[#0d6861] rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

