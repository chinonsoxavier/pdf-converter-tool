import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import useToolsStore from "../tools_store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useAddPdfPageNumberStore from "./add_pdf_page_number_store";
import { Input } from "@/components/ui/input";

const AddPdfPageNumber = () => {
    const { selectedFiles } = useToolsStore();
    
    const { setNumberPosition, setMargin, numberPosition,margin } =
      useAddPdfPageNumberStore();

  return (
    <ConverterLayout
      //   children={<MergePdfChildrenSection />}
      actionButtonText="Add Page Numbers"
      label="Add pdf page numbers "
      desc="Insert page numbers automatically"
      disabled={selectedFiles.length <= 1}
      convertingStateText="Merging PDF files"
      actionMenuSideBar={
        <div className="px-4 py-6 space-y-5 sm:space-y-10">
          <div className="flex items-start justify-between gap-5 sm:gap-10">
            <div className="space-y-2">
              <p>Position</p>
              <div className="w-24 h-24 grid grid-cols-3">
                <div
                  onClick={() => setNumberPosition(1)}
                  className={`${
                    numberPosition === 1 && "bg-accent"
                  } dark:border-white/50 border`}
                ></div>
                <div
                  onClick={() => setNumberPosition(2)}
                  className={`${
                    numberPosition === 2 && "bg-accent"
                  } dark:border-white/50 border`}
                ></div>
                <div
                  onClick={() => setNumberPosition(3)}
                  className={`${
                    numberPosition === 3 && "bg-accent"
                  } dark:border-white/50 border`}
                ></div>
                {/*  */}
                <div className="dark:border-white/50 border-l"></div>
                <div className=""></div>
                <div className="dark:border-white/50 border-r"></div>
                {/*  */}
                <div
                  onClick={() => setNumberPosition(4)}
                  className={`${
                    numberPosition === 4 && "bg-accent"
                  } dark:border-white/50 border`}
                ></div>
                <div
                  onClick={() => setNumberPosition(5)}
                  className={`${
                    numberPosition === 5 && "bg-accent"
                  } dark:border-white/50 border`}
                ></div>
                <div
                  onClick={() => setNumberPosition(6)}
                  className={`${
                    numberPosition === 6 && "bg-accent"
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
                  <p>Start numbering at:</p>
                  <Input defaultValue={1} />

              </div>
        </div>
      }
    />
  );
};

export default AddPdfPageNumber;
