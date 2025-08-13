import { Button } from "../ui/button";
import { ChevronDown, Coffee, Menu, XCircle } from "lucide-react";
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
import { Link, NavLink } from "react-router-dom";
import { ModeToggle } from "../mode_toggle";
import { motion } from "motion/react";
import useLandingStore from "@/pages/landing/store/landing_store";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const Header = (isLanding:{isLanding?:boolean}) => {
  const variants1 = {
    inactive: {
      x: -50,
      opacity: 0,
    },
    active: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
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
      transition: { duration: 0.5 },
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
      transition: { duration: 0.5 },
    },
  };

  const { sideMenuOpen } = useLandingStore();
  const { toggleSideMenuOpen } = useLandingStore();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollPosition(window.scrollY);
    });
    return window.removeEventListener("scroll", () =>
      setScrollPosition(window.screenY)
    );
  }, []);

  return (
    <header
      className={`${
       !isLanding && scrollPosition < 300
          ? "bg-primary/5 backdrop-blur-2xl dark:bg-[rgb(4,9,30)]"
          : "dark:bg-primary bg-white"
      } flex sticky z-50 top-0 overflow-hidden items-center px-4 border-y sm:px-8 sm:py-5 h-full py-5 justify-between`}
    >
      <motion.div
        variants={variants1}
        initial={"inactive"}
        whileInView={"active"}
        viewport={{ once: true }}
      >
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-1">
  <span className="bg-gradient-to-r from-primary-foreground to-gray-400 text-transparent bg-clip-text">
    PDF
  </span>
  <span className="text-red-500 drop-shadow-md">Plug</span>
</h1>

      </motion.div>
      <motion.div
        variants={variants2}
        initial={"inactive"}
        whileInView={"active"}
        viewport={{ once: true }}
        className=""
      >
        <ul className="gap-3 hidden md:flex dark:text-white text-light-text">
          <li
            className={cn(
              "cursor-pointer hidden xlarge:block font-bold text-[15px]"
            )}
          >
            <NavLink
              to="/merge_pdf"
              className={({ isActive }) => (isActive ? "text-accent" : "")}
            >
              MERGE PDF
            </NavLink>
          </li>
          <li className="cursor-pointer hidden large:block font-bold text-[15px]">
            <NavLink
              to="/split_pdf"
              className={({ isActive }) => (isActive ? "text-accent" : "")}
            >
              SPLIT PDF
            </NavLink>
          </li>
          <li className="cursor-pointer hidden medium:block font-bold text-[15px]">
            <NavLink
              to="/compress_pdf"
              className={({ isActive }) => (isActive ? "text-accent" : "")}
            >
              COMPRESS PDF
            </NavLink>
          </li>
          <li className="cursor-pointer font-bold text-[15px]">
            <HoverCard>
              <HoverCardTrigger className="flex items-center justify-center">
                CONVERT PDF
                <ChevronDown
                  strokeWidth={0}
                  className="inline-block fill-dark-text dark:fill-white w-5 h-5"
                />
              </HoverCardTrigger>
              <HoverCardContent className="mt-10 w-full p-8 before:border-input before:border relative after:rounded-lg after:-z-10  flex items-center justify-center">
                <div className="flex gap-8 space-y-3 w-full items-start justify-between">
                  <div className="flex space-y-1 w-full items-start justify-start flex-col">
                    <h3 className="font-bold text-primary-foreground text-[15px] whitespace-nowrap">
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
                      <NavLink
                        key={index}
                        to={`/${tool.label.toLowerCase().replace(/\s+/g, "_")}`}
                        className={({ isActive }) =>
                          isActive
                            ? "text-accent dark:bg-gray-700 bg-gray-100"
                            : "text-secondary-foreground"
                        }
                      >
                        <div className="flex text-inherit cursor-pointer items-center justify-start gap-3 py-2 rounded px-4 dark:hover:bg-gray-700 hover:bg-gray-100 focus:outline-none">
                          <tool.icon size="sm" />
                          <p className="whitespace-nowrap text-secondary-foreground dark:text-primary-foreground text-sm font-bold">
                            {tool.label}
                          </p>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                  <div className="flex space-y-1 w-full items-start justify-start flex-col">
                    <h3 className="font-bold text-primary-foreground text-[15px] whitespace-nowrap">
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
                      <NavLink
                        key={index}
                        to={`/${tool.label.toLowerCase().replace(/\s+/g, "_")}`}
                        className={({ isActive }) =>
                          isActive
                            ? "text-accent dark:bg-gray-700 bg-gray-100"
                            : "text-secondary-foreground"
                        }
                      >
                        <div className="flex text-inherit cursor-pointer items-center justify-start gap-3 py-2 rounded px-4 dark:hover:bg-gray-700 hover:bg-gray-100 focus:outline-none">
                          <tool.icon size="sm" />
                          <p className="whitespace-nowrap text-secondary-foreground dark:text-primary-foreground text-sm font-bold">
                            {tool.label}
                          </p>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </li>
          <li className="cursor-pointer font-bold text-[15px]">
            <HoverCard>
              <HoverCardTrigger className="flex items-center justify-center">
                ALL PDF TOOLS
                <ChevronDown
                  strokeWidth={0}
                  className="inline-block fill-dark-text dark:fill-white w-5 h-5"
                />
              </HoverCardTrigger>
              <HoverCardContent className="mt-10 w-full p-8 relative after:rounded-lg z-30 flex items-center justify-center">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] max-w-4xl gap-8 flex-wrap  space-y-3 w-full items-start text-dark-text justify-between">
                  <div className="flex space-y-1 w-full items-start justify-start flex-col">
                    <h3 className="font-bold text-primary-foreground text-[15px] whitespace-nowrap">
                      ORGANIZE PDF
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
                      <NavLink
                        key={index}
                        to={`/${tool.label.toLowerCase().replace(/\s+/g, "_")}`}
                        className={({ isActive }) =>
                          isActive
                            ? "text-accent dark:bg-gray-700 bg-gray-100"
                            : "text-secondary-foreground"
                        }
                      >
                        <div className="flex text-inherit cursor-pointer items-center justify-start gap-3 py-2 rounded px-4 dark:hover:bg-gray-700 hover:bg-gray-100 focus:outline-none">
                          <tool.icon size="sm" />
                          <p className="whitespace-nowrap text-secondary-foreground dark:text-primary-foreground text-sm font-bold">
                            {tool.label}
                          </p>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                  <div className="flex space-y-1 w-full items-start justify-start flex-col">
                    <h3 className="font-bold text-primary-foreground text-[15px] whitespace-nowrap">
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
                      <NavLink
                        key={index}
                        to={`/${tool.label.toLowerCase().replace(/\s+/g, "_")}`}
                        className={({ isActive }) =>
                          isActive
                            ? "text-accent dark:bg-gray-700 bg-gray-100"
                            : "text-secondary-foreground"
                        }
                      >
                        <div className="flex text-inherit cursor-pointer items-center justify-start gap-3 py-2 rounded px-4 dark:hover:bg-gray-700 hover:bg-gray-100 focus:outline-none">
                          <tool.icon size="sm" />
                          <p className="whitespace-nowrap text-secondary-foreground dark:text-primary-foreground text-sm font-bold">
                            {tool.label}
                          </p>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                  <div className="flex space-y-1 w-full items-start justify-start flex-col">
                    <h3 className="font-bold text-primary-foreground text-[15px] whitespace-nowrap">
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
                        <p className="whitespace-nowrap text-secondary-foreground dark:text-primary-foreground text-sm font-bold">
                          {tool.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-y-1 w-full items-start justify-start flex-col">
                    <h3 className="font-bold text-primary-foreground text-[15px] whitespace-nowrap">
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
                        <p className="whitespace-nowrap text-secondary-foreground dark:text-primary-foreground text-sm font-bold">
                          {tool.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-y-1 w-full items-start justify-start flex-col">
                    <h3 className="font-bold text-primary-foreground text-[15px] whitespace-nowrap">
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
                        <p className="whitespace-nowrap text-secondary-foreground dark:text-primary-foreground text-sm font-bold">
                          {tool.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-y-1 w-full items-start justify-start flex-col">
                    <h3 className="font-bold text-primary-foreground text-[15px] whitespace-nowrap">
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
                        <p className="whitespace-nowrap text-secondary-foreground dark:text-primary-foreground text-sm font-bold">
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
              className="h-10 sm:h-full dark:bg-transparent dark:px-0 dark:border-none dark:underline"
              variant="secondary"
            >
              <Link to="/signin">Sign In </Link>
            </Button>
            <span className="bg-gray-400 h-max min-h-8 w-[1px]"></span>
            <Button className="h-10 sm:h-full hidden xs:flex dark:bg-[#ce1c1c] dark:text-white">
              <Coffee />
              Support Us
            </Button>
          </nav>

          <ModeToggle />
          {sideMenuOpen ? (
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 cursor-pointer dark:text-white text-secondary-foreground items-center justify-center flex md:hidden"
              onClick={toggleSideMenuOpen}
            >
              <XCircle className="w-9 h-9 sm:w-10 sm:h-10 cursor-pointer" />
            </div>
          ) : (
            <div className="w-9 h-9 sm:w-10 sm:h-10 p-0 cursor-pointer dark:text-white text-secondary-foreground items-center justify-center flex md:hidden">
              <Menu
                onClick={toggleSideMenuOpen}
                className="w-9 h-9 sm:w-10 sm:h-10 cursor-pointer"
              />
            </div>
          )}
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
