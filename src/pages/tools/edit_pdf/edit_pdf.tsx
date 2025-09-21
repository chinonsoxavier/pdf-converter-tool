import Header from "@/components/layout/header";
import SidemenuLyout from "@/components/layout/sidemenu_layout";
import Footer from "@/components/layout/footer";
import HistorySection from "@/components/tools/history_section";
import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { CloudUpload, HomeIcon, ImageUpIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRef, useState, useEffect, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Rnd } from "react-rnd";
import { PDFDocument, rgb } from "pdf-lib";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { produce } from "immer";
import useToolsStore from "../tools_store";

// // Set pdf.js worker
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Types for annotations
type AnnotationType = "text" | "image";
interface AnnotationBase {
  id: string;
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
  domPageWidth: number;
  domPageHeight: number;
}
interface TextAnnotation extends AnnotationBase {
  type: "text";
  text: string;
  fontSize: number;
  color: string;
  fontFamily: string;
}
interface ImageAnnotation extends AnnotationBase {
  type: "image";
  dataUrl: string;
  mime: string;
}
type Annotation = TextAnnotation | ImageAnnotation;

// Zustand store for annotations
interface AnnotationState {
  annotations: Annotation[];
  addAnnotation: (annotation: Annotation) => void;
  updateAnnotation: (id: string, updates: Partial<Annotation>) => void;
  deleteAnnotation: (id: string) => void;
  undoStack: Annotation[][];
  redoStack: Annotation[][];
  pushUndo: (annotations: Annotation[]) => void;
  undo: () => void;
  redo: () => void;
  reset: () => void;
}
const useAnnotationStore = create<AnnotationState>((set) => ({
  annotations: [],
  addAnnotation: (annotation) =>
    set(
      produce((state) => {
        state.annotations.push(annotation);
      })
    ),
  updateAnnotation: (id, updates) =>
    set(
      produce((state) => {
        const index = state.annotations.findIndex((a) => a.id === id);
        if (index !== -1) state.annotations[index] = { ...state.annotations[index], ...updates };
      })
    ),
  deleteAnnotation: (id) =>
    set(
      produce((state) => {
        state.annotations = state.annotations.filter((a) => a.id !== id);
      })
    ),
  undoStack: [],
  redoStack: [],
  pushUndo: (annotations) =>
    set(
      produce((state) => {
        state.undoStack.push([...annotations]);
        state.redoStack = [];
        if (state.undoStack.length > 50) state.undoStack.shift();
      })
    ),
  undo: () =>
    set(
      produce((state) => {
        if (state.undoStack.length) {
          state.redoStack.push([...state.annotations]);
          state.annotations = state.undoStack.pop()!;
        }
      })
    ),
  redo: () =>
    set(
      produce((state) => {
        if (state.redoStack.length) {
          state.undoStack.push([...state.annotations]);
          state.annotations = state.redoStack.pop()!;
        }
      })
    ),
  reset: () =>
    set({
      annotations: [],
      undoStack: [],
      redoStack: [],
    }),
}));

// Coordinate conversion
const domToPdfCoords = (
  domX: number,
  domY: number,
  domPageWidth: number,
  domPageHeight: number,
  pdfPageWidth: number,
  pdfPageHeight: number,
  annotationHeightDom: number
) => {
  const sx = pdfPageWidth / domPageWidth;
  const sy = pdfPageHeight / domPageHeight;
  const scale = (sx + sy) / 2;
  const pdfX = domX * sx;
  const pdfY = pdfPageHeight - (domY * sy) - (annotationHeightDom * scale);
  return { x: pdfX, y: pdfY };
};

