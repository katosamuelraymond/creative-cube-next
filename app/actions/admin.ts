"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductSchema, ActionState } from "@/lib/definitions";
import { slugify } from "@/lib/utils";

// ─── Product Actions ──────────────────────────────────────────────────────────

export async function createProductAction(
  state: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    costPrice: formData.get("costPrice"),
    stock: formData.get("stock"),
    categoryId: formData.get("categoryId"),
    featured: formData.get("featured") === "on",
    images: formData.getAll("images") as string[],
  };

  const validated = ProductSchema.safeParse(raw);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors as Record<string, string[]>,
      message: "Please fix the errors below.",
    };
  }

  const { name, description, price, costPrice, stock, categoryId, images, featured } = validated.data;

  const slug = slugify(name);
  const existing = await prisma.product.findUnique({ where: { slug } });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  try {
    await prisma.product.create({
      data: {
        name,
        slug: finalSlug,
        description,
        price,
        costPrice,
        stock,
        categoryId,
        images,
        featured,
      },
    });
  } catch (error) {
    return { message: "Database Error: Failed to Create Product." };
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProductAction(
  id: string,
  state: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    costPrice: formData.get("costPrice"),
    stock: formData.get("stock"),
    categoryId: formData.get("categoryId"),
    featured: formData.get("featured") === "on",
    images: formData.getAll("images") as string[],
  };

  const validated = ProductSchema.safeParse(raw);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors as Record<string, string[]>,
      message: "Please fix the errors below.",
    };
  }

  const { name, description, price, costPrice, stock, categoryId, images, featured } = validated.data;

  try {
    await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        costPrice,
        stock,
        categoryId,
        images,
        featured,
      },
    });
  } catch (error) {
    return { message: "Database Error: Failed to Update Product." };
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProductAction(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    return { success: false, message: "Database Error: Failed to Delete Product." };
  }
}

export async function addStockAction(id: string, quantity: number) {
  try {
    await prisma.product.update({
      where: { id },
      data: { stock: { increment: quantity } },
    });
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    return { success: false, message: "Database Error: Failed to Add Stock." };
  }
}

// ─── Category Actions ─────────────────────────────────────────────────────────

export async function createCategoryAction(
  state: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = formData.get("name")?.toString() || "";
  const imageUrl = formData.get("imageUrl")?.toString() || "";

  if (!name) {
    return { errors: { name: ["Name is required"] }, message: "Validation failed." };
  }

  const slug = slugify(name);

  try {
    await prisma.category.create({
      data: { name, slug, imageUrl },
    });
  } catch (error) {
    return { message: "Database Error: Failed to Create Category." };
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function updateCategoryAction(
  id: string,
  state: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = formData.get("name")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();

  try {
    await prisma.category.update({
      where: { id },
      data: {
        ...(name && { name, slug: slugify(name) }),
        ...(imageUrl && { imageUrl }),
      },
    });
  } catch (error) {
    return { message: "Database Error: Failed to Update Category." };
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategoryAction(id: string) {
  try {
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    return { success: false, message: "Category may have products. Delete products first." };
  }
}
