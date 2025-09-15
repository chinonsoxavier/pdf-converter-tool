import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import SidemenuLyout from "@/components/layout/sidemenu_layout";
import { Button } from "@/components/ui/button";
import { enqueueSnackbar } from "notistack";
import useToolsStore from "@/pages/tools/tools_store";
import {
  ArrowLeft,
  Copy,
  CopyCheck,
  Download,
  Home,
  Info,
  Loader2,
  Trash2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { baseAxios } from "@/network/base_urls";
import {  useEffect, useRef, useState } from "react";
import { useCopyToClipboard } from "@/hooks/use_copy_to_clipboard_hook";
export default function ToolDownload({ label }: { label: string }) {
  const { downloadFile, isDownloadIdValid} =
    useToolsStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (id && !hasRun.current) {
      hasRun.current = true;
      downloadFile(id);
    }
  }, [id]);

  // Initialize useRef outside the component
  const hasRun = useRef(false);

  

  const handleDeleteFile = async () => {
    // deleteFile(id);
    setDeleteLoading(true);
    try {
      const res = await baseAxios.delete("/tools/delete-file/" + id, {
        withCredentials: true,
      });
      navigate(-1);
      // navigate(-1);
      enqueueSnackbar("deleted file successfully", {
        variant: "success",
      });
      console.log(res);
      // navigate(-1);
    } catch (error) {
      console.log(error);
      enqueueSnackbar("error deleting file", {
        variant: "error",
      });
    } finally {
      setDeleteLoading(false);
    }
    // navigate(-1);
  };
  const { copyToClipboard, isCopied } = useCopyToClipboard();
  return (
    <>
      {/* Header */}
      <Header />

      {/* sidemenu */}
      <SidemenuLyout />

      {/* main content */}
      <div className="py-5">
        <div className="mx-auto px-10">
          {!!isDownloadIdValid === false ? (
            <div className="flex border rounded  px-4 sm:my-10 my-6 py-10 items-center justify-start flex-col">
              <div className="center justify-center items-center rounded-full w-16 h-16 bg-secondary">
                <Info className="text-red-500 w-14 h-8" />
              </div>
              <p className="text-center leading-0 mt-5 text-primary-foreground text-lg font-semibold mb-4">
                The download link you're trying to access is no longer valid or
                has expired.
              </p>
              <p className="text-sm mb-5">
                This usually happens when links are older than 1 hour.
              </p>
              <Button>
                <a href="/" className="center gap-1">
                  <Home /> Go Back to Home
                </a>
              </Button>
            </div>
          ) : (
            <div className="text-center border rounded px-4 my-6 sm:my-10 py-10">
              <h1 className="text-3xl sm:text-4xl font-semibold text-primary-foreground mb-6">
                {label}
              </h1>

              <div className="flex items-center flex-wrap justify-center gap-4">
                {/* Back button */}
                <Button
                  onClick={() => navigate(-1)}
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-gray-600 hover:bg-gray-700 text-white"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>

                {/* Download button */}
                  <Button
                  onClick={() =>
                      downloadFile(
                        
                      // downLoadUrl[selectedIndex],
                      id,
                    )
                  }
                  className="text-white px-8 py-3 rounded-lg font-medium"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download File
                </Button>

                {/* Action buttons */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2"></div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => copyToClipboard(window.location.href)}
                      size="icon"
                      className="rounded-full text-white w-10 h-10"
                    >
                      {isCopied ? (
                        <CopyCheck className="w-5 h-5" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </Button>
                    <Button
                      onClick={handleDeleteFile}
                      size="icon"
                      className="rounded-full text-white w-10 h-10"
                    >
                      {deleteLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