// PDF text extractor hook with line aggregation
const usePdfTextExtractor = (fileUrl: string | null) => {
  const [extractedText, setExtractedText] = useState<TextAnnotation[]>([]);
  const [pageViewports, setPageViewports] = useState<{ width: number; height: number }[]>([]);
  const [hasExtracted, setHasExtracted] = useState(false);

  useEffect(() => {
    if (!fileUrl || hasExtracted) return;

    const extractText = async () => {
      const pdf = await pdfjs.getDocument(fileUrl).promise;
      const anns: TextAnnotation[] = [];
      const vps: { width: number; height: number }[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1 });
        vps.push({ width: viewport.width, height: viewport.height });
        const textContent = await page.getTextContent();
        const items: any[] = textContent.items;

        // Sort items top to bottom, left to right
        items.sort((a, b) => b.transform[5] - a.transform[5] || a.transform[4] - b.transform[4]);

        let currentLine: any[] = [];
        let currentY = 0;
        const yThreshold = 2;

        const processLine = (line: any[]) => {
          if (line.length === 0) return;

          // Sort line by x
          line.sort((a, b) => a.transform[4] - b.transform[4]);

          let text = '';
          let prevTx = 0;
          let prevWidth = 0;
          for (let j = 0; j < line.length; j++) {
            const item = line[j];
            const [, , , , tx] = item.transform;
            if (j > 0) {
              const gap = tx - (prevTx + prevWidth);
              text += gap > 2 ? ' ' : '';
            }
            text += item.str;
            prevTx = tx;
            prevWidth = item.width;
          }

          if (text.trim() === '') return;

          const minX = line[0].transform[4];
          const maxX = line[line.length - 1].transform[4] + line[line.length - 1].width;
          const width = maxX - minX;
          const height = Math.max(...line.map((it) => it.height));
          const maxTy = Math.max(...line.map((it) => it.transform[5]));
          const yFromTop = viewport.height - maxTy;

          anns.push({
            id: uuidv4(),
            type: 'text',
            page: i,
            x: minX,
            y: yFromTop,
            width,
            height,
            text,
            fontSize: height,
            color: '#000000',
            fontFamily: line[0].fontName || 'Helvetica',
            domPageWidth: viewport.width,
            domPageHeight: viewport.height,
          });
        };

        for (const item of items) {
          const [, , , , , ty] = item.transform;
          if (currentLine.length === 0 || Math.abs(ty - currentY) < yThreshold) {
            currentLine.push(item);
          } else {
            processLine(currentLine);
            currentLine = [item];
          }
          currentY = ty;
        }
        processLine(currentLine);
      }
      setPageViewports(vps);
      setExtractedText(anns);
      setHasExtracted(true);
    };

    extractText();
  }, [fileUrl, hasExtracted]);

  // Reset hasExtracted when fileUrl changes
  useEffect(() => {
    setHasExtracted(false);
  }, [fileUrl]);

  return { extractedText, pageViewports };
};

