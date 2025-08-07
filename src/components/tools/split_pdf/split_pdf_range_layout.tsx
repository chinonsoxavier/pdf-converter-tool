import useSplitPdfStore from "@/pages/tools/split_pdf/split_pdf_store";
import useToolsStore from "@/pages/tools/tools_store";
import { Document, Page } from "react-pdf";

const SplitPdfRangeLayout = () => {
  const { selectedFiles, setNumPages, selectedIndex } = useToolsStore();
  const { Ranges, selectedRange, fixedRange } = useSplitPdfStore();

  return selectedRange === "custom"
    ? Ranges.map((range, index) => (
        <div className="center flex-col gap-5" key={index}>
          {range.name}
          <div className="rounded pr-10 sm:pr-6">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="center flex-wrap p-8 gap- border-2 hover:bg-secondary/70 hover:border-black/40 duration-500 border-dashed rounded-lg relative"
              >
                {range.to === range.from ? (
                  <Document
                    file={file.fileUrl}
                    onLoadSuccess={({ numPages }) => setNumPages(0, numPages)}
                    onLoadError={(error) =>
                      console.error("PDF load error:", error)
                    }
                    className="w-full gap-5 flex-col center p-5 rounded-lg shadow-md bg-white"
                  >
                    <Page
                      className="drop-shadow-md order rounded"
                      pageNumber={range.from}
                      width={150} // Reduced for better performance
                      renderTextLayer={false} // Optimize rendering
                      renderAnnotationLayer={false}
                    />
                    <p className="text-xs leading text-secondary-foreground">
                      {selectedFiles[selectedIndex]?.numPages}
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
                      className="w-full gap-5 flex-1 flex-col hover:border-black/40 duration-500 border center p-5 rounded-lg pdf_shadow2 bg-white"
                    >
                      <Page
                        className="pdf_shadow rounded"
                        pageNumber={range.from}
                        width={150} // Reduced for better performance
                        renderTextLayer={false} // Optimize rendering
                        renderAnnotationLayer={false}
                      />
                      <p className="text-xs leading text-secondary-foreground">
                        {range.from}
                      </p>
                    </Document>
                    <p className="text-3xl mx-3 text-secondary-foreground">
                      ...
                    </p>
                    <Document
                      file={selectedFiles[selectedIndex]?.fileUrl}
                      onLoadSuccess={({ numPages }) => setNumPages(0, numPages)}
                      onLoadError={(error) =>
                        console.error("PDF load error:", error)
                      }
                      className="w-full flex-1 gap-5 flex-col hover:border-black/40 duration-500 center p-5 rounded-lg pdf_shadow2 hover:border border bg-white"
                    >
                      <Page
                        className="pdf_shadow rounded"
                        pageNumber={
                          range.to
                            ? range.to
                            : selectedFiles[selectedIndex]?.numPages
                        }
                        width={150} // Reduced for better performance
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
    : fixedRange.map(
        (range, indexx) =>
          range.from !== range.to && (
            <div className="center flex-col gap-5" key={indexx}>
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
                      className="w-full gap-5 flex-1 flex-col hover:border-black/40 duration-500 border center p-5 rounded-lg pdf_shadow2 bg-white"
                    >
                      <Page
                        className="pdf_shadow rounded"
                        pageNumber={range.from}
                        width={150} // Reduced for better performance
                        renderTextLayer={false} // Optimize rendering
                        renderAnnotationLayer={false}
                      />
                      <p className="text-xs leading text-secondary-foreground">
                        {range.from}
                      </p>
                    </Document>
                    <p className="text-3xl mx-3 text-secondary-foreground">
                      ...
                    </p>
                    <Document
                      file={file.fileUrl}
                      onLoadSuccess={({ numPages }) => setNumPages(0, numPages)}
                      onLoadError={(error) =>
                        console.error("PDF load error:", error)
                      }
                      className="w-full flex-1 gap-5 flex-col hover:border-black/40 duration-500 center p-5 rounded-lg pdf_shadow2 hover:border border bg-white"
                    >
                      <Page
                        className="pdf_shadow rounded"
                        pageNumber={
                          range.to
                            ? range.to
                            : selectedFiles[selectedIndex]?.numPages
                        }
                        width={150} // Reduced for better performance
                        renderTextLayer={false} // Optimize rendering
                        renderAnnotationLayer={false}
                      />
                      <p className="text-xs leading text-secondary-foreground">
                        {range.to
                          ? range.to
                          : selectedFiles[selectedIndex]?.numPages}
                      </p>
                    </Document>
                  </div>
                ))}
              </div>
            </div>
          )
      );
};

export default SplitPdfRangeLayout;
