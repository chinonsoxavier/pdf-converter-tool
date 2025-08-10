import { ArrowRightCircleIcon, Crown } from "lucide-react";
import { Button } from "../ui/button";
import ContainerLayout from "../layout/container_layout";
import HowToSection from "./how_to_section";
import { motion } from "motion/react";

const HeroSection = () => {
    const variants1 = {
      inactive: {
        y: 100,
        opacity: 0,
      },
      active: {
        y: 0,
        opacity: 1,
        transition: { duration: 1.5 },
      },
    };
    const variants2 = {
      inactive: {
        y: 250,
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
        y: 200,
        opacity: 0,
      },
      active: {
        y: 0,
        opacity: 1,
        transition: { duration: 1.8 },
      },
  };
  
  return (
    <>
      <ContainerLayout
        id="hero_section"
        className="text-center max-width h-full space-y-7 py-40 flex items-center justify-center flex-col"
      >
        {/* <h1 className="text-center text-5xl font-semibold">
        Every tool you need to work with PDFs in one place
      </h1> */}

        <motion.div
          variants={variants1}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
        >
          <h1 className="text-center sm:text-5xl text-secondary-foreground text-4xl font-bold">
            Free & Premium PDF Tool
          </h1>
        </motion.div>
        <motion.div
          variants={variants2}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
        >
          <p className="text-lg max-w-2xl  font-semibold text-secondary-foreground sm:text-xl">
            Merge, split, convert, compress — all in one platform. Professional
            PDF tools for everyone.
          </p>
        </motion.div>
        <motion.div
          variants={variants3}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-5">
            <Button variant="outline" className="dark:bg-[#222831]">
              <ArrowRightCircleIcon className="rotate-90" />
              Explore tools
            </Button>
            {/* </motion.div> */}

            <Button className="bg-primary dark:bg-[#ce1c1c] ">
              <Crown className="" />
              Subscribe
            </Button>
          </div>
        </motion.div>
      </ContainerLayout>

        {/* How to use pdfnest section */}
        <HowToSection />
    </>
  );
};

export default HeroSection;
