import { cn } from "@/lib/utils";
import { Document, Page } from "react-pdf";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { RotateCwIcon, XIcon } from "lucide-react";
import useToolsStore from "@/pages/tools/tools_store";

const PdfRenderer = ({
  file,
  pageNumber,
  index,
  scale,
  className,
  pdfrotable,
  pagerotable,
  showCloseIcon = true,
  label,
}: {
  file: string;
  index?: number;
  pageNumber: "all" | "1";
  scale?: number;
  className?: string;
  pagerotable?: boolean;
  pdfrotable?: boolean;
  label?: string;
  showCloseIcon?: boolean;
  // onLoadSuccess: ({ numPages }) => void;
}) => {
  const {
    removeSelectedFiles,
    setRotateRight,
    selectedFiles,
    setNumPages,
    rotateIndividualPage,
    selectedIndex,
  } = useToolsStore();

  // useEffect(() => {
  //   initRotate(0, numPages[0]);
  //   console.log(numPages[0]);
  console.log(selectedFiles[selectedIndex]?.numPages + "here");
  // }, [selectedFiles, numPages]);

// useEffect(() => {
//   console.log('rotate',selectedFiles[0].rotate)
// }, [selectedFiles[0].rotate ])


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

          {pdfrotable && (
            <Tooltip>
              <TooltipTrigger
                asChild
                onClick={() =>
                  setRotateRight(0, selectedFiles[selectedIndex]?.numPages ?? 0)
                }
                className="absolute text-white opacity-80 hover:opacity-100 duration-700 bg-accent center top-4 right-10 z-10 rounded-full w-4 h-4 p-2"
              >
                <RotateCwIcon />
              </TooltipTrigger>
              <TooltipContent className="text-white">Rotate</TooltipContent>
            </Tooltip>
          )}
          {pageNumber === "all" ? (
            <Document
              file={file}
              scale={scale}
              onLoadSuccess={({ numPages }) => {
                setNumPages(selectedIndex,numPages);
              }}
              onLoadError={(error) => console.error("PDF load error:", error)}
              className="items-center flex-col justify-evenly flex-wrap flex gap-5 hover:border-black/40 duration-500 p-5 rounded-lg pdf_shadow2 hover:border border dark:bg-secondary bg-white"
            >
              {Array.from(
                new Array(selectedFiles[index ?? 0]?.numPages || 0),
                (_, index) => (
                  <div key={index} className="relative">
                    {/* {selected[0]} */}
                    {/* {rotate[0][0]} */}
                    {/* {rotate[0][index]} */}
                    {/* {}j */}
                    {pagerotable && (
                      <Tooltip>
                        <TooltipTrigger
                          asChild
                          onClick={() => rotateIndividualPage(selectedIndex, index)}
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
                      rotate={selectedFiles[selectedIndex]?.rotate?.[index+1]} // Use the specific rotation for each page
                      className="pdf_shadow flex-1 w-full rounded border"
                      pageNumber={index + 1} // Pages are 1-indexed
                      width={150} // Reduced for better performance
                      renderTextLayer={false} // Optimize rendering
                      renderAnnotationLayer={false}
                    />
                    <p className="text-xs mt-2 text-center leading text-secondary-foreground">{`Page ${
                      index + 1
                      }`}</p>
                  </div>
                )
              )}
            </Document>
          ) : (
            <Document
              file={file}
              scale={scale}
              onLoadSuccess={({ numPages }) => {
                setNumPages(selectedIndex, numPages);
                // alert(numPages);
              }}
              onLoadError={(error) => console.error("PDF load error:", error)}
              className="w-full flex-1 gap-5 flex-col hover:border-black/40 duration-500 center p-5 rounded-lg pdf_shadow2 hover:border border dark:bg-secondary bg-white"
            >
              <Page
                key={pageNumber} // Use the specific page number here
                rotate={selectedFiles[selectedIndex]?.rotate?.[0]}
                className="pdf_shadow rounded border"
                pageNumber={1}
                width={150} // Reduced for better performance
                renderTextLayer={false} // Optimize rendering
                renderAnnotationLayer={false}
              />
              <p className="text-xs leading text-secondary-foreground">
                {label}
              </p>
            </Document>
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
              : (selectedFiles[selectedIndex]?.numPages  ||
                selectedFiles[index ?? 0]?.numPages) + " pages"
          }`}
        </p>
      </TooltipContent>
    </Tooltip>
  );
};

export default PdfRenderer;
