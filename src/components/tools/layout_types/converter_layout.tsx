import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import {
  CloudUpload,
  PlusIcon,
  Settings,
  UploadIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
import { enqueueSnackbar } from "notistack";
// import DropboxChooser from "react-dropbox-chooser";
import useDrivePicker from "react-google-drive-picker";

// import { useNavigate } from "react-router-dom";
const ConverterLayout = ({
  disabled = false,
  children,
  actionButtonText,
  actionMenuSideBar,
  label,
  desc,
  convertingStateText,
  fileType = ["pdf"],
  handleFileUpload,
  showAllSelectedFiles = false,
}: Readonly<{
  disabled?: boolean;
  actionButtonText: string;
  children?: React.ReactNode;
  actionMenuSideBar?: React.ReactNode;
  label: string;
  desc: string;
  fileType?: string[];
  convertingStateText: string;
  showAllSelectedFiles?: boolean;
  handleFileUpload?: (pdfFile: File) => Promise<string>;
}>) => {
  const {
    selectedFiles,
    setSelectedFile,
    toggleSideMenuOpen,
    selectedIndex,
    sideMenuOpen,
    loadingState,
  } = useToolsStore();

  // const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const [hovered, setHovered] = useState(false);

  // const [processingTool, setProcessingTool] = useState(false);
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
    let files: FileList | File[] | undefined;

    if ("dataTransfer" in event) {
      // Drag event
      files = event.dataTransfer.files;
      event.preventDefault();
      setIsDragging(false);
    } else {
      // Input change event
      files = event.target.files ?? undefined;
    }

    if (!files || files.length === 0) return;

    const allowedFileTypes = fileType; // from props or state
    const newSelectedFiles: {
      fileUrl: string;
      fileName: string;
      fileSize: number;
      fileType: string;
      file: File;
    }[] = [];

    Array.from(files).forEach((file) => {
      const fileExt = file.name.split(".").pop()?.toLowerCase() ?? "unknown";

      if (!allowedFileTypes || !allowedFileTypes.includes(fileExt)) {
        enqueueSnackbar(
          `Invalid file type. Please upload a valid ${selectedFiles[selectedIndex]?.fileType[0]} file`,
          { variant: "error" }
        );

        if (fileInputRef.current) fileInputRef.current.value = "";
        if (fileInputRef2.current) fileInputRef2.current.value = "";
        return;
      }

      const fileUrl = URL.createObjectURL(file);
      newSelectedFiles.push({
        fileUrl,
        fileName: file.name,
        fileSize: file.size,
        fileType: fileExt,
        file,
      });
      setSelectedFile({
        file: file,
        fileUrl,
        fileName: file.name,
        fileSize: file.size,
        fileType: [fileExt],
      });
    });

    // Append to existing files instead of overwriting

    console.log(newSelectedFiles, "newly added files");
    console.log(selectedFiles, "all selected files");
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleSubmitFile = async () => {
    await handleFileUpload(selectedFiles[selectedIndex ?? 0]?.file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
    fileInputRef2.current?.click();
  };
  // ... (your existing code)

  const [openPicker, authResponse] = useDrivePicker();
  const [pickedData, setPickedData] = useState(null);

  const handleOpenPicker = () => {
    openPicker({
      clientId:
        "198864983257-cgldsp1c563i52jl51c5isr4gagnqdfo.apps.googleusercontent.com",
      developerKey: "AIzaSyBHxtPyHjePwkwxy7b-hGVrNOMtxr3J98s",
      // ... other options
      callbackFunction: (data) => {
        if (data.action === "picked") {
          // Save the picker data to a state variable
          setPickedData(data);
        }
      },
    });
  };

  // Use a useEffect hook to watch for changes in authResponse and pickedData
  useEffect(() => {
    const processFile = async () => {
      if (!pickedData || !authResponse || !authResponse.access_token) {
        return;
      }

      const filePicked = pickedData.docs[0];
      const fileId = filePicked.id;
      const fileName = filePicked.name;
      const mimeType = filePicked.mimeType;
      const fileSize = filePicked.sizeBytes;
      const accessToken = authResponse.access_token;

      try {
        const driveApiUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
        const response = await fetch(driveApiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch file from Google Drive");
        }

        const blob = await response.blob();
        const file = new File([blob], fileName, { type: mimeType });
        const fileUrl = URL.createObjectURL(file);
        const extractedFileType = mimeType.split("/").pop() || "unknown";

        setSelectedFile({
          fileUrl: fileUrl,
          fileName: fileName,
          fileSize: fileSize,
          fileType: [extractedFileType],
          file: file,
        });

        enqueueSnackbar(
          `File '${fileName}' loaded successfully from Google Drive.`,
          { variant: "success" }
        );
      } catch (error) {
        console.error("Error loading file from Google Drive:", error);

      }
    };

    processFile();
  }, [pickedData, authResponse]);

  useEffect(() => {
    console.log(authResponse);
  }, [authResponse]);

  useEffect(() => {
    console.log(selectedFiles[selectedIndex]);
    console.log("selectedFiles[selectedIndex]");
  }, [selectedFiles]);

  return (
    <div className="h-dvh overflow-hidden">
      {/* header */}
      <div className="h-[12%]">
        <Header isLanding={false} />
      </div>
      <SidemenuLyout />

      {/* main content */}
      {loadingState === "error" ||
    loadingState === "loading" ||
      loadingState === "success" ? (
        <ToolPageLoader
          label={label}
          convertingStateText={convertingStateText}
          handleSubmitFile={handleSubmitFile}
        />
      ) : (
        <main className="w-full h-[88%] dark:bg-primary">
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
                    className={`sm:p-10 p-6 bg-accent/5 dark:border-primary border-dashed border-3 w-full center gap-3 sm:gap-5 max-w-3xl my-0 ${
                      isDragging
                        ? "border-accent dark:border-accent"
                        : "border-[#4a4a4a] "
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
                      multiple
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
                          <TooltipTrigger
                            onClick={handleOpenPicker}
                            className="rounded-full cursor-pointer bg-accent p-2.5 w-11.5 h-11.5 text-white"
                          >
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

                        {/* <DropboxChooser
                          appKey={"qldjo0z7zlvfu1z"}
                          // success={(files) => this.onSuccess(files)}
                          // cancel={() => this.onCancel()}
                          multiselect={true}
                          extensions={[".mp4"]}
                        >
                          <Tooltip>
                            <TooltipTrigger className="rounded-full cursor-pointer bg-accent p-2.5 w-11.5 h-11.5 text-white">
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
                        </DropboxChooser> */}
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
            <div className="relative flex h-full items-start justify-start w-full">
              {/* converter layout sidebar */}
              <ConverterLayoutSidebar
                disabled={disabled}
                contents={actionMenuSideBar}
                fileType={fileType[0]}
                handleButtonClick={handleSubmitFile}
                // setProcessingTool={setProcessingTool}
                label={label}
              />
              <div className="h-full overflow-y-auto relative flex items-start w-full justify-center ">
                <div className="flex w-full items-center justify-start relative flex-col p-4 h-full flex-1">
                <div className="flex flex-col relative w-full tify-center p-3 items-end gap-5">
                    <div className="items-center fixed md:relative top-2 z-20 justify-center">
                      <div
                        onMouseEnter={() => setHovered(true)}
                        onMouseOver={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        onMouseOut={() => setHovered(false)}
                        className="center gap-2 duration-500 cursor-pointer text-white"
                      >
                        <Tooltip>
                          <TooltipTrigger
                            onClick={handleOpenPicker}
                            className={`${
                              hovered
                                ? "rotate-0 translate-x-0 scale-100 opacity-100"
                                : "rotate-90 scale-0 translate-x-8 opacity-0"
                            } cursor-pointer bg-accent duration-700 p-2 rounded-full`}
                          >
                            <svg
                              className="w-5 h-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 18 16"
                            >
                              <path
                                fill="currentColor"
                                d="M8.7375,5.80725 L3.021,15.70725 L0.12375,10.69725 L5.847,0.795 L8.7375,5.80725 Z M17.865,10.38225 L12.078,10.39125 L6.378,0.489 L12.1725,0.489 L17.865,10.38225 Z M17.87625,10.9875 L14.9865,15.9975 L3.5415,15.99 L6.43425,10.98375 L17.87625,10.9875 Z"
                              ></path>
                            </svg>
                          </TooltipTrigger>
                          <TooltipContent className="text-white">
                            Add From Google Drive
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger
                            className={`${
                              hovered
                                ? "rotate-0 translate-x-0 scale-100 opacity-100"
                                : "rotate-90 scale-0 translate-x-8 opacity-0"
                            } cursor-pointer bg-accent duration-700 p-2 rounded-full`}
                            onClick={handleButtonClick}
                          >
                            <svg
                              className="w-5 h-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 18 16"
                            >
                              <path
                                fill="currentColor"
                                d="M5.3475,0.7035 L0.096,4.125 L3.708,7.03725 L9.018,3.765 L5.3475,0.7035 Z M17.904,4.14 L12.66525,0.7275 L9.01875,3.7725 L14.29875,7.03875 L17.904,4.14 Z M9.01875,10.305 L12.66525,13.35975 L17.904,9.945 L14.2995,7.0395 L9.01875,10.305 Z M0.096,9.9585 L5.3475,13.35975 L9.01875,10.305 L3.70875,7.0455 L0.096,9.9585 Z M9.01875,10.9635 L5.35575,14.0385 L3.786,13.02 L3.786,14.16 L9.01875,17.30475 L14.271,14.15175 L14.271,13.0125 L12.693,14.031 L9.01875,10.9635 Z"
                              ></path>
                            </svg>
                          </TooltipTrigger>
                          <TooltipContent className="text-white">
                            Add From Dropbox
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger
                            className={`${
                              hovered
                                ? "rotate-0 translate-x-0 scale-100 opacity-100"
                                : "rotate-90 scale-0 translate-x-8 opacity-0"
                            } cursor-pointer bg-accent duration-700 p-2 rounded-full`}
                            onClick={handleButtonClick}
                          >
                            <UploadIcon className="w-5 h-5" />
                          </TooltipTrigger>
                          <TooltipContent className="text-white">
                            Add From Local Device
                          </TooltipContent>
                        </Tooltip>
                        <Input
                          ref={fileInputRef2}
                          type="file"
                          multiple
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
                        <Tooltip>
                          <TooltipTrigger
                            className="bg-accent p-2 rounded-full relative"
                            onClick={handleButtonClick}
                          >
                            <div className="center bg-secondary border-accent border shadow rounded-full w-5 h-5 absolute -top-2 right-0">
                              <p className="text-xs font-semibold text-primary-foreground">
                                {selectedFiles.length}
                              </p>
                            </div>
                            <PlusIcon className="cursor-pointer w-5 h-5" />
                          </TooltipTrigger>
                          <TooltipContent className="text-white">
                            Add More Files
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                    <div className="center top -mt-4 right-7 fixed md:relative gap-2 duration-500 cursor-pointer text-white">
                      <Tooltip>
                        <TooltipTrigger
                          className="bg-secondary shadow-3xl border sm:hidden drop-shadow-2xl p-2 rounded-full"
                          onClick={toggleSideMenuOpen}
                        >
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
                  {children ? (
                    children
                  ) : (
                    <>
                      {fileType.includes("pdf") ? (
                        <>
                          {showAllSelectedFiles ? (
                            <div className="flex items-center justify-center gap-5 w-full flex-wrap">
                              {selectedFiles.map((file, index) => (
                                <div key={index} className="my-5">
                                  <PdfRenderer
                                    label={file?.fileName}
                                    className={`p-3 w- w-9 min-w-fit`}
                                    scale={0.8}
                                    file={file?.fileUrl}
                                    pageNumber={"1"}
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <>
                              <PdfRenderer
                                label={selectedFiles[selectedIndex]?.fileName}
                                className={`p-3 w- w-full min-w-fit mx-auto my-auto`}
                                scale={0.8}
                                file={selectedFiles[selectedIndex]?.fileUrl}
                                pageNumber={"1"}
                              />
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {showAllSelectedFiles ? (
                            <div className="flex items-center justify-center gap-5 w-full flex-wrap">
                              {selectedFiles.map((file, index) => (
                                <div key={index} className="my-5">
                                  <ToolsFileExtensionCard
                                    src={selectedFiles[selectedIndex]?.fileUrl}
                                    fileType={
                                      selectedFiles[selectedIndex]?.fileType[0]
                                    }
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <ToolsFileExtensionCard
                              src={selectedFiles[selectedIndex]?.fileUrl}
                              fileType={
                                selectedFiles[selectedIndex]?.fileType[0]
                              }
                            />
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>

                <Button
                  disabled={disabled}
                  onClick={handleSubmitFile}
                  className={`${
                    sideMenuOpen ? "opacity-0" : "opacity-100"
                  } duration-500 max-w-sm font-semibold fixed bottom-10 left-10 sm:text-xl [&_svg]:size-6 group rounded-lg py-0 flex items-center sm:hidden`}
                  type="submit"
                >
                  {actionButtonText}
                  {/* <ArrowRightCircleIcon className="group-hover:translate-x-3 duration-1000" /> */}
                </Button>
              </div>
              {
actionMenuSideBar &&
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
                <div className="h-[76%] w-full overflow-y-auto">
                  {actionMenuSideBar}
                </div>
                <div className="px-6 w-full py-6 -[12%]">
                  <Button
                    disabled={disabled}
                    onClick={handleSubmitFile}
                    className="max-w-sm font-semibold sm:h-16 text-lg sm:text-xl [&_svg]:size-6 group rounded-lg py-0 flex items-center w-full"
                    type="submit"
                  >
                    {actionButtonText}
                    {/* <ArrowRightCircleIcon className="" /> */}
                  </Button>
                </div>
              </aside>
              }
              {
                !actionMenuSideBar &&
              <Button onClick={handleSubmitFile} className="absolute bottom-10 right-10 hidden sm:block" >{actionButtonText}</Button>
              }
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
