import ConverterLayout from "@/components/tools/layout_types/converter_layout";

const CompressPdf = () => {
  return (
    <div className=" to-primary/5 min-h-lvh from-white bg-gradient-to-t to-80% dark:from-primary dark:to-[rgb(4,9,30)]">
      <ConverterLayout
        actionButtonText="Compress File"
        convertingStateText="Compressing Pdf File"
        label="Compress Pdf File"
        desc="Reduce file size without losing quality"
      />
    </div>
  );
}

export default CompressPdf