import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import { useState } from "react";
import MergePdfChildrenSection from "./merge_pdf_children_section";
import useMergePdfStore from "./merge_pdf_store";

const MergePdf = () => {
  const { selectedFiles,setSelectedFiles,setFileName,setFileSize,fileNames,fileSize } = useMergePdfStore();
  // const [file, setFile] = useState(null);
  // alert(selectedFiles.length)

  return (
    <ConverterLayout
      children={<MergePdfChildrenSection />}
      actionButtonText="Merge Pdf"
      label="Merge PDF files"
      desc="Combine PDF files online for free in just seconds."
      fileType={["pdf"]}
      file={selectedFiles}
      disabled={selectedFiles.length <= 1}
      setFile={setSelectedFiles}
      setFileName={setFileName}
      setFileSize={setFileSize}
      fileName={fileNames[0]}
      fileSize={fileSize[0]}
      // setProcessingTool={() => {}}
      // processingTool={false}
      // convertingTool={false}
      // convertingToolText="Merging PDF files"

      convertingStateText="Merging PDF files"
      actionMenuSideBar={
        <div className="p-3">
          <div className="bg-secondary rounded-md p-3">
            <p className="font-medium text-secondary-foreground">
              Please, select more PDF files by clicking again on ’Select PDF
              files’.
            </p>
          </div>
        </div>
      }
      //   buttonDisabled={}
    />
  );
};

export default MergePdf;
