import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import useToolsStore from "../tools_store";
const WordToPdfConverter = () => {
  const { selectedFiles,selectedIndex,convertWordToPdf} = useToolsStore();
  return (
    <div>
      <ConverterLayout
        showAllSelectedFiles
        handleFileUpload={() =>
          convertWordToPdf(selectedFiles[selectedIndex]?.file)
        }
        fileType={["docx","doc"]}
        actionButtonText="Convert Word To Pdf"
        convertingStateText="Converting Word To Pdf"
        label="Word To Pdf Converter"
        desc="Convert Word Documents to Pdf"
      />
    </div>
  );
};

export default WordToPdfConverter;
