import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import { Check } from "lucide-react";
import { useState } from "react";

const CompressPdf = () => {
    const [compressionOption, setCompressionOption] = useState('recommended');
  
  return (
    <div className=" to-primary/5 min-h-lvh from-white bg-gradient-to-t to-80% dark:from-primary dark:to-[rgb(4,9,30)]">
      <ConverterLayout
        actionButtonText="Compress File"
        convertingStateText="Compressing Pdf File"
        label="Compress Pdf File"
        desc="Reduce file size without losing quality"
        actionMenuSideBar={
          <div className="">
            <div
              onClick={() => setCompressionOption("extreme")}
              className={`py-5 duration-300 cursor-pointer px-4  border-b ${
                compressionOption === "extreme" &&
                "bg-muted dark:bg-primary hover:bg-muted/6 dark:hover::bg-primary/5"
              }`}
            >
              <p className="text-lg font-medium text-accent">
                Extreme Compression
              </p>

              <div className="flex items-start justify-between">
                <p className="text-base text-secondary-foreground flex-1">
                  Convert PDFs with selectable text into editable Word files.
                </p>
                <span
                  className={`${
                    compressionOption === "extreme" ? "flex" : "hidden"
                  } items-center justify-center rounded-full w-7.5 h-7.5 bg-[#4acd86]`}
                >
                  <Check className="w-4 h-4 text-white text-xl" />
                </span>
              </div>
            </div>

            <div
              onClick={() => setCompressionOption("recommended")}
              className={`py-5 duration-300 cursor-pointer px-4  border-b ${
                compressionOption === "recommended" &&
                "bg-muted dark:bg-primary hover:bg-muted/6 dark:hover::bg-primary/5"
              }`}
            >
              <p className="text-lg font-medium text-accent">
                Recommended Compression
              </p>

              <div className="flex items-start justify-between">
                <p className="text-base text-secondary-foreground flex-1">
                  Convert PDFs with selectable text into editable Word files.
                </p>
                <span
                  className={`${
                    compressionOption === "recommended" ? "flex" : "hidden"
                  } items-center justify-center rounded-full w-7.5 h-7.5 bg-[#4acd86]`}
                >
                  <Check className="w-4 h-4 text-white text-xl" />
                </span>
              </div>
            </div>

            <div
              onClick={() => setCompressionOption("less")}
              className={`py-5 duration-300 cursor-pointer px-4  border-b ${
                compressionOption === "less" &&
                "bg-muted dark:bg-primary hover:bg-muted/6 dark:hover::bg-primary/5"
              }`}
            >
              <p className="text-lg font-medium text-accent">
                Less Compression
              </p>
              <div className="flex items-start justify-between">
                <p className="text-base text-secondary-foreground flex-1">
                  Convert PDFs with selectable text into editable Word files.
                </p>
                <span
                  className={`${
                    compressionOption === "less" ? "flex" : "hidden"
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

export default CompressPdf