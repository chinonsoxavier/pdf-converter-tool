import ToolsFileExtensionCard from "@/components/tools/tools_file_extension_card";
// import { useEffect, useState } from "react";
import useToolsStore from "../../../pages/tools/tools_store";
import PdfRenderer from "@/components/pdf_renderer";

const MergePdfChildrenSection = () => {
  const { selectedFiles, selectedIndex } = useToolsStore();
  // const [newItemText, setNewItemText] = useState(selectedFiles);

  // useEffect(() => {
  //   setNewItemText(selectedFiles);
  // }, [selectedFiles]);

  // const handleDragStart = (e, index) => {
  //   e.dataTransfer.setData("text/plain", index);
  // };

  // const handleDragOver = (e) => {
  //   e.preventDefault();
  // };

  // const handleDrop = (e, index) => {
  //   e.preventDefault();
  //   const draggedIndex = e.dataTransfer.getData("text/plain");
  //   const draggedItem = selectedFiles[draggedIndex];

  //   // Create a new array to reorder the files
  //   const newFiles = [...selectedFiles];
  //   newFiles.splice(draggedIndex, 1); // Remove dragged item
  //   newFiles.splice(index, 0, draggedItem); // Insert it at the new position

  //   // Update the files in the store
  //   // reorderSelectedFiles(newFiles);
  //   setNewItemText(newFiles)
  // };

  return (
    <div className="flex items-center justify-center flex-wrap" >
      {selectedFiles[selectedIndex]?.fileType[0] === "pdf" ? (
        selectedFiles.map((file, index) => (
          <div
            key={file.fileUrl}
            draggable
            // onDragStart={(e) => handleDragStart(e, index)}
            // onDragOver={handleDragOver}
            // onDrop={(e) => handleDrop(e, index)}
            className="p-3 w-min mx-auto my-auto cursor-move"
          >
            {/* {newItemText[0].fileName} */}
            <PdfRenderer
              label={file.fileName}
              file={file.fileUrl}
              pageNumber={"1"}
              index={index}
            />
          </div>
        ))
      ) : (
        <ToolsFileExtensionCard
          fileType={selectedFiles[selectedIndex]?.fileType[0]}
        />
      )}
    </div>
  );
};

export default MergePdfChildrenSection;
