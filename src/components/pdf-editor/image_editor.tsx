import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { X, Upload } from "lucide-react";
import { PdfElement } from "@/pages/tools/edit_pdf/edit_pdf";

interface ImageEditorProps {
  element: PdfElement;
  onUpdate: (element: PdfElement) => void;
  onClose: () => void;
}

export const ImageEditor = ({
  element,
  onUpdate,
  onClose,
}: ImageEditorProps) => {
  const [width, setWidth] = useState(element.size.width);
  const [height, setHeight] = useState(element.size.height);
  const [opacity, setOpacity] = useState(element.style?.opacity || 1);
  const [rotation, setRotation] = useState(element.style?.rotation || 0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        const updatedElement: PdfElement = {
          ...element,
          content: imageUrl,
        };
        onUpdate(updatedElement);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedElement: PdfElement = {
      ...element,
      size: { width, height },
      style: {
        ...element.style,
        opacity,
        rotation,
      },
    };
    onUpdate(updatedElement);
  };

  return (
    <div className="bg-background dark:bg-primary p-4 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Edit Image</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-center">
          <div
            className="border rounded overflow-hidden max-w-xs"
            style={{
              width: `${width}px`,
              height: `${height}px`,
              opacity,
              transform: `rotate(${rotation}deg)`,
            }}
          >
            {element.content.startsWith("data:") ? (
              <img
                src={element.content}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <span>No image</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <Label>Replace Image</Label>
          <div className="mt-1">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload New Image
            </Button>
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="image-width">Width (px)</Label>
            <Input
              id="image-width"
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="image-height">Height (px)</Label>
            <Input
              id="image-height"
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="image-opacity">
            Opacity: {Math.round(opacity * 100)}%
          </Label>
          <Slider
            id="image-opacity"
            min={0}
            max={1}
            step={0.01}
            value={[opacity]}
            onValueChange={(value) => setOpacity(value[0])}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="image-rotation">Rotation: {rotation}°</Label>
          <Slider
            id="image-rotation"
            min={-180}
            max={180}
            step={1}
            value={[rotation]}
            onValueChange={(value) => setRotation(value[0])}
            className="mt-2"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};
