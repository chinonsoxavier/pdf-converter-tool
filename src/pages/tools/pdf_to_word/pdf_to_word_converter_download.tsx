import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Download,
  AlertTriangle,
  Link,
  Share2,
  Trash2,
  ChevronRight,
} from "lucide-react";

export default function PdfToWordConverterDownload() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            WORD file has been converted to PDF
          </h1>

          <div className="flex items-center justify-center gap-4">
            {/* Back button */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-gray-600 hover:bg-gray-700 text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            {/* Download button */}
            <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-medium">
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </Button>

            {/* Action buttons */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Button
                  size="icon"
                  className="rounded-full bg-red-500 hover:bg-red-600 text-white w-10 h-10"
                >
                  <AlertTriangle className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  className="rounded-full bg-red-500 hover:bg-red-600 text-white w-10 h-10"
                >
                  <Link className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  className="rounded-full bg-red-500 hover:bg-red-600 text-white w-10 h-10"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  className="rounded-full bg-red-500 hover:bg-red-600 text-white w-10 h-10"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Continue to section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-700 mb-4">
            Continue to...
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Compress PDF */}
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                    <div className="w-4 h-4 bg-green-600 rounded-sm"></div>
                  </div>
                  <span className="font-medium text-gray-700">
                    Compress PDF
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </CardContent>
            </Card>

            {/* Merge PDF */}
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                    <div className="w-4 h-4 bg-red-600 rounded-sm"></div>
                  </div>
                  <span className="font-medium text-gray-700">Merge PDF</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </CardContent>
            </Card>

            {/* Split PDF */}
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                    <div className="w-4 h-4 bg-red-600 rounded-sm"></div>
                  </div>
                  <span className="font-medium text-gray-700">Split PDF</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </CardContent>
            </Card>

            {/* Protect PDF */}
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
                  </div>
                  <span className="font-medium text-gray-700">Protect PDF</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </CardContent>
            </Card>

            {/* Organize PDF pages */}
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                    <div className="w-4 h-4 bg-orange-600 rounded-sm"></div>
                  </div>
                  <span className="font-medium text-gray-700">
                    Organize PDF pages
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </CardContent>
            </Card>

            {/* Edit PDF */}
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                    <div className="w-4 h-4 bg-purple-600 rounded-sm"></div>
                  </div>
                  <span className="font-medium text-gray-700">Edit PDF</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </CardContent>
            </Card>
          </div>

          <div className="text-right">
            <Button
              variant="link"
              className="text-blue-600 hover:text-blue-700 p-0"
            >
              See more
            </Button>
          </div>
        </div>

        {/* Security section */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Secure. Private. In your control
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              For over a decade, iLovePDF has securely processed documents with
              no storage, no tracking, and complete privacy. Your files are
              always handled safely and automatically deleted after 2 hours.{" "}
              <Button
                variant="link"
                className="text-blue-600 hover:text-blue-700 p-0 h-auto font-normal"
              >
                Learn more
              </Button>
            </p>

            {/* Security badges */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-6 bg-gray-300 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600">ISO</span>
                </div>
                <span className="text-xs text-gray-500">27001</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <span className="text-xs text-gray-600 font-medium">
                  SECURE
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-6 bg-red-500 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-white">PDF</span>
                </div>
                <span className="text-xs text-gray-600">ASSOCIATION</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
