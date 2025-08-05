import { Button } from "../ui/button";
import { Coffee, Menu } from "lucide-react";

import { Link } from "react-router-dom";
import { ModeToggle } from "../mode_toggle";
import { motion } from "motion/react";
type IHeaderProp = {
  label?: string;
  labelIcon?: React.FC;
};

const ToolsHeaderLayout: React.FC<IHeaderProp> = ({
  label,
  labelIcon: LabelIcon,
}) => {
  const variants1 = {
    inactive: {
      x: -50,
      opacity: 0,
    },
    active: {
      x: 0,
      opacity: 1,
      transition: { duration: 1.5 },
    },
  };
  const variants2 = {
    inactive: {
      y: -50,
      opacity: 0,
    },
    active: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.5 },
    },
  };
  const variants3 = {
    inactive: {
      x: 50,
      opacity: 0,
    },
    active: {
      x: 0,
      opacity: 1,
      transition: { duration: 1.5 },
    },
  };
  return (
    <>
      <header className="flex overflow-hidden h-[12%] items-center bg-white dark:bg-primary px-4 border-y sm:px-8 sm:py-5 py-3 justify-between">
        <motion.div
          variants={variants1}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
        >
          <h1 className="text-2xl text-primary-foreground">Logo</h1>
        </motion.div>
        <motion.div
          variants={variants2}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
        >
          <p className="text-2xl sm:text-3xl flex-1 hidden medium:flex font-semibold text-primary-foreground items-center justify-center gap-3 whitespace-nowrap">
            <LabelIcon /> {label}
          </p>
        </motion.div>
        <motion.div
          variants={variants3}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-end gap-2">
            <nav className="flex items-center justify-end gap-4">
              <Button
                // size="sm"
                className="dark:bg-transparent dark:px-0 dark:border-none dark:underline"
                variant="ghost"
              >
                <Link to="/signin">Sign In </Link>
              </Button>
              <span className="bg-gray-400 h-max min-h-8 w-[1px]"></span>
              <Button
                // size="sm"
                className="hidden xs:flex dark:bg-[#ce1c1c] dark:text-white"
              >
                <Coffee />
                Support Us
              </Button>
            </nav>

            <ModeToggle />
            <Menu className="w-9 h-9 cursor-pointer text-secondary-foreground block md:hidden" />
          </div>
        </motion.div>
      </header>
      <div className="flex shadow items-center justify-center bg-white dark:bg-primary w-full medium:hidden py-6 text-2xl sm:text-3xl gap-3 font-medium text-primary-foreground">
        <LabelIcon /> {label}
      </div>
    </>
  );
};

export default ToolsHeaderLayout;
