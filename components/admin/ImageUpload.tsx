"use client";

import React, { useState, useRef } from "react";
import { uploadImageAction } from "@/app/actions/upload";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  defaultValue?: string;
}

export function ImageUpload({ onUpload, defaultValue }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(defaultValue || null);
  const [isUploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadImageAction(formData);
      onUpload(result.url);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="relative aspect-video w-full rounded-2xl border-2 border-dashed border-outline-variant/20 hover:border-primary/50 transition-all cursor-pointer overflow-hidden group bg-surface-container/30 flex flex-col items-center justify-center"
      >
        {preview ? (
          <>
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
              <span className="text-white font-bold text-xs uppercase tracking-widest">Change Image</span>
            </div>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-4xl text-secondary/30 mb-2">add_photo_alternate</span>
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">Upload Product Image</span>
          </>
        )}
        
        {isUploading && (
          <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Uploading...</span>
            </div>
          </div>
        )}
      </div>
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
      
      <p className="text-[10px] text-secondary font-medium italic opacity-60 px-1">
        Supports JPG, PNG, WEBP. Max size 5MB.
      </p>
    </div>
  );
}
