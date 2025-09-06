import PdfLoadingComponent from "@/components/pdf_loading_component";
import { Pdfwidth, useWindowSize } from "@/lib/pdf_size_formatter";
import useSplitPdfStore from "@/pages/tools/split_pdf/split_pdf_store";
import useToolsStore from "@/pages/tools/tools_store";
import { Document, Page } from "react-pdf";

const SplitPdfRangeLayout = () => {
  const { selectedFiles, setNumPages, selectedIndex } = useToolsStore();
  const { fixedRange } = useSplitPdfStore();
  const { width } = useWindowSize();
  return (
    <div className="w-full flex center flex-wrap gap-5">
      {fixedRange.map((range, indexx) =>
        range.from !== range.to ? (
          <div className="flex flex-1 flex-col gap-5" key={indexx}>
            {range.name}
            <div className="rounded pr-10 sm:pr-6">
              <div className="center smedium:flex-row flex-col w-full p-5 border-2 hover:bg-secondary/70 hover:border-black/40 duration-500 border-dashed rounded-lg relative">
                <Document
                  file={selectedFiles[selectedIndex]?.fileUrl}
                  onLoadSuccess={({ numPages }) =>
                    setNumPages(selectedIndex, numPages)
                  }
                  onLoadError={(error) =>
                    console.error("PDF load error:", error)
                  }
                  className="w-full gap-5 flex-1 flex-col hover:border-black/40 duration-500 border center p-3 sm:p-5 rounded-lg pdf_shadow2 dark:bg-secondary bg-white"
                >
                  <Page
                    loading={PdfLoadingComponent}
                    className="pdf_shadow rounded"
                    pageNumber={range.from}
                    width={Pdfwidth(width)} // Reduced for better performance
                    renderTextLayer={false} // Optimize rendering
                    renderAnnotationLayer={false}
                  />
                  <p className="text-xs leading text-secondary-foreground">
                    {range.from}
                  </p>
                </Document>
                {range.to <= (selectedFiles[selectedIndex]?.numPages ?? 0) && (
                  <>
                    <p className="text-3xl rotate-90 smedium:rotate-0 mx-3 text-secondary-foreground">
                      ...
                    </p>
                    <Document
                      file={selectedFiles[selectedIndex]?.fileUrl}
                      onLoadSuccess={({ numPages }) => setNumPages(0, numPages)}
                      onLoadError={(error) =>
                        console.error("PDF load error:", error)
                      }
                      className="w-full flex-1 gap-5 flex-col hover:border-black/40 duration-500 center p-3 sm:p-5 rounded-lg pdf_shadow2 hover:border border dark:bg-secondary bg-white"
                    >
                      <Page
                        loading={PdfLoadingComponent}
                        className="pdf_shadow rounded"
                        pageNumber={
                          range.to
                            ? range.to
                            : selectedFiles[selectedIndex]?.numPages
                        }
                        width={Pdfwidth(width)} // Reduced for better performance
                        renderTextLayer={false} // Optimize rendering
                        renderAnnotationLayer={false}
                      />
                      <p className="text-xs leading text-secondary-foreground">
                        {range.to
                          ? range.to
                          : selectedFiles[selectedIndex]?.numPages}
                      </p>
                    </Document>
                  </>
                )}
              </div>
              {/* ))} */}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap flex-col gap-5" key={indexx}>
            {range.name}
            <div className="rounded pr-10 sm:pr-6">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="center flex-wrap p-8 gap- border-2 hover:bg-secondary/70 hover:border-black/40 duration-500 border-dashed rounded-lg relative"
                >
                  <Document
                    file={file.fileUrl}
                    onLoadSuccess={({ numPages }) => setNumPages(0, numPages)}
                    onLoadError={(error) =>
                      console.error("PDF load error:", error)
                    }
                    className="w-full gap-5 flex-1 flex-col hover:border-black/40 duration-500 border center p-5 rounded-lg pdf_shadow2 dark:bg-secondary bg-white"
                  >
                    <Page
                      loading={PdfLoadingComponent}
                      className="pdf_shadow rounded"
                      pageNumber={range.from}
                      width={width < 400 ? 60 : width < 600 ? 80 : 150} // Reduced for better performance
                      renderTextLayer={false} // Optimize rendering
                      renderAnnotationLayer={false}
                    />
                    <p className="text-xs leading text-secondary-foreground">
                      {range.from}
                    </p>
                  </Document>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default SplitPdfRangeLayout;
