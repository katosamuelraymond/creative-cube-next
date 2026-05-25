import { notFound } from "next/navigation";
import { getCategoryById } from "@/services/category.service";
import CategoryForm from "@/components/admin/CategoryForm";

interface EditCategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = await params;
  const category = await getCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-on-surface tracking-tight">Edit Category</h1>
        <p className="text-sm text-secondary font-medium mt-1">Update category name and branding</p>
      </div>

      <CategoryForm category={category} />
    </div>
  );
}
