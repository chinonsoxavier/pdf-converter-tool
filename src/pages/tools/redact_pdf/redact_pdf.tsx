import Header from "@/components/layout/header";
import SidemenuLyout from "@/components/layout/sidemenu_layout";
import useToolsStore from "../tools_store";
import Footer from "@/components/layout/footer";
import HistorySection from "@/components/tools/history_section";
import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { CloudUpload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRef, useState, useEffect } from "react";
import { Document, Page } from "react-pdf";

// Define a type for redaction areas
interface RedactionArea {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  pageNumber: number;
  text: string;
}

const RedactPdf = () => {
  const { selectedFiles, selectedIndex, setSelectedFile, setNumPages } =
    useToolsStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // State for redaction functionality
  const [redactionAreas, setRedactionAreas] = useState<RedactionArea[]>([]);
  const [selectedText, setSelectedText] = useState<string>("");
  const [redactionMode, setRedactionMode] = useState<boolean>(true);
  const [, setCurrentPage] = useState<number>(1);
  const pageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Update container width when window resizes
  useEffect(() => {
    if (pdfContainerRef.current) {
      setContainerWidth(pdfContainerRef.current.clientWidth);
    }

    const handleResize = () => {
      if (pdfContainerRef.current) {
        setContainerWidth(pdfContainerRef.current.clientWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate scale based on container width
  const calculateScale = () => {
    if (containerWidth === 0) return 1;

    if (containerWidth < 400) return 0.7;
    if (containerWidth < 600) return 0.8;
    if (containerWidth < 768) return 0.9;
    if (containerWidth < 1024) return 1.0;
    return 1.2;
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    let file: File | undefined;

    if ("dataTransfer" in event) {
      file = event.dataTransfer.files?.[0];
      event.preventDefault();
      setIsDragging(false);
    } else {
      file = event.target.files?.[0];
    }

    const allowedFileTypes = "pdf";
    if (file) {
      const fileType =
        file && file.name
          ? file.name.split(".").pop()?.toString() ?? "unknown"
          : "unknown";

      if (!allowedFileTypes || !allowedFileTypes.includes(fileType)) {
        alert(
          "Invalid file type. Please upload a valid " +
            selectedFiles[selectedIndex]?.fileType[0] +
            " file."
        );
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      const fileUrl = URL.createObjectURL(file);
      setSelectedFile({
        file: file,
        fileUrl: fileUrl,
        fileName: file.name,
        fileSize: file.size,
        fileType: [allowedFileTypes],
      });

      // Reset redaction areas when new file is loaded
      setRedactionAreas([]);
      setSelectedText("");
      setCurrentPage(1);
      pageRefs.current = {};

      console.log("Selected file:", file.name, "Size:", file.size, "bytes");
      return;
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Handle text selection for redaction
  const handleTextSelection = (pageNumber: number) => {
    if (!redactionMode) return;

    const selection = window.getSelection();
    if (!selection || selection.toString().trim() === "") return;

    const selectedText = selection.toString().trim();
    setSelectedText(selectedText);

    // Get position of selection
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    // Get the page container
    const pageContainer = pageRefs.current[pageNumber];
    if (!pageContainer) {
      console.warn("Could not find page container for page", pageNumber);
      return;
    }

    const pageRect = pageContainer.getBoundingClientRect();

    // Calculate the relative position within the page
    const x = rect.left - pageRect.left;
    const y = rect.top - pageRect.top;

    // Create a new redaction area
    const newRedaction: RedactionArea = {
      id: `redaction-${Date.now()}`,
      x,
      y,
      width: rect.width,
      height: rect.height,
      pageNumber,
      text: selectedText,
    };

    setRedactionAreas((prev) => [...prev, newRedaction]);
    setSelectedText("");
    selection.removeAllRanges(); // Clear selection
  };

  // Clear all redactions
  const clearRedactions = () => {
    setRedactionAreas([]);
    setSelectedText("");
  };

  const variants1 = {
    inactive: {
      y: 20,
      opacity: 0,
    },
    active: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.5 },
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-auto md:h-[12%]">
        <Header isLanding={false} />
      </div>
      <SidemenuLyout />
      <main className="flex-grow w-full dark:bg-primary">
        {selectedFiles[selectedIndex] ? (
          <div className="flex flex-col items-center p-2 sm:p-4">
            {/* Redaction controls */}
            <div className="w-full max-w-4xl mb-4 flex justify-between items-center">
              <div className="flex gap-2">
                <Button
                  onClick={() => setRedactionMode(!redactionMode)}
                  variant={redactionMode ? "default" : "outline"}
                  className="flex items-center gap-2"
                >
                  <span>Redaction Mode</span>
                  <span
                    className={`w-3 h-3 rounded-full ${
                      redactionMode ? "bg-green-500" : "bg-gray-500"
                    }`}
                  ></span>
                </Button>

                {redactionMode && (
                  <Button onClick={clearRedactions} variant="outline">
                    Clear All
                  </Button>
                )}
              </div>

              {selectedText && redactionMode && (
                <div className="bg-accent text-white px-3 py-1 rounded-md">
                  Selected: "{selectedText}"
                </div>
              )}
            </div>

            <Card
              ref={pdfContainerRef}
              className="w-full max-w-4xl p-4 sm:p-6 bg-secondary dark:border-primary border-dashed border-2 overflow-auto"
            >
              <Document
                className="flex flex-col items-center"
                file={selectedFiles[selectedIndex]?.fileUrl}
                onLoadSuccess={({ numPages }) => {
                  setNumPages(selectedIndex, numPages);
                }}
                onLoadError={(error) => console.error("PDF load error:", error)}
              >
                {Array.from(
                  new Array(selectedFiles[selectedIndex]?.numPages || 0),
                  (_, index) => (
                    <div
                      key={index}
                      ref={(el) => {
                        pageRefs.current[index + 1] = el; // Assign the element to the ref array
                      }}
                      data-page-number={index + 1}
                      className="mb-4 w-full flex justify-center relative"
                      onMouseUp={() => handleTextSelection(index + 1)}
                    >
                      <Page
                        className="max-w-full"
                        pageNumber={index + 1}
                        renderTextLayer={true} // Enable text selection
                        renderAnnotationLayer={false}
                        scale={calculateScale()}
                        width={
                          containerWidth > 0
                            ? Math.min(containerWidth * 0.9, 800)
                            : undefined
                        }
                      />

                      {/* Render redaction areas for this page */}
                      {redactionAreas
                        .filter((area) => area.pageNumber === index + 1)
                        .map((area) => (
                          <div
                            key={area.id}
                            className="absolute bg-black opacity-80"
                            style={{
                              left: `${area.x}px`,
                              top: `${area.y}px`,
                              width: `${area.width}px`,
                              height: `${area.height}px`,
                            }}
                          />
                        ))}
                    </div>
                  )
                )}
              </Document>
            </Card>
          </div>
        ) : (
          <div className="overflow-x-hidden">
            <div className="w-full flex flex-col items-center p-4 py-6 md:py-20 rounded-lg">
              <motion.div
                variants={variants1}
                initial={"inactive"}
                whileInView={"active"}
                viewport={{ once: true }}
                className="w-full mx-auto overflow-x-hidden flex justify-center"
              >
                <Card
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleFileChange}
                  className={`sm:p-10 p-6 bg-secondary dark:border-primary border-dashed border-3 w-full max-w-3xl my-0 flex flex-col items-center gap-3 sm:gap-5 ${
                    isDragging
                      ? "border-accent dark:border-accent"
                      : "border-[#4a4a4a] "
                  }`}
                >
                  <h1 className="text-2xl sm:text-3xl md:text-4xl text-center dark:text-white text-secondary-foreground font-semibold">
                    Redact PDF
                  </h1>
                  <h1 className="text-secondary-foreground dark:text-white text-center text-base sm:text-lg md:text-xl md:mb-5">
                    Upload your PDF file to redact text
                  </h1>
                  <CloudUpload className="dark:text-white text-secondary-foreground w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18" />
                  <p className="text-[12px] sm:text-[14px] dark:text-white text-secondary-foreground">
                    Or drag and drop here...
                  </p>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    aria-label="Choose PDF file"
                  />
                  <p className="text-secondary-foreground hidden dark:text-white text-base sm:text-xl text-center">
                    Upload your {selectedFiles[selectedIndex]?.fileType[0]} file
                    below and get started.
                  </p>
                  <div className="flex flex-col items-center justify-center gap-3 w-full">
                    <Button
                      onClick={handleButtonClick}
                      className="max-w-sm py-0 text-base sm:text-lg md:text-xl rounded-lg flex items-center h-12 w-full"
                      type="submit"
                    >
                      Choose pdf file
                    </Button>
                    <div className="flex gap-4">
                      <Tooltip>
                        <TooltipTrigger className="rounded-full bg-accent p-2.5 w-11.5 h-11.5 text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 18 16"
                          >
                            <path
                              fill="currentColor"
                              d="M8.7375,5.80725 L3.021,15.70725 L0.12375,10.69725 L5.847,0.795 L8.7375,5.80725 Z M17.865,10.38225 L12.078,10.39125 L6.378,0.489 L12.1725,0.489 L17.865,10.38225 Z M17.87625,10.9875 L14.9865,15.9975 L3.5415,15.99 L6.43425,10.98375 L17.87625,10.9875 Z"
                            ></path>
                          </svg>
                          <TooltipContent className="text-white hidden border bottom-0">
                            Select file from Google Drive
                          </TooltipContent>
                        </TooltipTrigger>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger className="rounded-full bg-accent p-2.5 w-11.5 h-11.5 text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 18 16"
                          >
                            <path
                              fill="currentColor"
                              d="M5.3475,0.7035 L0.096,4.125 L3.708,7.03725 L9.018,3.765 L5.3475,0.7035 Z M17.904,4.14 L12.66525,0.7275 L9.01875,3.7725 L14.29875,7.03875 L17.904,4.14 Z M9.01875,10.305 L12.66525,13.35975 L17.904,9.945 L14.2995,7.0395 L9.01875,10.305 Z M0.096,9.9585 L5.3475,13.35975 L9.01875,10.305 L3.70875,7.0455 L0.096,9.9585 Z M9.01875,10.9635 L5.35575,14.0385 L3.786,13.02 L3.786,14.16 L9.01875,17.30475 L14.271,14.15175 L14.271,13.0125 L12.693,14.031 L9.01875,10.9635 Z"
                            ></path>
                          </svg>
                          <TooltipContent className="text-white hidden border bottom-0">
                            Select file from Dropbox
                          </TooltipContent>
                        </TooltipTrigger>
                      </Tooltip>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            <HistorySection />

            <Footer />
          </div>
        )}
      </main>
    </div>
  );
};

export default RedactPdf;
