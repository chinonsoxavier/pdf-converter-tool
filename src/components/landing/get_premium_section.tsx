import { Crown } from "lucide-react";
import ContainerLayout from "../layout/container_layout";
import { Button } from "../ui/button";
import { motion } from "motion/react";
import {
  EditPdf,
  ISvgIconComponent,
  LockPdf,
  OcrPdf,
  PdfToExcell,
  PdfToImage,
  PdfToPowerpoint,
  RedactPdf,
  SignPdf,
  UnlockPdf,
} from "@/assets/svg/export";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../use_theme";

const GetPremiumSection = () => {
const {theme} = useTheme()
  const navigate = useNavigate();

  interface IPremiumTools {
    label: string;
    icon: React.FC<Partial<ISvgIconComponent>>;
    isFree: boolean;
    info: string;
    category: string;
    color: string;
  }
  const premiumTools: IPremiumTools[] = [
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
  ];

  const variants1 = {
    inactive: {
      y: 110,
      opacity: 0,
    },
    active: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.5 },
    },
  };
  const variants2 = {
    inactive: {
      y: 120,
      opacity: 0,
    },
    active: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.5 },
    },
  };
  const variants3 = {
    inactive: {
      y: 150,
      opacity: 0,
    },
    active: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.5 },
    },
  };
  const variants4 = {
    inactive: {
      y: 180,
      opacity: 0,
    },
    active: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.5 },
    },
  };

    const toolsSectionThemes = [
      "#f2f9fe",
      "#f9fefb",
      "#fffcfa",
      "#fdf8ff",
      "#fff5f8",
      "#f8fcff",
      "#fffdfa",
      "#f2f9fe",
      "#f7fcff",
      "#fffcf9",
      "#fafffe",
      "#faf6f6",
    ];
  return (
    <div className="bg-secondary" >

    <ContainerLayout
      className="items-center flex-wrap w-full bg- space-y-6 py-12 sm:py-20 text-white"
      // style={{ background: "#47474f" }}
    >
      <div className="flex gap-3 sm:gap-5 items-start justify-start flex-col">
        <motion.div
          variants={variants1}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
        >
          <h1 className="text-primary-foreground sm:text-5xl text-4xl">
            Get more with Premium
          </h1>
        </motion.div>
        <motion.div
          variants={variants2}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
        >
          <p className="max-w-2xl text-secondary-foreground">
            Complete projects faster with batch file processing, convert scanned
            documents with OCR and e-sign your business agreements.
          </p>
        </motion.div>
        <motion.div
          variants={variants3}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
        >
          <Button className="bg-primary dark:bg-[#ce1c1c] ">
            <Crown className="" />
            Subscribe
          </Button>
        </motion.div>
      </div>

      <div className="w-full" >
        <motion.div
          variants={variants4}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
          className="w-full"
        >
          <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-1.5 sm:gap-3 pb-12 sm:pb-20 w-full mt-4">
            {premiumTools.map((tool, index) => {
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
                  style={{
                    backgroundColor: theme === "dark" ? "#0b1120" : randomColor,
                  }}
                  className={cn(
                    `w-full relative center tools flex-col border rounded-lg`
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
                            🔒
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
        </motion.div>
      </div>
    </ContainerLayout>
      </div>
  );
};

export default GetPremiumSection;
