import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import useToolsStore from "../tools_store";
// import PdfRenderer from "@/components/pdf_renderer";
import DraggableGrid from "@/components/draggable_grid";

const OrganisePdf = () => {
  const {
    selectedFiles,
      selectedIndex,
      setNumPages, rotateIndividualPage,
    setItems,
    ReorderPages
  } = useToolsStore();
  return (
    <div className="">
      <ConverterLayout
      handleFileUpload={()=>ReorderPages(selectedFiles)}
        actionButtonText="Organise Pdf"
        convertingStateText="Organising Pdf"
        label="Organise Pdf pages"
        desc="Drag & drop rearrangement of pages"
        children={
          <div className="h-full w-full my-10">
            <div className="flex flex-wrap w-full pb-20 items-center justify-center h-full">
                    <DraggableGrid
                        label={selectedFiles[selectedIndex]?.fileName}
                items={selectedFiles[selectedIndex]?.pdfPages ?? []}
                setItems={setItems ?? (() => {}) }
                file={selectedFiles[selectedIndex]?.fileUrl}
                scale={1}
                selectedIndex={selectedIndex}
                setNumPages={setNumPages}
                rotateIndividualPage={rotateIndividualPage}
              />
            </div>
          </div>
        }
        actionMenuSideBar={
          <div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium text-primary-foreground text-lg">
                  Files:
                </p>

                <p className="text-accent text-sm font-medium cursor-pointer">
                  Reset Options
                </p>
              </div>
            </div>
            <div>
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className={`py-5 duration-300 cursor-pointer px-4  border-b ${
                    index === selectedIndex &&
                    "bg-muted dark:bg-primary hover:bg-muted/80 dark:hover:bg-primary/5"
                  }`}
                >
                  <p className="text-lg font-medium text-accent">
                    {file.fileName}
                  </p>

              
                </div>
              ))}
            </div>
          </div>
        }
      />
    </div>
  );
};

export default OrganisePdf;
