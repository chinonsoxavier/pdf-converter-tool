import ToolsFileExtensionCard from "@/components/tools/tools_file_extension_card";
import { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import useToolsStore from "../../../pages/tools/tools_store";
import useSplitPdfStore from "../../../pages/tools/split_pdf/split_pdf_store";
import SplitPdfRangeLayout from "@/components/tools/split_pdf/split_pdf_range_layout";
import SplitPdfPageLayout from "@/components/tools/split_pdf/split_pdf_page_layout";
import SplitPdfSizeLayout from "@/components/tools/split_pdf/split_pdf_size_layout";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const SplitPdfChildrenSection = () => {
  const {
    selectedFiles,
    fileType,
  } = useToolsStore();
  const [newItemText, setNewItemText] = useState(selectedFiles);
  const { splitMethod } = useSplitPdfStore();

  useEffect(() => {
    setNewItemText(selectedFiles);
    console.log(newItemText);
    console.log(selectedFiles);
  }, [selectedFiles]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-7">
      {/* {selectedFiles} */}
      {/* {numPages}"numpages" */}
      {/* <DraggableContainer/> */}
      {fileType[0] === "pdf" ? (
        splitMethod === "Range" ? (
          <SplitPdfRangeLayout />
        ) : splitMethod === "Pages" ? (
          <SplitPdfPageLayout />
        ) : (
          <SplitPdfSizeLayout />
        )
      ) : (
        <ToolsFileExtensionCard fileType={fileType[0]} />
      )}
    </div>
  );
};

export default SplitPdfChildrenSection;
