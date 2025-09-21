import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { useState } from "react";
import useToolsStore from "../tools_store";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import usePdfToImageStore from "./pdf_to_image_store";
const PdfToImage = () => {
    const {selectedFiles} = useToolsStore();
    const { orientation, setOrientation, setPagesToConvert, convertAllPages,setConvertAllPages} =
      usePdfToImageStore();
  const [imageQuality, setImageQuality] = useState("low");
  const maxPages = selectedFiles[0]?.numPages || 20; // Fallback to 20 if numPages is unavailable

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConvertAllPages(false);
    setPagesToConvert(e.target.value, maxPages);
  };

  return (
    <div className=" to-primary/5 min-h-dvh from-white bg-gradient-to-t to-80% dark:from-primary dark:to-[rgb(4,9,30)]">
      <ConverterLayout
        // handleFileUpload={() =>{}}
        actionButtonText="Convert Pdf to Image"
        convertingStateText="Converting Pdf to Image"
        label="High-Resolution PDF to Image"
        desc="supports 300–600 DPI export"
        fileType={["pdf"]}
        actionMenuSideBar={
          <div>
            <div className="flex gap-3 pb-2 pt-4 px-2" >
             <Label>Convert All Pages</Label>
            <Input onChange={()=>{setConvertAllPages(!convertAllPages)}} className="h-4 w-4" type="checkbox" />
            </div>
{
    convertAllPages &&

            <div className="p-2 space-y-2">
              <p>Pages to convert:</p>
              <Input
                onChange={handleInputChange}
                placeholder={`Example: 1,5-8 (1-${maxPages})`}
              />
            </div>

}

            <div className="p-2 space-y-2">
              <Label>Converion format</Label>
              <Select
                value={orientation}
                onValueChange={(value) =>
                  setOrientation(value as "portrait" | "landscape")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue className="" placeholder="Orientation" />
                </SelectTrigger>
                <SelectContent className="">
                  <SelectItem value="portrait">Portrait</SelectItem>
                  <SelectItem value="landscape">Landscape</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <div
                onClick={() => setImageQuality("high")}
                className={`py-3 duration-300 cursor-pointer px-4  border-b ${
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
                className={`py-3 duration-300 cursor-pointer px-4  border-b ${
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
                className={`py-3 duration-300 cursor-pointer px-4  border-b ${
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
          </div>
        }
      />
    </div>
  );
};

export default PdfToImage;
