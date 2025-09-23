import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import { Check } from "lucide-react";
import { useState } from "react";
import useToolsStore from "../tools_store";

const PdfToJpg = () => {
  const { PdfToJpg, selectedFiles } = useToolsStore();
  const [imageQuality, setImageQuality] = useState("low");
  return (
    <div className=" to-primary/5 min-h-dvh from-white bg-gradient-to-t to-80% dark:from-primary dark:to-[rgb(4,9,30)]">
      <ConverterLayout
        handleFileUpload={() => PdfToJpg(selectedFiles, imageQuality)}
        actionButtonText="Convert to JPG"
        convertingStateText="Converting Pdf to Jpg"
        label="Convert Pdf to Jpg"
        desc="Convert PDFs to Jpg imagselectedIndexes"
        actionMenuSideBar={
          <div className="h-dvh">
            <div
              onClick={() => setImageQuality("high")}
              className={`py-5 duration-300 cursor-pointer px-4  border-b ${
                imageQuality === "high" &&
                "bg-muted dark:bg-primary hover:bg-muted/80 dark:hover:bg-primary/5"
              }`}
            >
              <p className="text-lg font-medium text-accent">High Quality</p>

              <div className="flex items-start justify-between">
                <p className="text-base text-secondary-foreground flex-1">
                  Convert PDFs to high-quality JPG images.
                </p>
                <span
                  className={`${
                    imageQuality === "high" ? "flex" : "hidden"
                  } items-center justify-center rounded-full w-7.5 h-7.5 bg-[#4acd86]`}
                >
                  <Check className="w-4 h-4 text-white text-xl" />
                </span>
              </div>
            </div>

            <div
              onClick={() => setImageQuality("medium")}
              className={`py-5 duration-300 cursor-pointer px-4  border-b ${
                imageQuality === "medium" &&
                "bg-muted dark:bg-primary hover:bg-muted/80 dark:hover:bg-primary/5"
              }`}
            >
              <p className="text-lg font-medium text-accent">
                Standard Quality
              </p>

              <div className="flex items-start justify-between">
                <p className="text-base text-secondary-foreground flex-1">
                  Convert PDFs to standard-quality JPG images.
                </p>
                <span
                  className={`${
                    imageQuality === "medium" ? "flex" : "hidden"
                  } items-center justify-center rounded-full w-7.5 h-7.5 bg-[#4acd86]`}
                >
                  <Check className="w-4 h-4 text-white text-xl" />
                </span>
              </div>
            </div>

            <div
              onClick={() => setImageQuality("low")}
              className={`py-5 duration-300 cursor-pointer px-4  border-b ${
                imageQuality === "low" &&
                "bg-muted dark:bg-primary hover:bg-muted/80 dark:hover:bg-primary/5"
              }`}
            >
              <p className="text-lg font-medium text-accent">Low Quality</p>

              <div className="flex items-start justify-between">
                <p className="text-base text-secondary-foreground flex-1">
                  Convert PDFs to low-quality JPG images.
                </p>
                <span
                  className={`${
                    imageQuality === "low" ? "flex" : "hidden"
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
};

export default PdfToJpg;
