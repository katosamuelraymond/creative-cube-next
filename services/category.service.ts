import { prisma } from "@/lib/prisma";

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: { _count: { select: { products: true } } },
  });
}

export async function getCategoryById(id: string) {
  return prisma.category.findUnique({ where: { id } });
}

// ─── Admin mutations ──────────────────────────────────────────────────────────

export async function createCategory(data: {
  name: string;
  slug: string;
  imageUrl?: string;
}) {
  return prisma.category.create({ data });
}

export async function updateCategory(
  id: string,
  data: { name?: string; slug?: string; imageUrl?: string }
) {
  return prisma.category.update({ where: { id }, data });
}

export async function deleteCategory(id: string) {
  return prisma.category.delete({ where: { id } });
}
