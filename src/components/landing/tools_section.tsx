import {
  AddHeaderFooter,
  AddPagesToPdf,
  CloudUpload,
  EditPdf,
  ExtractPages,
  ISvgIconComponent,
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
import { motion } from "motion/react";
import {
  Edit,
  FilePlus2,
  GalleryVerticalEnd,
  Layers2,
  LucideShieldCheck,
  Redo2,
  Search,
} from "lucide-react";
import {  useNavigate } from "react-router-dom";
const ToolsSection = () => {
  const navigate = useNavigate();
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
    "#  ",
    "#f7fcff",
    "#fffcf9",
    "#fafffe",
    "#faf6f6",
  ];

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
 
interface Tool {
  label: string;
  icon: React.FC<Partial<ISvgIconComponent>>; // Define icon as a functional component
  isFree: boolean;
  info: string;
  category: string;
  color: string; 
}
  const Tools: Tool[] = [
    {
      label: "PDF to Word",
      icon: PdfToWord,
      isFree: true,
      info: "Convert PDFs to editable Word documents",
      category: "convert",
      color: "#f2f9fe",
    },
    {
      label: "Word to PDF",
      icon: WordToPdf,
      isFree: true,
      info: "Convert Word documents to PDF",
      color: "#f2f9fe",
      category: "convert",
    },
    {
      label: "Merge PDF",
      icon: MergePdf,
      isFree: true,
      info: "Combine multiple PDF files",
      color: "#f2f9fe",
      category: "organize",
    },
    {
      label: "Split PDF",
      icon: SplitPdf,
      isFree: true,
      info: "Split multiple PDF files",
      color: "#f2f9fe",
      category: "organize",
    },
    {
      label: "Compress PDF",
      icon: PdfToWord,
      isFree: true,
      info: "Reduce file size without losing quality",
      color: "#f2f9fe",
      category: "enhance",
    },
    {
      label: "PDF to Jpg",
      icon: PdfToJpg,
      isFree: true,
      info: "Convert PDFs to Jpg images",
      color: "#f2f9fe",
      category: "convert",
    },
    {
      label: "Jpg to Pdf",
      icon: JPGTOPDF,
      isFree: true,
      info: "Convert images to PDFs",
      color: "#f2f9fe",
      category: "convert",
    },
    {
      label: "Rotate PDF",
      icon: RotatePdf,
      isFree: true,
      info: "Rotate one or more pages",
      color: "#f2f9fe",
      category: "edit",
    },
    {
      label: "Organise Pdf",
      icon: OrganisePdf,
      isFree: true,
      info: "Drag & drop rearrangement of pdf pages",
      color: "#f2f9fe",
      category: "organize",
    },
    {
      label: "Extract Pdf Pages",
      icon: ExtractPages,
      isFree: true,
      info: "Drag & drop rearrangement of pages",
      color: "#f2f9fe",
      category: "organize",
    },
    {
      label: "Delete Pdf Pages",
      icon: RemovePages,
      isFree: true,
      info: "Remove unwanted pages from PDF",
      color: "#f2f9fe",
      category: "organize",
    },
    {
      label: "Add Pdf Page Numbers",
      icon: AddPagesToPdf,
      isFree: true,
      info: "Insert page numbers automatically",
      color: "#f2f9fe",
      category: "edit",
    },
    {
      label: "Add Header/Footer",
      icon: AddHeaderFooter,
      isFree: true,
      info: "Insert simple text headers or footers",
      color: "#f2f9fe",
      category: "edit",
    },
    {
      label: "Preview PDF",
      icon: PreviewPdf,
      isFree: true,
      info: "Built-in viewer for PDF file previews",
      color: "#f2f9fe",
      category: "edit",
    },
    {
      label: "OCR",
      icon: OcrPdf,
      isFree: false,
      info: "Turn scanned PDFs/images into editable text",
      color: "#f2f9fe",
      category: "edit",
    },
    {
      label: "PDF",
      icon: EditPdf,
      isFree: false,
      info: "Modify text, images, or layout directly",
      color: "#f2f9fe",
      category: "edit",
    },
    {
      label: "Password Protect PDF",
      icon: LockPdf,
      isFree: false,
      info: "Encrypt PDFs with user-defined password",
      color: "#f2f9fe",
      category: "secure",
    },
    {
      label: "Unlock PDF",
      icon: UnlockPdf,
      isFree: false,
      info: "Remove passwords (if permitted)",
      color: "#f2f9fe",
      category: "secure",
    },
    {
      label: "E-Signature Workflow",
      icon: SignPdf,
      isFree: false,
      info: "Add or request signatures from others",
      color: "#f2f9fe",
      category: "secure",
    },
    {
      label: "Create Fillable Forms",
      icon: SignPdf,
      isFree: false,
      info: "Add form fields: checkboxes, dropdowns, etc",
      color: "#f2f9fe",
      category: "edit",
    },
    {
      label: "Batch Tools",
      icon: SignPdf,
      isFree: false,
      info: "Apply merge, compress, etc. to many files at once",
      category: "all-tools", // Optional: can be removed or changed
      color: "#f2f9fe",
    },
    {
      label: "Redact PDF",
      icon: RedactPdf,
      isFree: false,
      info: "Permanently remove sensitive information",
      category: "secure",
      color: "#f2f9fe",
    },
    {
      label: "Convert PDF to Excel",
      icon: PdfToExcell,
      isFree: false,
      info: "Accurate table extraction",
      category: "convert",
      color: "#f2f9fe",
    },
    {
      label: "Convert PDF to PowerPoint",
      icon: PdfToPowerpoint,
      isFree: false,
      info: "Slide-based conversion",
      color: "#f2f9fe",
      category: "convert",
    },
    {
      label: "High-Resolution PDF to Image",
      icon: PdfToImage,
      isFree: false,
      info: "Convert High-Resolution PDF to Image(300–600 DPI export)",
      category: "convert",
      color: "#f2f9fe",
    },
    {
      label: "Cloud Integration",
      icon: CloudUpload,
      isFree: false,
      info: "Upload/Save directly from Google Drive, Dropbox, OneDrive",
      category: "all-tools", // Optional: can be removed or changed
      color: "#f2f9fe",
    },
  ];


  const variants3 = {
    inactive: {
      y: 120,
      opacity: 0,
    },
    active: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.8 },
    },
  };

  console.log(showAllTools)

  return (
    <ContainerLayout className="space-y-5 w-full border-t pt-12 sm:pt-28 text-center flex-col">
      <motion.div
        variants={variants1}
        initial={"inactive"}
        whileInView={"active"}
        viewport={{ once: true }}
      >
        <p className="text-3xl sm:text-4xl text-primary-foreground font-semibold">
          Meet our full product family
        </p>
      </motion.div>

      <motion.div
        variants={variants3}
        initial={"inactive"}
        whileInView={"active"}
        viewport={{ once: true }}
      >
        <div className="flex-col flex items-center gap-5 justify-center">
          <div className="max-w-xl w-full relative">
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

          <div className="flex flex-wrap text-secondary-foreground items-center gap-3 justify-center">
            <Button
              onClick={() => {
                setSelectedTools("all-tools");
                setShowAllTools(true);
              }}
              variant={selectedTools === "all-tools" ? "default" : "secondary"}
              className={`duration-500 rounded-md text-sm sm:text-base shadow-xs h-8 center dark:bg-secondary,${
                selectedTools === "all-tools"
                  ? "text-white"
                  : "text-secondary-foreground"
              }`}
              size="sm"
            >
              <GalleryVerticalEnd className="" />
              All
            </Button>
            <Button
              onClick={() => {
                setSelectedTools("convert");
                setShowAllTools(true);
              }}
              variant={selectedTools === "convert" ? "default" : "secondary"}
              className={`duration-500 rounded-md text-xs sm:text-base shadow-xs 8 h-8 center dark:bg-secondary,${
                selectedTools === "convert"
                  ? "text-white"
                  : "text-secondary-foreground"
              }`}
              size="sm"
            >
              <Redo2 />
              Convert
            </Button>
            <Button
              onClick={() => {
                setSelectedTools("edit");
                setShowAllTools(true);
              }}
              variant={selectedTools === "edit" ? "default" : "secondary"}
              className={`duration-500 rounded-md text-xs sm:text-base shadow-xs h-8 center dark:bg-secondary,${
                selectedTools === "edit"
                  ? "text-white"
                  : "text-secondary-foreground"
              }`}
              size="sm"
            >
              <Edit />
              Edit
            </Button>
            <Button
              onClick={() => {
                setSelectedTools("organize");
                setShowAllTools(true);
              }}
              variant={selectedTools === "organize" ? "default" : "secondary"}
              className={`duration-500 rounded-md text-xs sm:text-base shadow-xs h-8 center dark:bg-secondary,${
                selectedTools === "organize"
                  ? "text-white"
                  : "text-secondary-foreground"
              }`}
              size="sm"
            >
              <Layers2 />
              Organize
            </Button>
            <Button
              onClick={() => {
                setSelectedTools("secure");
                setShowAllTools(true);
              }}
              variant={selectedTools === "secure" ? "default" : "secondary"}
              className={`duration-500 rounded-md text-xs sm:text-base shadow-xs h-8 center dark:bg-secondary,${
                selectedTools === "secure"
                  ? "text-white"
                  : "text-secondary-foreground"
              }`}
              size="sm"
            >
              <LucideShieldCheck />
              Secure
            </Button>
            <Button
              onClick={() => {
                setSelectedTools("enhance");
                setShowAllTools(true);
              }}
              variant={selectedTools === "enhance" ? "default" : "secondary"}
              className={`duration-500 rounded-md text-xs sm:text-base shadow-xs h-8 center dark:bg-secondary,${
                selectedTools === "enhance"
                  ? "text-white"
                  : "text-secondary-foreground"
              }`}
              size="sm"
            >
              <FilePlus2 />
              Enhance
            </Button>
          </div>
        </div>
      </motion.div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-1.5 sm:gap-3 pb-12 sm:pb-20 w-full mt-4">
        {Tools
          .slice(0, -1) 
          .filter(
            (tool) =>
              tool.label && tool.label?.toLowerCase()?.includes(searchQuery)
          )
          .filter(
            (tool) =>
              selectedTools === "all-tools" || selectedTools === tool.category
          )
          .map((tool, index) => {
            const randomIndex = Math.floor(
              Math.random() * toolsSectionThemes.length
            );
            const randomColor = toolsSectionThemes[randomIndex];

            return (
              <motion.div
                key={index}
                variants={variants1}
                initial={"inactive"}
                whileInView={"active"}
                viewport={{ once: true }}
                data-color={randomColor}
                className={cn(
                  `w-full relative center tools flex-col border rounded-lg`,
                  `bg-[${tool.color}]`
                )}
              >
                <Tooltip key={index}>
                  <TooltipTrigger className="w-full rounded-lg">
                    <div
                      onClick={() => {
                        const targetPath = tool?.label
                          .toLocaleLowerCase()
                          .replace(/\s+/g, "_");
                        if (tool.isFree) {
                          navigate("/" + targetPath);
                        } else {
                          navigate("/pricing");
                        }
                      }}
                      className={cn(
                        `tols h-full w-full flex-1 group relative gap-4 flex-col duration-500 cursor-pointer flex items-center justify-center rounded-xl pt-2 pb-7`
                      )}
                    >
                      <TooltipContent className="text-white">
                        <p>{tool.info}</p>
                      </TooltipContent>

                      <div className="flex items-center justify-end w-full px-3">
                        <div
                          className={cn(
                            tool.isFree
                              ? "bg-[rgba(21,128,61,.10)]"
                              : "bg-orange-100 dark:bg-transparent",
                            "rounded-full w-7 h-7 z-10  text-xs whitespace-nowrap absolute left-3 top-3 flex items-center justify-center"
                          )}
                        >
                          {tool.isFree ? "🟢" : "🔒"}
                        </div>
                      </div>
                      <div className="flex items-center ease-linear scale-95 duration-100 group-hover:scale-110 justify-center rounded-xl w-12 h-12 sm:w-22 sm:h-22">
                        <tool.icon size="lg" />
                      </div>
                      <p className="font-medium text-ellipsis max-w-[150px] overflow-hidden text-sm whitespace-nowrap dark:text-white text-secondary-foreground">
                        {tool.label}
                      </p>
                    </div>
                  </TooltipTrigger>
                </Tooltip>
              </motion.div>
            );
          })}
      </div>
    </ContainerLayout>
  );
};

export default ToolsSection;
