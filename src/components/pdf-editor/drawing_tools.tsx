import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { X, Trash2 } from "lucide-react";
import { PdfElement } from "@/pages/tools/edit_pdf/edit_pdf";

interface DrawingToolsProps {
  element: PdfElement;
  onUpdate: (element: PdfElement) => void;
  onClose: () => void;
}

export const DrawingTools = ({
  element,
  onUpdate,
  onClose,
}: DrawingToolsProps) => {
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [fillColor, setFillColor] = useState("#ffffff");
  const [opacity, setOpacity] = useState(1);

  const handleSave = () => {
    const updatedElement: PdfElement = {
      ...element,
      style: {
        ...element.style,
        strokeWidth,
        strokeColor,
        fillColor,
        opacity,
      },
    };
    onUpdate(updatedElement);
  };

  const handleDelete = () => {
    // This would be handled by the parent component
    onClose();
  };

  return (
    <div className="bg-background dark:bg-primary p-4 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Drawing Tools</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleDelete}>
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="stroke-width">Stroke Width: {strokeWidth}px</Label>
          <Slider
            id="stroke-width"
            min={1}
            max={20}
            step={1}
            value={[strokeWidth]}
            onValueChange={(value) => setStrokeWidth(value[0])}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="stroke-color">Stroke Color</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input
              id="stroke-color"
              type="color"
              value={strokeColor}
              onChange={(e) => setStrokeColor(e.target.value)}
              className="w-10 h-10 p-0 border-0"
            />
            <Input
              value={strokeColor}
              onChange={(e) => setStrokeColor(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="fill-color">Fill Color</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input
              id="fill-color"
              type="color"
              value={fillColor}
              onChange={(e) => setFillColor(e.target.value)}
              className="w-10 h-10 p-0 border-0"
            />
            <Input
              value={fillColor}
              onChange={(e) => setFillColor(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="drawing-opacity">
            Opacity: {Math.round(opacity * 100)}%
          </Label>
          <Slider
            id="drawing-opacity"
            min={0}
            max={1}
            step={0.01}
            value={[opacity]}
            onValueChange={(value) => setOpacity(value[0])}
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
