import { PrismaClient } from "@/app/generated/prisma";
import { slugify } from "../lib/utils";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Creative Cube database...");

  // ─── Categories ──────────────────────────────────────────────────────────────
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "chairs" },
      update: {},
      create: { name: "Chairs", slug: "chairs", imageUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400" },
    }),
    prisma.category.upsert({
      where: { slug: "tables" },
      update: {},
      create: { name: "Tables", slug: "tables", imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400" },
    }),
    prisma.category.upsert({
      where: { slug: "beds" },
      update: {},
      create: { name: "Beds", slug: "beds", imageUrl: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400" },
    }),
    prisma.category.upsert({
      where: { slug: "sofas" },
      update: {},
      create: { name: "Sofas", slug: "sofas", imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400" },
    }),
    prisma.category.upsert({
      where: { slug: "cabinets" },
      update: {},
      create: { name: "Cabinets", slug: "cabinets", imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400" },
    }),
  ]);

  const [chairs, tables, beds, sofas, cabinets] = categories;

  console.log(`✅ Created ${categories.length} categories`);

  // ─── Admin user ───────────────────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash("Admin@123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@creativecube.com" },
    update: {},
    create: {
      name: "Creative Cube Admin",
      email: "admin@creativecube.com",
      hashedPassword: adminPassword,
      role: "ADMIN",
    },
  });

  // ─── Demo customer ────────────────────────────────────────────────────────────
  const customerPassword = await bcrypt.hash("Customer@123", 10);
  await prisma.user.upsert({
    where: { email: "demo@creativecube.com" },
    update: {},
    create: {
      name: "Demo Customer",
      email: "demo@creativecube.com",
      hashedPassword: customerPassword,
      role: "CUSTOMER",
    },
  });

  console.log(`✅ Created admin and demo users`);

  // ─── Products ─────────────────────────────────────────────────────────────────
  const products = [
    {
      name: "Aria Accent Chair",
      description: "A stunning mid-century accent chair with solid walnut legs and premium boucle fabric upholstery. Perfect for reading nooks or living room corners.",
      price: 849.99,
      images: [
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800",
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800",
      ],
      stock: 15,
      featured: true,
      categoryId: chairs.id,
    },
    {
      name: "Nordic Dining Chair",
      description: "Minimalist Scandinavian design with solid oak frame and woven cord seat. Stack-able and lightweight.",
      price: 349.99,
      images: ["https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800"],
      stock: 40,
      featured: false,
      categoryId: chairs.id,
    },
    {
      name: "Ember Dining Table",
      description: "Hand-finished solid oak dining table with a live-edge top. Seats 6-8 people. Each piece is unique.",
      price: 2199.99,
      images: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
        "https://images.unsplash.com/photo-1583845112239-97ef1341b271?w=800",
      ],
      stock: 8,
      featured: true,
      categoryId: tables.id,
    },
    {
      name: "Marble Coffee Table",
      description: "Stunning Italian Carrara marble top with brushed brass legs. A statement piece for any living room.",
      price: 1299.99,
      images: ["https://images.unsplash.com/photo-1538688423619-a81d3f23454b?w=800"],
      stock: 12,
      featured: true,
      categoryId: tables.id,
    },
    {
      name: "Cloud Platform Bed",
      description: "Low-profile upholstered platform bed with a channelled headboard in premium performance velvet. Available in King and Queen.",
      price: 1899.99,
      images: [
        "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800",
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
      ],
      stock: 10,
      featured: true,
      categoryId: beds.id,
    },
    {
      name: "Walnut Storage Bed",
      description: "Mid-century modern bed frame in solid walnut with integrated under-bed storage drawers.",
      price: 2499.99,
      images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"],
      stock: 6,
      featured: false,
      categoryId: beds.id,
    },
    {
      name: "Haven 3-Seat Sofa",
      description: "Sink into our best-selling deep-seated sofa. Premium down-blend cushions, solid kiln-dried hardwood frame, removable covers.",
      price: 2999.99,
      images: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800",
      ],
      stock: 7,
      featured: true,
      categoryId: sofas.id,
    },
    {
      name: "Japandi Sideboard",
      description: "Japanese-Scandinavian inspired sideboard in matte black with rattan sliding doors. 3 compartments with adjustable shelves.",
      price: 1149.99,
      images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"],
      stock: 18,
      featured: false,
      categoryId: cabinets.id,
    },
  ];

  for (const product of products) {
    const slug = slugify(product.name);
    await prisma.product.upsert({
      where: { slug },
      update: {},
      create: { ...product, slug },
    });
  }

  console.log(`✅ Created ${products.length} products`);
  console.log("\n🎉 Database seeded successfully!\n");
  console.log("📧 Admin:    admin@creativecube.com / Admin@123");
  console.log("📧 Customer: demo@creativecube.com  / Customer@123\n");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
