import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Document, Page } from "react-pdf";
import { RotateCwIcon, XIcon } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import useToolsStore from "@/pages/tools/tools_store";
import PdfLoadingComponent from "./pdf_loading_component";

// Define the structure of a PDF page item
interface PageItem {
  id: string | number;
  pageNumber: number;
  rotate: number[];
}

interface DraggedItem {
  item: PageItem;
  index: number;
}

interface DraggableGridProps {
  items: PageItem[];
  className?: string;
  showCloseIcon?: boolean;
  label?: string;
  pageNumber?: "all" | "1";
  setItems: (fileIndex: number, items: PageItem[]) => void;
  file: string;
  scale?: number;
  selectedIndex: number;
  setNumPages: (fileIndex: number, numPages: number) => void;
  rotateIndividualPage: (fileIndex: number, pageIndex: number) => void;
  pagerotable?: boolean;
}

export default function DraggableGrid({
  items,
  setItems,
  scale = 1,
  selectedIndex,
  setNumPages,
  rotateIndividualPage,
  file,
  className,
  showCloseIcon = true,
  label = "PDF Document",
  pageNumber = "all",
  pagerotable = false,
}: DraggableGridProps) {
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const touchElementRef = useRef<HTMLElement | null>(null);
  const { selectedFiles, removeSelectedFiles, setRotateRight } =
    useToolsStore();

  useEffect(() => {
    console.log(selectedFiles[selectedIndex]?.pdfPages);
  }, [selectedFiles, selectedIndex]);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    item: PageItem,
    index: number
  ): void => {
    setDraggedItem({ item, index });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ): void => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragLeave = (): void => {
    setDragOverIndex(null);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    dropIndex: number
  ): void => {
    e.preventDefault();
    if (draggedItem && draggedItem.index !== dropIndex) {
      const newItems = [...items];
      const draggedItemData = newItems[draggedItem.index];
      newItems.splice(draggedItem.index, 1);
      const adjustedDropIndex =
        draggedItem.index < dropIndex ? dropIndex - 1 : dropIndex;
      newItems.splice(adjustedDropIndex, 0, draggedItemData);
      setItems(selectedIndex, newItems);
    }
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = (): void => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  // Touch event handlers for mobile
  const handleTouchStart = (
    e: React.TouchEvent<HTMLDivElement>,
    item: PageItem,
    index: number
  ): void => {
    e.preventDefault(); // Prevent default scrolling
    touchStartPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    setDraggedItem({ item, index });
    touchElementRef.current = e.currentTarget;
    e.currentTarget.style.opacity = "0.5";
    e.currentTarget.style.transform = "scale(0.95)";
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    e.preventDefault();
    if (!draggedItem || !touchStartPos.current) return;

    const touch = e.touches[0];
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
    const dropTarget = elements.find((el) =>
      el.classList.contains("draggable-page")
    );

    if (dropTarget) {
      const index = Number(dropTarget.getAttribute("data-index"));
      if (!isNaN(index) && index !== draggedItem.index) {
        setDragOverIndex(index);
      } else {
        setDragOverIndex(null);
      }
    } else {
      setDragOverIndex(null);
    }
  };

  const handleTouchEnd = (): void => {
    if (
      draggedItem &&
      dragOverIndex !== null &&
      draggedItem.index !== dragOverIndex
    ) {
      const newItems = [...items];
      const draggedItemData = newItems[draggedItem.index];
      newItems.splice(draggedItem.index, 1);
      const adjustedDropIndex =
        draggedItem.index < dragOverIndex ? dragOverIndex - 1 : dragOverIndex;
      newItems.splice(adjustedDropIndex, 0, draggedItemData);
      setItems(selectedIndex, newItems);
    }

    if (touchElementRef.current) {
      touchElementRef.current.style.opacity = "1";
      touchElementRef.current.style.transform = "scale(1)";
    }

    setDraggedItem(null);
    setDragOverIndex(null);
    touchStartPos.current = null;
    touchElementRef.current = null;
  };

  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          className={cn(
            className,
            "center bg-white dark:bg-secondary flex-wrap border-2 hover:bg-secondary/70 hover:border-black/40 duration-500 border-dashed rounded-lg relative"
          )}
        >
          {showCloseIcon && (
            <Tooltip>
              <TooltipTrigger
                asChild
                onClick={() => {
                  removeSelectedFiles(file);
                  setNumPages(0, 0);
                }}
                className="absolute text-white opacity-80 hover:opacity-100 duration-700 bg-accent center top-4 right-4 z-10 rounded-full w-8 h-8 p-1"
              >
                <XIcon />
              </TooltipTrigger>
              <TooltipContent className="text-white">
                Remove File
              </TooltipContent>
            </Tooltip>
          )}

          {pagerotable && (
            <Tooltip>
              <TooltipTrigger
                asChild
                onClick={() =>
                  setRotateRight(0, selectedFiles[selectedIndex]?.numPages ?? 0)
                }
                className="absolute text-white opacity-80 hover:opacity-100 duration-700 bg-accent center top-4 right-14 z-10 rounded-full w-8 h-8 p-1"
              >
                <RotateCwIcon />
              </TooltipTrigger>
              <TooltipContent className="text-white">Rotate All</TooltipContent>
            </Tooltip>
          )}
          {pageNumber === "all" ? (
            <Document
              file={file}
              scale={scale}
              onLoadSuccess={({ numPages }) => {
                setNumPages(selectedIndex, numPages);
              }}
              onLoadError={(error) => console.error("PDF load error:", error)}
              className="items-center h-full flex-cl justify-evenly flex-wrap flex gap-5 duration-500 p-5 rounded-lg pdf_shadow2 hover:border border dark:bg-secondary bg-secondary"
            >
              <div className="flex items-center justify-center flex-wrap gap-4">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    data-index={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                    onTouchStart={(e) => handleTouchStart(e, item, index)}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className={cn(
                      "draggable-page h-auto border pdf_shadow rounded-md p-3 bg-white dark:bg-primary flex items-center justify-center cursor-move transition-all duration-200 hover:scale-102",
                      draggedItem?.index === index ? "opacity-50 scale-95" : "",
                      dragOverIndex === index ? "border-accent" : ""
                    )}
                  >
                    <div className="relative">
                      {pagerotable && (
                        <Tooltip>
                          <TooltipTrigger
                            asChild
                            onClick={() =>
                              rotateIndividualPage(selectedIndex, index)
                            }
                            className="absolute bottom-0 text-white opacity-80 hover:opacity-100 duration-700 bg-[rgba(0,0,0,0.6)] center right-0 z-10 rounded-full w-7 h-7 p-1.5"
                          >
                            <RotateCwIcon />
                          </TooltipTrigger>
                          <TooltipContent className="text-white">
                            Rotate
                          </TooltipContent>
                        </Tooltip>
                      )}
                      <Page
                        loading={<PdfLoadingComponent />}
                        rotate={item.rotate[index]}
                        className="pdf_shadow flex-1 w-full rounded border"
                        pageNumber={item.pageNumber}
                        width={150}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                      <p className="text-xs mt-2 text-center leading text-secondary-foreground">{`Page ${item.pageNumber}`}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Document>
          ) : (
            <div>
              <Document
                file={file}
                scale={scale}
                onLoadSuccess={({ numPages }) => {
                  setNumPages(selectedIndex, numPages);
                }}
                onLoadError={(error) => console.error("PDF load error:", error)}
                className="w-full flex-1 gap-5 flex-col hover:border-black/40 duration-500 center p-5 rounded-lg pdf_shadow2 hover:border border dark:bg-secondary bg-white"
              >
                <Page
                  loading={<PdfLoadingComponent />}
                  key={pageNumber}
                  rotate={selectedFiles[selectedIndex]?.rotate?.[0] ?? 0}
                  className="pdf_shadow rounded border"
                  pageNumber={1}
                  width={150}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
                <p className="text-xs leading text-secondary-foreground">
                  {label}
                </p>
              </Document>
            </div>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent className="text-white">
        <p className="text-[13px]">
          {`${
            Math.round(selectedFiles[selectedIndex]?.fileSize / (1024 * 1024)) <
            1
              ? Number(selectedFiles[selectedIndex]?.fileSize / 1024).toFixed(
                  2
                ) + " KB - "
              : Number(
                  selectedFiles[selectedIndex]?.fileSize / (1024 * 1024)
                ).toFixed(2) + " MB - "
          }${
            selectedFiles[selectedIndex]?.fileType[0] === "jpg" ||
            selectedFiles[selectedIndex]?.fileType[0] === "png"
              ? ""
              : (selectedFiles[selectedIndex]?.numPages || 0) + " pages"
          }`}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
