import { prisma } from "@/lib/prisma";
import { ProductInput } from "@/lib/definitions";
import { slugify } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProductWithCategory = Awaited<
  ReturnType<typeof getProducts>
>["products"][number];

export type ProductFilters = {
  categorySlug?: string;
  search?: string;
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
};

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function getProducts(filters: ProductFilters = {}) {
  const {
    categorySlug,
    search,
    featured,
    minPrice,
    maxPrice,
    page = 1,
    limit = 12,
  } = filters;

  const where = {
    ...(categorySlug && {
      category: { slug: categorySlug },
    }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" as const } },
        { description: { contains: search, mode: "insensitive" as const } },
      ],
    }),
    ...(featured !== undefined && { featured }),
    ...(minPrice !== undefined || maxPrice !== undefined
      ? {
          price: {
            ...(minPrice !== undefined && { gte: minPrice }),
            ...(maxPrice !== undefined && { lte: maxPrice }),
          },
        }
      : {}),
    stock: { gt: 0 },
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products,
    total,
    pages: Math.ceil(total / limit),
    page,
  };
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
}

export async function getFeaturedProducts(limit = 4) {
  return prisma.product.findMany({
    where: { featured: true, stock: { gt: 0 } },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function getRelatedProducts(categoryId: string, excludeId: string, limit = 4) {
  return prisma.product.findMany({
    where: {
      categoryId,
      id: { not: excludeId },
      stock: { gt: 0 },
    },
    include: { category: true },
    take: limit,
  });
}

// ─── Admin mutations ──────────────────────────────────────────────────────────

export async function createProduct(data: ProductInput) {
  const slug = slugify(data.name);

  // Ensure slug is unique
  const existing = await prisma.product.findUnique({ where: { slug } });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  return prisma.product.create({
    data: {
      ...data,
      slug: finalSlug,
      price: data.price,
    },
    include: { category: true },
  });
}

export async function updateProduct(id: string, data: Partial<ProductInput>) {
  const updateData: Record<string, unknown> = { ...data };

  if (data.name) {
    updateData.slug = slugify(data.name);
  }

  return prisma.product.update({
    where: { id },
    data: updateData,
    include: { category: true },
  });
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({ where: { id } });
}

export async function updateProductStock(id: string, quantity: number) {
  return prisma.product.update({
    where: { id },
    data: { stock: { decrement: quantity } },
  });
}
