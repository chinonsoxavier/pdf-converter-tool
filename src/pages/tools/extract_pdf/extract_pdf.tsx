import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import useToolsStore from "../tools_store";
import ExtractPdfChildrenSection from "../../../components/tools/extract_pdf/extract_pdf_children_section";
import { Button } from "@/components/ui/button";
import useExtractPdfStore from "./extract_pdf_store";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const ExtractPdf = () => {

  const { selectedFiles } = useToolsStore();
  const { extractMode,setExtractMode } = useExtractPdfStore();

 

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
          <p className="text-primary-foreground font-semibold mt-4 px-4 text-lg">
            Range Mode:
          </p>
          <div className="center gap-4 p-4 py-6">
            <Button
              onClick={() => setExtractMode("all")}
              className="w-full"
              variant={`${extractMode === "all" ? "default" : "outline"}`}
            >
              Extract all pages
            </Button>
            <Button
              onClick={() => {
                setExtractMode("selected");
              }}
              className="w-full"
              variant={`${extractMode === "selected" ? "default" : "outline"}`}
            >
              Select pages
            </Button>
          </div>
          <div className="bg-secondary rounded mx-4 p-4 text-[15px]">
            Selected pages will be converted into separate PDF files. PDF will
            be created.
          </div>

          {extractMode === "selected" && (
            <div className="p-4 space-y-2">
              <p className="text-primary-foreground font-semibold text-lg">
                Pages to extract:
              </p>
              <div>
                <Input placeholder="Example:1,5-8" />
              </div>
              <div className="flex justify-start py-2 w-full items-start">
                <Checkbox id="extract_mode" />
                <Label
                  htmlFor="extract_mode"
                  className="text-secondary-foreground  ml-2"
                >
                  Extract all pages
                </Label>
              </div>
            </div>
          )}
        </div>
      }
      //   buttonDisabled={}
    />
  );
};

export default ExtractPdf;
