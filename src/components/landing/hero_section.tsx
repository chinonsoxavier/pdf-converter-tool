import ContainerLayout from "../layout/container_layout";
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
        className="text-center max-width h-full space-y-7 sm:py-10 py-6 flex items-center justify-center flex-col"
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
          <h1 className="text-center sm:text-[42px] text-secondary-foreground text-4xl font-semibold">
            Free All In One Pdf Tool For Everyone
          </h1>
        </motion.div>
        <motion.div
          variants={variants2}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
        >
          <p className=" max-w-2xl  font-medium text-secondary-foreground sm:text-lg">
            Select your PDF,Upload it,and choose the desired action, Your file
            will be processed instantly Download in Seconds.
          </p>
        </motion.div>
      </ContainerLayout>
    </>
  );
};

export default HeroSection;
