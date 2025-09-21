import { Button } from "@/components/ui/button";
import {
  Text,
  Image,
  PenTool,
  Square,
  Layout,
  Save,
  ChevronLeft,
  ChevronRight,
  TextSelectIcon,
} from "lucide-react";

interface ToolbarProps {
  activeTool: "select" | "text" | "image" | "draw" | "shape" | "layout";
  setActiveTool: (
    tool: "select" | "text" | "image" | "draw" | "shape" | "layout"
  ) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  numPages: number;
  onSave: () => void;
}

export const Toolbar = ({
  activeTool,
  setActiveTool,
  currentPage,
  setCurrentPage,
  numPages,
  onSave,
}: ToolbarProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex justify-between items-center bg-background dark:bg-primary border-b">
      <div className="flex gap-2">
        <Button
          variant={activeTool === "select" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTool("select")}
        >
          <TextSelectIcon className="w-4 h-4 mr-2" />
          Select
        </Button>
        <Button
          variant={activeTool === "text" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTool("text")}
        >
          <Text className="w-4 h-4 mr-2" />
          Text
        </Button>
        <Button
          variant={activeTool === "image" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTool("image")}
        >
          <Image className="w-4 h-4 mr-2" />
          Image
        </Button>
        <Button
          variant={activeTool === "draw" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTool("draw")}
        >
          <PenTool className="w-4 h-4 mr-2" />
          Draw
        </Button>
        <Button
          variant={activeTool === "shape" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTool("shape")}
        >
          <Square className="w-4 h-4 mr-2" />
          Shape
        </Button>
        <Button
          variant={activeTool === "layout" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTool("layout")}
        >
          <Layout className="w-4 h-4 mr-2" />
          Layout
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {numPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= numPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <Button onClick={onSave} size="sm">
          <Save className="w-4 h-4 mr-2" />
          Save PDF
        </Button>
      </div>
    </div>
  );
};
