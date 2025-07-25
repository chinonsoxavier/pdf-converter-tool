import { PdfToWord } from "@/assets/svg/export";
import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import { useState } from "react";

const PdfToWordConverter = () => {
  
  const [file,setFile]=useState(null);

  return (
    <>
      <ConverterLayout
        label="Pdf To Word Converter"
        labelIcon={PdfToWord}
        desc="Convert PDFs to editable Word documents"
        fileType="Word"
        file={file}
        setFile={setFile}
      >
        layout
      </ConverterLayout>
    </>
  );
}

export default PdfToWordConverter