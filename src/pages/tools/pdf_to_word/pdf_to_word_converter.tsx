import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import { Check, Crown } from "lucide-react";
import { useState } from "react";

const PdfToWordConverter = () => {
  const [OCR, setOCR] = useState(false);

  return (
    <div className="">
      <ConverterLayout
        actionButtonText="Convert Pdf To Word"
        label="Pdf To Word Converter"
        desc="Convert PDFs to editable Word documents"
        convertingStateText="Converting PDF To Word"
        actionMenuSideBar={
          <div className="">
            <div
              onClick={() => setOCR(!true)}
              className={`py-5 duration-300 cursor-pointer px-4  border-b ${
                !OCR &&
                "bg-muted dark:bg-primary hover:bg-muted/80 dark:hover:bg-primary/5"
              }`}
            >
              <p className="text-lg font-medium text-accent">NO OCR</p>
              <div className="flex items-start justify-between">
                <p className="text-base text-secondary-foreground flex-1">
                  Convert PDFs with selectable text into editable Word files.
                </p>
                <span
                  className={`${
                    !OCR ? "flex" : "hidden"
                  } items-center justify-center rounded-full w-7.5 h-7.5 bg-[#4acd86]`}
                >
                  <Check className="w-4 h-4 text-white text-xl" />
                </span>
              </div>
            </div>

            <div
              onClick={() => setOCR(true)}
              className={`py-5 duration-300 cursor-pointer px-4  border-b ${
                OCR &&
                "bg-muted dark:bg-primary hover:bg-muted/80 dark:hover:bg-primary/5"
              }`}
            >
              <p className="text-lg font-medium gap-1 text-accent flex items-center">
                OCR
                <span className="center rounded-full w-6 h-6 p-1 bg-orange-500">
                  <Crown className="text-white text-xs" />
                </span>
              </p>
              <div className="flex items-start justify-between">
                <p className="text-base text-secondary-foreground flex-1">
                  Convert PDFs with selectable text into editable Word files.
                </p>
                <span
                  className={`${
                    OCR ? "flex" : "hidden"
                  } items-center justify-center rounded-full w-7.5 h-7.5 bg-[#4acd86]`}
                >
                  <Check className="w-4 h-4 text-white text-xl" />
                </span>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default PdfToWordConverter