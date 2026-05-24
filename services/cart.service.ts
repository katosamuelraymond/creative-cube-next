import { prisma } from "@/lib/prisma";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CartWithItems = Awaited<ReturnType<typeof getCartByUser>>;

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function getCartByUser(userId: string) {
  return prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
              price: true,
              images: true,
              stock: true,
            },
          },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export async function addToCart(userId: string, productId: string, quantity = 1) {
  // Upsert cart (create if not exists)
  const cart = await prisma.cart.upsert({
    where: { userId },
    create: { userId },
    update: {},
  });

  // Upsert cart item (increment quantity if exists)
  return prisma.cartItem.upsert({
    where: { cartId_productId: { cartId: cart.id, productId } },
    create: { cartId: cart.id, productId, quantity },
    update: { quantity: { increment: quantity } },
    include: { product: true },
  });
}

export async function updateCartItemQuantity(
  userId: string,
  productId: string,
  quantity: number
) {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) return null;

  if (quantity <= 0) {
    return removeFromCart(userId, productId);
  }

  return prisma.cartItem.update({
    where: { cartId_productId: { cartId: cart.id, productId } },
    data: { quantity },
    include: { product: true },
  });
}

export async function removeFromCart(userId: string, productId: string) {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) return null;

  return prisma.cartItem.delete({
    where: { cartId_productId: { cartId: cart.id, productId } },
  });
}

export async function clearCart(userId: string) {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) return;

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
}

export async function getCartItemCount(userId: string): Promise<number> {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { select: { quantity: true } } },
  });

  if (!cart) return 0;
  return cart.items.reduce((sum, item) => sum + item.quantity, 0);
}
