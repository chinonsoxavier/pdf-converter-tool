import { Button } from "../ui/button";
import { ChevronDown, Coffee, Crown, Menu, XCircle } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  AddPagesToPdf,
  CompressPdf,
  EditPdf,
  ExcelToPdf,
  ExtractPages,
  JPGTOPDF,
  LockPdf,
  MergePdf,
  OcrPdf,
  OrganisePdf,
  PdfToExcell,
  PdfToJpg,
  PdfToPowerpoint,
  PdfToWord,
  PowerPointToPdf,
  RedactPdf,
  RemovePages,
  RepairPdf,
  RotatePdf,
  SignPdf,
  SplitPdf,
  UnlockPdf,
  WaterMarkPdf,
  WordToPdf,
} from "@/assets/svg/export";
import { Link } from "react-router-dom";
import { ModeToggle } from "../mode_toggle";
import { motion } from "motion/react";
import useLandingStore from "@/pages/landing/store/landing_store";

const Header: React.FC = () => {
  const variants1 = {
    inactive: {
      x: -50,
      opacity: 0,
    },
    active: {
      x: 0,
      opacity: 1,
      transition: { duration: 1.5 },
    },
  };
  const variants2 = {
    inactive: {
      y: -50,
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
      x: 50,
      opacity: 0,
    },
    active: {
      x: 0,
      opacity: 1,
      transition: { duration: 1.5 },
    },
  };

    const { sideMenuOpen } = useLandingStore()
    const { toggleSideMenuOpen } = useLandingStore();

  return (
    <header className="flex overflow-hidden items-center bg-white dark:bg-primary px-4 border-y sm:px-8 sm:py-5 h-full py-3 justify-between">
      <motion.div
        variants={variants1}
        initial={"inactive"}
        whileInView={"active"}
        viewport={{ once: true }}
      >
        <h1 className="text-2xl text-primary-foreground">Logo</h1>
      </motion.div>
      <motion.div
        variants={variants2}
        initial={"inactive"}
        whileInView={"active"}
        viewport={{ once: true }}
        className=""
      >
        <ul className="gap-3 hidden md:flex dark:text-white text-light-text">
          <li className="cursor-pointer hidden lg:block font-semibold text-[15px]">
            MERGE PDF
          </li>
          <li className="cursor-pointer hidden large:block font-semibold text-[15px]">
            SPLIT PDF
          </li>
          <li className="cursor-pointer hidden medium:block font-semibold text-[15px]">
            COMPRESS PDF
          </li>
          <li className="cursor-pointer font-semibold text-[15px]">
            <HoverCard>
              <HoverCardTrigger className="flex items-center justify-center">
                CONVERT PDF
                <ChevronDown
                  strokeWidth={0}
                  className="inline-block fill-dark-text dark:fill-white w-5 h-5"
                />
              </HoverCardTrigger>
              <HoverCardContent className="mt-10 w-full px-8 before:border-input before:border relative after:rounded-lg z-30 after:-z-10 after:absolute after:bg-white after:inset-0 flex items-center justify-center before:top-0 before:-z-50 before:rotate-45 before:absolute before:bg-white before:w-12 before:h-12 before:">
                <div className="flex gap-8 space-y-3 w-full items-start justify-between">
                  <div className="flex space-y-1 w-full items-start justify-start flex-col">
                    <h3 className="font-semibold text-light-text text-[15px] whitespace-nowrap">
                      CONVERT TO PDF
                    </h3>
                    {[
                      {
                        label: "Jpg to Pdf",
                        icon: JPGTOPDF,
                      },
                      {
                        label: "Word to Pdf",
                        icon: WordToPdf,
                      },
                      {
                        label: "Powerpoint to Pdf",
                        icon: PowerPointToPdf,
                      },
                      {
                        label: "Excel to Pdf",
                        icon: ExcelToPdf,
                      },
                    ].map((tool, index) => (
                      <div
                        key={index}
                        className="flex cursor-pointer items-center justify-start gap-3 py-2 px-4 dark:hover:bg-gray-700 hover:bg-gray-100 focus:outline-none"
                      >
                        <tool.icon size="sm" />
                        <p className="whitespace-nowrap text-xs font-semibold text-light-text">
                          {tool.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-y-1 w-full items-start justify-start flex-col">
                    <h3 className="font-semibold text-light-text text-[15px] whitespace-nowrap">
                      CONVERT FROM PDF
                    </h3>
                    {[
                      {
                        label: "Pdf to Jpg",
                        icon: PdfToJpg,
                      },
                      {
                        label: "Pdf to Word",
                        icon: PdfToWord,
                      },
                      {
                        label: "Pdf to Powerpoint",
                        icon: PdfToPowerpoint,
                      },
                      {
                        label: "Pdf to Excel",
                        icon: PdfToExcell,
                      },
                    ].map((tool, index) => (
                      <div
                        key={index}
                        className="flex cursor-pointer items-center justify-start gap-3 py-2 px-4 dark:hover:bg-gray-700 hover:bg-gray-100 focus:outline-none"
                      >
                        <tool.icon size="sm" />
                        <p className="whitespace-nowrap text-xs font-semibold text-light-text">
                          {tool.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </li>
          <li className="cursor-pointer font-semibold text-[15px]">
            <HoverCard>
              <HoverCardTrigger className="flex items-center justify-center">
                ALL PDF TOOLS
                <ChevronDown
                  strokeWidth={0}
                  className="inline-block fill-dark-text dark:fill-white w-5 h-5"
                />
              </HoverCardTrigger>
              <HoverCardContent className="mt-10 w-full px-8 before:border-input before:border relative after:rounded-lg z-30 after:-z-10 after:absolute after:bg-white after:inset-0 flex items-center justify-center before:top-0 before:-z-50 before:rotate-45 before:absolute before:bg-white before:w-12 before:h-12 before:">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] max-w-4xl gap-8 flex-wrap  space-y-3 w-full items-start text-dark-text justify-between">
                  <div className="flex space-y-1 w-full items-start justify-start flex-col">
                    <h3 className="font-semibold text-light-text text-[15px] whitespace-nowrap">
                      ORGANISE PDF
                    </h3>
                    {[
                      {
                        label: "Merge Pdf",
                        icon: MergePdf,
                      },
                      {
                        label: "Split Pdf",
                        icon: SplitPdf,
                      },
                      {
                        label: "Remove Pages",
                        icon: RemovePages,
                      },
                      {
                        label: "Extract Pages",
                        icon: ExtractPages,
                      },
                      {
                        label: "Organise Pdf",
                        icon: OrganisePdf,
                      },
                    ].map((tool, index) => (
                      <div
                        key={index}
                        className="flex cursor-pointer items-center justify-start gap-3 py-2 px-4 dark:hover:bg-gray-700 hover:bg-gray-100 focus:outline-none"
                      >
                        <tool.icon size="sm" />
                        <p className="whitespace-nowrap text-[13px] text-dark-text font-semibold">
                          {tool.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-y-1 w-full items-start justify-start flex-col">
                    <h3 className="font-semibold text-light-text text-[15px] whitespace-nowrap">
                      OPTIMIZE PDF
                    </h3>
                    {[
                      {
                        label: "Compress Pdf",
                        icon: CompressPdf,
                      },
                      {
                        label: "Repair Pdf",
                        icon: RepairPdf,
                      },
                      {
                        label: "OCR Pdf",
                        icon: OcrPdf,
                      },
                    ].map((tool, index) => (
                      <div
                        key={index}
                        className="flex cursor-pointer items-center justify-start gap-3 py-2 px-4 dark:hover:bg-gray-700 hover:bg-gray-100 focus:outline-none"
                      >
                        <tool.icon size="sm" />
                        <p className="whitespace-nowrap text-[13px] text-dark-text font-semibold">
                          {tool.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-y-1 w-full items-start justify-start flex-col">
                    <h3 className="font-semibold text-light-text text-[15px] whitespace-nowrap">
                      CONVERT TO PDF
                    </h3>

                    {[
                      {
                        label: "Jpg to Pdf",
                        icon: JPGTOPDF,
                      },
                      {
                        label: "Word to Pdf",
                        icon: WordToPdf,
                      },
                      {
                        label: "Powerpoint to Pdf",
                        icon: PowerPointToPdf,
                      },
                      {
                        label: "Excel to Pdf",
                        icon: ExcelToPdf,
                      },
                    ].map((tool, index) => (
                      <div
                        key={index}
                        className="flex cursor-pointer items-center justify-start gap-3 py-2 px-4 dark:hover:bg-gray-700 hover:bg-gray-100 focus:outline-none"
                      >
                        <tool.icon size="sm" />
                        <p className="whitespace-nowrap text-xs font-semibold text-light-text">
                          {tool.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-y-1 w-full items-start justify-start flex-col">
                    <h3 className="font-semibold text-light-text text-[15px] whitespace-nowrap">
                      CONVERT FROM PDF
                    </h3>
                    {[
                      {
                        label: "Pdf to Jpg",
                        icon: PdfToJpg,
                      },
                      {
                        label: "Pdf to Word",
                        icon: PdfToWord,
                      },
                      {
                        label: "Pdf to Powerpoint",
                        icon: PdfToPowerpoint,
                      },
                      {
                        label: "Pdf to Excel",
                        icon: PdfToExcell,
                      },
                    ].map((tool, index) => (
                      <div
                        key={index}
                        className="flex cursor-pointer items-center justify-start gap-3 py-2 px-4 dark:hover:bg-gray-700 hover:bg-gray-100 focus:outline-none"
                      >
                        <tool.icon size="sm" />
                        <p className="whitespace-nowrap text-xs font-semibold text-light-text">
                          {tool.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-y-1 w-full items-start justify-start flex-col">
                    <h3 className="font-semibold text-light-text text-[15px] whitespace-nowrap">
                      Edit PDF
                    </h3>
                    {[
                      {
                        label: "Rotate Pdf",
                        icon: RotatePdf,
                      },
                      {
                        label: "Add page numbers",
                        icon: AddPagesToPdf,
                      },
                      {
                        label: "Add watermark",
                        icon: WaterMarkPdf,
                      },
                      {
                        label: "Edit Pdf",
                        icon: EditPdf,
                      },
                    ].map((tool, index) => (
                      <div
                        key={index}
                        className="flex cursor-pointer items-center justify-start gap-3 py-2 px-4 dark:hover:bg-gray-700 hover:bg-gray-100 focus:outline-none"
                      >
                        <tool.icon size="sm" />
                        <p className="whitespace-nowrap text-xs font-semibold text-light-text">
                          {tool.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-y-1 w-full items-start justify-start flex-col">
                    <h3 className="font-semibold text-light-text text-[15px] whitespace-nowrap">
                      PDF SECURITY
                    </h3>
                    {[
                      {
                        label: "Unlock Pdf",
                        icon: UnlockPdf,
                      },
                      {
                        label: "Protect Pdf",
                        icon: LockPdf,
                      },
                      {
                        label: "Sign Pdf",
                        icon: SignPdf,
                      },
                      {
                        label: "Redact Pdf",
                        icon: RedactPdf,
                      },
                    ].map((tool, index) => (
                      <div
                        key={index}
                        className="flex cursor-pointer items-center justify-start gap-3 py-2 px-4 dark:hover:bg-gray-700 hover:bg-gray-100 focus:outline-none"
                      >
                        <tool.icon size="sm" />
                        <p className="whitespace-nowrap text-xs font-semibold text-light-text">
                          {tool.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </li>
        </ul>
      </motion.div>
      <motion.div
        variants={variants3}
        initial={"inactive"}
        whileInView={"active"}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-end gap-2">
          <nav className="flex items-center justify-end gap-4">
            <Button
              size="sm"
              className="dark:bg-transparent dark:px-0 dark:border-none dark:underline"
              variant="ghost"
            >
              <Link to="/signin">Sign In </Link>
            </Button>
            <span className="bg-gray-400 h-max min-h-8 w-[1px]"></span>
            <Button
              size="sm"
              className="hidden xs:flex dark:bg-[#ce1c1c] dark:text-white"
            >
              <Coffee />
              Support Us
            </Button>
          </nav>

          <ModeToggle />
          {sideMenuOpen ? (
            <div
              className="w-8 h-8 cursor-pointer text-secondary-foreground items-center justify-center flex md:hidden"
              onClick={toggleSideMenuOpen}
            >
              <XCircle className="w-8 h-8 cursor-pointer" />
            </div>
          ) : (
            <div
              className="w-8 h-8 p-0 cursor-pointer text-secondary-foreground items-center justify-center flex md:hidden"
            >
              <Menu
                onClick={toggleSideMenuOpen}
                className="w-8 h-8 cursor-pointer"
              />
            </div>
          )}
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
