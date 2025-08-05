import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import MergePdfChildrenSection from "../../../components/tools/merge_pdf/merge_pdf_children_section";
import useToolsStore from "../tools_store";

const MergePdf = () => {
  const { selectedFiles } = useToolsStore();

  return (
    <ConverterLayout
      children={<MergePdfChildrenSection />}
      actionButtonText="Merge Pdf"
      label="Merge PDF Files"
      desc="Combine PDF files online for free in just seconds."
      disabled={selectedFiles.length <= 1}

      convertingStateText="Merging PDF files"
      actionMenuSideBar={
        <div className="p-3">
          <div className="bg-secondary rounded-md p-3">
            <p className="font-medium text-secondary-foreground">
              Please, select more PDF files by clicking again on ’Select PDF
              files’.
            </p>
          </div>
        </div>
      }
    />
  );
};

export default MergePdf;
