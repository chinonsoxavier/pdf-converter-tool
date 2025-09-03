import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import useToolsStore from "../tools_store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import useAddHeaderFooterStore from "./add_header_footer_store";

const AddHeaderFooter = () => {
  const { selectedFiles,AddPageHeaderFooter } = useToolsStore();
  const {
    fontColor,
    fontSize,
    setFontColor,
    setFontSize,
    setHeaderFooterPosition,
    HeaderFooterPosition,
    setCustomText,
    setMargin,
    customizationStyle,
    setCustomizationStyle,
    setStartFrom,
    margin,
  } = useAddHeaderFooterStore();

  return (
    <ConverterLayout
      //   children={<MergePdfChildrenSection />}
      actionButtonText="Add Page Numbers"
      handleFileUpload={()=>AddPageHeaderFooter(selectedFiles)}
      label="Add pdf page numbers "
      desc="Insert page numbers automatically"
      disabled={selectedFiles.length <= 0}
      convertingStateText="Merging PDF files"
      actionMenuSideBar={
        <div className="px-4 py-6 space-y-3">
          <div className="flex items-start justify-between gap-5 sm:gap-10">
            <div className="space-y-2">
              <p>Position</p>
              <div className="w-24 h-24 grid grid-cols-3">
                <div
                  onClick={() => setHeaderFooterPosition(1)}
                  className={`${
                    HeaderFooterPosition === 1 && "bg-accent"
                  } dark:border-white/50 border`}
                ></div>
                <div
                  onClick={() => setHeaderFooterPosition(2)}
                  className={`${
                    HeaderFooterPosition === 2 && "bg-accent"
                  } dark:border-white/50 border`}
                ></div>
                <div
                  onClick={() => setHeaderFooterPosition(3)}
                  className={`${
                    HeaderFooterPosition === 3 && "bg-accent"
                  } dark:border-white/50 border`}
                ></div>
                {/*  */}
                <div className="dark:border-white/50 border-l"></div>
                <div className=""></div>
                <div className="dark:border-white/50 border-r"></div>
                {/*  */}
                <div
                  onClick={() => setHeaderFooterPosition(4)}
                  className={`${
                    HeaderFooterPosition === 4 && "bg-accent"
                  } dark:border-white/50 border`}
                ></div>
                <div
                  onClick={() => setHeaderFooterPosition(5)}
                  className={`${
                    HeaderFooterPosition === 5 && "bg-accent"
                  } dark:border-white/50 border`}
                ></div>
                <div
                  onClick={() => setHeaderFooterPosition(6)}
                  className={`${
                    HeaderFooterPosition === 6 && "bg-accent"
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
          <div className="space-y-2 flex-1">
            <p>Customisation Style</p>
            <Select
              value={customizationStyle}
              defaultValue="Page 1,Page 2,Page 3"
              onValueChange={(value) =>
                setCustomizationStyle(
                  value as
                    | "Page 1,Page 2,Page 3"
                    | "Page I,Page II,Page III"
                    | "Page 1 of 20,Page 2 of 20,Page 3,Page 20"
                    | "Filename on each page"
                    | "Custom Text"
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue className="" placeholder="Page 1,Page 2,Page 3" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="Page 1,Page 2,Page 3">
                  Page 1,Page 2,Page 3
                </SelectItem>
                <SelectItem value="Page I,Page II,Page III">
                  Page I,Page II,Page III
                </SelectItem>
                <SelectItem value="Page 1 of 20,Page 2 of 20,Page 3,Page 20">
                  Page 1 of 20,Page 2 of 20,Page 3,Page 20
                </SelectItem>
                <SelectItem value="Filename on each page">
                  Filename on each page
                </SelectItem>
                <SelectItem value="Custom Text">Custom Text</SelectItem>
              </SelectContent>
            </Select>
            {customizationStyle === "Custom Text" && (
              <div className="space-y-2">
                <p>Custom Text:</p>
                <Input
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="custom text"
                />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <p>Start numbering at:</p>
            <Input
              onChange={(e) => setStartFrom(parseInt(e.target.value))}
              defaultValue={1}
              placeholder="1"
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

export default AddHeaderFooter;
