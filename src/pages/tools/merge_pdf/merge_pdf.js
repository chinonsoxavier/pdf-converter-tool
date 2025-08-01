"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var converter_layout_1 = __importDefault(require("@/components/tools/layout_types/converter_layout"));
var merge_pdf_children_section_1 = __importDefault(require("./merge_pdf_children_section"));
var merge_pdf_store_1 = __importDefault(require("./merge_pdf_store"));
var MergePdf = function () {
    var _a = (0, merge_pdf_store_1.default)(), selectedFiles = _a.selectedFiles, setSelectedFiles = _a.setSelectedFiles, setFileName = _a.setFileName, setFileSize = _a.setFileSize, fileNames = _a.fileNames, fileSize = _a.fileSize;
    // const [file, setFile] = useState(null);
    // alert(selectedFiles.length)
    return ((0, jsx_runtime_1.jsx)(converter_layout_1.default, { children: (0, jsx_runtime_1.jsx)(merge_pdf_children_section_1.default, {}), actionButtonText: "Merge Pdf", label: "Merge PDF files", desc: "Combine PDF files online for free in just seconds.", fileType: ["pdf"], file: selectedFiles, disabled: selectedFiles.length <= 1, setFile: setSelectedFiles, setFileName: setFileName, setFileSize: setFileSize, fileName: fileNames[0], fileSize: fileSize[0], 
        // setProcessingTool={() => {}}
        // processingTool={false}
        // convertingTool={false}
        // convertingToolText="Merging PDF files"
        convertingStateText: "Merging PDF files", actionMenuSideBar: (0, jsx_runtime_1.jsx)("div", { className: "p-3", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-secondary rounded-md p-3", children: (0, jsx_runtime_1.jsx)("p", { className: "font-medium text-secondary-foreground", children: "Please, select more PDF files by clicking again on \u2019Select PDF files\u2019." }) }) }) }));
};
exports.default = MergePdf;
