"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { fetchUserImages } from "@/lib/data";
import { Images } from "@/lib/data";
import JsonEditor from "@/components/core/json-editor";

import jsonData from "@/public/json/extracted_data_1.json";

export default function Dashboard() {
  const { userId } = useAuth();
  const [images, setImages] = useState<Images[]>([]);
  const [jsonContent, setJsonContent] = useState<string>(
    JSON.stringify(jsonData, null, 2)
  );
  const [editingJson, setEditingJson] = useState<boolean>(false);
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);

  const imageUrl =
    "C:/Users/Daryl/Documents/projects/EigenGram/ocr-dashboard/public/img/handwritten_note_1.png";

  useEffect(() => {
    const getUserImages = async () => {
      if (userId) {
        try {
          const userImages = await fetchUserImages(userId);
          setImages(userImages);
        } catch (error) {
          console.error("Failed to fetch user images:", error);
        }
      }
    };
    getUserImages();
  }, [userId]);

  // const handleDelete = async (imageId: number) => {
  //   try {
  //     await deleteImage(imageId);
  //     setImages(images.filter((image) => image.user_id !== imageId));
  //   } catch (error) {
  //     console.error("Failed to delete image:", error);
  //   }
  // };

  // const handleEdit = async (image: Images) => {
  //   try {
  //     const response = await fetch(image.json_url!);
  //     const data = await response.json();
  //     setJsonContent(JSON.stringify(data, null, 2));
  //     setEditingJson(image);
  //   } catch (error) {
  //     console.error("Failed to load JSON file:", error);
  //   }
  // };

  // const handleSave = async (updatedJson: string) => {
  //   if (editingJson) {
  //     try {
  //       await fetch("/api/save-json", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           filePath: editingJson.json_url,
  //           content: updatedJson,
  //         }),
  //       });
  //       setEditingJson(null);
  //       setJsonContent("");
  //     } catch (error) {
  //       console.error("Failed to save JSON file:", error);
  //     }
  //   }
  // };

  const handleEdit = () => {
    setEditingJson(true);
  };

  const handleSave = (updatedJson: string) => {
    console.log("Updated JSON:", updatedJson);
    setJsonContent(updatedJson);
    setEditingJson(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">OCR Dashboard</h1>
            </div>
            <div className="flex items-center">
              {/* Add user menu/logout button here */}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Your Saved Images</h2>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Confidence</TableCell>
                <TableCell>Json URL</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {images.map((image) => (
                <TableRow key={image.user_id}>
                  <TableCell>{image.image_url}</TableCell>
                  <TableCell>
                    {image.confidence_score !== null
                      ? `${image.confidence_score}%`
                      : "N/A"}
                  </TableCell>
                  <TableCell>{image.json_url}</TableCell>
                  <TableCell>
                    <Button variant="secondary" onClick={handleEdit}>
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      // onClick={() => handleDelete(image.user_id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {editingJson && (
            <JsonEditor
              initialJson={jsonContent}
              imageUrl={imageUrl}
              onSave={handleSave}
              onCancel={() => setEditingJson(false)}
            />
          )}

          {/* TODO: Implement pagination controls */}
        </div>
      </main>
    </div>
  );
}
