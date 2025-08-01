import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import { useState } from "react";
const WordToPdfConverter = () => {
  const [file, setFile] = useState(null);

  return (
    <div className=" to-primary/5 min-h-lvh from-white bg-gradient-to-t to-80% dark:from-primary dark:to-[rgb(4,9,30)]">
      <ConverterLayout
        actionButtonText="Convert Word To Pdf"
        convertingStateText="Converting Word To Pdf"
        label="Word To Pdf Converter"
        desc="Convert Word Documents to Pdf"
        fileType={["doc", "docx"]}
        file={file}
        setFile={setFile}
      />
    </div>
  );
};

export default WordToPdfConverter;
