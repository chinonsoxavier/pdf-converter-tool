import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import { Check } from "lucide-react";
import { useState } from "react";
import useToolsStore from "../tools_store";

const CompressPdf = () => {
    const [compressionOption, setCompressionOption] = useState('Medium');
  const { compressPdf,selectedFiles } = useToolsStore();
  return (
    <div className=" to-primary/5 min-h-lvh from-white bg-gradient-to-t to-80% dark:from-primary dark:to-[rgb(4,9,30)]">
      <ConverterLayout
        actionButtonText="Compress File"
        convertingStateText="Compressing Pdf File"
        label="Compress Pdf File"
        handleFileUpload={() => compressPdf(selectedFiles, compressionOption)}
        desc="Reduce file size without losing quality"
        actionMenuSideBar={
          <div className="">
            <div
              onClick={() => setCompressionOption("High")}
              className={`py-5 duration-300 cursor-pointer px-4  border-b ${
                compressionOption === "High" &&
                "bg-muted dark:bg-primary hover:bg-muted/80 dark:hover:bg-primary/5"
              }`}
            >
              <p className="text-lg font-medium text-accent">
                High Compression
              </p>

              <div className="flex items-start justify-between">
                <p className="text-base text-secondary-foreground flex-1">
                  Convert PDFs with selectable text into editable Word files.
                </p>
                <span
                  className={`${
                    compressionOption === "High" ? "flex" : "hidden"
                  } items-center justify-center rounded-full w-7.5 h-7.5 bg-[#4acd86]`}
                >
                  <Check className="w-4 h-4 text-white text-xl" />
                </span>
              </div>
            </div>

            <div
              onClick={() => setCompressionOption("Medium")}
              className={`py-5 duration-300 cursor-pointer px-4  border-b ${
                compressionOption === "Medium" &&
                "bg-muted dark:bg-primary hover:bg-muted/80 dark:hover:bg-primary/5"
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
                    compressionOption === "Medium" ? "flex" : "hidden"
                  } items-center justify-center rounded-full w-7.5 h-7.5 bg-[#4acd86]`}
                >
                  <Check className="w-4 h-4 text-white text-xl" />
                </span>
              </div>
            </div>

            <div
              onClick={() => setCompressionOption("Low")}
              className={`py-5 duration-300 cursor-pointer px-4  border-b ${
                compressionOption === "Low" &&
                "bg-muted dark:bg-primary hover:bg-muted/80 dark:hover:bg-primary/5"
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
                    compressionOption === "Low" ? "flex" : "hidden"
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