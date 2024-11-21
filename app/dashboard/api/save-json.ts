import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { filePath, content } = req.body;

    if (!filePath || !content) {
      return res.status(400).json({ error: "Missing file path or content" });
    }

    const absolutePath = path.join(process.cwd(), "public", filePath);

    try {
      fs.writeFileSync(absolutePath, content, "utf-8");
      res.status(200).json({ message: "File saved successfully" });
    } catch (error) {
      console.error("Failed to save file:", error);
      res.status(500).json({ error: "Failed to save file" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
