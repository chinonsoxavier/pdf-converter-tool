import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";

import {
  CloudUpload,
  PlusIcon,
  Settings,
  XIcon,
} from "lucide-react";
import { useRef, useState } from "react";
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
import { useNavigate } from "react-router-dom";
const ConverterLayout = ({
  disabled=false,
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
    sideMenuOpen,
  } = useToolsStore();

  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [processingTool, setProcessingTool] = useState(false);
  const [isDragging, setIsDragging] = useState<boolean>(false); // Track drag state
  const variants1 = {
    inactive: {
      y: 20,
      opacity: 0,
    },
    active: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.5 },
    },
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    let file: File | undefined;

    if ("dataTransfer" in event) {
      // Drag event
      file = event.dataTransfer.files?.[0];
      event.preventDefault();
      setIsDragging(false);
    } else {
      // Input change event
      file = event.target.files?.[0];
    }

    const allowedFileTypes = fileType; // Assuming fileType is defined in your component
    if (file) {
      const fileType =
        file && file.name
          ? file.name.split(".").pop()?.toString() ?? "unknown"
          : "unknown";

      if (!allowedFileTypes || !allowedFileTypes.includes(fileType)) {
        alert("Invalid file type. Please upload a valid " + selectedFiles[selectedIndex]?.fileType[0] + ' file.');
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Clear the input value
        }
        return;
      }

      const fileUrl = URL.createObjectURL(file);
      setSelectedFile({
        fileUrl: fileUrl,
        fileName: file.name,
        fileSize: file.size,
        fileType: allowedFileTypes,
      });

      console.log("Selected file:", file.name, "Size:", file.size, "bytes");
      return;
    }
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleSubmitFile = () => {
    setProcessingTool(true);
    setProgress(0);
    const interval: number = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setProgress(100);
          setProcessingTool(false);
          navigate("download/hxdbhuabhsahvxas");
          return 100;
        }
        if (prev > 80) {
          return prev + Math.random() * 15; // Increment progress by 10%
        }
        return prev + Math.random() * 35;
      });
    }, 1500); // Update every 800ms
  };

 
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };


  return (
    <div className="h-lvh">

      {/* header */}
      <div className="h-[12%]">
        <Header />
      </div>
      <SidemenuLyout />

      {/* main content */}
      {processingTool ? (
        <ToolPageLoader
          setProgress={setProgress}
          progress={progress}
          convertingStateText={convertingStateText}
        />
      ) : (
        <main className="w-full h-[88%] overflow-scroll dark:bg-primary">
          {!selectedFiles[selectedIndex] ? (
            <div className="">
              <div className="w-full flex-col center p-4 py-20 rounded-lg ">
                <motion.div
                  variants={variants1}
                  initial={"inactive"}
                  whileInView={"active"}
                  viewport={{ once: true }}
                  className="w-full mx-auto center"
                >
                  <Card
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleFileChange}
                    className={`sm:p-10 p-6 bg-secondary dark:border-primary border-dashed border-3 w-full center gap-3 sm:gap-5 max-w-3xl my-0 ${
                      isDragging ? "border-accent dark:border-accent" : "border-[#4a4a4a] "
                    }`}
                  >
                    <h1 className="text-3xl sm:text-4xl sm:text-left text-center dark:text-white text-secondary-foreground font-semibold">
                      {label}
                    </h1>
                    <h1 className="text-secondary-foreground dark:text-white text-center text-lg sm:text-xl sm:mb-5">
                      {desc}
                    </h1>
                    <CloudUpload className="dark:text-white text-secondary-foreground sm:w-18 sm:h-18 w-10 h-10" />
                    <p className="text-[14px] dark:text-white text-secondary-foreground">
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
                      onChange={handleFileChange}
                      className="hidden"
                      aria-label="Choose PDF file"
                    />
                    <p className="text-secondary-foreground hidden dark:text-white text-xl text-center">
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
                          <TooltipTrigger className="rounded-full bg-accent p-2.5 w-11.5 h-11.5 text-white">
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

                        <Tooltip>
                          <TooltipTrigger className="rounded-full bg-accent p-2.5 w-11.5 h-11.5 text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 18 16"
                            >
                              <path
                                fill="currentColor"
                                d="M5.3475,0.7035 L0.096,4.125 L3.708,7.03725 L9.018,3.765 L5.3475,0.7035 Z M17.904,4.14 L12.66525,0.7275 L9.01875,3.7725 L14.29875,7.03875 L17.904,4.14 Z M9.01875,10.305 L12.66525,13.35975 L17.904,9.945 L14.2995,7.0395 L9.01875,10.305 Z M0.096,9.9585 L5.3475,13.35975 L9.01875,10.305 L3.70875,7.0455 L0.096,9.9585 Z M9.01875,10.9635 L5.35575,14.0385 L3.786,13.02 L3.786,14.16 L9.01875,17.30475 L14.271,14.15175 L14.271,13.0125 L12.693,14.031 L9.01875,10.9635 Z"
                              ></path>
                            </svg>
                            <TooltipContent className="text-white hidden border bottom-0">
                              Select file from Dropbox
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

              {/* Footer */}
              <Footer />
            </div>
          ) : (
            <div className="relative h-full flex items-start justify-start w-full">
              {/* converter layout sidebar */}
              <ConverterLayoutSidebar
                disabled={disabled}
                contents={actionMenuSideBar}
                fileType={fileType[0]}
                setProcessingTool={setProcessingTool}
                label={label}
              />
              <div className="h-full overflow-y-scroll flex items-start w-full justify-center ">
                <div className="flex w-full items-center justify-center relative flex-col p-7 h-full flex-1">
                  {children ? (
                    children
                  ) : (
                    <>
                      {fileType.includes("pdf") ? (
                        <PdfRenderer
                          label={selectedFiles[selectedIndex]?.fileName}
                          className={`p-3 w- w-full min-w-fit mx-auto my-auto`}
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
                        {sideMenuOpen ? (
                          <XIcon className="group-hover:text-accent cursor-pointer text-secondary-foreground" />
                        ) : (
                          <Settings className="group-hover:text-accent cursor-pointer text-secondary-foreground" />
                        )}
                      </TooltipTrigger>
                      <TooltipContent className="text-white">
                        Action Menu
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <Button
                  disabled={disabled}
                  onClick={() => {
                    handleSubmitFile();
                    setProcessingTool(true);
                  }}
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
