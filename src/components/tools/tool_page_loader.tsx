import useToolsStore from "@/pages/tools/tools_store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Loader2, RefreshCcw } from "lucide-react";
const ToolPageLoader = ({
  convertingStateText,
  label,
}: {
  convertingStateText: string;
  label: string;
}) => {
  const navigate = useNavigate();
  const { loadingState, downLoadId, setLoadingState } = useToolsStore();

  useEffect(() => {
    if (loadingState === "success") {
      navigate("download/" + downLoadId);
    }
  }, [loadingState]);

  return (
    <div className="h-full relative w-full py-5 flex itex max-w-lg px-8 mx-auto items-center flex-col">
      <h1 className="pb-5 pt-10 text-center text-3xl sm:text-[40px] text-secondary-foreground font-semibold">
        {loadingState === "error" ? label : convertingStateText}
      </h1>
      {loadingState === "loading" && <Loader2 className="animate-spin w-12 h-12 text-primary-foreground" />}
      {loadingState === "error" && (
        <div className="center flex-col space-y-4 cursor-pointer">
          {/* <div className="w-20 h-20 bg-accent/5 rounded-full center">
              <AlertTriangle className="w-7 text-accent" />
            </div> */}
          <div className="bg-secondary w-full px-8 py-2 center rounded-md border">
            <p className="text-red-400 text-2xl font-bold inline-flex">
              Failed to convert pdff
            </p>
          </div>
          {/* <img src={NoDataGif} alt="no data gif" className="w-full max-w-xs h-full" /> */}
          <Button
            onClick={() => setLoadingState("idle")}
            className="h-full max-h-12 text-xl w-full "
          >
            <RefreshCcw />
            Start over
          </Button>
        </div>
      )}
      {/* </div> */}
      {/* <Progress value={progress} /> */}
    </div>
  );
};

export default ToolPageLoader;
