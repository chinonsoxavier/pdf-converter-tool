import { useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { PdfElement } from "@/pages/tools/edit_pdf/edit_pdf";

export const usePdfEditor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addTextElement = async (
    fileUrl: string,
    text: string,
    position: { x: number; y: number },
    pageNumber: number,
    style?: {
      fontSize?: number;
      fontFamily?: string;
      color?: string;
    }
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const existingPdfBytes = await fetch(fileUrl).then((res) =>
        res.arrayBuffer()
      );
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();

      if (pageNumber < 1 || pageNumber > pages.length) {
        throw new Error("Invalid page number");
      }

      const page = pages[pageNumber - 1];
      const {  height } = page.getSize();

      // Convert position from bottom-left to top-left origin
      const y = height - position.y;

      // Set default styles
      const fontSize = style?.fontSize || 12;
      const fontFamily = style?.fontFamily || "Helvetica";
      const color = style?.color || "#000000";

      // Parse color
      let rgbColor;
      if (color.startsWith("#")) {
        const r = parseInt(color.slice(1, 3), 16) / 255;
        const g = parseInt(color.slice(3, 5), 16) / 255;
        const b = parseInt(color.slice(5, 7), 16) / 255;
        rgbColor = rgb(r, g, b);
      } else {
        rgbColor = rgb(0, 0, 0); // Default to black
      }

      // Get font
      let font;
      switch (fontFamily.toLowerCase()) {
        case "times":
        case "times new roman":
          font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
          break;
        case "courier":
        case "courier new":
          font = await pdfDoc.embedFont(StandardFonts.Courier);
          break;
        default:
          font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      }

      page.drawText(text, {
        x: position.x,
        y,
        size: fontSize,
        font,
        color: rgbColor,
      });

      const pdfBytes = await pdfDoc.save();
      return pdfBytes;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const addImageElement = async (
    fileUrl: string,
    imageUrl: string,
    position: { x: number; y: number },
    size: { width: number; height: number },
    pageNumber: number
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const existingPdfBytes = await fetch(fileUrl).then((res) =>
        res.arrayBuffer()
      );
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();

      if (pageNumber < 1 || pageNumber > pages.length) {
        throw new Error("Invalid page number");
      }

      const page = pages[pageNumber - 1];
      const { height } = page.getSize();

      // Convert position from bottom-left to top-left origin
      const y = height - position.y - size.height;

      // Fetch image
      const imageBytes = await fetch(imageUrl).then((res) => res.arrayBuffer());
      let image;

      if (imageUrl.toLowerCase().endsWith(".png")) {
        image = await pdfDoc.embedPng(imageBytes);
      } else {
        image = await pdfDoc.embedJpg(imageBytes);
      }

      page.drawImage(image, {
        x: position.x,
        y,
        width: size.width,
        height: size.height,
      });

      const pdfBytes = await pdfDoc.save();
      return pdfBytes;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const addDrawingElement = async (
    fileUrl: string,
    // drawingData: any,
    // position: { x: number; y: number },
    // size: { width: number; height: number },
    // pageNumber: number
  ) => {
    // This would be implemented based on your drawing data format
    // For now, just return the original PDF
    const existingPdfBytes = await fetch(fileUrl).then((res) =>
      res.arrayBuffer()
    );
    return existingPdfBytes;
  };

  const updateElement = async (
    fileUrl: string,
    // elementId: string,
    // updates: Partial<PdfElement>
  ) => {
    // This would find the element in the PDF and update it
    // For now, just return the original PDF
    const existingPdfBytes = await fetch(fileUrl).then((res) =>
      res.arrayBuffer()
    );
    return existingPdfBytes;
  };

  const deleteElement = async (fileUrl: string) => {
    // This would find the element in the PDF and remove it
    // For now, just return the original PDF
    const existingPdfBytes = await fetch(fileUrl).then((res) =>
      res.arrayBuffer()
    );
    return existingPdfBytes;
  };

  const savePdf = async (fileUrl: string, elements: PdfElement[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const existingPdfBytes = await fetch(fileUrl).then((res) =>
        res.arrayBuffer()
      );
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();

      // Process each element
      for (const element of elements) {
        const pageNumber = element.pageNumber;

        if (pageNumber < 1 || pageNumber > pages.length) {
          continue; // Skip invalid page numbers
        }

        const page = pages[pageNumber - 1];
        const { height } = page.getSize();

        switch (element.type) {
          case "text":
            if (element.content && element.style) {
              // Convert position from bottom-left to top-left origin
              const y = height - element.position.y;

              // Parse color
              let rgbColor;
              if (element.style.color) {
                if (element.style.color.startsWith("#")) {
                  const r = parseInt(element.style.color.slice(1, 3), 16) / 255;
                  const g = parseInt(element.style.color.slice(3, 5), 16) / 255;
                  const b = parseInt(element.style.color.slice(5, 7), 16) / 255;
                  rgbColor = rgb(r, g, b);
                } else {
                  rgbColor = rgb(0, 0, 0); // Default to black
                }
              } else {
                rgbColor = rgb(0, 0, 0); // Default to black
              }

              // Get font
              let font;
              switch (element.style.fontFamily?.toLowerCase()) {
                case "times":
                case "times new roman":
                  font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
                  break;
                case "courier":
                case "courier new":
                  font = await pdfDoc.embedFont(StandardFonts.Courier);
                  break;
                default:
                  font = await pdfDoc.embedFont(StandardFonts.Helvetica);
              }

              page.drawText(element.content, {
                x: element.position.x,
                y,
                size: element.style.fontSize || 12,
                font,
                color: rgbColor,
              });
            }
            break;

          case "image":
            if (element.content) {
              // Convert position from bottom-left to top-left origin
              const y = height - element.position.y - element.size.height;

              // Fetch image
              try {
                const imageBytes = await fetch(element.content).then((res) =>
                  res.arrayBuffer()
                );
                let image;

                if (element.content.toLowerCase().endsWith(".png")) {
                  image = await pdfDoc.embedPng(imageBytes);
                } else {
                  image = await pdfDoc.embedJpg(imageBytes);
                }

                page.drawImage(image, {
                  x: element.position.x,
                  y,
                  width: element.size.width,
                  height: element.size.height,
                });
              } catch (err) {
                console.error("Error embedding image:", err);
              }
            }
            break;

          case "drawing":
            // Drawings would be implemented here
            break;

          case "shape":
            // Shapes would be implemented here
            break;
        }
      }

      const pdfBytes = await pdfDoc.save();
      return pdfBytes;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loadPdfElements = async (): Promise<PdfElement[]> => {
    // This would parse the PDF and extract existing elements
    // For now, return an empty array
    return [];
  };

  return {
    isLoading,
    error,
    addTextElement,
    addImageElement,
    addDrawingElement,
    updateElement,
    deleteElement,
    savePdf,
    loadPdfElements,
  };
};
