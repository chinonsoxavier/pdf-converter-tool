import ToolsFileExtensionCard from "@/components/tools/tools_file_extension_card";
import { useEffect } from "react";
import useToolsStore from "../../../pages/tools/tools_store";
import SplitPdfRangeLayout from "@/components/tools/split_pdf/split_pdf_range_layout";
const SplitPdfChildrenSection = () => {
  const { selectedFiles, selectedIndex } = useToolsStore();

  useEffect(() => {
    console.log(selectedFiles);
  }, [selectedFiles]);

  return (
    <div className="flex w-full flex-wrap h-full items-start justify-start">
      {selectedFiles[selectedIndex]?.fileType[0] === "pdf" ? (
          <SplitPdfRangeLayout />
      ) : (
        <ToolsFileExtensionCard
          fileType={selectedFiles[selectedIndex]?.fileType[0]}
        />
      )}
    </div>
  );
};

export default SplitPdfChildrenSection;
