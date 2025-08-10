import { ChevronDown, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "motion/react";

const Footer = () => {
  const variants1 = {
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

  const variants4 = {
    inactive: {
      y: 140,
      opacity: 0,
    },
    active: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.5 },
    },
  };
  return (
    <footer className="px-4 pt-10 sm:pt-20 border-t">
      <div className="grid max-width mx-auto grid-cols-2 md:grid-cols-5 gap-8">
        {/* Member area */}
        <motion.div
          variants={variants1}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
          className="w-full"
        >
          <div>
            <h3 className="font-medium text-primary-foreground mb-4">
              Member area
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/signin"
                  className="text-secondary-foreground hover:text-primary-foreground text-sm"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-secondary-foreground hover:text-primary-foreground text-sm"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>
        {/* PDF Converter */}
        <motion.div
          variants={variants1}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
          className="w-full"
        >
          <div>
            <h3 className="font-medium text-primary-foreground mb-4">
              PDF Converter
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/blog"
                  className="text-secondary-foreground hover:text-primary-foreground text-sm"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>
        {/* Company */}
        <motion.div
          variants={variants1}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
          className="w-full"
        >
          <div>
            <h3 className="font-medium text-primary-foreground mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="terms-and-privacy"
                  className="text-secondary-foreground hover:text-primary-foreground text-sm"
                >
                  Terms and Privacy
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-secondary-foreground hover:text-primary-foreground text-sm"
                >
                  Developers API
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>
        <motion.div
          variants={variants4}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
          className="w-full"
        >
          {/* Support */}
          <div>
            <h3 className="font-medium text-primary-foreground mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-secondary-foreground hover:text-primary-foreground text-sm"
                >
                  Help
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Admin  */}
        <motion.div
          variants={variants4}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
          className="w-full"
        >
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium whitespace-nowrap text-primary-foreground">
                Admin
              </span>
            </div>
            <div className="text-secondary-foreground font-mono text-sm whitespace-nowrap ">
              <Link to="/dashboard">Dashoard</Link>
            </div>
            <div className="text-secondary-foreground font-mono text-sm whitespace-nowrap">
              <Link to="/dashboard/users">Users</Link>
            </div>
            <div className="text-secondary-foreground font-mono text-sm whitespace-nowrap ">
              <Link to="/dashboard/tools">Tools</Link>
            </div>
            <div className="text-secondary-foreground font-mono text-sm whitespace-nowrap">
              <Link to="/dashboard/analysis">Analysis</Link>
            </div>
            <div className="text-secondary-foreground font-mono text-sm whitespace-nowrap">
              <Link to="/dashboard/settings">Settings</Link>
            </div>
          </div>
        </motion.div>

        {/* PDF Converter Brand */}
        <motion.div
          variants={variants4}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
          className="w-full"
        >
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 min-w-5 bg-red-500 rounded-sm flex items-center justify-center">
                <FileText className="w-3 h-3 text-white" />
              </div>
              <span className="font-medium whitespace-nowrap text-primary-foreground">
                PDF Nest
              </span>
            </div>
            <div className=" font-mono text-secondary-foreground text-sm whitespace-nowrap font-medium">255792515918</div>
            <div className="text-secondary-foreground text-sm">
              files converted since 2005
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom border */}
      <div className="mt-8 pt-4 border-t"></div>

      <div className="flex max-width mx-auto items-center pb-10 pt-2 justify-between w-full">
        <p> © 2025 PDFNest </p>
        <Dialog>
          <DialogTrigger className="text-secondary-foreground">
            English
            <span className="border border-secondary-foreground rounded-sm ml-2">
              <ChevronDown
                className="inline-block fill-secondary-foreground"
                fill="#2F2F2F"
                strokeWidth={0}
              />
            </span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl text-center font-semibold">
                Select Language
              </DialogTitle>
              <DialogDescription className="grid grid-cols-[repeat(auto-fit,minmax(110px,1fr))] ">
                {[
                  "English",
                  "العربية",
                  "Dansk",
                  "Deutsch",
                  "Español",
                  "Français",
                  "עברית",
                  "हिन्दी",
                  "Indonesia",
                  "Italiano",
                  "日本語",
                  "한국어",
                  "Lietuvių",
                  "Norsk",
                  "Polski",
                  "Português",
                  "Русский",
                  "Svenska",
                  "ไทย",
                  "Türkçe",
                  "Українська",
                  "Tiếng Việt",
                  "中文（中国）",
                  "中文（台灣）",
                ].map((language, index) => (
                  <button
                    key={index}
                    className="w-full whitespace-nowrap cursor-pointer text-left py-2 px-4 dark:hover:bg-gray-700 hover:bg-gray-100 focus:outline-none"
                  >
                    {language}
                  </button>
                ))}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </footer>
  );
};

export default Footer;
