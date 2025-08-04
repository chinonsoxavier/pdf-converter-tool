import ConverterLayout from "@/components/tools/layout_types/converter_layout";

const PdfToWordConverter = () => {


  return (
    <div className="">
      <ConverterLayout
        actionButtonText="Convert Pdf To Word"
        label="Pdf To Word Converter"
        desc="Convert PDFs to editable Word documents"
        convertingStateText="Converting PDF To Word"
        
      />
        
    </div>
  );
}

export default PdfToWordConverter