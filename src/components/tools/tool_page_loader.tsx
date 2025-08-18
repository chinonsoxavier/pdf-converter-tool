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
import { ChevronLeft } from "lucide-react";

// Default values shown
const ToolPageLoader = ({
  convertingStateText,
}: {
  convertingStateText: string;
}) => {
  const navigate = useNavigate();
  const { loadingState, downLoadId } = useToolsStore();

  useEffect(() => {
    if (loadingState === "success") {
      navigate("download/" + downLoadId);
    }
  }, [loadingState]);

  return (
    <div className="h-full relative w-full py-5 flex itex max-w-lg px-8 mx-auto items-center flex-col">
      <h1 className="pb-10 pt-10 text-center text-3xl sm:text-[40px] text-secondary-foreground font-semibold">
        {convertingStateText}
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
        <div className="center gap-3 cursor-pointer" >
          <Button size="icon"  className="rounded-full" >
            <ChevronLeft>Back</ChevronLeft>
          </Button>
          <p className="text-red-400 text-lg font-medium inline-flex">
            failed to convert pdf
          </p>
        </div>
      )}
      {/* </div> */}
      {/* <Progress value={progress} /> */}
    </div>
  );
};

export default ToolPageLoader;
