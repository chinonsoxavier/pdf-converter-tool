import ConverterLayout from "@/components/tools/layout_types/converter_layout";

const RotatePdf = () => {
  return (
    <div className=" to-primary/5 min-h-lvh from-white bg-gradient-to-t to-80% dark:from-primary dark:to-[rgb(4,9,30)]">
      <ConverterLayout
        actionButtonText="Rotate Pdf"
        convertingStateText="Rotate Pdf"
        label="Rotate Pdf pages"
        desc="Rotate one or more pages"
      />
    </div>
  );
}

export default RotatePdf