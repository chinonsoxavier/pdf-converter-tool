import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import { Button } from "@/components/ui/button";
import { RotateCcw, RotateCw } from "lucide-react";
import useToolsStore from "../tools_store";
import PdfRenderer from "@/components/pdf_renderer";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import useRotateStore from "./rotate_pdf_store";
import { useEffect } from "react";
// import { Document, Page } from "react-pdf";

const RotatePdf = () => {
  const {
    setRotateRight,
    setRotateLeft,
    resetRotate,
    selectedFiles,
    selectedIndex,
    RotatePdf,
  } = useToolsStore();

  const { toggleRotateAllPage, rotateAllPage } = useRotateStore();
  // alert(selectedIndex);

  useEffect(() => {
    console.log(
      "Rotate all page state changed: ",
      selectedFiles[selectedIndex]?.rotate
    );
    console.log("Rotate all page state : ", rotateAllPage);
  }, [rotateAllPage, selectedFiles[0], selectedFiles[0]?.rotate]);
  // Format page ranges (e.g., "1-3,5,7-9")
  const pageRanges =
    selectedFiles[selectedIndex]?.rotate
      ?.filter((page) => page > 0)
      .map((page) => page)
      .join(",") || "";
  return (
    <div className="">
      <ConverterLayout
        actionButtonText="Rotate Pdf"
        convertingStateText="Rotate Pdf"
        label="Rotate Pdf pages"
        desc="Rotate one or more pages"
        handleFileUpload={() =>
          RotatePdf(
            selectedFiles[selectedIndex],
            pageRanges,
            "90"
          )
        }
        children={
          <div className="h-full center w-full my-10">
            <PdfRenderer
              flexDirection="row"
              pagerotable
              pageNumber={rotateAllPage ? "all" : "1"}
              label={selectedFiles[selectedIndex]?.fileName}
              scale={0.8}
              file={selectedFiles[selectedIndex]?.fileUrl}
            />
          </div>
        }
        actionMenuSideBar={
          <div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium text-primary-foreground text-lg">
                  Rotation
                </p>

                <p
                  onClick={() => resetRotate(0)}
                  className="text-accent text-sm font-bold cursor-pointer"
                >
                  Reset Options
                </p>
              </div>
              <div className="flex items-center justify-start my-4">
                <Button
                  onClick={() =>
                    setRotateLeft(
                      selectedIndex,
                      selectedFiles[selectedIndex]?.numPages ?? 0
                    )
                  }
                  variant="secondary"
                  className="mr-2 dark:bg-primary"
                >
                  <RotateCcw className="w-9" />
                  Left
                </Button>
                <Button
                  onClick={() =>
                    setRotateRight(
                      selectedIndex,
                      selectedFiles[selectedIndex]?.numPages ?? 0
                    )
                  }
                  variant="secondary"
                  className="mr-2 dark:bg-primary"
                >
                  Right
                  <RotateCw className="size-4 mr-2" />
                </Button>
              </div>
            </div>

            <div className="px-4 mb-4">
              <p>Pages: {selectedFiles[0]?.numPages?.toString()}</p>
            </div>

            <div
              onClick={() => toggleRotateAllPage()}
              className="flex items-center justify-start px-4 gap-2"
              defaultChecked={!rotateAllPage}
            >
              <Checkbox id="rotate" className="w-4 text-white" />
              <Label htmlFor="rotate">Rotate all pages</Label>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default RotatePdf;
