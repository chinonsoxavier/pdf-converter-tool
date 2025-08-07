import HowToSection from "@/components/landing/how_to_section";
import ToolsSection from "@/components/landing/tools_section";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";

import {
  CloudUpload,
  PlusIcon,
  Settings,
} from "lucide-react";
import {useEffect, useRef, useState } from "react";
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
import Header from "@/components/layout/header";
import HistorySection from "../history_section";
import SidemenuLyout from "@/components/layout/sidemenu_layout";
import ConverterLayoutSidebar from "@/components/layout/converter_layout_sidebar";
import useToolsStore from "@/pages/tools/tools_store";
import PdfRenderer from "@/components/pdf_renderer";
// interface FilePickerCardProps {
//   desc?: string;
//   fileType?: string;
//   onFileSelect?: (file: File) => void;
// }
const ConverterLayout = ({
  disabled,
  children,
  actionButtonText,
  actionMenuSideBar,
  label,
  desc,
  convertingStateText,
  fileType=["pdf"],
}: Readonly<{
  disabled?: boolean;
  actionButtonText:string;
  children?: React.ReactNode;
  actionMenuSideBar?: React.ReactNode;
  label: string;
  desc: string;
  fileType?: string[];
  convertingStateText: string;
}>) => {

  const {
    selectedFiles,
    setSelectedFile,
    toggleSideMenuOpen,
    selectedIndex,
  } = useToolsStore();


  const fileInputRef = useRef<HTMLInputElement>(null);
  const [processingTool, setProcessingTool] = useState(false);
  useEffect(() => {
    console.log("changed numPages");
    // initRotate(0, selectedFiles[selectedIndex]?.numPages);
    // console.log(selectedFiles[selectedIndex]?.numPages);
    // console.log(selectedFiles[selectedIndex]?.numPages, "yes");
  }, [selectedFiles[0]?.numPages]);
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

  // useEffect(() => {
  //   setTimeout(() => {
  //     setProcessingTool(false);
  //     if (file) {
  //       navigate("download/hxdbhuabhsahvxas");
  //     }
  //   }, 8000); // Simulate a delay for processing
  // }, [processingTool]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    const allowedFileTypes = fileType;
    if (file) {
      const FileType = file.name.split(".").pop().toString();
      if (!fileType || !allowedFileTypes.includes(FileType)) {
           if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Clear the input value
        }
        return;
      }
      const fileUrl = URL.createObjectURL(file);
      setSelectedFile({fileUrl:fileUrl,fileName:file.name,fileSize:file.size,fileType:fileType});

      console.log("Selected file:", file.name, "Size:", file.size, "bytes");
      return;
    }
  };

  // const {numPages} = selectedFiles[0].numPages

  // useEffect(() => {
  //  setNumPages(selectedIndex,selectedFiles[0]?.numPages)
  // }, [fileInputRef.current])
  

  return (
    <div className="overflow-scroll h-lvh">
      {/* side menu */}
      <SidemenuLyout />

      {/* main content */}
      {processingTool ? (
        <ToolPageLoader convertingStateText={convertingStateText} />
      ) : (
        <main className="w-full min-h-lvh h-full dark:bg-primary">
          <div className="h-[12%]">
            <Header />
          </div>
          {!selectedFiles[selectedIndex] ? (
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
                  <Card className="sm:p-10 p-6 bg-secondary/30 dark:border-primary border-dashed border-accent border-2 w-full center gap-3 sm:gap-5 max-w-xl my-10">
                    <h1 className="text-secondary-foreground dark:text-secondary-foreground text-center text-lg sm:text-xl sm:mb-5">
                      {desc}
                    </h1>
                    <CloudUpload className="text-primary sm:w-18 sm:h-18 w-10 h-10" />
                    <p className="text-[14px] text-secondary-foreground">
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
                    <div className="flex items-center flex-col justify-center gap-3 w-full">
                      <Button
                        onClick={handleButtonClick}
                        className="max-w-sm py-0 text-lg sm:text-xl rounded-lg flex items-center h-12 w-full"
                        type="submit"
                      >
                        Choose {fileType[0].toUpperCase()} File
                      </Button>
                      <div className="center gap-4">
                        <Tooltip>
                          <TooltipTrigger className="rounded-full bg-accent p-2 w-10 h-10 text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 18 16"
                            >
                              <path
                                fill="currentColor"
                                d="M8.7375,5.80725 L3.021,15.70725 L0.12375,10.69725 L5.847,0.795 L8.7375,5.80725 Z M17.865,10.38225 L12.078,10.39125 L6.378,0.489 L12.1725,0.489 L17.865,10.38225 Z M17.87625,10.9875 L14.9865,15.9975 L3.5415,15.99 L6.43425,10.98375 L17.87625,10.9875 Z"
                              ></path>
                            </svg>
                            <TooltipContent className="text-white hidden border bottom-0">
                              Select file from Google Drive
                            </TooltipContent>
                          </TooltipTrigger>
                        </Tooltip>{" "}
                        <Tooltip>
                          <TooltipTrigger className="rounded-full bg-accent p-2 w-10 h-10 text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 18 16"
                            >
                              <path
                                fill="currentColor"
                                d="M8.7375,5.80725 L3.021,15.70725 L0.12375,10.69725 L5.847,0.795 L8.7375,5.80725 Z M17.865,10.38225 L12.078,10.39125 L6.378,0.489 L12.1725,0.489 L17.865,10.38225 Z M17.87625,10.9875 L14.9865,15.9975 L3.5415,15.99 L6.43425,10.98375 L17.87625,10.9875 Z"
                              ></path>
                            </svg>
                            <TooltipContent className="text-white hidden border bottom-0">
                              Select file from Google Drive
                            </TooltipContent>
                          </TooltipTrigger>
                        </Tooltip>
                      </div>
                    </div>
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
            <div className="h-[88%] to-primary/5 from-white bg-gradient-to-t to-80% dark:from-primary dark:to-[rgb(4,9,30)] relative flex items-start justify-start w-full">
              {/* converter layout sidebar */}
              <ConverterLayoutSidebar
                disabled={disabled}
                contents={actionMenuSideBar}
                fileType={fileType[0]}
                setProcessingTool={setProcessingTool}
                label={label}
              />
              <div className="h-full overflow-y-scroll flex items-start w-full justify-center ">
                <div className="flex items-center justify-center relative flex-col p-7 h-full flex-1">
                  {children ? (
                    children
                  ) : (
                    <>
                      {fileType.includes("pdf") ? (
                        <PdfRenderer
                          label={selectedFiles[selectedIndex]?.fileName}
                          className={`p-3 w-min mx-auto my-auto`}
                          scale={0.8}
                          file={selectedFiles[selectedIndex]?.fileUrl}
                          pageNumber={"1"}
                        />
                      ) : (
                        <ToolsFileExtensionCard
                          src={selectedFiles[selectedIndex]?.fileUrl}
                          fileType={selectedFiles[selectedIndex]?.fileType[0]}
                        />
                      )}
                    </>
                  )}
                  <div className="center absolute mr-5 sm:mr-0 right-0 shadow drop-shadow-md sm:right-5 sm:top-5 top-20 duration-500 cursor-pointer bg-accent text-white p-2 rounded-full">
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
                      </TooltipTrigger>
                      <TooltipContent className="text-white">
                        Add More Files
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <div
                    onClick={toggleSideMenuOpen}
                    className="flex sm:hidden absolute mr-5 sm:mr-0 right-0 shadow drop-shadow-md sm:right-5 sm:top-18 top-36 duration-500 cursor-pointer bg-secondary hover:text-accent text-white p-2 rounded-full"
                  >
                    <Tooltip>
                      <TooltipTrigger>
                        <Settings className="group-hover:text-accent cursor-pointer text-secondary-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="text-white">
                        Action Menu
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <Button
                  disabled={disabled}
                  onClick={() => setProcessingTool(true)}
                  className="max-w-sm font-semibold absolute bottom-10 left-10 sm:text-xl [&_svg]:size-6 group rounded-lg py-0 flex items-center sm:hidden"
                  type="submit"
                >
                  {actionButtonText}
                  {/* <ArrowRightCircleIcon className="group-hover:translate-x-3 duration-1000" /> */}
                </Button>
              </div>
              <aside
                className={cn(
                  "hidden overflow-hidden h-full w-full border-l flex-col sm:flex items-center justify-between max-w-sm bg-white dark:bg-secondary duration-1000"
                )}
              >
                <div className="border-b px-5 py-6 h-[12%] w-full">
                  <p className="text-xl sm:text-2xl font-medium text-secondary-foreground text-center ">
                    {label}
                  </p>
                </div>
                <div className="h-[76%] w-full overflow-y-scroll">
                  {actionMenuSideBar}
                </div>
                <div className="px-6 w-full py-6 -[12%]">
                  <Button
                    disabled={disabled}
                    onClick={() => setProcessingTool(true)}
                    className="max-w-sm font-semibold sm:h-16 text-lg sm:text-xl [&_svg]:size-6 group rounded-lg py-0 flex items-center w-full"
                    type="submit"
                  >
                    {actionButtonText}
                    {/* <ArrowRightCircleIcon className="" /> */}
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
