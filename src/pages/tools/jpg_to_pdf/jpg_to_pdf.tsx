import ConverterLayout from "@/components/tools/layout_types/converter_layout";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useJpgToPdfStore from "./jpg_to_pdf_store";
import { Input } from "@/components/ui/input";

const JpgToPdf = () => {
  const { orientation,setOrientation,margin,setMargin,setSize,size } = useJpgToPdfStore();
  return (
    <div className=" to-primary/5 min-h-lvh from-white bg-gradient-to-t to-80% dark:from-primary dark:to-[rgb(4,9,30)]">
      <ConverterLayout
        actionButtonText="Convert Jpg to Pdf"
        convertingStateText="Converting Jpg to Pdf"
        label="Convert Jpg to Pdf"
        desc="Convert JPGs to Pdf files"
        fileType={["jpg"]}
        actionMenuSideBar={
          <div>
            <div className="p-4 space-y-5">
              <div className="space-y-3">
                <Label>Image Orientation</Label>
                <Select
                  value={orientation}
                  onValueChange={(value) =>
                    setOrientation(value as "portrait" | "landscape")
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue className="" placeholder="Orientation" />
                  </SelectTrigger>
                  <SelectContent className="">
                    <SelectItem value="portrait">Portrait</SelectItem>
                    <SelectItem value="landscape">Landscape</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Image Size</Label>
                <Select
                  value={size}
                  onValueChange={(value) =>
                    setSize(value as "default" | "letter" | "a4")
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue className="" placeholder="Image" />
                  </SelectTrigger>
                  <SelectContent className="">
                    <SelectItem value="default">Same as image size</SelectItem>
                    <SelectItem value="A4">A4 (297 x 210mn)</SelectItem>
                    <SelectItem value="letter">Letter (8.5 x 11 in)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Margin Size</Label>
                <Select
                  value={margin}
                  onValueChange={(value) =>
                    setMargin(value as "none" | "small" | "big")
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue className="" placeholder="Margin" />
                  </SelectTrigger>
                  <SelectContent className="">
                    <SelectItem value="none">No Margin</SelectItem>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="big">Big</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 items-center w-full justify-start">
                <Input className="fle-1 w-min bg-[blue]" type="checkbox" />
                <p className="w-full" >Merge all images in one PDF file</p>
              </div>
              {/* <div className="center gap-4 py-4">
                <div className="bg-primary/10 center border rounded-md p-4 gap-3 flex-col flex-1">
                  <div className="border rounded w-8 h-12"></div>
                  <p className="text-secondary-foreground">Portrait</p>
                </div>

                <div className="bg-primary/10 center border rounded-md p-4 gap-3 flex-col flex-1">
                  <div className="border rounded w-12 h-12"></div>
                  <p className="text-secondary-foreground">Landscape</p>
                </div>
              </div> */}
            </div>
          </div>
        }
      />
    </div>
  );
}


export default JpgToPdf