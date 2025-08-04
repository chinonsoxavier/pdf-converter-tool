import ConverterLayout from "@/components/tools/layout_types/converter_layout";

const PdfToJpg = () => {
  return (
    <div className=" to-primary/5 min-h-lvh from-white bg-gradient-to-t to-80% dark:from-primary dark:to-[rgb(4,9,30)]">
      <ConverterLayout
        actionButtonText="Convert Pdf to Jpg"
        convertingStateText="Converting Pdf to Jpg"
        label="Convert Pdf to Jpg"
        desc="Convert PDFs to Jpg images"
      />
    </div>
  );
}

export default PdfToJpg