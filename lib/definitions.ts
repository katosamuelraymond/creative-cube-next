import * as z from "zod";

// ─── Auth schemas ─────────────────────────────────────────────────────────────

export const RegisterSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .trim(),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(1, { message: "Password is required." }).trim(),
});

// ─── Product schemas ──────────────────────────────────────────────────────────

export const ProductSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description too short." }),
  price: z.coerce.number().positive({ message: "Selling price must be positive." }),
  costPrice: z.coerce.number().positive({ message: "Buying price must be positive." }),
  stock: z.coerce.number().int().min(0, { message: "Stock cannot be negative." }),
  categoryId: z.string().min(1, { message: "Please select a category." }),
  images: z.array(z.string().url()).min(1, { message: "At least one image is required." }),
  featured: z.boolean().optional().default(false),
});

export const ReviewSchema = z.object({
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().min(10, { message: "Comment must be at least 10 characters." }).optional(),
  productId: z.string().min(1),
});

// ─── Order schemas ────────────────────────────────────────────────────────────

export const AddressSchema = z.object({
  street: z.string().min(5, { message: "Street is required." }),
  city: z.string().min(2, { message: "City is required." }),
  state: z.string().optional(),
  postalCode: z.string().min(3, { message: "Postal code is required." }),
  country: z.string().min(2, { message: "Country is required." }),
  isDefault: z.boolean().optional().default(false),
});

export const CheckoutSchema = z.object({
  address: z.string().min(5, { message: "Address is required." }),
  city: z.string().min(2, { message: "City is required." }),
  postalCode: z.string().min(3, { message: "Postal code is required." }),
  country: z.string().min(2, { message: "Country is required." }),
  notes: z.string().optional(),
  paymentMethod: z.string().default("COD"),
});

// ─── Inferred types ───────────────────────────────────────────────────────────

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type ProductInput = z.infer<typeof ProductSchema>;
export type ReviewInput = z.infer<typeof ReviewSchema>;
export type AddressInput = z.infer<typeof AddressSchema>;
export type CheckoutInput = z.infer<typeof CheckoutSchema>;

// ─── Action form state types ──────────────────────────────────────────────────

export type ActionState =
  | {
      errors?: Record<string, string[]>;
      message?: string;
      success?: boolean;
    }
  | undefined;

// ─── Session payload ──────────────────────────────────────────────────────────

export type SessionPayload = {
  userId: string;
  role: "CUSTOMER" | "ADMIN";
  expiresAt: Date;
};
