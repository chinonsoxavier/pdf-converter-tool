import { cn } from "@/lib/utils";
import { Document, Page } from "react-pdf";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Check, RotateCwIcon, XIcon } from "lucide-react";
import useToolsStore from "@/pages/tools/tools_store";
import PdfLoadingComponent from "./pdf_loading_component";

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
  flexDirection,
  extractible = false,
  isolatePages = false,
  showPdfSize = true, // Whether to show PDF size
  handlePageClick,
  deletable
}: {
  file: string;
  index?: number;
  pageNumber: "all" | "1";
  scale?: number;
  className?: string;
    pagerotable?: boolean;
  deletable?: boolean; // Whether the PDF pages can be deleted
  pdfrotable?: boolean;
  label?: string;
  showCloseIcon?: boolean;
  flexDirection?: "col" | "row";
  extractible?: boolean;
  isolatePages?: boolean; // Whether to isolate pages
  showPdfSize?: boolean; // Whether to show PDF size
  handlePageClick?: (pageIndex: number) => void; // Callback for page click
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
  console.log(selectedFiles[selectedIndex]?.numPages);
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
            isolatePages
              ? ""
              : " bg-white dark:bg-secondary p border-2 hover:bg-secondary/70 hover:border-black/40 border-dashed",
            "center flex-wra duration-500 rounded-lg relative"
          )}
        >
          {showCloseIcon && !isolatePages && (
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
                setNumPages(selectedIndex, numPages);
              }}
              onLoadError={(error) => console.error("PDF load error:", error)}
              className={`${
                flexDirection === "col" ? "flex-col" : "flex-row"
              } ${
                !isolatePages
                  ? "bg-white  hover:border-black/40 hover:border border dark:bg-secondary"
                  : ""
              } items-center justify-evenly flex-wrap flex gap-5 duration-500 p-5 rounded-lg pdf_shadow2`}
            >
              {Array.from(
                new Array(selectedFiles[index ?? 0]?.numPages || 0),
                (_, index) => (
                  <div key={index} className="relative">
                    {pagerotable && (
                      <Tooltip>
                        <TooltipTrigger
                          asChild
                          onClick={() =>
                            rotateIndividualPage(selectedIndex, index + 1)
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

                    {
                      extractible &&
                    <div className="center rounded-full w-6 h-6 bg-[green] absolute z-30 left-2 top-2">
                      <Check className="w-4 h-4 text-white text-xl" />
                    </div>
                    }

                    {deletable && (<div>
                      <Tooltip>
                        <TooltipTrigger
                          asChild
                       
                          className="absolute text-white opacity-50 hover:opacity-100 duration-700 bg-red-500 center top-2 right-2 z-10 rounded-full w-6 h-6 p-1"
                        >
                          <XIcon />
                        </TooltipTrigger>
                        <TooltipContent className="text-white">
                          Delete Page
                        </TooltipContent>
                      </Tooltip>
                    </div>)}

                    <Page
                      loading={<PdfLoadingComponent />}
                      
                      onClick={() => handlePageClick && handlePageClick(index)}
                      canvasBackground=""
                      rotate={selectedFiles[selectedIndex]?.rotate?.[index + 1]} // Use the specific rotation for each page
                      className={`pdf_shadow flex-1 w-full rounded-md border p-1 ${
                        extractible ? "rounded-md hover:border-[green]" : ""
                      }`}
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
                loading={PdfLoadingComponent}
                onClick={() => handlePageClick && handlePageClick(1)}
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
      {showPdfSize && (
        <TooltipContent className="text-white">
          <p className="text-[13px]">
            {`${
              Math.round(
                selectedFiles[selectedIndex]?.fileSize / (1024 * 1024)
              ) < 1
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
                : (selectedFiles[selectedIndex]?.numPages ||
                    selectedFiles[index ?? 0]?.numPages) + " pages"
            }`}
          </p>
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default PdfRenderer;
