import { prisma } from "@/lib/prisma";
import { CheckoutInput } from "@/lib/definitions";
import { updateProductStock } from "./product.service";

// ─── Types ────────────────────────────────────────────────────────────────────

export type OrderWithItems = Awaited<ReturnType<typeof getOrderById>>;

// ─── Customer queries ─────────────────────────────────────────────────────────

export async function getOrdersByUser(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: { product: { select: { name: true, images: true } } },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOrderById(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, email: true } },
      items: {
        include: {
          product: { select: { id: true, name: true, images: true, slug: true } },
        },
      },
      payment: true,
    },
  });
}

// ─── Admin queries ────────────────────────────────────────────────────────────

export async function getAllOrders(page = 1, limit = 20) {
  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      include: {
        user: { select: { name: true, email: true } },
        items: { select: { quantity: true } },
        payment: { select: { status: true, method: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.order.count(),
  ]);

  return { orders, total, pages: Math.ceil(total / limit) };
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export type CartItemForCheckout = {
  productId: string;
  quantity: number;
  price: number; // snapshot at purchase time
  name: string;
};

export async function createOrder(
  userId: string,
  address: CheckoutInput,
  items: CartItemForCheckout[],
  paymentMethod: string = "COD"
) {
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // Create order + items + payment in a transaction, decrement stock atomically
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        userId,
        total,
        address: address.address,
        city: address.city,
        postalCode: address.postalCode,
        country: address.country,
        notes: address.notes,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
        payment: {
          create: {
            amount: total,
            method: paymentMethod,
            status: paymentMethod === "COD" ? "PENDING" : "COMPLETED", // Simplified for now
          },
        },
      },
      include: { items: true, payment: true },
    });

    // Decrement stock for each item
    await Promise.all(
      items.map((item) =>
        tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        })
      )
    );

    return order;
  });
}

export async function updateOrderStatus(
  id: string,
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"
) {
  return prisma.order.update({ where: { id }, data: { status } });
}
