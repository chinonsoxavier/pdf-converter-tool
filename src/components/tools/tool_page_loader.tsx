import { Progress } from "../ui/progress";

const ToolPageLoader = ({
  convertingStateText,
  progress,
}: {
    convertingStateText: string;
    progress: number;
    setProgress: (progress: number) => void;
  }) => {

  

    return (
      <div className="h-full w-full py-20 flex itex max-w-lg px-8 mx-auto items-center flex-col">
        <h1 className="text-2xl text-primary-foreground text-center ">
          PDFPlug
        </h1>
        <h1 className="pb-10 pt-10 text-center text-3xl sm:text-[40px] text-secondary-foreground font-semibold">
          {convertingStateText}
        </h1>
        <Progress value={progress} />
      </div>
    );
  };

export default ToolPageLoader;
