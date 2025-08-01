import {  TailChase } from "ldrs/react";
import "ldrs/react/TailChase.css";

// Default values shown
const ToolPageLoader = ({
  convertingStateText,
}: {
  convertingStateText: string;
}) => {
  return (
    <div className="h-full w-full py-20 flex itex items-center flex-col">
      <h1 className="text-2xl text-primary-foreground text-center ">Logo</h1>
      <h1 className="pb-10 pt-10 text-center text-3xl sm:text-[40px] text-secondary-foreground font-semibold">
        {convertingStateText}
      </h1>
      <TailChase size="50" speed="1.75" color="#ce1c1c" />
    </div>
  );
};

export default ToolPageLoader;
