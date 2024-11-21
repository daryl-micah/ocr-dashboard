"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export type User = {
  user_id: string;
  name: string;
  email: string;
  organization: string | null;
};

export type Images = {
  user_id: string;
  image_url: string;
  json_url: string | null;
  edited_json_url: string | null;
  confidence_score: number | null;
  is_completed: number;
  created_at: Date;
  updated_at: Date;
};

export async function createUserInDB({
  userId,
  name,
  email,
}: {
  userId: string | null;
  name: string | null;
  email: any;
}) {
  try {
    const result =
      await sql` INSERT INTO users (user_id, name, email) VALUES (${userId}, ${name}, ${email}) ON CONFLICT (user_id) DO UPDATE SET name = EXCLUDED.name, email = EXCLUDED.email `;
    return result.rows[0];
  } catch (error) {
    console.error("Failed to store user info:", error);
    throw new Error("Failed to store user info.");
  }
}

export async function fetchUsers(email: string) {
  noStore();
  try {
    const result = await sql`
    SELECT user_id, name, email, organization
    FROM users
    WHERE email = ${email}`;

    return result.rows[0] || null;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function fetchUserImages(user_id: string): Promise<Images[]> {
  noStore();
  const data = await sql`
    SELECT * FROM images
    WHERE user_id = ${user_id}
    ORDER BY created_at DESC
    LIMIT 10`;

  return data.rows as Images[];
}

export async function deleteImage(imageId: number): Promise<void> {
  await sql` DELETE FROM images WHERE id = ${imageId} `;
}

// export async function updateImageStatus({
//   imageId,
//   isCompleted,
// }: {
//   imageId: number,
//   isCompleted?: number,
// }) {
//   try {
//   }
// }
