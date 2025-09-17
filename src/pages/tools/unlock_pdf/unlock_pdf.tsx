import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import useToolsStore from "../tools_store";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import useUnlockPdfStore from "./unlock_pdf_store";
const UnlockPdf = () => {
  const { convertPdfToWord, selectedFiles, selectedIndex } = useToolsStore();
  const [showPassword,setShowPassword]= useState(false);
   const {setPassword} = useUnlockPdfStore();

  return (
    <div className="">
      <ConverterLayout
        showAllSelectedFiles
        handleFileUpload={() =>
          convertPdfToWord(selectedFiles[selectedIndex]?.file)
        }
        actionButtonText="Unlock pdf file"
        label="Unlock your pdf file"
        desc="Remove passwords (if permitted)"
        convertingStateText="Unlocking pdf file"
        actionMenuSideBar={
          <div className="p-5">
            <p className="text-primary-foreground">
              Type your password to unlock your PDF file
            </p>

            <div className="flex gap-3 py-5 flex-col">
              <div className="relative flex items-center">
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Type password"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="bg-accent rounded-md h-full w-10 cursor-pointer absolute right-0 flex items-center justify-center"
                >
                  {!showPassword ? <EyeClosed /> : <Eye />}
                </div>
              </div>
            </div>
      
          </div>
        }
      />
    </div>
  );
};

export default UnlockPdf;
