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

  return (
    <>
      <ContainerLayout
        id="hero_section"
        className="text-center max-width h-full space-y-7 sm:py-40 py-20 flex items-center justify-center flex-col"
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
            Free All In One Pdf Tool For Everyone
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
      
      </ContainerLayout>

        {/* How to use pdfnest section */}
        <HowToSection />
    </>
  );
};

export default HeroSection;
