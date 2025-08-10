import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import useToolsStore from "../tools_store";
import ExtractPdfChildrenSection from "../../../components/tools/extract_pdf/extract_pdf_children_section";

const ExtractPdf = () => {

  const {selectedFiles}=useToolsStore()
 

  return (
    <ConverterLayout
      children={<ExtractPdfChildrenSection />}
      actionButtonText="Extract Pdf"
      label="Extract PDF Files"
      desc="Separate one page or a whole set for easy conversion into independent PDF files."
      disabled={selectedFiles.length <= 1}
      convertingStateText="Extracting PDF files"
      actionMenuSideBar={
        <div>
          
      </div>
      }
      //   buttonDisabled={}
    />
  );
};

export default ExtractPdf;
