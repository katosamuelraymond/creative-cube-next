import CategoryForm from "@/components/admin/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-on-surface tracking-tight">Add New Category</h1>
        <p className="text-sm text-secondary font-medium mt-1">Organize your furniture collection</p>
      </div>

      <CategoryForm />
    </div>
  );
}
