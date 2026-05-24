import { getProductById, getRelatedProducts } from "@/services/product.service";
import ProductDetailsClient from "@/components/ProductDetailsClient";
import { notFound } from "next/navigation";

interface ProductData {
  id: string;
  name: string;
  category: { name: string } | string;
  price: string;
  image: string;
  categoryId?: string;
}

// Mock data fallback for demo
const mockProducts: ProductData[] = [
  {
    id: "1",
    name: "Nordic Ash Armchair",
    category: "Scandinavian Living",
    price: "499",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "2",
    name: "Crescent Marble Table",
    category: "Modern Minimalist",
    price: "350",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    name: "Onyx Triple Head Lamp",
    category: "Lighting & Ambiance",
    price: "189",
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "4",
    name: "Echo Geometric Rug",
    category: "Hand-tufted Textiles",
    price: "620",
    image: "https://images.unsplash.com/photo-1531835597960-697aa9ca9063?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "9",
    name: "Walnut Sideboard",
    category: "Storage",
    price: "1200",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "5",
    name: "Ethereal Glass Vase",
    category: "Home Décor",
    price: "120",
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "6",
    name: "Velvet Accent Chair",
    category: "Seating",
    price: "340",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "7",
    name: "Minimalist Oak Desk",
    category: "Office",
    price: "850",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "8",
    name: "Industrial Wall Clock",
    category: "Accessories",
    price: "85",
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&q=80&w=800",
  }
];

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Try real database first
  const dbProduct = await getProductById(id);

  // Prepare product data (with fallback for demo)
  let product: ProductData | null = null;

  if (dbProduct) {
    const category = (dbProduct as { category?: { name: string } }).category;
    product = {
      id: dbProduct.id,
      name: dbProduct.name,
      category: category?.name || "Product",
      price: dbProduct.price.toString(),
      // Ensure image is valid or use fallback
      image: dbProduct.images?.[0]?.startsWith('http') ? dbProduct.images?.[0] : mockProducts[0].image

    };
  } else {
    // Check mock data for demo
    product = mockProducts.find(p => p.id === id) || null;
  }

  if (!product) {
    notFound();
  }

  // Get related products (expanded to 8 as requested)
  const dbRelated = await getRelatedProducts(
    dbProduct?.categoryId || "default",
    product.id,
    8
  );

  const relatedProducts: ProductData[] = dbRelated.length > 0
    ? dbRelated.map(p => {
      const cat = (p as { category?: { name: string } }).category;
      return {
        id: p.id,
        name: p.name,
        category: cat?.name || "Product",
        price: p.price.toString(),
        image: p.images?.[0]?.startsWith('http') ? p.images?.[0] : mockProducts[1].image
      };
    })
    : mockProducts.filter(p => p.id !== product?.id).slice(0, 8);

  return (
    <ProductDetailsClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
