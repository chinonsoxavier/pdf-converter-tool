import ConverterLayout from "@/components/tools/layout_types/converter_layout";
const PdfToPowerpoint = () => {
  return (
    <div className=" to-primary/5 min-h-dvh from-white bg-gradient-to-t to-80% dark:from-primary dark:to-[rgb(4,9,30)]">
      <ConverterLayout
        // handleFileUpload={() =>{}}
        actionButtonText="Convert Pdf to Powerpoint"
        convertingStateText="Converting Pdf to Powerpoint"
        label="Convert Pdf to Powerpoint"
        desc="Accurate table extraction"
        fileType={["pdf"]}
      />
    </div>
  );
};

export default PdfToPowerpoint;
