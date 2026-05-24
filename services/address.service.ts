import { prisma } from "@/lib/prisma";

export async function getUserAddresses(userId: string) {
  return prisma.address.findMany({
    where: { userId },
    orderBy: { isDefault: "desc" },
  });
}

export async function createAddress(data: {
  userId: string;
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}) {
  // If setting as default, unset other defaults
  if (data.isDefault) {
    await prisma.address.updateMany({
      where: { userId: data.userId, isDefault: true },
      data: { isDefault: false },
    });
  }

  return prisma.address.create({
    data,
  });
}

export async function deleteAddress(id: string, userId: string) {
  return prisma.address.delete({
    where: { id, userId },
  });
}

export async function setDefaultAddress(id: string, userId: string) {
  await prisma.address.updateMany({
    where: { userId, isDefault: true },
    data: { isDefault: false },
  });

  return prisma.address.update({
    where: { id, userId },
    data: { isDefault: true },
  });
}
