import { useRef, useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import useToolsStore from "@/pages/tools/tools_store";
import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import { Button } from "@/components/ui/button";
import { LineSquiggleIcon, Send, SignatureIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import ESignatureModal from "@/components/tools/e_signature_workflow/e_signature_modal";
const ESignatureWorkflow = () => {
  const { selectedFiles, selectedIndex, setNumPages } = useToolsStore();
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setSavedSignature] = useState(null);

interface SignatureData {
  type: "canvas" | "text" | "image";
  data: string;
  font?: string;
}

    const handleSaveSignature = (signatureData: SignatureData) => {
      setSavedSignature(signatureData);
      console.log("Signature saved:", signatureData);
    };


  // Update container width when window resizes
  useEffect(() => {
    if (pdfContainerRef.current) {
      setContainerWidth(pdfContainerRef.current.clientWidth);
    }

    const handleResize = () => {
      if (pdfContainerRef.current) {
        if (window.innerWidth < 300) {
          setContainerWidth(260);
        } else if (window.innerWidth < 500) {
          setContainerWidth(450);
        } else if (window.innerWidth < 700) {
          setContainerWidth(650);
        } else if (window.innerWidth < 800) {
          setContainerWidth(750);
        }
        setContainerWidth(pdfContainerRef.current.clientWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate scale based on container width


   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);

   // Update container width when window resizes
useEffect(() => {
  const updateWidth = () => {
    if (pdfContainerRef.current) {
      setContainerWidth(pdfContainerRef.current.clientWidth);
    }
  };

  updateWidth(); // initial call
  window.addEventListener("resize", updateWidth);

  return () => window.removeEventListener("resize", updateWidth);
}, []);

   // Calculate scale based on container width
  //  const calculateScale = () => {
  //    if (containerWidth === 0) return 1;

  //    if (containerWidth < 400) return 0.7;
  //    if (containerWidth < 600) return 0.8;
  //    if (containerWidth < 768) return 0.9;
  //    if (containerWidth < 1024) return 1.0;
  //    return 1.2;
  //  };

   

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
    <ConverterLayout
      actionMenuSideBar={
        <div className="p-4 cnter flex-col space-y-4">
          <Label>Signatures and Initials</Label>
          <div className="flex item-center justify-start gap-4 w-full">
            <Button size="sm" variant="outline">
              <SignatureIcon /> Create Initials
            </Button>
            <Button
              onClick={() => setIsModalOpen(true)}
              size="sm"
              variant="outline"
            >
              <LineSquiggleIcon className="mr-2" /> Create Signature
            </Button>
            <ESignatureModal
              onClose={() => setIsModalOpen(false)}
              isOpen={isModalOpen}
              onSave={handleSaveSignature}
            />
          </div>

          <Label>Signing</Label>
          <div className="flex item-center justify-start gap-4 w-full">
            <Button size="sm" variant="outline">
              <Send />
              Request E-Signatures
            </Button>
          </div>
        </div>
      }
      // handleFileUpload={() => DeletePdfPages(selectedFiles)}
      children={
        <div className="flex h-fit relative items-center justify-center p-2 sm:p-4">
          <div className="center w-full max-w-6xl">
            {/* Main PDF Viewer */}
            <div
              className="lg:col-span-3 dark:border-primary border rounded-lg py-4"
              ref={pdfContainerRef}
            >
              <Document
                className="flex flex-col items-center"
                file={selectedFiles[selectedIndex]?.fileUrl}
                onLoadSuccess={({ numPages }) => {
                  setTotalPages(numPages);
                  setNumPages(selectedIndex, numPages);
                }}
                onLoadError={(error) => console.error("PDF load error:", error)}
              >
                {Array.from({ length: totalPages }, (_, index) => (
                  <div
                    key={index}
                    data-page-number={index + 1}
                    className="mb-4 w-full flex justify-center"
                  >
                    <Page
                      className="max-w-full shadow-lg"
                      pageNumber={index + 1}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      width={Math.min(containerWidth, 900)} // responsive with max cap
                    />
                  </div>
                ))}
              </Document>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="fixed w-ful bottom-10 mx-auto transform flex space-x-2 z-50">
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onNext={nextPage}
              onPrev={prevPage}
              onPageChange={goToPage}
            />
          </div>
        </div>
      }
      actionButtonText="Sign Pdf"
      label="Sign PDF Files"
      desc="Add or request signatures from others"
      disabled={selectedFiles.length <= 0} // Adjusted to <= 0 since you likely need at least one file
      convertingStateText="Signing PDF files"
      // actionMenuSideBar={}
    />
  );
};

const PaginationControls = ({
  currentPage,
  totalPages,
  onNext,
  onPrev,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  onPageChange: (page: number) => void;
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 flex items-center space-x-2">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm disabled:opacity-50"
      >
        ← Previous
      </button>

      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm disabled:opacity-50"
      >
        Next →
      </button>

      <input
        type="number"
        min="1"
        max={totalPages}
        value={currentPage}
        onChange={(e) => onPageChange(parseInt(e.target.value))}
        className="w-16 px-2 py-1 border rounded text-sm text-center"
      />
    </div>
  );
};

export default ESignatureWorkflow;
