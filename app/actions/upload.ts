"use server";

import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function uploadImageAction(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${uuidv4()}-${file.name.replace(/\s+/g, "-")}`;
  const path = join(process.cwd(), "public", "uploads", filename);

  await writeFile(path, buffer);
  
  return {
    url: `/uploads/${filename}`,
  };
}
