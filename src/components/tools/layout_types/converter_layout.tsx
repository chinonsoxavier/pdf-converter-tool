import HowToSection from "@/components/landing/how_to_section";
import ToolsSection from "@/components/landing/tools_section";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StyleSheet } from "@react-pdf/renderer";
import { motion } from "motion/react";

import {
  ArrowRightCircleIcon,
  CloudUpload,
  PlusIcon,
  Settings,
  XIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ToolsFileExtensionCard from "../tools_file_extension_card";
import { cn } from "@/lib/utils";
import ToolPageLoader from "../tool_page_loader";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/header";
import HistorySection from "../history_section";
import SidemenuLyout from "@/components/layout/sidemenu_layout";
import ConverterLayoutSidebar from "@/components/layout/converter_layout_sidebar";
import useToolsStore from "@/pages/tools/tools_store";
interface FilePickerCardProps {
  desc?: string;
  fileType?: string;
  onFileSelect?: (file: File) => void;
}
const ConverterLayout = ({
  disabled,
  children,
  actionButtonText,
  actionMenuSideBar,
  label,
  desc,
  file,
  fileType,
  setFile,
  convertingStateText,
  fileName,
  setFileName,
  numPages,
  setNumPages,
  fileSize,
  setFileSize,
}: Readonly<{
  disabled?: boolean;
  actionButtonText:string;
  children?: React.ReactNode;
  actionMenuSideBar?: React.ReactNode;
  label: string;
  desc: string;
  file?: null | File[] | string[];
  fileType: string[];
  fileSize?: number;
  setFile: (arg0: string) => void;
  fileName?: string;
  setFileName?: (arg0: string) => void;
  numPages?: number;
  setNumPages?: (arg0: number) => void;
  setFileSize?: (arg0: number) => void;
  convertingStateText: string;
}>) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "pink",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const [numPages, setNumPages] = useState(0);
  // const [fileName, setFileName] = useState(null);
  // const [fileSize, setFileSize] = useState(null);
  const [processingTool, setProcessingTool] = useState(false);
  const navigate = useNavigate();
  const { toggleSideMenuOpen } = useToolsStore();

  const variants1 = {
    inactive: {
      y: 80,
      opacity: 0,
    },
    active: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.5 },
    },
  };

  useEffect(() => {
    // setTimeout(() => {
    //   setProcessingTool(false);
    //   if (file) {
    //     navigate("download/hxdbhuabhsahvxas");
    //   }
    // }, 8000); // Simulate a delay for processing
  }, [processingTool]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    const allowedFileTypes = fileType;
    if (file) {
      const FileType = file.name.split(".").pop();
      if (!fileType || !allowedFileTypes.includes(FileType)) {
        alert(`Please select a valid ${allowedFileTypes.join(", ")} file`);
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Clear the input value
        }
        return;
      }
      const fileUrl = URL.createObjectURL(file);
      setFile(fileUrl);
      setFileName(file.name);
      setFileSize(file.size);

      console.log("Selected file:", file.name, "Size:", file.size, "bytes");
      return;
    }
  };

  return (
    <div className="overflow-scroll h-lvh">
      {/* side menu */}
      <SidemenuLyout />

      {/* main content */}
      {processingTool ? (
        <ToolPageLoader convertingStateText={convertingStateText} />
      ) : (
        <main className="w-full min-h-lvh h-full dark:bg-primary">
          {/* <ToolsHeaderLayout labelIcon={labelIcon} label={label} /> */}
          <div className="h-[12%]">
            <Header />
          </div>
          {!!file[0] === false ? (
            <>
              <div className="w-full flex-col center p-4 py-20 rounded-lg to-primary/5 from-white bg-gradient-to-t to-80% dark:from-primary dark:to-[rgb(4,9,30)]">
                <motion.div
                  variants={variants1}
                  initial={"inactive"}
                  whileInView={"active"}
                  viewport={{ once: true }}
                >
                  <h1 className="text-3xl sm:text-4xl sm:text-left text-center text-primary-foreground font-medium">
                    {label}
                  </h1>
                </motion.div>
                <motion.div
                  variants={variants1}
                  initial={"inactive"}
                  whileInView={"active"}
                  viewport={{ once: true }}
                  className="w-full mx-auto center"
                >
                  <Card className="sm:p-10 p-5 bg-secondary/30 dark:border-primary border-dashed border-accent border-3 w-full center gap-3 sm:gap-5 max-w-xl my-10">
                    <h1 className="text-secondary-foreground dark:text-secondary-foreground text-center text-lg sm:text-xl sm:mb-5">
                      {desc}
                    </h1>
                    <CloudUpload className="text-primary sm:w-18 sm:h-18 w-10 h-10" />
                    <p className="text-[13px] text-secondary-foreground">
                      Or drag and drop here...
                    </p>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept={fileType
                        .map(
                          (file) =>
                            `.${file.toLowerCase()},application/${file.toLowerCase()}`
                        )
                        .join(",")}
                      // accept=".pdf,application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      aria-label="Choose PDF file"
                    />
                    <p className="text-secondary-foreground hidden dark:text-secondary-foreground text-xl text-center">
                      Upload your {fileType} file below and get started.
                    </p>
                    <Button
                      onClick={handleButtonClick}
                      className="max-w-sm py-0 text-lg sm:text-xl rounded-lg flex items-center h-12 w-full"
                      type="submit"
                    >
                      Choose {fileType[0].toUpperCase()} File
                    </Button>
                  </Card>
                </motion.div>
              </div>

              {/* History Section */}
              <HistorySection />

              {/* How to section */}
              <HowToSection />

              {/* Tools Section */}
              <ToolsSection />

              {/* Footer */}
              <Footer />
            </>
          ) : (
            <div className="gap-8 h-[88%] to-primary/5 from-white bg-gradient-to-t to-80% dark:from-primary dark:to-[rgb(4,9,30)] relative flex items-start justify-between w-full">
              {/* converter layout sidebar */}
              <ConverterLayoutSidebar
                disabled={disabled}
                contents={actionMenuSideBar}
                fileType={fileType[0]}
                setProcessingTool={setProcessingTool}
                label={label}
              />
              <div className="center relative flex-col p-7 h-full flex-1">
                {children ? (
                  children
                ) : (
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="center flex-col border bg-white dark:bg-secondary rounded-lg hover:shadow-md duration-200 hover:border relative group p-3">
                        <Tooltip>
                          {/* <TooltipTrigger  className="w-full rounded-lg"> */}
                          <TooltipTrigger
                            asChild
                            onClick={() => setFile(null)}
                            className="items-center absolute top-1 hover:shadow right-1 z-30 bg-secondary p-1 text-primary-foreground cursor-pointer justify-center group-hover:opacity-100 duration-500 flex opacity-0 rounded-full w-8 h-8"
                          >
                            <XIcon className="w-4 h-4" />
                          </TooltipTrigger>
                          {/* </div> */}
                          <TooltipContent className="text-white">
                            <p>Remove File</p>
                          </TooltipContent>
                        </Tooltip>
                        {fileType[0] === "pdf" ? (
                          <Document
                            scale={0.3}
                            file={file[0]}
                            onLoadSuccess={({ numPages }) =>
                              setNumPages(numPages)
                            }
                            className="w-full center"
                          >
                            {/* {Array.from({ length: 1 }, (_, index) => ( */}
                            <Page className="border" pageNumber={1} />
                            {/* ))} */}
                          </Document>
                        ) : (
                          <ToolsFileExtensionCard fileType={fileType[0]} />
                        )}

                        <p className="whitespace-nowrap mt-2 text-sm text-secondary-foreground font-medium">
                          {fileName}
                        </p>
                      </div>
                    </TooltipTrigger>

                    <TooltipContent className="text-white">
                      <p className="text-[13px]">
                        {fileSize + " -" + numPages + " pages"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                )}
                <div className="center right-4 shadow drop-shadow-md sm:right-0 top-20 duration-500 cursor-pointer bg-accent text-white p-2 absolute rounded-full">
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept={fileType
                      .map(
                        (file) =>
                          `.${file.toLowerCase()},application/${file.toLowerCase()}`
                      )
                      .join(",")}
                    // accept=".pdf,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    aria-label="Choose PDF file"
                  />
                  <Tooltip>
                    <TooltipTrigger onClick={handleButtonClick}>
                      <PlusIcon className="cursor-pointer" />

                      <TooltipContent className="text-white">
                        Add More Files
                      </TooltipContent>
                    </TooltipTrigger>
                  </Tooltip>
                </div>

                <div
                  onClick={toggleSideMenuOpen}
                  className="flex sm:hidden items-center justify-center right-4 shadow drop-shadow-md sm:right-0 top-36 group  duration-500 cursor-pointer bg-secondary text-white p-2 absolute rounded-full"
                >
                  <Tooltip>
                    <TooltipTrigger>
                      <Settings className="group-hover:text-accent cursor-pointer text-secondary-foreground" />

                      <TooltipContent className="text-white">
                        Action Menu
                      </TooltipContent>
                    </TooltipTrigger>
                  </Tooltip>
                </div>
              </div>
              <Button
                disabled={disabled}
                onClick={() => setProcessingTool(true)}
                className="max-w-sm absolute bottom-10 left-10 sm:text-xl [&_svg]:size-6 group rounded-lg py-0 flex items-center sm:hidden"
                type="submit"
              >
                {actionButtonText}
                <ArrowRightCircleIcon className="group-hover:translate-x-3 duration-1000" />
              </Button>

              <aside
                className={cn(
                  "hidden overflow-hidden h-full w-full border-l flex-col sm:flex items-center justify-between max-w-xs bg-white dark:bg-secondary duration-1000"
                )}
              >
                <div className="w-full">
                  <div className="border-b px-5 py-6">
                    <p className="text-xl sm:text-2xl font-medium text-secondary-foreground text-center ">
                      {label}
                    </p>
                  </div>
                  {actionMenuSideBar}
                </div>
                <div className="px-6 w-full py-6">
                  <Button
                    disabled={disabled}
                    onClick={() => setProcessingTool(true)}
                    className="max-w-sm text-lg sm:text-xl [&_svg]:size-6 group rounded-lg py-0 flex items-center w-full"
                    type="submit"
                  >
                    {actionButtonText}
                    <ArrowRightCircleIcon className="" />
                  </Button>
                </div>
              </aside>
              {/* {children} */}
            </div>
          )}
        </main>
      )}
    </div>
  );
};

export default ConverterLayout;

// https://prod.liveshare.vsengsaas.visualstudio.com/join?798F34C727B056034891851C3C654E4B0876
