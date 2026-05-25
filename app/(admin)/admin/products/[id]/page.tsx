import { notFound } from "next/navigation";
import { getProductById } from "@/services/product.service";
import { getCategories } from "@/services/category.service";
import ProductForm from "@/components/admin/ProductForm";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProductById(id),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-on-surface tracking-tight">Edit Product</h1>
        <p className="text-sm text-secondary font-medium mt-1">Update product details, pricing and inventory</p>
      </div>

      <ProductForm product={product} categories={categories} />
    </div>
  );
}
