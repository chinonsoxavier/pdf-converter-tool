import { useState } from "react"
import { Button } from "./ui/button";
import { Plus, PlusIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const ExpandableButton = ({handleButtonClick}:{handleButtonClick:()=>void}) => {


    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseOut={() => setHovered(false)}
        className="flex rounded-full p-3 items-center"
      >
        <Tooltip>
          <TooltipTrigger onClick={handleButtonClick}>
            <PlusIcon className="cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent className="text-white">Add More Files</TooltipContent>
        </Tooltip>
      </div>
    );
}

export default ExpandableButton