import ToolsFileExtensionCard from "@/components/tools/tools_file_extension_card";
import { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import useToolsStore from "../../../pages/tools/tools_store";
import SplitPdfRangeLayout from "@/components/tools/split_pdf/split_pdf_range_layout";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const SplitPdfChildrenSection = () => {
  const { selectedFiles, selectedIndex } = useToolsStore();
  const [newItemText, setNewItemText] = useState(selectedFiles);

  useEffect(() => {
    setNewItemText(selectedFiles);
    console.log(newItemText);
    console.log(selectedFiles);
  }, [selectedFiles]);

  return (
    <div className="flex flex-wrap h-full items-start justify-start gap-7">
      {/* {selectedFiles} */}
      {/* {numPages}"numpages" */}
      {/* <DraggableContainer/> */}
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
