import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { PdfElement } from "@/pages/tools/edit_pdf/edit_pdf";

interface TextEditorProps {
  element: PdfElement;
  onUpdate: (element: PdfElement) => void;
  onClose: () => void;
}

export const TextEditor = ({ element, onUpdate, onClose }: TextEditorProps) => {
  const [content, setContent] = useState(element.content);
  const [fontSize, setFontSize] = useState(element.style?.fontSize || 14);
  const [fontFamily, setFontFamily] = useState(
    element.style?.fontFamily || "Arial"
  );
  const [color, setColor] = useState(element.style?.color || "#000000");
  const [fontWeight, setFontWeight] = useState(
    element.style?.fontWeight || "normal"
  );
  const [fontStyle, setFontStyle] = useState(
    element.style?.fontStyle || "normal"
  );
  const [textDecoration, setTextDecoration] = useState(
    element.style?.textDecoration || "none"
  );
  // New: Position editing (optional, since dragging handles it)
  const [x, setX] = useState(element.x || 0);
  const [y, setY] = useState(element.y || 0);

  const handleSave = () => {
    const updatedElement: PdfElement = {
      ...element,
      content,
      x, // Updated position if manually edited
      y,
      style: {
        ...element.style,
        fontSize,
        fontFamily,
        color,
        fontWeight,
        fontStyle,
        textDecoration,
      },
    };
    onUpdate(updatedElement);
    onClose(); // Close after save
  };

  return (
    <div className="bg-background dark:bg-primary p-4 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Edit Text</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="text-content">Text Content</Label>
          <Input
            id="text-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1"
          />
        </div>

        {/* New: Position Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="position-x">X Position</Label>
            <Input
              id="position-x"
              type="number"
              value={x}
              onChange={(e) => setX(Number(e.target.value))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="position-y">Y Position</Label>
            <Input
              id="position-y"
              type="number"
              value={y}
              onChange={(e) => setY(Number(e.target.value))}
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="font-size">Font Size</Label>
            <Input
              id="font-size"
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="font-family">Font Family</Label>
            <Select value={fontFamily} onValueChange={setFontFamily}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Arial">Arial</SelectItem>
                <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                <SelectItem value="Courier New">Courier New</SelectItem>
                <SelectItem value="Georgia">Georgia</SelectItem>
                <SelectItem value="Verdana">Verdana</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="text-color">Text Color</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input
              id="text-color"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-10 h-10 p-0 border-0"
            />
            <Input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="font-weight">Font Weight</Label>
            <Select value={fontWeight} onValueChange={setFontWeight}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="bold">Bold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="font-style">Font Style</Label>
            <Select value={fontStyle} onValueChange={setFontStyle}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="italic">Italic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="text-decoration">Decoration</Label>
            <Select value={textDecoration} onValueChange={setTextDecoration}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="underline">Underline</SelectItem>
                <SelectItem value="line-through">Line Through</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
