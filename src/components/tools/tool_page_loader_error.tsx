import {
  AlertCircle,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useToolsStore from "@/pages/tools/tools_store";

export default function ToolPageLoaderError({
  label,
    convertingStateText,
  handleSubmitFile
}: {
  label: string;
        convertingStateText: string;
        handleSubmitFile: () => void;
  }) {
  
  const {setLoadingState} = useToolsStore()
    
  return (
    <div className="w-full">
      {/* Main Content */}
      <main className=" w-full my-6 py-2">
        <div className="w-full">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
            <span>PDF Plug Tools</span>
            <span>/</span>
            <span>{label}</span>
          </div>

          {/* Error Card */}
          <Card className="border-destructive/20 rounded h-full bg-accent/5">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                {/* Error Icon */}
                <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-destructive" />
                </div>

                {/* Error Title */}
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-foreground">
                    {"Error " + convertingStateText}
                  </h2>
                  <p className="text-muted-foreground">
                    We encountered an issue while {convertingStateText}
                  </p>
                </div>

      
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                  <Button
                    onClick={handleSubmitFile}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                  <Button onClick={()=>{setLoadingState('idle')}} variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                   Start Over
                  </Button>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
