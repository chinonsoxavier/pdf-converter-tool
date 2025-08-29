import PdfLoadingComponent from "@/components/pdf_loading_component";
import { Pdfwidth, useWindowSize } from "@/lib/pdf_size_formatter";
import useSplitPdfStore from "@/pages/tools/split_pdf/split_pdf_store";
import useToolsStore from "@/pages/tools/tools_store";
import { Document, Page } from "react-pdf";

const SplitPdfRangeLayout = () => {
  const { selectedFiles, setNumPages, selectedIndex } = useToolsStore();
  const { Ranges, selectedRange, fixedRange } = useSplitPdfStore();
  const { width } = useWindowSize();
  return selectedRange === "custom" ? (
    Ranges.map((range, index) => (
      <div className="flex center flex-col gap-5 w-full" key={index}>
        {range.name}
        <div className="rounded pr-10 sm:pr-6 center w-full">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="center flex-col large:flex-row flex-wrap p-5 sm:p-8 bg-white dark:bg-secondary border-2 hover:bg-secondary/70 hover:border-black/40 duration-500 border-dashed rounded-lg relative"
            >
              {range.to === range.from ? (
                <Document
                  file={file.fileUrl}
                  onLoadSuccess={({ numPages }) => setNumPages(0, numPages)}
                  onLoadError={(error) =>
                    console.error("PDF load error:", error)
                  }
                  className="w-full gap-5 flex-col center p-0 sm:p-5 rounded-lg shadow-md "
                >
                  <Page
                    loading={<PdfLoadingComponent/>}
                    className="drop-shadow-md order rounded"
                    pageNumber={range.from}
                    width={Pdfwidth(width)} // Reduced for better performance
                    renderTextLayer={false} // Optimize rendering
                    renderAnnotationLayer={false}
                  />
                  <p className="text-xs leading text-secondary-foreground">
                    {range.from || range.to}
                  </p>
                </Document>
              ) : (
                <>
                  <Document
                    file={selectedFiles[selectedIndex]?.fileUrl}
                    onLoadSuccess={({ numPages }) => setNumPages(0, numPages)}
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
                  <p className="text-3xl m-3 text-secondary-foreground">...</p>
                  <Document
                    file={selectedFiles[selectedIndex]?.fileUrl}
                    onLoadSuccess={({ numPages }) => setNumPages(0, numPages)}
                    onLoadError={(error) =>
                      console.error("PDF load error:", error)
                    }
                    className="w-full flex-1 gap-5 flex-col hover:border-black/40 duration-500 center p-5 rounded-lg pdf_shadow2 hover:border border dark:bg-secondary bg-white"
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
          ))}
        </div>
      </div>
    ))
  ) : (
    <div className="w-full flex center flex-wrap gap-5 py-10">
      {fixedRange.map((range, indexx) =>
        range.from !== range.to ? (
          <div className="flex flex-col gap-5" key={indexx}>
            {range.name}
            <div className="rounded pr-10 sm:pr-6">
              {/* {selectedFiles.map((file, index) => ( */}
              <div className="center w-full p- border-2 hover:bg-secondary/70 hover:border-black/40 duration-500 border-dashed rounded-lg relative">
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
                {range.to < (selectedFiles[selectedIndex]?.numPages ?? 0) && (
                  <>
                    <p className="text-3xl mx-3 text-secondary-foreground">
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
