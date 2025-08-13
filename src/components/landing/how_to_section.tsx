import ContainerLayout from "../layout/container_layout"
import { motion } from "motion/react";


const HowToSection = () => {
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
        y: 110,
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
        y: 120,
        opacity: 0,
      },
      active: {
        y: 0,
        opacity: 1,
        transition: { duration: 1.8 },
      },
    };
     const variants4 = {
       inactive: {
         y: 150,
         opacity: 0,
       },
       active: {
         y: 0,
         opacity: 1,
         transition: { duration: 1.8 },
       },
     };
  
  return (
    <ContainerLayout className="border-t flex-col w-full sm:py-20 py-10">
          <motion.div
          variants={variants4}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
      >
        
      <h1 className="text-primary-foreground font-semibold text-2xl sm:text-3xl text-center">
        How to Use PDFPlug
      </h1>
        </motion.div>

      <div className="flex items-start flex-wrap gap-6 sm:gap-10 justify-center py-8 sm:py-14">
        <motion.div
          variants={variants1}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center rounded-full bg-accent text-white w-10 h-10 mb-3">
              <p>1</p>
            </div>
            <p className="text-primary-foreground font-semibold text-lg sm:text-xl pb-2 sm:pb-4">
              Upload
            </p>
            <p className="text-secondary-foreground text-center max-w-xs">
              Select the Word, Excel, PowerPoint, PDF or other file you wish to
              convert.
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={variants2}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center rounded-full bg-accent text-white w-10 h-10 mb-3">
              <p>2</p>
            </div>
            <p className="text-primary-foreground font-semibold text-lg sm:text-xl pb-2 sm:pb-4">
              Start processing
            </p>
            <p className="text-secondary-foreground text-center max-w-xs">
              Our PDF creator will convert your document to PDF or from PDF in
              seconds.
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={variants3}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center rounded-full bg-accent text-white w-10 h-10 mb-3">
              <p>3</p>
            </div>
            <p className="text-primary-foreground font-semibold text-lg sm:text-xl pb-2 sm:pb-4">
              Download
            </p>
            <p className="text-secondary-foreground text-center max-w-xs">
              Your new document will be ready to download immediately
            </p>
          </div>
        </motion.div>
      </div>
    </ContainerLayout>
  );
}

export default HowToSection