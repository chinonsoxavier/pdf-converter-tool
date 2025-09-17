import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import useToolsStore from "../tools_store";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import useProtectPdfStore from "./protect_pdf_store";
const ProtectPdf = () => {
  const { convertPdfToWord, selectedFiles, selectedIndex } = useToolsStore();
   const {setConfirmPassword,setPassword} = useProtectPdfStore();
  const [showPassword,setShowPassword]= useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  return (
    <div className="">
      <ConverterLayout
        showAllSelectedFiles
        handleFileUpload={() =>
          convertPdfToWord(selectedFiles[selectedIndex]?.file)
        }
        actionButtonText="Encrypt pdf file"
        label="Protect your pdf file"
        desc="Encrypt PDFs with user-defined password"
        convertingStateText="Encrypting pdf file"
        actionMenuSideBar={
          <div className="p-5">
            <p className="text-primary-foreground">
              Set a password to protect your PDF file
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
            <div className="relative flex items-center">
              <Input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showCPassword ? "text" : "password"}
                placeholder="Re-Type password"
              />
              <div
                onClick={() => setShowCPassword(!showCPassword)}
                className="bg-accent rounded-md h-full w-10 cursor-pointer absolute right-0 flex items-center justify-center"
              >
                {!showCPassword ? <EyeClosed /> : <Eye />}
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default ProtectPdf;
