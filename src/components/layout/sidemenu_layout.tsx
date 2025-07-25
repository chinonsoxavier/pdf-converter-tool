import { XCircle } from "lucide-react";
import { Button } from "../ui/button";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

// use

const SidemenuLyout = () => {
  return (
    <aside className="w-full absolute z-20 inset-0 py-10 bg-white dark:bg-primary">
      <div className="flex items-center justify-between px-10 w-full">
        <div className="flex items-center justify-start gap-5">
          <Button size="sm" className="" variant="outline" >Sign Up</Button>
          <Button size="sm" >Sign In</Button>
              </div>
              <div className="flex items-center justify-end">
                  {/* <Button className="bg-[red] p-0" variant="ghost" size="icon" > */}
                      <XCircle className="w-full cursor-pointer text-primary-foreground h-full" />
                  {/* </Button> */}
              </div>
              
      </div>
    </aside>
  );
}

export default SidemenuLyout