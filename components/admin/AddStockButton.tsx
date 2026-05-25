"use client";

import React, { useState } from "react";
import { addStockAction } from "@/app/actions/admin";

interface AddStockButtonProps {
  productId: string;
}

export function AddStockButton({ productId }: AddStockButtonProps) {
  const [isOpen, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isPending, setPending] = useState(false);

  const handleAdd = async () => {
    setPending(true);
    await addStockAction(productId, quantity);
    setPending(false);
    setOpen(false);
    setQuantity(1);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setOpen(!isOpen)}
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
        title="Quick Add Stock"
      >
        <span className="material-symbols-outlined text-lg">add_box</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full mb-3 right-0 w-48 bg-surface-container-lowest rounded-2xl shadow-premium border border-outline-variant/10 p-4 z-50 animate-scale-in origin-bottom-right">
          <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-3">Add Stock</p>
          <div className="flex gap-2 mb-4">
            <input 
              type="number" 
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full bg-surface-container border border-outline-variant/10 rounded-lg px-3 py-2 text-sm font-bold focus:ring-1 focus:ring-primary outline-none"
              min="1"
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleAdd}
              disabled={isPending}
              className="flex-1 py-2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-md hover:brightness-110 disabled:opacity-50"
            >
              {isPending ? "..." : "Add"}
            </button>
            <button 
              onClick={() => setOpen(false)}
              className="px-3 py-2 bg-surface-container text-secondary text-[10px] font-bold uppercase tracking-widest rounded-lg"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
