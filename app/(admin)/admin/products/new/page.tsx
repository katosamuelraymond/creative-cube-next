import { getCategories } from "@/services/category.service";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-on-surface tracking-tight">Add New Product</h1>
        <p className="text-sm text-secondary font-medium mt-1">Fill in the details to list a new furniture piece</p>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
