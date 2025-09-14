import { PdfToWord } from "@/assets/svg/export";
import ContainerLayout from "../layout/container_layout";
import { Download } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { motion } from "motion/react";
import { useEffect } from "react";
import useToolsStore from "@/pages/tools/tools_store";

const HistorySection = () => {
  // const [recentActivities, setRecentActivities] =
  // useState<[{ fileName: string, downloadUrl: string, fileSize: string, icon: string ,fileType:string}]>([{ fileName: '', downloadUrl: '', fileSize: '', icon: '',fileType:'' }]);
  const { getRecentActivities, recentActivities, downloadFile,selectedFiles,selectedIndex } =
    useToolsStore();

  const variants1 = {
    inactive: {
      y: 50,
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
      y: 80,
      opacity: 0,
    },
    active: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.5 },
    },
  };


  const getRecentActivitiesIcon = (icon:string) => {
    if (icon === 'pdf_to_word') {
      return <PdfToWord/>
    }
  }

  useEffect(() => {
    const GetRecentActivities = async () => {
      await getRecentActivities();
    };
    GetRecentActivities();
  }, []);

  return recentActivities.length > 0 ? (
    <motion.div
      variants={variants1}
      initial={"inactive"}
      whileInView={"active"}
      viewport={{ once: true }}
    >
      <ContainerLayout className="flex space-y-3 max-w-xl flex-col pt-10 pb-20 border-t">
        <motion.div
          variants={variants1}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
        >
          <h1 className="text-2xl font-medium text-primary-foreground text-left">
            Recent Activities
          </h1>
        </motion.div>
        <div className="grid sm:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3 sm:gap-5">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={index}
              variants={variants2}
              initial={"inactive"}
              whileInView={"active"}
              viewport={{ once: true }}
              className="flex border hover:bg-secondary p-4 rounded-md items-center justify-between mx-auto w-full ax-w-xl gap-3 bg-secondary/50"
            >
              <div className="flex w-full overflow-hidden items-center gap-3 justify-start">
                {getRecentActivitiesIcon(activity.icon)}
                <p className="truncate text-primary-foreground">
                  {activity.fileName}
                </p>
              </div>

              <div className="flex items-center gap-3 justify-end">
                <p className="text-secondary-foreground text-sm whitespace-nowrap">
                  {activity.fileSize}
                </p>
                <Tooltip>
                  <TooltipTrigger
                    onClick={() => {
                      downloadFile(activity.fileUrl,selectedFiles[selectedIndex]);
                    }}
                  >
                    <Download size={19} className="text-secondary-foreground" />
                    <TooltipContent className="text-white">
                      Download File
                    </TooltipContent>
                  </TooltipTrigger>
                </Tooltip>
              </div>
            </motion.div>
          ))}
        </div>
      </ContainerLayout>
    </motion.div>
  ) : null;
};

export default HistorySection;
