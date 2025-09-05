import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import { useEffect, useState } from "react";
import useSplitPdfStore from "./split_pdf_store";
import SplitPdfChildrenSection from "../../../components/tools/split_pdf/split_pdf_children_section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reorder } from "framer-motion";
import { Move, Plus, XIcon } from "lucide-react";
import useToolsStore from "../tools_store";

const SplitPdf = () => {
  const {
    selectedRange,
    Ranges,
    setSelectedRange,
    addRange,
    updateRange,
    setFixedRange,
    fixedRange,
  } = useSplitPdfStore();

  const [range, setRange] = useState(1);
  const { selectedFiles, selectedIndex, SplitPdfPages } = useToolsStore();
  const { reOrderRange } = useSplitPdfStore();

  const handleUpdateRange = (name: string, from: string, to: string) => {
    const fromNum = parseInt(from);
    const toNum = parseInt(to);
    updateRange({ name, from: fromNum, to: toNum }, name);
  };

  useEffect(() => {
    if (selectedFiles[selectedIndex]) {
      updateRange(
        {
          name: "Range 1",
          from: 1,
          to: selectedFiles[selectedIndex].numPages ?? 1,
        },
        "Range 1"
      );
    }
  }, [selectedIndex, selectedFiles[selectedIndex]?.numPages]);

  const handleAddRange = () => {
    const lastRange = Ranges.length > 0 ? Ranges[Ranges.length - 1] : null;
    const newFrom = lastRange ? lastRange.to + 1 : 1;
    addRange({
      name: `Range ${Ranges.length + 1}`,
      from: newFrom,
      to: selectedFiles[selectedIndex]?.numPages ?? 1,
    });
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setRange(value);
    setFixedRange(selectedFiles[selectedIndex]?.numPages ?? 0, value);
  };

  return (
    <ConverterLayout
      handleFileUpload={() => SplitPdfPages(selectedFiles)}
      children={<SplitPdfChildrenSection />}
      actionButtonText="Split Pdf"
      label="Split PDF Files"
      desc="Separate one page or a whole set for easy conversion into independent PDF files."
      disabled={selectedFiles.length <= 0}
      convertingStateText="Splitting PDF files"
      actionMenuSideBar={
        <>
          <div className="p-4 border-b center gap-5">
            <Button
              onClick={() => setSelectedRange("custom")}
              size="sm"
              className="w-full"
              variant={selectedRange === "custom" ? "default" : "outline"}
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
              variant={selectedRange === "fixed" ? "default" : "outline"}
            >
              Fixed Ranges
            </Button>
          </div>

          <div className="p-4">
            {selectedRange === "fixed" ? (
              <>
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    Split into fixed ranges of:
                  </p>
                  <Input
                    defaultValue={range}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (
                        value > 0 &&
                        value <= (selectedFiles[selectedIndex]?.numPages ?? 0)
                      ) {
                        handleRangeChange(e);
                      }
                    }}
                    placeholder="Type a number..."
                  />
                </div>
                <div className="text-center text-sm text-gray-600">
                  This PDF will be split into **
                  {Math.round(fixedRange?.length ?? 0)}** different files.
                </div>
              </>
            ) : (
              <>
                <Reorder.Group
                  axis="y"
                  values={Ranges}
                  onReorder={reOrderRange}
                  className="space-y-4"
                >
                  {Ranges.map((range, index) => (
                    <Reorder.Item
                      key={range.name}
                      value={range}
                      className="flex-shrink-0 bg-gray-50 p-4 rounded-md shadow-sm"
                      whileDrag={{
                        scale: 1.05,
                        zIndex: 10,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{range.name}</span>
                        <div className="flex items-center space-x-2">
                          <Button size="icon" variant="ghost">
                            <Move size={16} />
                          </Button>
                          {Ranges.length > 1 && (
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => {
                                /* logic to remove range */
                              }}
                            >
                              <XIcon size={16} />
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">From</span>
                        <Input
                          type="number"
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            const previousRangeTo =
                              index > 0 ? Ranges[index - 1].to : 0;
                            const maxPage =
                              selectedFiles[selectedIndex]?.numPages ?? 0;
                            if (
                              !isNaN(value) &&
                              value > previousRangeTo &&
                              value <= maxPage
                            ) {
                              handleUpdateRange(
                                range.name,
                                e.target.value,
                                range.to.toString()
                              );
                            }
                          }}
                          defaultValue={range.from}
                          className="outline-none"
                        />
                        <span className="text-sm text-gray-500">To</span>
                        <Input
                          type="number"
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            const maxPage =
                              selectedFiles[selectedIndex]?.numPages ?? 0;
                            if (
                              !isNaN(value) &&
                              value > range.from &&
                              value <= maxPage
                            ) {
                              handleUpdateRange(
                                range.name,
                                range.from.toString(),
                                e.target.value
                              );
                            }
                          }}
                          defaultValue={range.to}
                          className="outline-none"
                        />
                      </div>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
                <Button
                  onClick={handleAddRange}
                  size="sm"
                  className="w-full mt-4"
                  variant="outline"
                >
                  <Plus size={16} className="mr-2" /> Add Range
                </Button>
              </>
            )}
          </div>
        </>
      }
    />
  );
};

export default SplitPdf;
