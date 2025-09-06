import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import { useEffect, useState } from "react";
import useSplitPdfStore from "./split_pdf_store";
import SplitPdfChildrenSection from "../../../components/tools/split_pdf/split_pdf_children_section";
import { Input } from "@/components/ui/input";
import useToolsStore from "../tools_store";

const SplitPdf = () => {
  const {
    // selectedRange,
    Ranges,
    setFixedRange,
    fixedRange,
  } = useSplitPdfStore();

  const [range, setRange] = useState(1);
  const { selectedFiles, selectedIndex, SplitPdfPages } = useToolsStore();
  useEffect(() => {
    console.log(Ranges);
    setFixedRange(selectedFiles[selectedIndex]?.numPages ?? 3, range);
  }, [selectedIndex, selectedFiles[selectedIndex]?.numPages]);
  useEffect(() => {
  }, []);

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
          <div className="p-4">
            <>
              <div className="mb-2">
                <p className="text-sm mb-2 text-gray-600">
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
              <div className="text-sm text-gray-600">
                This PDF will be split into{" "}
                {Math.round(fixedRange?.length ?? 0)} different files.
              </div>
            </>
          </div>
        </>
      }
    />
  );
};

export default SplitPdf;
