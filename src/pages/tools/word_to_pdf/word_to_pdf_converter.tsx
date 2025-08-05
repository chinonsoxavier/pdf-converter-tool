import ConverterLayout from "@/components/tools/layout_types/converter_layout";
const WordToPdfConverter = () => {

  return (
    <div className=" to-primary/5 min-h-lvh from-white bg-gradient-to-t to-80% dark:from-primary dark:to-[rgb(4,9,30)]">
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
