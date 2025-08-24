import { cn } from "@/lib/utils";
import useToolsStore from "@/pages/tools/tools_store";
import { Button } from "../ui/button";
const ConverterLayoutSidebar = ({
  label,
  fileType,
  disabled,
  contents,
  handleButtonClick,
}: {
  label: string;
  fileType: string;
  disabled: boolean;
  contents: React.ReactNode;
  handleButtonClick: () => Promise<void>;
}) => {
  const { sideMenuOpen } = useToolsStore();
  return (
    <aside
      className={cn(
        sideMenuOpen ? "translate-x-0" : "-translate-x-full",
        "absolute z-20 pb-6 ight-0 w-full sm:hidden overflow-clip h-full border-l border-r flex-col flex items-center justify-between max-w-[80%] xs:max-w-sm bg-white dark:bg-secondary duration-500"
      )}
    >
      <div className="border-b h-[12%] py-6 w-full">
        <p className="text-2xl overflow-ellipsis sm:text-2xl font-semibold text-secondary-foreground text-center ">
          {label}
        </p>
      </div>
      <div className="w-full h-[76%] overflow-scroll">
        {/* <div className="py-2 gap-2 hidden grid-cols-[repeat(auto-fill,minmax(120px,1fr))]">
          <div className="px-4 hover:border duration-500 hover:shadow hover:cursor-pointer hover:bg-secondary center gap-2 py-3 g-secondary rounded-lg flex h-12">
            <PdfToExcell size="md" />
            <p className="text-secondary-foreground font-medium">
              Pdf To Excel
            </p>
          </div>
          <div className="px-4 hover:border duration-500 hover:shadow hover:cursor-pointer hover:bg-secondary center gap-2 py-3 g-secondary rounded-lg flex h-12">
            <PdfToExcell size="md" />
            <p className="text-secondary-foreground font-medium">
              Pdf To Excel
            </p>
          </div>
          <div className="px-4 hover:border duration-500 hover:shadow hover:cursor-pointer hover:bg-secondary center gap-2 py-3 g-secondary rounded-lg flex h-12">
            <PdfToExcell size="md" />
            <p className="text-secondary-foreground font-medium">
              Pdf To Excel
            </p>
          </div>

          <div className="px-4 hover:border duration-500 hover:shadow hover:cursor-pointer hover:bg-secondary center gap-2 py-3 g-secondary rounded-lg flex h-12">
            <PdfToExcell size="md" />
            <p className="text-secondary-foreground font-medium">
              Pdf To Excel
            </p>
          </div>

          <div className="px-4 hover:border duration-500 hover:shadow hover:cursor-pointer hover:bg-secondary center gap-2 py-3 g-secondary rounded-lg flex h-12">
            <PdfToExcell size="md" />
            <p className="text-secondary-foreground font-medium">
              Pdf To Excel
            </p>
          </div>
          <div className="px-4 hover:border duration-500 hover:shadow hover:cursor-pointer hover:bg-secondary center gap-2 py-3 g-secondary rounded-lg flex h-12">
            <PdfToExcell size="md" />
            <p className="text-secondary-foreground font-medium">
              Pdf To Excel
            </p>
          </div>
        </div> */}

        {contents}
      </div>

      <div className="px-6 w-full center border-t h-[12%]">
        <Button
          disabled={disabled}
          onClick={handleButtonClick}
          className="max-w-sm font-semibold text-lg sm:text-xl [&_svg]:size-6 group rounded-lg py-0 flex items-center h w-full"
          type="submit"
        >
          Convert {fileType.toUpperCase()} File
          {/* <ArrowRightCircleIcon /> */}
        </Button>
      </div>
    </aside>
  );
};

export default ConverterLayoutSidebar