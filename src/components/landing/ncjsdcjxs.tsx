import {
  AddHeaderFooter,
  AddPagesToPdf,
  CloudUpload,
  EditPdf,
  ExtractPages,
  JPGTOPDF,
  LockPdf,
  MergePdf,
  MoreHoriz,
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
import ContainerLayout from "../layout/container_layout";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BadgePlus,
  Edit,
  FilePlus2,
  GalleryVerticalEnd,
  Layers2,
  LucideShieldCheck,
  Redo2,
  Search,
} from "lucide-react";
const ToolsSection = () => {
  const [showAllTools, setShowAllTools] = useState(false);
  const [selectedTools, setSelectedTools] = useState("all-tools");
  const [searchQuery, setSearchQuery] = useState("");
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

  // const filterTools = (query,)

  return (
    <ContainerLayout className="space-y-3 py-12 sm:py-28 text-center flex-col">
      <p className="text-3xl sm:text-4xl font-semibold">Choose Your PDF Tool</p>

      <p className="sm:text-lg">Professional PDF tools for every need</p>

      <div className="flex-col flex items-center gap-5 justify-center">
        <div className="fle max-w-xl w-full items-center justify-center relative">
          <Search
            className="absolute my-auto inset-0 top-0 bottom-0 left-4 text-light-text"
            size={17}
          />
          <Input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xl w-full pl-10"
            placeholder="Search tools..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 justify-center">
          {[
            {
              category: "all-tools",
              label: "All",
              icon: GalleryVerticalEnd,
            },
            {
              category: "convert",
              label: "Convert",
              icon: Redo2,
            },
            {
              category: "edit",
              label: "Edit",
              icon: Edit,
            },
            {
              category: "organize",
              label: "Organize",
              icon: Layers2,
            },
            {
              category: "secure",
              label: "Secure",
              LucideShieldCheck,
            },
            {
              category: "enhance",
              label: "Enhance",
              icon: FilePlus2,
            },
          ].map((category, index) => (
            <Button
              key={index}
              onClick={() => {
                setSelectedTools(category.category);
                setShowAllTools(true);
              }}
              variant={
                selectedTools === category.category ? "default" : "outline"
              }
              className={`duration-500 shadow-xs px-8 h-8 text-secondary-foreground hover:text-white center dark:bg-secondary,${
                selectedTools == category.category ? "text-white" : ""
              }`}
              size="sm"
            >
              {/* <category.icon className="" /> */}
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(145px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-1.5 sm:gap-3 pb-12 sm:pb-20 w-full mt-4">
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
        ]
          // .slice(0, showAllTools ? -1 : 14)
          // .filter((tool) => tool.label.toLowerCase().includes(searchQuery))
          // .filter(
          //   (tool) =>
          //     selectedTools === "All" ||
          //     (tool.isFree && selectedTools === "Free") ||
          //     (!tool.isFree && selectedTools === "Premium")
          // )
          .slice(0, showAllTools ? -1 : 14)
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

            const getColorClass = (color) => {
              return `bg-[${color}]`;
            };
            return (
              <Tooltip>
                <TooltipTrigger>
                  <div
                    // style={{ backgroundColor: randomColor }}
                    // Use the index as the key for each tool
                    key={index}
                    className={cn(
                      getColorClass(randomColor),
                      `tools flex-1 group relative gap-4 flex-col duration-500 cursor-pointer flex items-center justify-center rounded-xl pt-2 pb-7`
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
                            : "bg-orange-100",
                          "rounded-full px-2 text-xs py-1 absolte left-3 top-3 flex items-center justify-center"
                        )}
                      >
                        {tool.isFree ? "🟢 Free" : "🔒 Premium"}
                      </div>
                    </div>
                    <div className="flex items-center ease-linear scale-95 duration-100 group-hover:scale-110 justify-center rounded-xl w-12 h-12 sm:w-22 sm:h-22 ">
                      <tool.icon size="lg" />
                    </div>
                    <p className="font-medium text-sm whitespace-nowrap text-light-text">
                      {tool.label}
                    </p>
                  </div>
                </TooltipTrigger>
              </Tooltip>
            );
          })}
        <Tooltip>
          <TooltipContent className="text-white">
            <p>{showAllTools ? "Hide Tools" : "Show More Tools"}</p>
          </TooltipContent>
          <button
            onClick={() => setShowAllTools(!showAllTools)}
            style={{
              display: showAllTools ? "none" : "flex",
            }}
            className="flex-1 bg-[#fffcfa] dark:bg-secondary border group relative gap-4 flex-col b-[#f9f9f9] hover:borde-primary duration-500 cursor-pointer flex items-center justify-center rounded-xl pt-2 pb-7"
          >
            <TooltipTrigger className="w-full h-full flex items-center justify-center flex-col">
              <div className="flex items-center ease-linear scale-95 duration-100 group-hover:scale-110 justify-center rounded-xl w-12 h-12 sm:w-22 sm:h-22">
                <MoreHoriz size="lg" />
              </div>
              <p className="font-medium text-sm text-light-text">
                {showAllTools ? "Hide Tools" : "More Tools"}
              </p>
            </TooltipTrigger>
          </button>
        </Tooltip>
      </div>
    </ContainerLayout>
  );
};

export default ToolsSection;
