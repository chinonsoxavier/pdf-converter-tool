import { XCircle } from "lucide-react";
import { Button } from "../ui/button";
import useLandingStore from "@/pages/landing/store/landing_store";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CompressPdf,
  ExcelToPdf,
  JPGTOPDF,
  LockPdf,
  MergePdf,
  PdfToExcell,
  PdfToJpg,
  PdfToPowerpoint,
  PdfToWord,
  PowerPointToPdf,
  RotatePdf,
  SplitPdf,
  UnlockPdf,
  WordToPdf,
} from "@/assets/svg/export";

const SidemenuLyout = () => {
  const { sideMenuOpen } = useLandingStore();
  const { toggleSideMenuOpen } = useLandingStore();
  return (
    <div
      className={cn(
        sideMenuOpen ? "w-full" : "w-0",
        "fixed h-lvh duration-500  backdrop-blur-[2px] z-20 right-0 bottom-0 overflow-hidden top-0 max-w-lvw"
      )}
    >
      <aside
        className={cn(
          sideMenuOpen ? "w-full" : "w-0",
          "overflow-hidden fixed max-w-sm z-20 top-0 bottom-0 shadow duration-500 right-0 py-10 bg-white dark:bg-primary"
        )}
      >
        <div className="flex items-center justify-between px-8 mb-10 w-full">
          <div className="flex items-center justify-start gap-5">
            <Button className="" variant="outline">
              Sign Up
            </Button>
            <Button>Sign In</Button>
          </div>
          <div className="flex items-center justify-end">
            {/* <Button className="bg-[red] p-0" variant="ghost" size="icon" > */}
            <XCircle
              onClick={toggleSideMenuOpen}
              className="w-full cursor-pointer text-secondary-foreground h-full"
            />
            {/* </Button> */}
          </div>
        </div>
        <Accordion type="single" collapsible>
          {[
            {
              label: "CONVERT TO PDF ",
              tools: [
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
              ],
            },
            {
              label: "CONVERT FROM PDF",
              tools: [
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
              ],
            },
            {
              label: "MERGE AND SPLIT",
              tools: [
                {
                  label: "Merge PDF",
                  icon: MergePdf,
                },
                {
                  label: "Split PDF",
                  icon: SplitPdf,
                },
              ],
            },
            {
              label: "PDF SECURITY",
              tools: [
                {
                  label: "Protect PDF",
                  icon: LockPdf,
                },
                {
                  label: "Unlock PDF",
                  icon: UnlockPdf,
                },
              ],
            },
            {
              label: "PDF ORGANIZATION",
              tools: [
                {
                  label: "Rotate PDF",
                  icon: RotatePdf, // Placeholder icon
                },
                {
                  label: "Compress PDF",
                  icon: CompressPdf, // Placeholder icon
                },
                {
                  label: "Add Watermark",
                  icon: PdfToWord, // Placeholder icon
                },
                {
                  label: "Rotate Pdf",
                  icon: RotatePdf, // Placeholder icon
                },
              ],
            },
          ].map((tool, index) => (
            <AccordionItem key={index} value={index + 1}>
              <AccordionTrigger className="px-8 text-[17px] font-semibold text-secondary-foreground">
                {tool.label}
              </AccordionTrigger>
              {tool.tools.map((tool, toolIndex) => (
                <AccordionContent
                  key={toolIndex}
                  className="flex text-base text-secondary-foreground font-medium items-start justify-start px-8 gap-2"
                >
                  <tool.icon size="sm" />
                  {tool.label}
                </AccordionContent>
              ))}
            </AccordionItem>
          ))}
        </Accordion>
      </aside>
    </div>
  );
};

export default SidemenuLyout;
