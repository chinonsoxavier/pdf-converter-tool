import HowToSection from "@/components/landing/how_to_section";
import ToolsSection from "@/components/landing/tools_section";
import Footer from "@/components/layout/footer";
import ToolsHeaderLayout from "@/components/layout/tools_header_layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import * as pdfjsLib from "pdfjs-dist";import * as PDFJS from "pdfjs-dist/build/pdf.min.mjs";
// import * as PDFJS from "pdfjs-dist/build/pdf.min.mjs";
// import pdfjsWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.js";
interface FilePickerCardProps {
  desc?: string;
  fileType?: string;
  onFileSelect?: (file: File) => void;
}

// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
// import { pdfjs } from "react-pdf";

// Set the worker source to handle PDF rendering
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.min.mjs');
// `//cdnjs.cloudFlare.com/ajax/libs/pdf.3.11.174/pdf.worker.min.js`;
// `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const ConverterLayout = ({
  children,
  labelIcon,
  label,
  desc,
  file,
  fileType,
  setFile,
}: Readonly<{
  labelIcon: React.FC;
  children: React.ReactNode;
  label: string;
  desc: string;
  file?: null | File;
  fileType: string;
  setFile;
  (value: boolean): void;
}>) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [numPages, setNumPages] = useState(0);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      //   await import("pdfjs-dist/build/pdf.worker.js");
      const fileUrl = URL.createObjectURL(file);
      setFile(fileUrl);
      console.log("Selected file:", file.name, "Size:", file.size, "bytes");
      return;
    }
    alert("Please select a valid PDF file.");
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the input value
    }
  };

  return (
    <>
      {/* header */}
      <ToolsHeaderLayout labelIcon={labelIcon} label={label} />

      {/* main content */}
      <main className="w-full py-20 center flex-col space-y-20 to-primary/5 from-white bg-gradient-to-t to-80% dark:from-primary dark:to-secondary">
        {!file ? (
          <>
            <Card className="p-10 border-dashed border-accent border-2 w-full center max-w-xl my-20">
              <h1 className="text-secondary-foreground dark:text-secondary-foreground text-xl mb-20">
                {desc}
              </h1>
              <Input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Choose PDF file"
              />
              <p className="text-secondary-foreground hidden dark:text-secondary-foreground text-xl text-center">
                Upload your PDF file below and get started.
              </p>
              <Button
                onClick={handleButtonClick}
                className="max-w-sm rounded-full flex items-center h-12 w-full"
                type="submit"
              >
                <Plus /> Choose {fileType} File
              </Button>
            </Card>

            {/* How to section */}
            <HowToSection />

            {/* Tools Section */}
            <ToolsSection />
          </>
        ) : (
          <>
            <Document
              file={file}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              className="w-full max-w-3xl"
            >
              {Array.from({ length: numPages }, (_, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
            <div className="text-secondary-foreground dark:text-secondary-foreground text-xl">
              <p className="text-center">Total Pages: {numPages}</p>
            </div>
            <Button
              className="max-w-sm rounded-full flex items-center h-12 w-full"
              type="submit"
            >
              <Plus /> Convert {fileType} File
            </Button>
            {/* Render children components */}
            {/* <> */}
            {children}
          </>
        )}
      </main>

      {/* Footer*/}
      <Footer />
    </>
  );
};

export default ConverterLayout;
