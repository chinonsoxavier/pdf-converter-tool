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
// import { PaginationControls } from "./pagination-controls"; // New component
const PreviewPdfConverter = () => {
  const { selectedFiles, selectedIndex, setSelectedFile, setNumPages } =
    useToolsStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Update container width when window resizes
  useEffect(() => {
    const updateWidth = () => {
      if (pdfContainerRef.current) {
        setContainerWidth(pdfContainerRef?.current?.clientWidth);
      }
    };

    updateWidth(); // run once on mount
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, [pdfContainerRef?.current?.clientWidth]);

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

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);

      // Scroll to the specific page in the viewer
      setTimeout(() => {
        if (pdfContainerRef.current) {
          const pageElement = pdfContainerRef.current.querySelector(
            `[data-page-number="${page}"]`
          );
          if (pageElement) {
            pageElement.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }, 100); // Small delay to ensure DOM updates
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="h-auto md:h-[12%]">
        <Header isLanding={false} />
      </div>
      <SidemenuLyout />

      <main className="flex-grow overflow-y-scroll h-auto md:h-[88%] w-full dark:bg-primary">
        {!selectedFiles[selectedIndex] ? (
          <div className="overflow-hidden">
            <div className="w-full flex flex-col items-center p-4 py-6 md:py-20 rounded-lg">
              <motion.div
                variants={{
                  inactive: {
                    y: 20,
                    opacity: 0,
                  },
                  active: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 1.5 },
                  },
                }}
                initial="inactive"
                whileInView="active"
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
                    Preview PDF
                  </h1>
                  <h1 className="text-secondary-foreground dark:text-white text-center text-base sm:text-lg md:text-xl md:mb-5">
                    Upload your PDF file to preview it
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
        ) : (
          <div className="flex h-fit relative items-center justify-center p-2 sm:p-4">
            <div className="center w-full max-w-6xl">
              {/* Main PDF Viewer */}
              <div
                className="lg:col-span-3 w-full dark:border-primary border rounded-lg py-4"
                ref={pdfContainerRef}
              >
                <Document
                  className="flex flex-col items-center"
                  file={selectedFiles[selectedIndex]?.fileUrl}
                  onLoadSuccess={({ numPages }) => {
                    setTotalPages(numPages);
                    setNumPages(selectedIndex, numPages);
                  }}
                  onLoadError={(error) =>
                    console.error("PDF load error:", error)
                  }
                >
                  {Array.from({ length: totalPages }, (_, index) => (
                    <div
                      key={index}
                      data-page-number={index + 1} // Add data attribute
                      className="mb-4 w-full flex justify-center"
                    >
                      <Page
                        className="max-w-full shadow-lg"
                        pageNumber={index + 1}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        width={Math.min(containerWidth, 900)} // responsive with a max width cap
                      />
                    </div>
                  ))}
                </Document>
              </div>
            </div>

            {/* Mobile Controls */}

            {/* Desktop Controls (optional) */}
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-50">
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onNext={nextPage}
                onPrev={prevPage}
                // onPageChange={goToPage}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// PaginationControls Component
const PaginationControls = ({
  currentPage,
  totalPages,
  onNext,
  onPrev,
}: {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 flex items-center space-x-2">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm disabled:opacity-50"
      >
        ←
      </button>

      <span className="text-sm whitespace-nowrap">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm disabled:opacity-50"
      >
        →
      </button>
    </div>
  );
};

export default PreviewPdfConverter;
