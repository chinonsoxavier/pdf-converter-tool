import ConverterLayout from "@/components/tools/layout_types/converter_layout";
const WordToPdfConverter = () => {

  return (
    <div>
      <ConverterLayout
        actionButtonText="Convert Word To Pdf"
        convertingStateText="Converting Word To Pdf"
        label="Word To Pdf Converter"
        desc="Convert Word Documents to Pdf"
      />
    </div>
  );
};

export default WordToPdfConverter;
