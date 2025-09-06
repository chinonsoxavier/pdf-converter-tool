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
import useAuthStore from "@/pages/(auth)/auth_store";
import { ModeToggle } from "../mode_toggle";

const Footer = () => {

  const { user } = useAuthStore();

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

  const variants2 = {
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

    const variants3 = {
      inactive: {
        y: 30,
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
      <div className="flex flex-wrap  max-width w-full mx-auto grid-cols-2 md:grid-cols-5 gap-8">
        {/* Member area */}
        <motion.div
          variants={variants1}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
          className="flex-1"
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

        {/* Company */}
        <motion.div
          variants={variants1}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
          className="flex-1"
        >
          <div>
            <h3 className="font-medium text-primary-foreground mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms-and-privacy"
                  className="text-secondary-foreground hover:text-primary-foreground text-sm"
                >
                  Terms and Privacy
                </Link>
              </li>

              <li>
                <Link
                  to="/about-us"
                  className="text-secondary-foreground hover:text-primary-foreground text-sm"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact-us"
                  className="text-secondary-foreground hover:text-primary-foreground text-sm"
                >
                  Contact Us
                </Link>
              </li>

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
        <motion.div
          variants={variants2}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
          className="flex-1"
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
        {user?.isAdmin && (
          <motion.nav
            variants={variants2}
            initial={"inactive"}
            whileInView={"active"}
            viewport={{ once: true }}
            className="w-full hidden"
          >
            <ul className="col-span-2 space-y-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-medium whitespace-nowrap text-primary-foreground">
                  Admin
                </span>
              </div>
              <li className="text-secondary-foreground font-mono text-sm whitespace-nowrap ">
                <Link to="/dashboard">Dashoard</Link>
              </li>
              <li className="text-secondary-foreground font-mono text-sm whitespace-nowrap">
                <Link to="/dashboard/users">Users</Link>
              </li>
              <li className="text-secondary-foreground font-mono text-sm whitespace-nowrap ">
                <Link to="/dashboard/tools">Tools</Link>
              </li>
              <li className="text-secondary-foreground font-mono text-sm whitespace-nowrap">
                <Link to="/dashboard/analysis">Analysis</Link>
              </li>
              <li className="text-secondary-foreground font-mono text-sm whitespace-nowrap">
                <Link to="/dashboard/settings">Settings</Link>
              </li>
            </ul>
          </motion.nav>
        )}

        {/* PDF Converter Brand */}
        <motion.div
          variants={variants2}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
          className="flex-1"
        >
          <div className="col-span-2 space-y-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 min-w-5 bg-red-500 rounded-sm flex items-center justify-center">
                <FileText className="w-3 h-3 text-white" />
              </div>
              <span className="font-medium whitespace-nowrap text-primary-foreground">
                PDFPlug
              </span>
            </div>
            <div className=" font-mono text-secondary-foreground text-sm font-medium">
              over 250,000 documents converted since creation of pdf plug
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div
        variants={variants3}
        initial={"inactive"}
        whileInView={"active"}
        viewport={{ once: true }}
        className="flex-1"
      >
        {/* Bottom border */}
        <div className="mt-8 pt-4 border-t"></div>

        <div className="flex max-width flex-wrap  mx-auto items-center pb-10 pt-2 sm:justify-between justify-center gap-5 w-full">
          <p className="text-sm">PDFPlug.com © [2025]</p>

          <p className="text-sm">A product by Amazonia Softech Ltd</p>
          <div className="flex items-center justify-center gap-3">
            <Dialog>
              <DialogTrigger className="text-secondary-foreground cursor-pointer">
                English
                <span className="border h-5 border-secondary-foreground rounded-sm ml-2">
                  <ChevronDown
                    className="inline-block w-5 h-5 fill-secondary-foreground"
                    fill="#2F2F2F"
                    strokeWidth={0}
                  />
                </span>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-xl mb-2 text-[#2f2f2f] dark:text-primary-foreground sm:text-2xl text-center font-bold">
                    Select Language
                  </DialogTitle>
                  <DialogDescription className="grid gap-1.5 grid-cols-[repeat(auto-fit,minmax(110px,1fr))] ">
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
                        className={`${
                          language === "English" && "bg-primary"
                        } w-full whitespace-nowrap cursor-pointer text-left py-2 px-4 dark:hover:bg-primary/50 rounded hover:bg-primary/40 focus:outline-none`}
                      >
                        {language}
                      </button>
                    ))}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <ModeToggle />
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
