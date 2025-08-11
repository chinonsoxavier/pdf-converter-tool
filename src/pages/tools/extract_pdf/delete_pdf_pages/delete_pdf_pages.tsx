import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import useDeletePdfPagesStore from "./delete_pdf_pages_store";
import { Input } from "@/components/ui/input";
import useToolsStore from "../../tools_store";
import DeletePdfChildrenSection from "@/components/tools/delete_pdf/delete_pdf_children_section";

const DeletePdfPages = () => {
  const { selectedFiles ,selectedIndex} = useToolsStore();
  const { setPagesToDelete } = useDeletePdfPagesStore();

  return (
    <ConverterLayout
      children={<DeletePdfChildrenSection />}
      actionButtonText="Delete Pdf"
      label="Delete PDF Pages"
      desc="Delete one page or a whole set for easy organisation into independent PDF files."
      disabled={selectedFiles.length <= 1}
      convertingStateText="Deleting PDF Pages"
      actionMenuSideBar={
        <div className="space-y-2 py-4">
          <div className="bg-secondary dark:bg-primary rounded mx-4 p-4 text-[15px]">
            Select pages to delete by clicking on them.
          </div>
          <div className="px-4 my-1">
            Total Pages: {selectedFiles[selectedIndex]?.numPages ?? 0}
          </div>
          <div className=" px-4 space-y-1">
            <p className="text-primary-foreground font-semibold text-lg">
              Pages to Remove:
            </p>

            <Input
              onChange={(e) => setPagesToDelete([parseInt(e.target.value)])}
              placeholder="Example: 1,3-8"
            />
          </div>
        </div>
      }
    />
  );
};

export default DeletePdfPages;
