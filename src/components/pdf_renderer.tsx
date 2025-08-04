import { cn } from "@/lib/utils";
import { Document, Page } from "react-pdf";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { XIcon } from "lucide-react";
import useToolsStore from "@/pages/tools/tools_store";

const PdfRenderer = ({
  file,
  pageNumber,
  index,
  scale,
    onLoadSuccess,
    className,
  label
}: {
  file: string;
  index?: number;
  pageNumber: number;
        scale?: number;
        className?: string;
        label?:string;
  onLoadSuccess:({numPages})=>void;
    }) => {
    
    const {removeSelectedFiles}=useToolsStore()

  return (
    <div
      key={index}
      className={cn(
        className,
        "center bg-white flex-wrap border-2 hover:bg-secondary/70 hover:border-black/40 duration-500 border-dashed rounded-lg relative"
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild onClick={()=>removeSelectedFiles(file)} className="absolute text-white opacity-20 hover:opacity-100 duration-700 bg-accent center top-4 right-4 z-10 rounded-full w-8 h-8 p-1">
            <XIcon />
        </TooltipTrigger>
          <TooltipContent className="text-white">Remove File</TooltipContent>
      </Tooltip>
      <Document
        file={file}
        scale={scale}
        onLoadSuccess={onLoadSuccess}
        onLoadError={(error) => console.error("PDF load error:", error)}
        className="w-full flex-1 gap-5 flex-col hover:border-black/40 duration-500 center p-5 rounded-lg pdf_shadow2 hover:border border bg-white"
      >
        <Page
          className="pdf_shadow rounded border"
          pageNumber={pageNumber}
          width={150} // Reduced for better performance
          renderTextLayer={false} // Optimize rendering
          renderAnnotationLayer={false}
        />
        <p className="text-xs leading text-secondary-foreground">{label}</p>
      </Document>
    </div>
  );
};

export default PdfRenderer;
