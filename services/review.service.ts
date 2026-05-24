import { prisma } from "@/lib/prisma";

export async function getReviewsByProduct(productId: string) {
  return prisma.review.findMany({
    where: { productId },
    include: {
      user: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function createReview(data: {
  userId: string;
  productId: string;
  rating: number;
  comment?: string;
}) {
  return prisma.review.create({
    data,
  });
}

export async function getProductRating(productId: string) {
  const result = await prisma.review.aggregate({
    where: { productId },
    _avg: { rating: true },
    _count: { rating: true },
  });

  return {
    average: result._avg.rating || 0,
    count: result._count.rating,
  };
}
