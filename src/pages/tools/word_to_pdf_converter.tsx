import ContainerLayout from "@/components/layout/container_layout";
import Footer from "@/components/layout/footer";
import HowToSection from "@/components/landing/how_to_section";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PdfToWord, WordToPdf } from "@/assets/svg/export";
import ToolsSection from "@/components/landing/tools_section";
import ToolsHeaderLayout from "@/components/layout/tools_header_layout";
const WordToPdfConverter = () => {
  return (
    <>
      {/* Header */}
      <ToolsHeaderLayout labelIcon={WordToPdf} label="Word To Converter" />

      {/* Main content */}
      <main className="w-full to-primary/5 from-white bg-gradient-to-t to-80% dark:from-primary dark:to-secondary">
        <ContainerLayout className="w-full center py-26 space-y-5 flex-col text-center">
          <h1 className="text-secondary-foreground dark:text-secondary-foreground text-xl mb-20">
            Convert Word documents to PDF{" "}
          </h1>
          <p className="text-secondary-foreground hidden dark:text-secondary-foreground text-xl">
            Upload your PDF file below and get started.
          </p>
          <Button
            className="max-w-sm font-semibold rounded-full flex items-center h-12 w-full"
            type="submit"
          >
            <Plus /> CONVERT WORD TO PDF
          </Button>
        </ContainerLayout>

        {/* How to section */}
        <HowToSection />

        {/* Tools Section */}
        <ToolsSection />
      </main>

      {/* Footer*/}
      <Footer />
    </>
  );
};

export default WordToPdfConverter;
