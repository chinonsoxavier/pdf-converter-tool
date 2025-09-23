import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import useToolsStore from "../tools_store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useAddPdfPageNumberStore from "./add_pdf_page_number_store";
import { Input } from "@/components/ui/input";

const AddPdfPageNumber = () => {
  const { selectedFiles, AddPageNumbers } = useToolsStore();

  const {
    setNumberPosition,
    setMargin,
    numberPosition,
    margin,
    setStartPosition,
    setFontSize,
    setFontColor,
    fontColor,
    fontSize
  } = useAddPdfPageNumberStore();

  return (
    <ConverterLayout
      //   children={<MergePdfChildrenSection />}
      actionButtonText="Add Page Numbers"
      label="Add pdf page numbers"
      handleFileUpload={() => AddPageNumbers(selectedFiles)}
      desc="Insert page numbers automatically"
      disabled={selectedFiles.length <= 0}
      convertingStateText="Adding PDF page numbers"
      actionMenuSideBar={
        <div className="px-4 py-6 space-y-2 sm:space-y-5">
          <div className="flex items-start justify-between gap-5 sm:gap-10">
            <div className="space-y-2">
              <p>Position</p>
              <div className="w-24 h-24 grid grid-cols-3">
                <div
                  onClick={() => setNumberPosition("top-left")}
                  className={`${
                    numberPosition === "top-left" && "bg-accent"
                  } dark:border-white/50 border`}
                ></div>
                <div
                  onClick={() => setNumberPosition("top-center")}
                  className={`${
                    numberPosition === "top-center" && "bg-accent"
                  } dark:border-white/50 border`}
                ></div>
                <div
                  onClick={() => setNumberPosition("top-right")}
                  className={`${
                    numberPosition === "top-right" && "bg-accent"
                  } dark:border-white/50 border`}
                ></div>
                {/*  */}
                <div className="dark:border-white/50 border-l"></div>
                <div className=""></div>
                <div className="dark:border-white/50 border-r"></div>
                {/*  */}
                <div
                  onClick={() => setNumberPosition("bottom-left")}
                  className={`${
                    numberPosition === "bottom-left" && "bg-accent"
                  } dark:border-white/50 border`}
                ></div>
                <div
                  onClick={() => setNumberPosition("bottom-center")}
                  className={`${
                    numberPosition === "bottom-center" && "bg-accent"
                  } dark:border-white/50 border`}
                ></div>
                <div
                  onClick={() => setNumberPosition("bottom-right")}
                  className={`${
                    numberPosition === "bottom-right" && "bg-accent"
                  } dark:border-white/50 border`}
                ></div>
              </div>
            </div>

            <div className="space-y-2 flex-1">
              <p>Margin</p>
              <Select
                value={margin}
                defaultValue="Recommended"
                onValueChange={(value) =>
                  setMargin(value as "Small" | "Recommended" | "Big")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue className="" placeholder="Recommended" />
                </SelectTrigger>
                <SelectContent className="">
                  <SelectItem value="Small">Small</SelectItem>
                  <SelectItem value="Recommended">Recommended</SelectItem>
                  <SelectItem value="Big">Big</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-primary-foreground font-semibold text-lg">
              Start numbering at:
            </p>
            <Input
              onChange={(e) => setStartPosition(parseInt(e.target.value, 10))}
              defaultValue={1}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Font Size
            </label>
            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="8">8pt</SelectItem>
                <SelectItem value="10">10pt</SelectItem>
                <SelectItem value="12">12pt</SelectItem>
                <SelectItem value="14">14pt</SelectItem>
                <SelectItem value="16">16pt</SelectItem>
                <SelectItem value="18">18pt</SelectItem>
                <SelectItem value="20">20pt</SelectItem>
                <SelectItem value="24">24pt</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Font Color
            </label>
            <div className="flex items-center gap-3">
              <Input
                type="color"
                value={fontColor}
                onChange={(e) => setFontColor(e.target.value)}
                className="w-16 h-9 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={fontColor}
                onChange={(e) => setFontColor(e.target.value)}
                placeholder="#000000"
                className="flex-1 font-mono text-sm"
              />
            </div>
          </div>
        </div>
      }
    />
  );
};

export default AddPdfPageNumber;
