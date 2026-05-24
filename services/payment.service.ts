import { prisma } from "@/lib/prisma";
import { PaymentStatus } from "@/app/generated/prisma";

export async function createPayment(data: {
  orderId: string;
  amount: number;
  method: string;
  status?: PaymentStatus;
  transactionId?: string;
}) {
  return prisma.payment.create({
    data: {
      ...data,
      status: data.status || "PENDING",
    },
  });
}

export async function updatePaymentStatus(
  orderId: string,
  status: PaymentStatus,
  transactionId?: string
) {
  return prisma.payment.update({
    where: { orderId },
    data: {
      status,
      transactionId,
    },
  });
}

export async function getPaymentByOrder(orderId: string) {
  return prisma.payment.findUnique({
    where: { orderId },
  });
}
