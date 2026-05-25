"use client";

import { useActionState } from "react";
import { ActionState } from "@/lib/definitions";
import { createCategoryAction, updateCategoryAction } from "@/app/actions/admin";

interface CategoryFormProps {
  category?: { id: string; name: string; imageUrl?: string | null };
}

export default function CategoryForm({ category }: CategoryFormProps) {
  const isEdit = !!category;
  const actionWithId = isEdit ? updateCategoryAction.bind(null, category.id) : createCategoryAction;
  const [state, action, isPending] = useActionState(actionWithId, undefined);

  return (
    <form action={action} className="space-y-8 max-w-2xl animate-fade-in-up">
      <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-premium border border-outline-variant/5 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-secondary uppercase tracking-widest ml-1">Category Name</label>
          <input
            name="name"
            defaultValue={category?.name}
            placeholder="e.g. Living Room"
            className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium"
          />
          {state?.errors?.name && <p className="text-xs text-error font-bold mt-1 ml-1">{state.errors.name[0]}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-secondary uppercase tracking-widest ml-1">Image URL</label>
          <input
            name="imageUrl"
            defaultValue={category?.imageUrl || ""}
            placeholder="https://images.unsplash.com/..."
            className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 px-8 py-4 bg-primary text-white font-bold text-[11px] uppercase tracking-widest rounded-2xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {isPending ? "Saving..." : isEdit ? "Update Category" : "Create Category"}
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-8 py-4 bg-surface-container text-secondary font-bold text-[11px] uppercase tracking-widest rounded-2xl hover:bg-outline-variant/10 transition-all"
        >
          Cancel
        </button>
      </div>
      {state?.message && <p className="text-center text-sm font-bold text-error mt-4">{state.message}</p>}
    </form>
  );
}
