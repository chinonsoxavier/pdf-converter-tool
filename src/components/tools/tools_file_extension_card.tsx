import { PowerPointIcon, WordIcon } from "@/assets/svg/export";
import useJpgToPdfStore from "@/pages/tools/jpg_to_pdf/jpg_to_pdf_store";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import useToolsStore from "@/pages/tools/tools_store";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";

const ToolsFileExtensionCard = ({
  fileType,
  src,
  className,
  showCloseIcon = true,
}: {
  src?: string;
  fileType: string;
  className?: string;
  showCloseIcon?: boolean;
}) => {
  const { margin, orientation } = useJpgToPdfStore();
  const { selectedFiles, selectedIndex, removeSelectedFiles } = useToolsStore();
  const toolsFilesExtensionIcon = [
    { label: "pptt", icon: PowerPointIcon },
    { label: "doc", icon: WordIcon },
    { label: "docx", icon: WordIcon },
  ];

  const handleRemoveSelectedfile = () => {
    if (selectedFiles[selectedIndex ?? 0]?.fileUrl) {
      removeSelectedFiles(selectedFiles[selectedIndex ?? 0].fileUrl);
      console.log(
        "Removed file with URL:",
        selectedFiles[selectedIndex ?? 0].fileUrl
      );
      // Optionally revoke the object URL to free memory
      URL.revokeObjectURL(selectedFiles[selectedIndex ?? 0].fileUrl);
    }
    // };
  };

  return (
    <div className="relative" >
      {showCloseIcon && (
        <Tooltip>
          <TooltipTrigger
            asChild
            onClick={handleRemoveSelectedfile}
            className="absolute text-white opacity-80 hover:opacity-100 duration-700 bg-accent center top-4 right-4 z-10 rounded-full w-8 h-8 p-1"
          >
            <XIcon />
          </TooltipTrigger>
          <TooltipContent className="text-white">Remove File</TooltipContent>
        </Tooltip>
      )}
      {fileType === "jpg" || fileType === "png" ? (
        <Tooltip>
          <TooltipTrigger>
            <div
              className={`center bg-white p-3 dark:bg-secondary flex-col border-2 hover:bg-secondary/70 hover:border-black/40 duration-500 border-dashed rounded-lg relative
      `}
            >
              <div
                className={`  ${
                  orientation === "portrait"
                    ? "w-[150px] h-[200px]"
                    : "w-[200px] h-[150px]"
                } ${
                  margin === "small"
                    ? "py-3 px-1"
                    : margin === "big"
                    ? "py-4 px-2"
                    : "py-2"
                } shadow gap-5 flex-col center rounded-lg pdf_shadow2 hover:border border dark:bg-secondary bg-white`}
              >
                <img
                  src={src}
                  alt="preview image"
                  className={` object-contain w-full h-full`}
                />
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent className="text-white">
            <p className="text-[13px]">
              {`${
                Math.round(
                  selectedFiles[selectedIndex]?.fileSize / (1024 * 1024)
                ) < 1
                  ? Number(
                      selectedFiles[selectedIndex]?.fileSize / 1024
                    ).toFixed(2) + "KB - "
                  : Number(
                      selectedFiles[selectedIndex]?.fileSize / (1024 * 1024)
                    ).toFixed(2) + "MB - "
              }`}
            </p>
          </TooltipContent>
        </Tooltip>
      ) : (
        toolsFilesExtensionIcon.map(
          (ext, index) =>
            ext.label === fileType && (
              <Tooltip key={index}>
                <div className="text-center">
                  <TooltipTrigger>
                    <div
                      className={cn(
                        className,
                        " bg-white dark:bg-secondary p border-2 hover:bg-secondary/70 hover:border-black/40 border-dashed",
                        "center flex-wra duration-500 rounded-lg relative"
                      )}
                    >
                      <div
                        key={index}
                        className="w-full gap-4 center flex-col min-w-[150px] shadow bg-white p-3 min-h-[200px] rounded-lg"
                      >
                        <ext.icon size="xl" />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="text-white">
                    <p className="text-[13px]">
                      {`${
                        Math.round(
                          selectedFiles[selectedIndex]?.fileSize / (1024 * 1024)
                        ) < 1
                          ? Number(
                              selectedFiles[selectedIndex]?.fileSize / 1024
                            ).toFixed(2) + " KB"
                          : Number(
                              selectedFiles[selectedIndex]?.fileSize /
                                (1024 * 1024)
                            ).toFixed(2) + " MB"
                      }`}
                    </p>
                  </TooltipContent>
                  <p className="py-2 text-sm text-primary-foreground">
                    {selectedFiles[selectedIndex]?.fileName}
                  </p>
                </div>
              </Tooltip>
            )
        )
      )}
    </div>
  );
};

export default ToolsFileExtensionCard;
