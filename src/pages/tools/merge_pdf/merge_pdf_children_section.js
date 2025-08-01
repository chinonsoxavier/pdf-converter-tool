"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var tools_file_extension_card_1 = __importDefault(require("@/components/tools/tools_file_extension_card"));
var tooltip_1 = require("@/components/ui/tooltip");
var lucide_react_1 = require("lucide-react");
var react_pdf_1 = require("react-pdf");
var merge_pdf_store_1 = __importDefault(require("./merge_pdf_store"));
var draggable_1 = __importDefault(require("../draggable"));
var MergePdfChildrenSection = function () {
    var _a = (0, merge_pdf_store_1.default)(), selectedFiles = _a.selectedFiles, setSelectedFiles = _a.setSelectedFiles, removeSelectedFiles = _a.removeSelectedFiles, fileType = _a.fileType, setNumPages = _a.setNumPages, fileNames = _a.fileNames, fileSize = _a.fileSize, numPages = _a.numPages;
    return ((0, jsx_runtime_1.jsx)("div", { className: "center flex-wrap gap-4", children: fileType[0] === "pdf" ? (selectedFiles.map(function (file, index) { return ((0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, { children: [(0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, { children: (0, jsx_runtime_1.jsxs)("div", { className: "center h-full min-h-36 min-w-0 w-36 overflow-hdden bg-white flex-col border dark:bg-secondary rounded-lg hover:shadow-md duration-200 hover:border relative group p-3", children: [(0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, { children: [(0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, { asChild: true, onClick: function () { return removeSelectedFiles(file); }, className: "items-center absolute top-1 hover:shadow right-1 z-30 bg-secondary p-1 text-primary-foreground cursor-pointer justify-center group-hover:opacity-100 duration-500 flex opacity-0 rounded-full w-8 h-8", children: (0, jsx_runtime_1.jsx)(lucide_react_1.XIcon, { className: "w-4 h-4" }) }), (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, { className: "text-white", children: (0, jsx_runtime_1.jsx)("p", { children: "Remove File" }) })] }), (0, jsx_runtime_1.jsx)(draggable_1.default, {}), (0, jsx_runtime_1.jsx)(react_pdf_1.Document, { scale: 0.2, file: file, onLoadSuccess: function (_a) {
                                    var numPages = _a.numPages;
                                    return setNumPages(numPages);
                                }, className: "w-full center", children: (0, jsx_runtime_1.jsx)(react_pdf_1.Page, { className: "border", pageNumber: 1, width: 600, height: 400 }) }, index), (0, jsx_runtime_1.jsx)("p", { className: "truncate w-full mt-2 text-sm text-secondary-foreground font-medium", children: fileNames[index + 1] })] }) }), (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, { className: "text-white", children: (0, jsx_runtime_1.jsx)("p", { className: "text-[13px]", children: fileSize[index] + " -" + numPages[index] + " pages" }) })] })); }))
            : ((0, jsx_runtime_1.jsx)(tools_file_extension_card_1.default, { fileType: fileType[0] })) }));
};
exports.default = MergePdfChildrenSection;
