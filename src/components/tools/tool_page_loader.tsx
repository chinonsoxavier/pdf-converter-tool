// import { Check } from "lucide-react";
// import { cn } from "@/lib/utils";
import useToolsStore from "@/pages/tools/tools_store";
// import { Hourglass } from "ldrs/react";
import "ldrs/react/Hourglass.css";
import { Ring2 } from "ldrs/react";
import "ldrs/react/Ring2.css"; // Default
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
import NoDataGif from "@/assets/gif/no_data.gif";
// Default values shown
const ToolPageLoader = ({
  convertingStateText,
  label,
}: {
  convertingStateText: string;
  label: string;
}) => {
  const navigate = useNavigate();
  const { loadingState, downLoadId ,setLoadingState} = useToolsStore();

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
      {loadingState === "loading" && (
        <Ring2
          size="40"
          stroke="5"
          strokeLength="0.25"
          bgOpacity="0.1"
          speed="0.8"
          color="black"
        />
      )}
      {loadingState === "error" && (
          <div className="center flex-col cursor-pointer">
            {/* <div className="w-20 h-20 bg-accent/5 rounded-full center">
              <AlertTriangle className="w-7 text-accent" />
            </div> */}
            <p className="text-red-400 text-2xl font-bold inline-flex">
              Failed to convert pdf
            </p>
          <img src={NoDataGif} alt="no data gif" className="w-full max-w-xs h-full" />
            <Button onClick={()=>setLoadingState('idle')} size="icon" className="h-full max-h-12 text-xl w-full ">
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
