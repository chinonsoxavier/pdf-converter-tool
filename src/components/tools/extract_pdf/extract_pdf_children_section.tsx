import React, { useEffect } from 'react'
import ToolsFileExtensionCard from '../tools_file_extension_card';
import useToolsStore from '@/pages/tools/tools_store';
import PdfRenderer from '@/components/pdf_renderer';

const ExtractPdfChildrenSection = () => {

    const { selectedFiles, selectedIndex } = useToolsStore();

    useEffect(() => {
      console.log(selectedFiles);
    }, [selectedFiles]);


  return (
    <div className="flex flex-wrap h-full items-start justify-start gap-7">
      {selectedFiles[selectedIndex]?.fileType[0] === "pdf" ? (
        <div>
          <PdfRenderer  
            file={selectedFiles[selectedIndex]?.fileUrl}
            pageNumber='all'
            
            
         />
        </div>
      ) : (
        <ToolsFileExtensionCard
          fileType={selectedFiles[selectedIndex]?.fileType[0]}
        />
      )}
    </div>
  );
}

export default ExtractPdfChildrenSection