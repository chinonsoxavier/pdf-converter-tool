import ToolsFileExtensionCard from "@/components/tools/tools_file_extension_card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { XIcon } from "lucide-react";
import { Document, Page } from "react-pdf";
import useMergePdfStore from "./merge_pdf_store";

const MergePdfChildrenSection = () => {
  const {
    selectedFiles,
    setSelectedFiles,
    removeSelectedFiles,
    fileType,
    setNumPages,
    fileNames,
    fileSize,
    numPages,
  } = useMergePdfStore();
    return (
      <div className="center flex-wrap gap-4">
            {fileType[0] === "pdf" ? (
              selectedFiles.map((file, index) => (
    <Tooltip>
      <TooltipTrigger>
        <div className="center h-full min-h-36 min-w-0 w-36 overflow-hdden bg-white flex-col border dark:bg-secondary rounded-lg hover:shadow-md duration-200 hover:border relative group p-3">
          <Tooltip>
            {/* <TooltipTrigger  className="w-full rounded-lg"> */}
            <TooltipTrigger
              asChild
              onClick={() => removeSelectedFiles(file)}
              className="items-center absolute top-1 hover:shadow right-1 z-30 bg-secondary p-1 text-primary-foreground cursor-pointer justify-center group-hover:opacity-100 duration-500 flex opacity-0 rounded-full w-8 h-8"
            >
              <XIcon className="w-4 h-4" />
            </TooltipTrigger>
            {/* </div> */}
            <TooltipContent className="text-white">
              <p>Remove File</p>
            </TooltipContent>
          </Tooltip>
                <Document
                  key={index}
                  scale={0.2}
                  file={file}
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                  className="w-full center"
                >
                  {/* {Array.from({ length: 1 }, (_, index) => ( */}
                  <Page className="border" pageNumber={1} width={600} height={400} />
                  {/* ))} */}
                </Document>
          <p className="truncate w-full mt-2 text-sm text-secondary-foreground font-medium">
            {fileNames[index+1]}
          </p>
        </div>
      </TooltipTrigger>

      <TooltipContent className="text-white">
        <p className="text-[13px]">{fileSize[index] + " -" + numPages[index] + " pages"}</p>
      </TooltipContent>
            </Tooltip>
              ))
                      )
                      : (
              <ToolsFileExtensionCard fileType={fileType[0]} />
            )}

            </div>
  );
};

export default MergePdfChildrenSection;
