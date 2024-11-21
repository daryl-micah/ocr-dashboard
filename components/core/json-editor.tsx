import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface JsonEditorProps {
  initialJson: string;
  imageUrl: string;
  onSave: (updatedJson: string) => void;
  onCancel: () => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({
  initialJson,
  imageUrl,
  onSave,
  onCancel,
}) => {
  const [json, setJson] = useState<string>(initialJson);
  const handleSave = () => {
    onSave(json);
  };

  return (
    <div className="bg-white p-4 shadow-sm rounded-lg mt-4 flex">
      <div className="w-1/2 pr-4">
        <h3 className="text-lg font-medium mb-2">Image Preview</h3>
        <img
          src={imageUrl}
          alt="Preview"
          className="w-full h-auto object-cover rounded"
        />
      </div>
      <div className="w-1/2 pl-4">
        <h3 className="text-lg font-medium mb-2">Edit JSON</h3>
        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          rows={20}
          className="w-full p-2 border rounded-md"
        />
        <div className="flex justify-end mt-2">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="default" className="ml-2" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JsonEditor;
