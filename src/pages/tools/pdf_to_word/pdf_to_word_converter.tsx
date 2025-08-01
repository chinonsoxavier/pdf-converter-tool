import { PdfToWord } from "@/assets/svg/export";
import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import { useState } from "react";

const PdfToWordConverter = () => {
  
  const [file,setFile]=useState(null);

  return (
    <div className="">
      <ConverterLayout
        actionButtonText="Convert Pdf To Word"
        label="Pdf To Word Converter"
        desc="Convert PDFs to editable Word documents"
        fileType={['pdf']}
        file={file}
        setFile={setFile}
        convertingStateText="Converting PDF To Word"
      />
        
    </div>
  );
}

export default PdfToWordConverter