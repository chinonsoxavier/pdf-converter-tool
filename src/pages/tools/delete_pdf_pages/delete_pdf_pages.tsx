import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import useToolsStore from "../tools_store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import useDeletePdfStore from "./delete_pdf_pages_store";
import DeletePdfChildrenSection from "@/components/tools/delete_pdf/delete_pdf_children_section";

const DeletePdf = () => {
  const { selectedFiles } = useToolsStore();
  const {
    deleteMode,
    deleteAllPages,
    pagesToDelete,
    setDeleteMode,
    setPagesToDelete,
    updatePagesFromInput,
  } = useDeletePdfStore();

  // Assume selectedFiles[0] contains the PDF with a numPages property
  const maxPages = selectedFiles[0]?.numPages || 20; // Fallback to 20 if numPages is unavailable

  // Initialize pagesToExtract based on maxPages when component mounts or maxPages changes
  useEffect(() => {
    setPagesToDelete(
      Array.from({ length: maxPages }, (_, i) => ({
        number: i + 1,
        selected: false,
      }))
    );
  }, [maxPages,setPagesToDelete]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeleteMode("selected");
    updatePagesFromInput(e.target.value, maxPages);
  };

  const selectedCount = pagesToDelete.filter((item) => item.selected).length;

  return (
    <ConverterLayout
      children={<DeletePdfChildrenSection />}
      actionButtonText="Delete Pdf"
      label="Delete PDF Files"
      desc="Separate one page or a whole set for easy conversion into independent PDF files."
      disabled={selectedFiles.length <= 0} // Adjusted to <= 0 since you likely need at least one file
      convertingStateText="Extracting PDF files"
      actionMenuSideBar={
        <div>
          <p className="text-primary-foreground font-semibold mt-4 px-4 text-lg">
            Range Mode:
          </p>
          <div className="center gap-4 p-4 py-6">
            <Button
              onClick={() => {
                setDeleteMode("all");
                deleteAllPages(); // Clear selections when switching to "all"
              }}
              className="w-full"
              variant={`${deleteMode === "all" ? "default" : "outline"}`}
            >
              Delete all pages
            </Button>
            <Button
              onClick={() => setDeleteMode("selected")}
              className="w-full"
              variant={`${deleteMode === "selected" ? "default" : "outline"}`}
            >
              Select pages
            </Button>
          </div>
          <div className="bg-secondary rounded mx-4 p-4 text-[15px]">
            Selected pages will be deleted from the PDF file.
          </div>
          {deleteMode === "selected" && (
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <p className="text-primary-foreground font-semibold text-lg">
                  Pages to delete:
                </p>
                <Input
                  onChange={handleInputChange}
                  placeholder={`Example: 1,5-8 (1-${maxPages})`}
                />
                <p className="text-sm text-muted-foreground">
                  {selectedCount} of {maxPages} pages selected
                </p>
              </div>
              <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
              
              </div>
              <div className="text-sm text-muted-foreground">
            
                <p>Click boxes to toggle selection or use the input above</p>
                <p>Examples: "1-5", "1,3,5,6,7", "1-3,8,10-12"</p>
              </div>
            </div>
          )}
        </div>
      }
    />
  );
};

export default DeletePdf;
