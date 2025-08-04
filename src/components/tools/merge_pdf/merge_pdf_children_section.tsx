import ToolsFileExtensionCard from "@/components/tools/tools_file_extension_card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { XIcon } from "lucide-react";
import useMergePdfStore from "../../../pages/tools/merge_pdf/merge_pdf_store";
import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";
import useToolsStore from "../../../pages/tools/tools_store";
import PdfRenderer from "@/components/pdf_renderer";

const MergePdfChildrenSection = () => {
  const {
    selectedFiles,
    fileType,
    fileNames,
    fileSize,
    numPages,
    setNumPages,
    removeSelectedFiles,
  } = useToolsStore();

  const { recorderFiles } = useMergePdfStore();
  const [newItemText, setNewItemText] = useState(selectedFiles);

  useEffect(() => {
    setNewItemText(selectedFiles);
    console.log(newItemText);
    console.log(selectedFiles);
  }, [selectedFiles]);

  return (
    <Reorder.Group
      axis="x"
      values={selectedFiles}
      onReorder={recorderFiles}
      className="center flex-wrap gap-4"
    >
      {fileType[0] === "pdf" ? (
        selectedFiles.map((file, index) => (
          <Reorder.Item
            as="div"
            key={file}
            value={file}
            className="relative p-2"
          >
            <Tooltip>
              <TooltipTrigger className="p-3 h-full min-h-36 max-w-56 min-w-0 w-48.5">
                <Tooltip>
                  <TooltipTrigger
                    asChild
                    onClick={() => removeSelectedFiles(file)}
                    className="items-center absolute top-1 hover:shadow right-1 z-30 bg-secondary p-1 text-primary-foreground cursor-pointer justify-center group-hover:opacity-100 duration-500 flex opacity-0 rounded-full w-8 h-8"
                  >
                    <XIcon className="w-4 h-4" />
                  </TooltipTrigger>
                  <TooltipContent className="text-white">
                    <p>Remove File</p>
                  </TooltipContent>
                </Tooltip>
                <PdfRenderer
                  className={`p-3 w-min mx-auto my-auto`}
                  label={fileNames[index + 1]}
                  file={file}
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                  pageNumber={1}
                />
              </TooltipTrigger>
              <TooltipContent className="text-white">
                <p className="text-[13px]">
                  {(fileSize[index] || 0) +
                    " MB - " +
                    (numPages[index] || 0) +
                    " pages"}
                </p>
              </TooltipContent>
            </Tooltip>
          </Reorder.Item>
        ))
      ) : (
        <ToolsFileExtensionCard fileType={fileType[0]} />
      )}
    </Reorder.Group>
  );
};

export default MergePdfChildrenSection;
