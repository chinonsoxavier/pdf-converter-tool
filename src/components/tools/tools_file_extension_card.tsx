import { PowerPointIcon, WordIcon } from "@/assets/svg/export";

const ToolsFileExtensionCard = ({
  fileType,
}: {
  fileType: string;
}) => {
  const fileTypes = ["doc", "docx"];
  const toolsFilesExtensionIcon = [
    { label: "pptt", icon: PowerPointIcon },
    { label: "doc", icon: WordIcon },
  ];
  return toolsFilesExtensionIcon.map(
    (ext, index) =>
      ext.label === fileType && (
        <div
          key={index}
          className="w-full gap-4 center flex-col min-w-[150px] shadow bg-white p-3 min-h-[200px] rounded-lg"
        >
          <ext.icon size="xl" />
        </div>
      )
  );
};

export default ToolsFileExtensionCard;
