import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import SidemenuLyout from "@/components/layout/sidemenu_layout";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Download,
  Share2,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ToolDownload({ label }: { label: string }) {

  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <Header />

      {/* sidemenu */}
      <SidemenuLyout />

      {/* main content */}
      <div className=" to-primary/5 pb-20">
        <div className="mx-auto">
          <div className="text-center px-4 mb-8 py-20 to-primary/5 from-white bg-gradient-to-t to-80% dark:from-primary dark:to-[rgb(4,9,30)]">
            <h1 className="text-3xl sm:text-4xl font-semibold text-primary-foreground mb-6">
              {label}
            </h1>

            <div className="flex items-center flex-wrap justify-center gap-4">
              {/* Back button */}
              <Button onClick={()=>navigate(-1)}
                variant="ghost"
                size="icon"
                className="rounded-full bg-gray-600 hover:bg-gray-700 text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>

              {/* Download button */}
              <Button className="text-white px-8 py-3 rounded-lg font-medium">
                <Download className="w-5 h-5 mr-2" />
                Download File
              </Button>

              {/* Action buttons */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2"></div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    className="rounded-full text-white w-10 h-10"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                  <Button
                    size="icon"
                    className="rounded-full text-white w-10 h-10"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
