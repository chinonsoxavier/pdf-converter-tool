import ConverterLayout from "@/components/tools/layout_types/converter_layout";

const OcrPdf = () => {
  return (
    <div className="">
      <ConverterLayout
        // handleFileUpload={() => ReorderPages(selectedFiles)}
        actionButtonText="OCR Pdf"
        convertingStateText="Converting pdf to editable document"
        label="Ocr Pdf options"
        desc="Turn scanned PDFs/images into editable text"
        actionMenuSideBar={
          <div>
            <div className="flex items-center justify-between p-4">
                    <p className="text-primary-foreground text-lg" >Document languages</p>
                    <p className="text-primary-foreground text-lg" >1/3</p>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default OcrPdf