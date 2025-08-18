import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import SidemenuLyout from "@/components/layout/sidemenu_layout";
import { Button } from "@/components/ui/button";
import useToolsStore from "@/pages/tools/tools_store";
import {
  ArrowLeft,
  Download,
  Share2,
  Trash2,
} from "lucide-react";
import { useNavigate,useParams } from "react-router-dom";
export default function ToolDownload({ label }: { label: string }) {
  const { downloadFile } = useToolsStore();
const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <Header />

      {/* sidemenu */}
      <SidemenuLyout />

      {/* main content */}
      <div className="pb-20">
        <div className="mx-auto">
          <div className="text-center px-4 mb-8 py-12">
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
              <Button onClick={()=>downloadFile(id)} className="text-white px-8 py-3 rounded-lg font-medium">
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
