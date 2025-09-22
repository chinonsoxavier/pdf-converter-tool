import { Card } from "@/components/ui/card";
import { useRef, useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import useToolsStore from "@/pages/tools/tools_store";
import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import { Button } from "@/components/ui/button";
import { LineSquiggleIcon, Send, SignatureIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
const ESignatureWorkflow = () => {
  const { selectedFiles, selectedIndex,  setNumPages } =
    useToolsStore();
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

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

  


  return (
    <ConverterLayout
      actionMenuSideBar={
        <div className="p-4 cnter flex-col space-y-4">
          <Label>Signatures and Initials</Label>
          <div className="flex item-center justify-start gap-4 w-full">
            <Button size="sm" variant="outline">
              <LineSquiggleIcon /> Create Signature
            </Button>
            <Button size="sm" variant="outline">
              <SignatureIcon /> Create Initials
            </Button>
          </div>

          <Label>Signing</Label>
          <div className="flex item-center justify-start gap-4 w-full">
            <Button size="sm" variant="outline">
              <Send />Request E-Signatures
            </Button>
           
          </div>
        </div>
      }
      // handleFileUpload={() => DeletePdfPages(selectedFiles)}
      children={
        <div className="flex flex-col overflow-hidden h-full bg-[re] w-full items-center justify-center">
          <Card
            ref={pdfContainerRef}
            className="w-full p-4 overflow-x-hidden sm:p-6 bg-secondary dark:border-primary border-dashed border-2"
          >
            <Document
              className="flx flex-col w-full items-start"
              file={selectedFiles[selectedIndex]?.fileUrl}
              onLoadSuccess={({ numPages }) => {
                setNumPages(selectedIndex, numPages);
              }}
              onLoadError={(error) => console.error("PDF load error:", error)}
            >
              {Array.from(
                new Array(selectedFiles[selectedIndex]?.numPages || 0),
                (_, index) => (
                  <div key={index} className="mb-4 w-full flex justify-center">
                    <Page
                      className="max-w-full"
                      pageNumber={index + 1}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      scale={calculateScale()}
                      width={
                        containerWidth > 0
                          ? Math.min(containerWidth * 1, 800)
                          : undefined
                      }
                    />
                  </div>
                )
              )}
            </Document>
          </Card>
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

export default ESignatureWorkflow;
