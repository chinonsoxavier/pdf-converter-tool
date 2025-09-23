import { Card } from "@/components/ui/card";
import { useRef, useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import useToolsStore from "@/pages/tools/tools_store";
import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
const ESignatureWorkflow = () => {
  const { selectedFiles, selectedIndex, setNumPages, removeSelectedFiles } =
    useToolsStore();
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [openMenu, setOpenMenu] = useState(false);

  // Update container width when window resizes
  useEffect(() => {
    setOpenMenu(true);
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

  const handleRemoveSelectedfile = () => {
    if (selectedFiles[selectedIndex ?? 0]?.fileUrl) {
      removeSelectedFiles(selectedFiles[selectedIndex ?? 0].fileUrl);
      console.log(
        "Removed file with URL:",
        selectedFiles[selectedIndex ?? 0].fileUrl
      );
      // Optionally revoke the object URL to free memory
      URL.revokeObjectURL(selectedFiles[selectedIndex ?? 0].fileUrl);
    }
    // };
  };

  return (
    <ConverterLayout
      // handleFileUpload={() => DeletePdfPages(selectedFiles)}
      children={
        <div className="flex w-full items-center justify-center">
          <Card
            ref={pdfContainerRef}
            className="w-full max-w-4xl p-4 sm:p-6 bg-secondary dark:border-primary border-dashed border-2 overflow-auto"
          >
            <Document
              className="flex flex-col w-full items-center"
              file={selectedFiles[selectedIndex]?.fileUrl}
              onLoadSuccess={({ numPages }) => {
                setNumPages(selectedIndex, numPages);
              }}
              onLoadError={(error) => console.error("PDF load error:", error)}
            >
              <AlertDialog open={openMenu} onOpenChange={setOpenMenu}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">
                      Who is signing this document?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <div className="center">
                        <div className="center flex-1 bg-background rounded p-3 flex-col">
                          <img src="" alt="" />
                          <Button>Sign Myself</Button>
                          <p>Create a signature and sign a document</p>
                        </div>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleRemoveSelectedfile}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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
                          ? Math.min(containerWidth * 0.9, 800)
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
