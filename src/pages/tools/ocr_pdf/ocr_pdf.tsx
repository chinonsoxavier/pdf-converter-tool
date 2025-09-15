import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import { MultiSelectDropdown } from "@/components/ui/multiple_select_dropdown";
import { languages } from "@/constants/data";
import useOCRPdfStore from "./ocr_pdf_store";
const OcrPdf = () => {
  const {setselectedLanguages} = useOCRPdfStore();
  return (
    <div className="">
      <ConverterLayout
        // handleFileUpload={() => ReorderPages(selectedFiles)}
        actionButtonText="OCR Pdf"
        convertingStateText="Converting pdf to editable document"
        label="Ocr Pdf options"
        desc="Turn scanned PDFs/images into editable text"
        actionMenuSideBar={
          <div className="p-4 space-y-3" >
            <div className="flex items-center justify-between">
              <p className="text-primary-foreground text-lg">
                Document languages
              </p>
              <p className="text-primary-foreground text-lg">1/3</p>
            </div>
            <MultiSelectDropdown
              options={languages}
              placeholder="Select technologies..."
              maxSelections={3}
              onSelectionChange={(selected) => {
                setselectedLanguages(selected)
                console.log("Selected items:", selected);
              }}
            />
          </div>
        }
      />
    </div>
  );
}

export default OcrPdf