// PDF export function
const exportPdfWithAnnotations = async (pdfUrl: string, annotations: Annotation[]) => {
  const existingPdfBytes = await fetch(pdfUrl).then((r) => r.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const pages = pdfDoc.getPages();
  const helvetica = await pdfDoc.embedFont('Helvetica');

  for (const ann of annotations) {
    const page = pages[ann.page - 1];
    const pdfPageWidth = page.getWidth();
    const pdfPageHeight = page.getHeight();
    const { x: pdfX, y: pdfY } = domToPdfCoords(
      ann.x,
      ann.y,
      ann.domPageWidth,
      ann.domPageHeight,
      pdfPageWidth,
      pdfPageHeight,
      ann.height
    );
    const scaledWidth = ann.width * (pdfPageWidth / ann.domPageWidth);
    const scaledHeight = ann.height * (pdfPageHeight / ann.domPageHeight);

    if (ann.type === 'text') {
      page.drawRectangle({
        x: pdfX,
        y: pdfY - scaledHeight,
        width: scaledWidth,
        height: scaledHeight + 2,
        color: rgb(1, 1, 1),
      });
      page.drawText(ann.text, {
        x: pdfX,
        y: pdfY - scaledHeight + 2,
        size: ann.fontSize * (pdfPageHeight / ann.domPageHeight),
        font: helvetica,
        color: rgb(0, 0, 0),
      });
    } else if (ann.type === 'image') {
      const imageBytes = await fetch(ann.dataUrl).then((res) => res.arrayBuffer());
      let image;
      if (ann.mime === 'image/jpeg') {
        image = await pdfDoc.embedJpg(imageBytes);
      } else {
        image = await pdfDoc.embedPng(imageBytes);
      }
      page.drawImage(image, {
        x: pdfX,
        y: pdfY - scaledHeight,
        width: scaledWidth,
        height: scaledHeight,
      });
    }
  }

  const out = await pdfDoc.save();
  const blob = new Blob([out], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'modified.pdf';
  document.body.appendChild(link);
  link.click();
  link.remove();
};

const EditPdf = () => {
  const { selectedFiles, selectedIndex, setSelectedFile, setNumPages } = useToolsStore();
  const { annotations, addAnnotation, updateAnnotation, pushUndo, undo, redo, reset } =
    useAnnotationStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const { extractedText, pageViewports } = usePdfTextExtractor(selectedFiles[selectedIndex]?.fileUrl);

  // Load extracted text into annotations only once
  useEffect(() => {
    if (extractedText.length > 0 && annotations.length === 0) {
      reset();
      extractedText.forEach((ann) => addAnnotation(ann));
    }
  }, [extractedText, addAnnotation, reset, annotations.length]);

  // Update container width and initialize pageRefs
  useEffect(() => {
    if (pdfContainerRef.current) {
      setContainerWidth(pdfContainerRef.current.clientWidth);
    }
    const handleResize = () => {
      if (pdfContainerRef.current) {
        setContainerWidth(pdfContainerRef.current.clientWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate scale
  const calculateScale = () => {
    if (containerWidth === 0) return 1;
    if (containerWidth < 400) return 0.7;
    if (containerWidth < 600) return 0.8;
    if (containerWidth < 768) return 0.9;
    if (containerWidth < 1024) return 1.0;
    return 1.2;
  };
  const scale = calculateScale();

  // Handle PDF file change
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    let file: File | undefined;
    if ("dataTransfer" in event) {
      file = event.dataTransfer.files?.[0];
      event.preventDefault();
      setIsDragging(false);
    } else {
      file = event.target.files?.[0];
    }

    if (file && file.name.split(".").pop()?.toLowerCase() !== "pdf") {
      alert("Please upload a valid PDF file.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setSelectedFile({
        file,
        fileUrl,
        fileName: file.name,
        fileSize: file.size,
        fileType: ["pdf"],
      });
      reset();
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Handle image drop on PDF page
  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>, pageIndex: number) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file || !pageViewports[pageIndex]) return;

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert("Please drop a valid image file (JPEG or PNG).");
      return;
    }

    const pageRef = pageRefs.current[pageIndex];
    if (!pageRef) return;

    const rect = pageRef.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;

    const dataUrl = URL.createObjectURL(file);
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const aspect = img.height / img.width;
      const defaultWidth = 200;
      const defaultHeight = defaultWidth * aspect;
      pushUndo(annotations);
      addAnnotation({
        id: uuidv4(),
        type: "image",
        page: pageIndex + 1,
        x: Math.max(0, Math.min(x, pageViewports[pageIndex].width - defaultWidth)),
        y: Math.max(0, Math.min(y, pageViewports[pageIndex].height - defaultHeight)),
        width: defaultWidth,
        height: defaultHeight,
        dataUrl,
        mime: file.type,
        domPageWidth: pageViewports[pageIndex].width,
        domPageHeight: pageViewports[pageIndex].height,
      });
    };
  };

  // Add text annotation
  const addTextAnnotation = useCallback(
    (page: number) => {
      if (pageViewports.length === 0) return;
      pushUndo(annotations);
      addAnnotation({
        id: uuidv4(),
        type: "text",
        page,
        x: 100,
        y: 100,
        width: 200,
        height: 20,
        text: "New Text",
        fontSize: 14,
        color: "#000000",
        fontFamily: "Helvetica",
        domPageWidth: pageViewports[page - 1].width,
        domPageHeight: pageViewports[page - 1].height,
      });
    },
    [annotations, addAnnotation, pushUndo, pageViewports]
  );

  // Handle image upload via file input
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && pageViewports.length > 0) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert("Please select a valid image file (JPEG or PNG).");
        return;
      }
      const dataUrl = URL.createObjectURL(file);
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const aspect = img.height / img.width;
        const defaultWidth = 200;
        const defaultHeight = defaultWidth * aspect;
        pushUndo(annotations);
        addAnnotation({
          id: uuidv4(),
          type: "image",
          page: 1,
          x: 100,
          y: 100,
          width: defaultWidth,
          height: defaultHeight,
          dataUrl,
          mime: file.type,
          domPageWidth: pageViewports[0].width,
          domPageHeight: pageViewports[0].height,
        });
      };
    }
  };

  const handleExport = () => {
    if (selectedFiles[selectedIndex]?.fileUrl) {
      exportPdfWithAnnotations(selectedFiles[selectedIndex].fileUrl, annotations);
    }
  };

  const variants1 = {
    inactive: { y: 20, opacity: 0 },
    active: { y: 0, opacity: 1, transition: { duration: 1.5 } },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-auto md:h-[12%]">
        <Header isLanding={false} />
      </div>
      <SidemenuLyout />
      <main className="flex-grow w-full dark:bg-primary">
        {!selectedFiles[selectedIndex] ? (
          <div className="overflow-x-hidden">
            <motion.div
              variants={variants1}
              initial="inactive"
              whileInView="active"
              viewport={{ once: true }}
              className="w-full mx-auto overflow-x-hidden flex justify-center p-4 py-6 md:py-20"
            >
              <Card
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleFileChange}
                className={`sm:p-10 p-6 bg-secondary dark:border-primary border-dashed border-3 w-full max-w-3xl my-0 flex flex-col items-center gap-3 sm:gap-5 ${
                  isDragging ? "border-accent dark:border-accent" : "border-[#4a4a4a]"
                }`}
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl text-center dark:text-white text-secondary-foreground font-semibold">
                  Edit PDF
                </h1>
                <h1 className="text-secondary-foreground dark:text-white text-center text-base sm:text-lg md:text-xl md:mb-5">
                  Upload your PDF file to edit it
                </h1>
                <CloudUpload className="dark:text-white text-secondary-foreground w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18" />
                <p className="text-[12px] sm:text-[14px] dark:text-white text-secondary-foreground">
                  Or drag and drop here...
                </p>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  aria-label="Choose PDF file"
                />
                <Button
                  onClick={handleButtonClick}
                  className="max-w-sm py-0 text-base sm:text-lg md:text-xl rounded-lg flex items-center h-12 w-full"
                >
                  Choose PDF file
                </Button>
                <div className="flex gap-4">
                  <Tooltip>
                    <TooltipTrigger className="rounded-full bg-accent p-2.5 w-11.5 h-11.5 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 16">
                        <path
                          fill="currentColor"
                          d="M8.7375,5.80725 L3.021,15.70725 L0.12375,10.69725 L5.847,0.795 L8.7375,5.80725 Z M17.865,10.38225 L12.078,10.39125 L6.378,0.489 L12.1725,0.489 L17.865,10.38225 Z M17.87625,10.9875 L14.9865,15.9975 L3.5415,15.99 L6.43425,10.98375 L17.87625,10.9875 Z"
                        />
                      </svg>
                      <TooltipContent className="text-white hidden border bottom-0">
                        Select file from Google Drive
                      </TooltipContent>
                    </TooltipTrigger>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger className="rounded-full bg-accent p-2.5 w-11.5 h-11.5 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 16">
                        <path
                          fill="currentColor"
                          d="M5.3475,0.7035 L0.096,4.125 L3.708,7.03725 L9.018,3.765 L5.3475,0.7035 Z M17.904,4.14 L12.66525,0.7275 L9.01875,3.7725 L14.29875,7.03875 L17.904,4.14 Z M9.01875,10.305 L12.66525,13.35975 L17.904,9.945 L14.2995,7.0395 L9.01875,10.305 Z M0.096,9.9585 L5.3475,13.35975 L9.01875,10.305 L3.70875,7.0455 L0.096,9.9585 Z M9.01875,10.9635 L5.35575,14.0385 L3.786,13.02 L3.786,14.16 L9.01875,17.30475 L14.271,14.15175 L14.271,13.0125 L12.693,14.031 L9.01875,10.9635 Z"
                        />
                      </svg>
                      <TooltipContent className="text-white hidden border bottom-0">
                        Select file from Dropbox
                      </TooltipContent>
                    </TooltipTrigger>
                  </Tooltip>
                </div>
              </Card>
            </motion.div>
            <HistorySection />
            <Footer />
          </div>
        ) : (
          <div className="flex flex-col items-center p-2 sm:p-4">
            <div className="w-full center max-w-4xl mb-4 flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => addTextAnnotation(1)} className="mr-2">
               <HomeIcon/>
              </Button>
              <Button variant="outline" onClick={() => imageInputRef.current?.click()} className="mr-2">
                <ImageUpIcon/>
              </Button>
              <Input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button onClick={handleExport} className="mr-2">
                Export PDF
              </Button>
              <Button onClick={undo} disabled={!useAnnotationStore.getState().undoStack.length}>
                {/* <arrow */}
              </Button>
              <Button
                onClick={redo}
                disabled={!useAnnotationStore.getState().redoStack.length}
                className="ml-2"
              >
                Redo
              </Button>
            </div>
            <Card
              ref={pdfContainerRef}
              className="w-full max-w-4xl p-4 sm:p-6 bg-secondary dark:border-primary border-dashed border-2 overflow-auto"
            >
              <Document
                className="flex flex-col items-center"
                file={selectedFiles[selectedIndex]?.fileUrl}
                onLoadSuccess={({ numPages }) => {
                  setNumPages(selectedIndex, numPages);
                  pageRefs.current = new Array(numPages).fill(null);
                }}
                onLoadError={(error) => console.error("PDF load error:", error)}
              >
                {Array.from(
                  new Array(selectedFiles[selectedIndex]?.numPages || 0),
                  (_, index) => (
                    <div
                      key={index}
                      className="mb-4 w-full flex justify-center"
                      ref={(el) => (pageRefs.current[index] = el)}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleImageDrop(e, index)}
                    >
                      {pageViewports[index] && (
                        <div
                          className="relative"
                          style={{
                            width: `${pageViewports[index].width * scale}px`,
                            height: `${pageViewports[index].height * scale}px`,
                          }}
                        >
                          <Page
                            pageNumber={index + 1}
                            scale={scale}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                          />
                          <div className="absolute top-0 left-0 w-full h-full">
                            {annotations
                              .filter((ann) => ann.page === index + 1)
                              .map((ann) => (
                                <Rnd
                                  key={ann.id}
                                  size={{
                                    width: ann.width * scale,
                                    height: ann.height * scale,
                                  }}
                                  position={{ x: ann.x * scale, y: ann.y * scale }}
                                  onDragStop={(_, d) => {
                                    pushUndo(annotations);
                                    updateAnnotation(ann.id, {
                                      x: d.x / scale,
                                      y: d.y / scale,
                                    });
                                  }}
                                  onResizeStop={(_, __, ref, ___, position) => {
                                    pushUndo(annotations);
                                    updateAnnotation(ann.id, {
                                      width: ref.offsetWidth / scale,
                                      height: ref.offsetHeight / scale,
                                      x: position.x / scale,
                                      y: position.y / scale,
                                    });
                                  }}
                                  bounds="parent"
                                >
                                  {ann.type === "text" ? (
                                    <div
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        background: "white",
                                        position: "relative",
                                      }}
                                    >
                                      <input
                                        type="text"
                                        value={ann.text}
                                        onChange={(e) => {
                                          pushUndo(annotations);
                                          updateAnnotation(ann.id, { text: e.target.value });
                                        }}
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          border: "none",
                                          background: "white",
                                          fontSize: ann.fontSize * scale,
                                          color: ann.color,
                                          fontFamily: ann.fontFamily,
                                          lineHeight: "normal",
                                          padding: "2px",
                                          boxSizing: "border-box",
                                          position: "absolute",
                                          top: 0,
                                          left: 0,
                                        }}
                                      />
                                    </div>
                                  ) : ann.type === "image" ? (
                                    <img
                                      src={ann.dataUrl}
                                      alt="annotation"
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                      }}
                                    />
                                  ) : null}
                                </Rnd>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                )}
              </Document>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default EditPdf;