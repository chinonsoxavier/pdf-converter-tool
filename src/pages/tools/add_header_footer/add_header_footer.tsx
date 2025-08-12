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
  const { selectedFiles } = useToolsStore();

  const { setHeaderFooterPosition,HeaderFooterPosition,setCustomText, setMargin, customizationStyle,setCustomizationStyle,setPagesToApply,setStartFrom, margin } =
    useAddHeaderFooterStore();

  return (
    <ConverterLayout
      //   children={<MergePdfChildrenSection />}
      actionButtonText="Add Page Numbers"
      label="Add pdf page numbers "
      desc="Insert page numbers automatically"
      disabled={selectedFiles.length <= 1}
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

          <div className="space-y-2">
            <p>Pages to apply:</p>
            <Input
              onChange={(e) => setPagesToApply([parseInt(e.target.value)])}
              defaultValue={1}
              placeholder="Example: 1,2,3-5,7-10"
            />
          </div>
        </div>
      }
    />
  );
};

export default AddHeaderFooter;
