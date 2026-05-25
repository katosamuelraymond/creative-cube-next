"use client";

import { useActionState, useState } from "react";
import { ProductWithCategory } from "@/services/product.service";
import { ActionState } from "@/lib/definitions";
import { createProductAction, updateProductAction } from "@/app/actions/admin";
import { ImageUpload } from "./ImageUpload";

interface ProductFormProps {
  product?: ProductWithCategory | any;
  categories: { id: string; name: string }[];
}

export default function ProductForm({ product, categories }: ProductFormProps) {
  const isEdit = !!product;
  const actionWithId = isEdit ? updateProductAction.bind(null, product.id) : createProductAction;
  const [state, action, isPending] = useActionState(actionWithId, undefined);
  
  // Manage image URLs locally
  const [imageUrls, setImageUrls] = useState<string[]>(product?.images || []);

  const handleImageUpload = (url: string) => {
    setImageUrls([...imageUrls, url]);
  };

  const removeImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  return (
    <form action={action} className="space-y-8 max-w-5xl animate-fade-in-up pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Core Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-premium border border-outline-variant/5 space-y-6">
            <h3 className="font-bold text-on-surface uppercase tracking-widest text-xs mb-4">General Information</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary uppercase tracking-widest ml-1">Product Name</label>
              <input
                name="name"
                defaultValue={product?.name}
                placeholder="e.g. Aria Accent Chair"
                className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium"
              />
              {state?.errors?.name && <p className="text-xs text-error font-bold mt-1 ml-1">{state.errors.name[0]}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary uppercase tracking-widest ml-1">Description</label>
              <textarea
                name="description"
                defaultValue={product?.description}
                rows={6}
                placeholder="Describe the product details..."
                className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium resize-none"
              />
              {state?.errors?.description && <p className="text-xs text-error font-bold mt-1 ml-1">{state.errors.description[0]}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] ml-1">Selling Price ($)</label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={product?.price?.toString()}
                  className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium"
                />
                {state?.errors?.price && <p className="text-xs text-error font-bold mt-1 ml-1">{state.errors.price[0]}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] ml-1">Buying Price ($)</label>
                <input
                  name="costPrice"
                  type="number"
                  step="0.01"
                  defaultValue={product?.costPrice?.toString() || "0.00"}
                  className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium"
                />
                {state?.errors?.costPrice && <p className="text-xs text-error font-bold mt-1 ml-1">{state.errors.costPrice[0]}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] ml-1">Current Stock</label>
                <input
                  name="stock"
                  type="number"
                  defaultValue={product?.stock}
                  className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium"
                />
                {state?.errors?.stock && <p className="text-xs text-error font-bold mt-1 ml-1">{state.errors.stock[0]}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Category & Images */}
        <div className="space-y-6">
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-premium border border-outline-variant/5 space-y-6">
            <h3 className="font-bold text-on-surface uppercase tracking-widest text-xs mb-4">Organization</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary uppercase tracking-widest ml-1">Category</label>
              <select
                name="categoryId"
                defaultValue={product?.categoryId}
                className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium appearance-none"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                defaultChecked={product?.featured}
                className="w-5 h-5 rounded border-outline-variant/20 text-primary focus:ring-primary"
              />
              <label htmlFor="featured" className="text-sm font-bold text-secondary uppercase tracking-widest cursor-pointer">
                Featured Product
              </label>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-premium border border-outline-variant/5 space-y-6">
            <h3 className="font-bold text-on-surface uppercase tracking-widest text-xs mb-4">Product Media</h3>
            
            <ImageUpload onUpload={handleImageUpload} />
            
            {/* Image List */}
            <div className="space-y-3">
              {imageUrls.map((url, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 bg-surface-container rounded-xl border border-outline-variant/10">
                  <img src={url} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  <span className="text-[10px] font-bold text-secondary truncate flex-1">Image {idx + 1}</span>
                  <button 
                    type="button" 
                    onClick={() => removeImage(idx)}
                    className="w-8 h-8 flex items-center justify-center text-error hover:bg-error/10 rounded-lg transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                  <input type="hidden" name="images" value={url} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 px-8 py-4 bg-primary text-white font-bold text-[11px] uppercase tracking-widest rounded-2xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {isPending ? "Saving changes..." : isEdit ? "Update Product Listing" : "Publish Product Listing"}
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-8 py-4 bg-surface-container text-secondary font-bold text-[11px] uppercase tracking-widest rounded-2xl hover:bg-outline-variant/10 transition-all"
        >
          Discard
        </button>
      </div>
      {state?.message && <p className="text-center text-sm font-bold text-error mt-4">{state.message}</p>}
    </form>
  );
}
