import ToolsFileExtensionCard from "@/components/tools/tools_file_extension_card";
import useMergePdfStore from "../../../pages/tools/merge_pdf/merge_pdf_store";
import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";
import useToolsStore from "../../../pages/tools/tools_store";
import PdfRenderer from "@/components/pdf_renderer";

const MergePdfChildrenSection = () => {
  const { selectedFiles,  selectedIndex } = useToolsStore();

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
      values={[selectedFiles[selectedIndex]?.fileUrl]}
      onReorder={recorderFiles}
      className="center w-full flex-wrap gap-4"
    >
      {selectedFiles[selectedIndex]?.fileType[0] === "pdf" ? (
        selectedFiles.map((file, index) => (
          <Reorder.Item
            as="div"
            key={index}
            value={file.fileUrl}
            className="relative bg-[green w-full] p-2"
          >
            {/* <Tooltip>
              <TooltipTrigger className="p-3 h-full min-h-36 max-w-56 min-w-0 w-48.5">
                <Tooltip>
                  <TooltipTrigger
                    asChild
                    onClick={() => removeSelectedFiles(file.fileUrl)}
                    className="items-center absolute top-1 hover:shadow right-1 z-30 bg-secondary p-1 text-primary-foreground cursor-pointer justify-center group-hover:opacity-100 duration-500 flex opacity-0 rounded-full w-8 h-8"
                  >
                    <XIcon className="w-4 h-4" />
                  </TooltipTrigger>
                  <TooltipContent className="text-white">
                    <p>Remove File</p>
                  </TooltipContent>
                </Tooltip> */}
                <PdfRenderer
                  className={`p-3 w-min mx-auto my-auto`}
                  label={selectedFiles[index].fileName}
                  file={file.fileUrl}
                  pageNumber={"1"}
                  index={index}
                />
              {/* </TooltipTrigger>
              <TooltipContent className="text-white">
                <p className="text-[13px]">
                  {`${
                    Math.round(selectedFiles[index]?.fileSize / (1024 * 1024)) <
                    1
                      ? Number(selectedFiles[index]?.fileSize / 1024).toFixed(2) + "KB"
                      : Number(selectedFiles[index]?.fileSize / (1024 * 1024)).toFixed(2) + "MB"
                  }`}
                </p>
              </TooltipContent> */}
            {/* </Tooltip> */}
          </Reorder.Item>
        ))
      ) : (
        <ToolsFileExtensionCard
          fileType={selectedFiles[selectedIndex]?.fileType[0]}
        />
      )}
    </Reorder.Group>
  );
};

export default MergePdfChildrenSection;
