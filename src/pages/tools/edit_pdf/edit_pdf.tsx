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
import { useRef, useState } from "react";
import { Document, Page } from "react-pdf";

const EditPdf = () => {
  const { selectedFiles, selectedIndex, setSelectedFile, setNumPages } =
    useToolsStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false); // Track drag state
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    let file: File | undefined;

    if ("dataTransfer" in event) {
      // Drag event
      file = event.dataTransfer.files?.[0];
      event.preventDefault();
      setIsDragging(false);
    } else {
      // Input change event
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
          fileInputRef.current.value = ""; // Clear the input value
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
    <div className="h-dvh ">
      <div className="h-[12%]">
        <Header isLanding={false} />
      </div>
      <SidemenuLyout />

      <main className="w-full h-[88%] overflow-scroll dark:bg-primary">
        {!selectedFiles[selectedIndex] ? (
          <div className="">
            <div className="w-full flex-col center p-4 py-20 rounded-lg ">
              <motion.div
                variants={variants1}
                initial={"inactive"}
                whileInView={"active"}
                viewport={{ once: true }}
                className="w-full mx-auto center"
              >
                <Card
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleFileChange}
                  className={`sm:p-10 p-6 bg-secondary dark:border-primary border-dashed border-3 w-full center gap-3 sm:gap-5 max-w-3xl my-0 ${
                    isDragging
                      ? "border-accent dark:border-accent"
                      : "border-[#4a4a4a] "
                  }`}
                >
                  <h1 className="text-3xl sm:text-4xl sm:text-left text-center dark:text-white text-secondary-foreground font-semibold">
                    Edit PDF
                  </h1>
                  <h1 className="text-secondary-foreground dark:text-white text-center text-lg sm:text-xl sm:mb-5">
                    Upload your PDF file to edit it
                  </h1>
                  <CloudUpload className="dark:text-white text-secondary-foreground sm:w-18 sm:h-18 w-10 h-10" />
                  <p className="text-[14px] dark:text-white text-secondary-foreground">
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
                  <p className="text-secondary-foreground hidden dark:text-white text-xl text-center">
                    Upload your {selectedFiles[selectedIndex]?.fileType[0]} file
                    below and get started.
                  </p>
                  <div className="flex items-center flex-col justify-center gap-3 w-full">
                    <Button
                      onClick={handleButtonClick}
                      className="max-w-sm py-0 text-lg sm:text-xl rounded-lg flex items-center h-12 w-full"
                      type="submit"
                    >
                      Choose pdf file
                    </Button>
                    <div className="center gap-4">
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
          <div className="h-full">
            <div className="flex items-center justify-center h-full">
              <Card className="w-full h-full max-w-3xl p-6 bg-secondary dark:border-primary border-dashed border-3">
                <Document
                  file={selectedFiles[selectedIndex]?.fileUrl}
                  onLoadSuccess={({ numPages }) => {
                    setNumPages(selectedIndex, numPages);
                  }}
                  onLoadError={(error) =>
                    console.error("PDF load error:", error)
                  }
                >
                  {Array.from(
                    new Array(selectedFiles[selectedIndex ?? 0]?.numPages || 0),
                    (_, index) => (
                      <Page
                        className="w-full bg-[red]"
                        scale={20}
                        pageNumber={index + 1}
                      />
                    )
                  )}
                </Document>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EditPdf;
