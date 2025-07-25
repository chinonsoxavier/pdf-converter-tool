import {
  AddHeaderFooter,
  AddPagesToPdf,
  CloudUpload,
  EditPdf,
  ExtractPages,
  JPGTOPDF,
  LockPdf,
  MergePdf,
  OcrPdf,
  OrganisePdf,
  PdfToExcell,
  PdfToImage,
  PdfToJpg,
  PdfToPowerpoint,
  PdfToWord,
  PreviewPdf,
  RedactPdf,
  RemovePages,
  RotatePdf,
  SignPdf,
  SplitPdf,
  UnlockPdf,
  WordToPdf,
} from "@/assets/svg/export";
import { motion } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";

const Tools = () => {
   const variants1 = {
     inactive: {
       y: 100,
       opacity: 0,
     },
     active: {
       y: 0,
       opacity: 1,
       transition: { duration: 1.5 },
     },
   };
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTools, setSelectedTools] = useState("all-tools");
  const navigate = useNavigate();

  const toolsSectionThemes = [
    "#f2f9fe",
    "#f9fefb",
    "#fffcfa",
    "#fdf8ff",
    "#fff5f8",
    "#f8fcff",
    "#fffdfa",
    "#f7f9fb",
    "#f7fcff",
    "#fffcf9",
    "#fafffe",
    "#faf6f6",
  ];
  
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-1.5 sm:gap-3 pb-12 sm:pb-20 w-full mt-4">
      {[
        {
          label: "PDF to Word",
          icon: PdfToWord,
          isFree: true,
          info: "Convert PDFs to editable Word documents",
          category: "convert",
        },
        {
          label: "Word to PDF",
          icon: WordToPdf,
          isFree: true,
          info: "Convert Word documents to PDF",
          category: "convert",
        },
        {
          label: "Merge PDF",
          icon: MergePdf,
          isFree: true,
          info: "Combine multiple PDF files",
          category: "organize",
        },
        {
          label: "Split PDF",
          icon: SplitPdf,
          isFree: true,
          info: "Split multiple PDF files",
          category: "organize",
        },
        {
          label: "Compress PDF",
          icon: PdfToWord,
          isFree: true,
          info: "Reduce file size without losing quality",
          category: "enhance",
        },
        {
          label: "PDF to Jpg",
          icon: PdfToJpg,
          isFree: true,
          info: "Convert PDFs to Jpg images",
          category: "convert",
        },
        {
          label: "Jpg to Pdf",
          icon: JPGTOPDF,
          isFree: true,
          info: "Convert images to PDFs",
          category: "convert",
        },
        {
          label: "Rotate PDF",
          icon: RotatePdf,
          isFree: true,
          info: "Rotate one or more pages",
          category: "edit",
        },
        {
          label: "Recorder Pages",
          icon: OrganisePdf,
          isFree: true,
          info: "Drag & drop rearrangement of pages",
          category: "organize",
        },
        {
          label: "Extract Pages",
          icon: ExtractPages,
          isFree: true,
          info: "Drag & drop rearrangement of pages",
          category: "organize",
        },
        {
          label: "Delete Pages",
          icon: RemovePages,
          isFree: true,
          info: "Remove unwanted pages from PDF",
          category: "organize",
        },
        {
          label: "Add Page Numbers",
          icon: AddPagesToPdf,
          isFree: true,
          info: "Insert page numbers automatically",
          category: "edit",
        },
        {
          label: "Add Header/Footer",
          icon: AddHeaderFooter,
          isFree: true,
          info: "Insert simple text headers or footers",
          category: "edit",
        },
        {
          label: "Preview PDF",
          icon: PreviewPdf,
          isFree: true,
          info: "Built-in viewer for PDF file previews",
          category: "edit",
        },
        {
          label: "OCR",
          icon: OcrPdf,
          isFree: false,
          info: "Turn scanned PDFs/images into editable text",
          category: "edit",
        },
        {
          label: "PDF",
          icon: EditPdf,
          isFree: false,
          info: "Modify text, images, or layout directly",
          category: "edit",
        },
        {
          label: "Password Protect PDF",
          icon: LockPdf,
          isFree: false,
          info: "Encrypt PDFs with user-defined password",
          category: "secure",
        },
        {
          label: "Unlock PDF",
          icon: UnlockPdf,
          isFree: false,
          info: "Remove passwords (if permitted)",
          category: "secure",
        },
        {
          label: "E-Signature Workflow",
          icon: SignPdf,
          isFree: false,
          info: "Add or request signatures from others",
          category: "secure",
        },
        {
          label: "Create Fillable Forms",
          icon: SignPdf,
          isFree: false,
          info: "Add form fields: checkboxes, dropdowns, etc",
          category: "edit",
        },
        {
          label: "Batch Tools",
          icon: SignPdf,
          isFree: false,
          info: "Apply merge, compress, etc. to many files at once",
          category: "all-tools", // Optional: can be removed or changed
        },
        {
          label: "Redact PDF",
          icon: RedactPdf,
          isFree: false,
          info: "Permanently remove sensitive information",
          category: "secure",
        },
        {
          label: "Convert PDF to Excel",
          icon: PdfToExcell,
          isFree: false,
          info: "Accurate table extraction",
          category: "convert",
        },
        {
          label: "Convert PDF to PowerPoint",
          icon: PdfToPowerpoint,
          isFree: false,
          info: "Slide-based conversion",
          category: "convert",
        },
        {
          label: "High-Resolution PDF to Image",
          icon: PdfToImage,
          isFree: false,
          info: "Convert High-Resolution PDF to Image(300–600 DPI export)",
          category: "convert",
        },
        {
          label: "Cloud Integration",
          icon: CloudUpload,
          isFree: false,
          info: "Upload/Save directly from Google Drive, Dropbox, OneDrive",
          category: "all-tools", // Optional: can be removed or changed
        },
        {
          category: "more", // Optional: can be removed or changed
        },
      ]
        .slice(0, -1)
        .filter((tool) => tool.label.toLowerCase().includes(searchQuery))
        .filter(
          (tool) =>
            selectedTools === "all-tools" || selectedTools === tool.category
        )
        .map((tool, index) => {
          // Generate a random index for the color array
          const randomIndex = Math.floor(
            Math.random() * toolsSectionThemes.length
          );
          // Get the random color
          const randomColor = toolsSectionThemes[randomIndex];

          const getColorClass = (color: string) => {
            return `bg-[${toolsSectionThemes[randomIndex]}]`;
          };
          return (
            //   <Tooltip>
            //     <TooltipContent className="text-white">
            //       <p>{showAllTools ? "Hide Tools" : "Show More Tools"}</p>
            //     </TooltipContent>
            //     <motion.div
            //       variants={variants1}
            //       initial={"inactive"}
            //       whileInView={"active"}
            //       viewport={{ once: true }}
            //       className="flex-1 bg-[#fffcfa] dark:bg-secondary border group relative gap-4 flex-col b-[#f9f9f9] hover:borde-primary duration-500 cursor-pointer flex items-center justify-center rounded-xl pt-2 pb-7"
            //     >
            //       hjvhjvgc g
            //       <button
            //         onClick={() => setShowAllTools(!showAllTools)}
            //         style={{
            //           display: showAllTools ? "none" : "flex",
            //         }}
            //       >
            //         <TooltipTrigger className="w-full h-full flex items-center justify-center flex-col">
            //           <div className="flex items-center ease-linear scale-95 duration-100 group-hover:scale-110 justify-center rounded-xl w-12 h-12 sm:w-22 sm:h-22">
            //             <MoreHoriz size="lg" />
            //           </div>
            //           <p className="font-medium text-sm text-light-text">
            //             {showAllTools ? "Hide Tools" : "More Tools"}
            //           </p>
            //         </TooltipTrigger>
            //       </button>
            //     </motion.div>
            //   </Tooltip>
            // ) : (
            <Tooltip>
              <TooltipTrigger>
                <motion.div
                  variants={variants1}
                  initial={"inactive"}
                  whileInView={"active"}
                  viewport={{ once: true }}
                  className="w-full "
                >
                  <button
                    onClick={() => {
                      // Handle tool click, e.g., navigate to tool page
                      const targetPath = tool.label
                        .toLocaleLowerCase()
                        .replace(/\s+/g, "_"); // Replace all spaces with underscores
                      tool.isFree ? navigate(targetPath) : navigate("/pricing");
                    }}
                    // style={{ backgroundColor: randomColor }}
                    // Use the index as the key for each tool
                    key={index}
                    className={cn(
                      getColorClass(randomColor),
                      `tools h-full flex-1 group relative gap-4 flex-col duration-500 cursor-pointer flex items-center justify-center rounded-xl pt-2 pb-7`
                    )}
                  >
                    <TooltipContent className="text-white">
                      <p>{tool.info}</p>
                    </TooltipContent>

                    <div className="flex items-center justify-end w-full px-3">
                      <div
                        className={cn(
                          tool.isFree
                            ? "bg-[rgba(21,128,61,.10)] "
                            : "bg-orage-100 dark:bg-transparent",
                          "rounded-full px-2 text-xs py-1 absolte left-3 top-3 flex items-center justify-center"
                        )}
                      >
                        {tool.isFree ? "🟢 Free" : "🔒 Premium"}
                      </div>
                    </div>
                    <div className="flex items-center ease-linear scale-95 duration-100 group-hover:scale-110 justify-center rounded-xl w-12 h-12 sm:w-22 sm:h-22 ">
                      <tool.icon size="lg" />
                    </div>
                    <p className="font-medium text-ellipsis max-w-[150px] overflow-hidden text-sm whitespace-nowrap text-secondary-text">
                      {tool.label}
                    </p>
                  </button>
                </motion.div>
              </TooltipTrigger>
            </Tooltip>
          );
        })}
    </div>
  );
};

export default Tools;
