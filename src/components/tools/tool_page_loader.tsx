import useToolsStore from "@/pages/tools/tools_store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import ToolPageLoaderError from "./tool_page_loader_error";
const ToolPageLoader = ({
  convertingStateText,
  label,
  handleSubmitFile,
}: {
  convertingStateText: string;
  label: string;
  handleSubmitFile: () => void;
}) => {
  const navigate = useNavigate();
  const { loadingState,downLoadId,setLoadingState } = useToolsStore();

  useEffect(() => {
    if (loadingState === "success") {
      navigate("download/" + downLoadId);
      setLoadingState("idle")
    }
  }, [loadingState]);

  return (
    <div className="h-[90%] overflow-y-scroll relative w-full py-5 flex itex px-8 mx-auto items-center flex-col">
      {loadingState === "loading" ? (
        <>
          <h1 className="pb-5 pt-10 text-center text-3xl sm:text-[40px] text-secondary-foreground font-semibold">
            {convertingStateText}
          </h1>
          {/* {loadingState === "loading" && ( */}
          <Loader2 className="animate-spin w-12 h-12 text-primary-foreground" />
          {/* )} */}
        </>
      ) : (
        <ToolPageLoaderError
          handleSubmitFile={handleSubmitFile}
          label={label}
          convertingStateText={convertingStateText}
        />
      )}
    </div>
  );
};

export default ToolPageLoader;
