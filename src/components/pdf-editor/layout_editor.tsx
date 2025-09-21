import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  X,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import { PdfElement } from "@/pages/tools/edit_pdf/edit_pdf";

interface LayoutEditorProps {
  elements: PdfElement[];
  onUpdate: (elements: PdfElement[]) => void;
  onClose: () => void;
}

export const LayoutEditor = ({
  elements,
  onUpdate,
  onClose,
}: LayoutEditorProps) => {
  const [selectedElements, setSelectedElements] = useState<string[]>([]);

  const handleElementSelect = (id: string) => {
    if (selectedElements.includes(id)) {
      setSelectedElements(selectedElements.filter((elId) => elId !== id));
    } else {
      setSelectedElements([...selectedElements, id]);
    }
  };

  const handleAlign = (
    alignment: "left" | "center" | "right" | "top" | "middle" | "bottom"
  ) => {
    if (selectedElements.length < 2) return;

    const selected = elements.filter((el) => selectedElements.includes(el.id));
    if (selected.length < 2) return;

    let referenceValue: number;
    let updatedElements = [...elements];

    switch (alignment) {
      case "left":
        referenceValue = Math.min(...selected.map((el) => el.position.x));
        updatedElements = elements.map((el) => {
          if (selectedElements.includes(el.id)) {
            return { ...el, position: { ...el.position, x: referenceValue } };
          }
          return el;
        });
        break;

      case "center":
        referenceValue =
          selected.reduce(
            (sum, el) => sum + el.position.x + el.size.width / 2,
            0
          ) / selected.length;
        updatedElements = elements.map((el) => {
          if (selectedElements.includes(el.id)) {
            return {
              ...el,
              position: {
                ...el.position,
                x: referenceValue - el.size.width / 2,
              },
            };
          }
          return el;
        });
        break;

      case "right":
        referenceValue = Math.max(
          ...selected.map((el) => el.position.x + el.size.width)
        );
        updatedElements = elements.map((el) => {
          if (selectedElements.includes(el.id)) {
            return {
              ...el,
              position: { ...el.position, x: referenceValue - el.size.width },
            };
          }
          return el;
        });
        break;

      case "top":
        referenceValue = Math.min(...selected.map((el) => el.position.y));
        updatedElements = elements.map((el) => {
          if (selectedElements.includes(el.id)) {
            return { ...el, position: { ...el.position, y: referenceValue } };
          }
          return el;
        });
        break;

      case "middle":
        referenceValue =
          selected.reduce(
            (sum, el) => sum + el.position.y + el.size.height / 2,
            0
          ) / selected.length;
        updatedElements = elements.map((el) => {
          if (selectedElements.includes(el.id)) {
            return {
              ...el,
              position: {
                ...el.position,
                y: referenceValue - el.size.height / 2,
              },
            };
          }
          return el;
        });
        break;

      case "bottom":
        referenceValue = Math.max(
          ...selected.map((el) => el.position.y + el.size.height)
        );
        updatedElements = elements.map((el) => {
          if (selectedElements.includes(el.id)) {
            return {
              ...el,
              position: { ...el.position, y: referenceValue - el.size.height },
            };
          }
          return el;
        });
        break;
    }

    onUpdate(updatedElements);
  };

  const handleDistribute = (direction: "horizontal" | "vertical") => {
    if (selectedElements.length < 3) return;

    const selected = elements.filter((el) => selectedElements.includes(el.id));
    if (selected.length < 3) return;

    let sortedElements: PdfElement[];
    let updatedElements = [...elements];

    if (direction === "horizontal") {
      sortedElements = [...selected].sort(
        (a, b) => a.position.x - b.position.x
      );
      const firstX = sortedElements[0].position.x;
      const lastX =
        sortedElements[sortedElements.length - 1].position.x +
        sortedElements[sortedElements.length - 1].size.width;
      const totalWidth = lastX - firstX;
      const spacing = totalWidth / (sortedElements.length - 1);

      sortedElements.forEach((el, index) => {
        const updatedEl = {
          ...el,
          position: {
            ...el.position,
            x: firstX + index * spacing - el.size.width / 2,
          },
        };
        updatedElements = updatedElements.map((e) =>
          e.id === updatedEl.id ? updatedEl : e
        );
      });
    } else {
      sortedElements = [...selected].sort(
        (a, b) => a.position.y - b.position.y
      );
      const firstY = sortedElements[0].position.y;
      const lastY =
        sortedElements[sortedElements.length - 1].position.y +
        sortedElements[sortedElements.length - 1].size.height;
      const totalHeight = lastY - firstY;
      const spacing = totalHeight / (sortedElements.length - 1);

      sortedElements.forEach((el, index) => {
        const updatedEl = {
          ...el,
          position: {
            ...el.position,
            y: firstY + index * spacing - el.size.height / 2,
          },
        };
        updatedElements = updatedElements.map((e) =>
          e.id === updatedEl.id ? updatedEl : e
        );
      });
    }

    onUpdate(updatedElements);
  };

  return (
    <div className="bg-background dark:bg-primary p-4 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Layout Tools</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Select Elements to Arrange</Label>
          <div className="mt-2 grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border rounded">
            {elements.map((el) => (
              <div
                key={el.id}
                className={`flex items-center p-2 rounded cursor-pointer ${
                  selectedElements.includes(el.id)
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-muted"
                }`}
                onClick={() => handleElementSelect(el.id)}
              >
                <input
                  type="checkbox"
                  checked={selectedElements.includes(el.id)}
                  onChange={() => {}}
                  className="mr-2"
                />
                <span className="truncate text-sm">
                  {el.type === "text"
                    ? el.content.substring(0, 20) +
                      (el.content.length > 20 ? "..." : "")
                    : el.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Alignment</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              disabled={selectedElements.length < 2}
              onClick={() => handleAlign("left")}
            >
              <AlignLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={selectedElements.length < 2}
              onClick={() => handleAlign("center")}
            >
              <AlignCenter className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={selectedElements.length < 2}
              onClick={() => handleAlign("right")}
            >
              <AlignRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={selectedElements.length < 2}
              onClick={() => handleAlign("top")}
            >
                top
              {/* <AlignTop /className="w-4 h-4" /> */}
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={selectedElements.length < 2}
              onClick={() => handleAlign("middle")}
            >
                mid
              {/* <Alig className="w-4 h-4" /> */}
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={selectedElements.length < 2}
              onClick={() => handleAlign("bottom")}
            >
                ab
              {/* <AlignBottom className="w-4 h-4" /> */}
            </Button>
          </div>
        </div>

        <div>
          <Label>Distribution</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              disabled={selectedElements.length < 3}
              onClick={() => handleDistribute("horizontal")}
            >
              Horizontal
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={selectedElements.length < 3}
              onClick={() => handleDistribute("vertical")}
            >
              Vertical
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
