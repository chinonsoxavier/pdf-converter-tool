import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import { useEffect, useState } from "react";
import useSplitPdfStore from "./split_pdf_store";
import SplitPdfChildrenSection from "../../../components/tools/split_pdf/split_pdf_children_section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reorder } from "framer-motion";
import { ArrowRightLeftIcon, Move, Plus, XIcon } from "lucide-react";
import useToolsStore from "../tools_store";
// import { Reorder } from "motion/dist/react";

const SplitPdf = () => {
  const {
    selectedRange,
    Ranges,
    setSelectedRange,
    addRange,
    updateRange,
    setFixedRange,
  } = useSplitPdfStore();
  const [range, setRange] = useState<number>(1);
  const handleUpdateRange = (name: string, from: string, to: string) => {
    const fromNum = parseInt(
      from,
      selectedFiles[selectedIndex ?? 0].numPages ?? 1
    );
    const toNum = parseInt(to, selectedFiles[selectedIndex ?? 0].numPages ?? 1);

    // // Validate inputs to prevent NaN or invalid ranges
    // if (isNaN(fromNum) || isNaN(toNum) || fromNum < 1 || toNum >= ( selectedFiles[selectedIndex ??0]?.numPages || 0)) {
    //   // console.warn("Invalid range input:", { from, to });
    //   return; // Or set default values, e.g., fromNum = 1, toNum = 1
    // }

    updateRange({ name, from: fromNum, to: toNum }, name);
  };
  const { selectedFiles, selectedIndex } = useToolsStore();
  const { reOrderRange } = useSplitPdfStore();
  useEffect(() => {
    updateRange(
      {
        name: "Range 1",
        from: 1,
        to: selectedFiles[selectedIndex]?.numPages ?? 1,
      },
      "Range 1"
    );
    console.log(selectedFiles[selectedIndex]?.fileName);
  }, [selectedIndex, selectedFiles[selectedIndex ?? 0]?.numPages]);

  // window.addEventListener("DOMContentLoaded", () => {
  //   updateRange(
  //     { name: "Range 1", from: 1, to: selectedFiles[selectedIndex]?.numPages ?? 1 },
  //     "Range 1"
  //   );
  // });

  const handleAddRange = () => {
    addRange({
      name: `Range ${Ranges.length + 1}`,
      from: 1,
      to: selectedFiles[selectedIndex]?.numPages ?? 1,
    });
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRange(parseInt(e.target.value));
    setFixedRange(
      selectedFiles[selectedIndex]?.numPages ?? 0,
      parseInt(e.target.value)
    );
  };

  return (
    <ConverterLayout
      children={<SplitPdfChildrenSection />}
      actionButtonText="Split Pdf"
      label="Split PDF Files"
      desc="Separate one page or a whole set for easy conversion into independent PDF files."
      disabled={selectedFiles.length <= 1}
      convertingStateText="Spliting PDF files"
      actionMenuSideBar={
        <div className="w-full">
          <div className="center gap-4 p-4 py-6">
            <Button
              onClick={() => setSelectedRange("custom")}
              size="sm"
              className="w-full"
              variant={`${selectedRange === "custom" ? "default" : "outline"}`}
            >
              Custom Ranges
            </Button>
            <Button
              onClick={() => {
                setSelectedRange("fixed");
                setFixedRange(
                  selectedFiles[selectedIndex]?.numPages ?? 0,
                  range
                );
              }}
              size="sm"
              className="w-full"
              variant={`${selectedRange === "fixed" ? "default" : "outline"}`}
            >
              Fixed Ranges
            </Button>
          </div>
          {selectedRange === "fixed" ? (
            <div className="space-y-3 p-4">
              <div className="space-y-3 gap-4 flex-col fle items-">
                <p className="text-secondary-foreground font-medium">
                  Split into fixed ranges of:
                </p>
                <Input
                  defaultValue={range}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value > 0) {
                      handleRangeChange(e);
                    }
                  }}
                  placeholder="Type a number..."
                />
              </div>
              <div className="bg-secondary p-4 rounded">
                <p className="text-secondary-foreground text-sm font-medium">
                  This PDF will be split into{" "}
                  {Math.round(
                    selectedFiles[selectedIndex]?.numPages ?? 0 / range
                  )}{" "}
                  different files
                </p>
              </div>
            </div>
          ) : (
            <>
              <Reorder.Group
                axis="y"
                values={Ranges}
                onReorder={reOrderRange}
                className=""
              >
                {Ranges.map((range, index) => (
                  <Reorder.Item
                    key={range.name}
                    value={range}
                    className="flex-shrink-0"
                    whileDrag={{
                      scale: 1.05,
                      // rotate: 2,
                      zIndex: 10,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div
                      key={index}
                      className="space-y-1.5 border-y pb-2 px-4 py-2 group hover:bg-secondary/30 cursor-move"
                    >
                      <div className="flex items-center justify-between py-1 px-2 rounded">
                        <div className="flex items-center gap-1 text-secondary-foreground justify-start">
                          <Move className="text-secondary-foreground w-4" />
                          <p className="font-medium">{range.name}</p>
                        </div>
                        <span>
                          <XIcon className="bg-white  group-hover:opacity-100 duration-700 x-20 opacity-0 rounded-full w-7 h-7 p-1" />
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex pl-2 gap-3 items-center justify-center ">
                          <span className="whitespace-nowrap flex text-secondary-foreground font-medium">
                            From
                          </span>
                          <ArrowRightLeftIcon className="text-secondary-foreground h-6" />
                          <Input
                            onChange={(e) =>
                              parseInt(e.target.value) > 0 &&
                              handleUpdateRange(
                                range.name,
                                e.target.value,
                                range.to.toString()
                              )
                            }
                            // min={1}
                            // value={range.from}
                            defaultValue={range.from}
                            className="outline-none"
                          />
                        </div>

                        <div className="flex pl-2 min-w-10 gap-3 items-center justify-center ">
                          <span className="whitespace-now gap flex text-secondary-foreground font-medium">
                            To
                          </span>
                          <ArrowRightLeftIcon className="text-secondary-foreground h-6" />
                          <Input
                            // value={range.to}
                            onChange={(e) =>
                              parseInt(e.target.value) <
                                (selectedFiles[selectedIndex]?.numPages ?? 0) &&
                              handleUpdateRange(
                                range.name,
                                range.from.toString(),
                                e.target.value
                              )
                            }
                            // min={range.to}
                            // max={selectedFiles[selectedIndex]?.numPages+1}
                            defaultValue={
                              selectedFiles[selectedIndex]?.numPages
                            }
                            className="outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>

              <div className="flex py-4 itens-center justify-center">
                <Button
                  onClick={handleAddRange}
                  variant="outline"
                  className="border-accent w-full text-accent mx-4"
                  size="sm"
                >
                  <Plus /> Add Range
                </Button>
              </div>
            </>
          )}
        </div>
      }
    />
  );
};
export default SplitPdf;
