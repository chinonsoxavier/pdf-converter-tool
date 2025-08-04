import ConverterLayout from "@/components/tools/layout_types/converter_layout";

const JpgToPdf = () => {
  return (
    <div className=" to-primary/5 min-h-lvh from-white bg-gradient-to-t to-80% dark:from-primary dark:to-[rgb(4,9,30)]">
      <ConverterLayout
        actionButtonText="Convert Jpg to Pdf"
        convertingStateText="Converting Jpg to Pdf"
        label="Convert Jpg to Pdf"
        desc="Convert JPGs to Pdf files"
      />
    </div>
  );
}


export default JpgToPdf