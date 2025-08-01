"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var export_1 = require("@/assets/svg/export");
var container_layout_1 = __importDefault(require("../layout/container_layout"));
var button_1 = require("../ui/button");
var input_1 = require("../ui/input");
var utils_1 = require("@/lib/utils");
var react_1 = require("react");
var tooltip_1 = require("@/components/ui/tooltip");
var react_2 = require("motion/react");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var ToolsSection = function () {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_1.useState)(false), _ = _a[0], setShowAllTools = _a[1];
    var _b = (0, react_1.useState)("all-tools"), selectedTools = _b[0], setSelectedTools = _b[1];
    var _c = (0, react_1.useState)(""), searchQuery = _c[0], setSearchQuery = _c[1];
    var toolsSectionThemes = [
        "#f2f9fe",
        "#f9fefb",
        "#fffcfa",
        "#fdf8ff",
        "#fff5f8",
        "#f8fcff",
        "#fffdfa",
        "#  ",
        "#f7fcff",
        "#fffcf9",
        "#fafffe",
        "#faf6f6",
    ];
    var variants1 = {
        inactive: {
            y: 100,
            opacity: 0,
        },
        active: {
            y: 0,
            opacity: 1,
            transition: { duration: 1.5 },
        },
    };
    var variants2 = {
        inactive: {
            y: 150,
            opacity: 0,
        },
        active: {
            y: 0,
            opacity: 1,
            transition: { duration: 1.5 },
        },
    };
    var variants3 = {
        inactive: {
            y: 120,
            opacity: 0,
        },
        active: {
            y: 0,
            opacity: 1,
            transition: { duration: 1.8 },
        },
    };
    // const filterTools = (query,)
    return ((0, jsx_runtime_1.jsxs)(container_layout_1.default, { className: "space-y-5 w-full border-t pt-12 sm:pt-28 text-center flex-col", children: [(0, jsx_runtime_1.jsx)(react_2.motion.div, { variants: variants1, initial: "inactive", whileInView: "active", viewport: { once: true }, children: (0, jsx_runtime_1.jsx)("p", { className: "text-3xl sm:text-4xl text-primary-foreground font-semibold", children: "Meet our full product family" }) }), (0, jsx_runtime_1.jsx)(react_2.motion.div, { variants: variants3, initial: "inactive", whileInView: "active", viewport: { once: true }, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex-col flex items-center gap-5 justify-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "max-w-xl w-full relative", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "absolute my-auto inset-0 top-0 bottom-0 left-4 text-light-text", size: 17 }), (0, jsx_runtime_1.jsx)(input_1.Input, { onChange: function (e) { return setSearchQuery(e.target.value); }, className: "max-w-xl w-full pl-10", placeholder: "Search tools..." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap text-secondary-foreground items-center gap-3 justify-center", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () {
                                        setSelectedTools("all-tools");
                                        setShowAllTools(true);
                                    }, variant: selectedTools === "all-tools" ? "default" : "secondary", className: "duration-500 rounded-md text-sm sm:text-base shadow-xs h-8 center dark:bg-secondary,".concat(selectedTools === "all-tools"
                                        ? "text-white"
                                        : "text-secondary-foreground"), size: "sm", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.GalleryVerticalEnd, { className: "" }), "All"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () {
                                        setSelectedTools("convert");
                                        setShowAllTools(true);
                                    }, variant: selectedTools === "convert" ? "default" : "secondary", className: "duration-500 rounded-md text-xs sm:text-base shadow-xs 8 h-8 center dark:bg-secondary,".concat(selectedTools === "convert"
                                        ? "text-white"
                                        : "text-secondary-foreground"), size: "sm", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Redo2, {}), "Convert"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () {
                                        setSelectedTools("edit");
                                        setShowAllTools(true);
                                    }, variant: selectedTools === "edit" ? "default" : "secondary", className: "duration-500 rounded-md text-xs sm:text-base shadow-xs h-8 center dark:bg-secondary,".concat(selectedTools === "edit"
                                        ? "text-white"
                                        : "text-secondary-foreground"), size: "sm", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Edit, {}), "Edit"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () {
                                        setSelectedTools("organize");
                                        setShowAllTools(true);
                                    }, variant: selectedTools === "organize" ? "default" : "secondary", className: "duration-500 rounded-md text-xs sm:text-base shadow-xs h-8 center dark:bg-secondary,".concat(selectedTools === "organize"
                                        ? "text-white"
                                        : "text-secondary-foreground"), size: "sm", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Layers2, {}), "Organize"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () {
                                        setSelectedTools("secure");
                                        setShowAllTools(true);
                                    }, variant: selectedTools === "secure" ? "default" : "secondary", className: "duration-500 rounded-md text-xs sm:text-base shadow-xs h-8 center dark:bg-secondary,".concat(selectedTools === "secure"
                                        ? "text-white"
                                        : "text-secondary-foreground"), size: "sm", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.LucideShieldCheck, {}), "Secure"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () {
                                        setSelectedTools("enhance");
                                        setShowAllTools(true);
                                    }, variant: selectedTools === "enhance" ? "default" : "secondary", className: "duration-500 rounded-md text-xs sm:text-base shadow-xs h-8 center dark:bg-secondary,".concat(selectedTools === "enhance"
                                        ? "text-white"
                                        : "text-secondary-foreground"), size: "sm", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FilePlus2, {}), "Enhance"] })] })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-1.5 sm:gap-3 pb-12 sm:pb-20 w-full mt-4", children: [
                    {
                        label: "PDF to Word",
                        icon: export_1.PdfToWord,
                        isFree: true,
                        info: "Convert PDFs to editable Word documents",
                        category: "convert",
                    },
                    {
                        label: "Word to PDF",
                        icon: export_1.WordToPdf,
                        isFree: true,
                        info: "Convert Word documents to PDF",
                        category: "convert",
                    },
                    {
                        label: "Merge PDF",
                        icon: export_1.MergePdf,
                        isFree: true,
                        info: "Combine multiple PDF files",
                        category: "organize",
                    },
                    {
                        label: "Split PDF",
                        icon: export_1.SplitPdf,
                        isFree: true,
                        info: "Split multiple PDF files",
                        category: "organize",
                    },
                    {
                        label: "Compress PDF",
                        icon: export_1.PdfToWord,
                        isFree: true,
                        info: "Reduce file size without losing quality",
                        category: "enhance",
                    },
                    {
                        label: "PDF to Jpg",
                        icon: export_1.PdfToJpg,
                        isFree: true,
                        info: "Convert PDFs to Jpg images",
                        category: "convert",
                    },
                    {
                        label: "Jpg to Pdf",
                        icon: export_1.JPGTOPDF,
                        isFree: true,
                        info: "Convert images to PDFs",
                        category: "convert",
                    },
                    {
                        label: "Rotate PDF",
                        icon: export_1.RotatePdf,
                        isFree: true,
                        info: "Rotate one or more pages",
                        category: "edit",
                    },
                    {
                        label: "Recorder Pages",
                        icon: export_1.OrganisePdf,
                        isFree: true,
                        info: "Drag & drop rearrangement of pages",
                        category: "organize",
                    },
                    {
                        label: "Extract Pages",
                        icon: export_1.ExtractPages,
                        isFree: true,
                        info: "Drag & drop rearrangement of pages",
                        category: "organize",
                    },
                    {
                        label: "Delete Pages",
                        icon: export_1.RemovePages,
                        isFree: true,
                        info: "Remove unwanted pages from PDF",
                        category: "organize",
                    },
                    {
                        label: "Add Page Numbers",
                        icon: export_1.AddPagesToPdf,
                        isFree: true,
                        info: "Insert page numbers automatically",
                        category: "edit",
                    },
                    {
                        label: "Add Header/Footer",
                        icon: export_1.AddHeaderFooter,
                        isFree: true,
                        info: "Insert simple text headers or footers",
                        category: "edit",
                    },
                    {
                        label: "Preview PDF",
                        icon: export_1.PreviewPdf,
                        isFree: true,
                        info: "Built-in viewer for PDF file previews",
                        category: "edit",
                    },
                    {
                        label: "OCR",
                        icon: export_1.OcrPdf,
                        isFree: false,
                        info: "Turn scanned PDFs/images into editable text",
                        category: "edit",
                    },
                    {
                        label: "PDF",
                        icon: export_1.EditPdf,
                        isFree: false,
                        info: "Modify text, images, or layout directly",
                        category: "edit",
                    },
                    {
                        label: "Password Protect PDF",
                        icon: export_1.LockPdf,
                        isFree: false,
                        info: "Encrypt PDFs with user-defined password",
                        category: "secure",
                    },
                    {
                        label: "Unlock PDF",
                        icon: export_1.UnlockPdf,
                        isFree: false,
                        info: "Remove passwords (if permitted)",
                        category: "secure",
                    },
                    {
                        label: "E-Signature Workflow",
                        icon: export_1.SignPdf,
                        isFree: false,
                        info: "Add or request signatures from others",
                        category: "secure",
                    },
                    {
                        label: "Create Fillable Forms",
                        icon: export_1.SignPdf,
                        isFree: false,
                        info: "Add form fields: checkboxes, dropdowns, etc",
                        category: "edit",
                    },
                    {
                        label: "Batch Tools",
                        icon: export_1.SignPdf,
                        isFree: false,
                        info: "Apply merge, compress, etc. to many files at once",
                        category: "all-tools", // Optional: can be removed or changed
                    },
                    {
                        label: "Redact PDF",
                        icon: export_1.RedactPdf,
                        isFree: false,
                        info: "Permanently remove sensitive information",
                        category: "secure",
                    },
                    {
                        label: "Convert PDF to Excel",
                        icon: export_1.PdfToExcell,
                        isFree: false,
                        info: "Accurate table extraction",
                        category: "convert",
                    },
                    {
                        label: "Convert PDF to PowerPoint",
                        icon: export_1.PdfToPowerpoint,
                        isFree: false,
                        info: "Slide-based conversion",
                        category: "convert",
                    },
                    {
                        label: "High-Resolution PDF to Image",
                        icon: export_1.PdfToImage,
                        isFree: false,
                        info: "Convert High-Resolution PDF to Image(300–600 DPI export)",
                        category: "convert",
                    },
                    {
                        label: "Cloud Integration",
                        icon: export_1.CloudUpload,
                        isFree: false,
                        info: "Upload/Save directly from Google Drive, Dropbox, OneDrive",
                        category: "all-tools", // Optional: can be removed or changed
                    },
                    {
                        category: "more", // Optional: can be removed or changed
                    },
                ]
                    .slice(0, -1) // Ensure you don't include the last empty object
                    .filter(function (tool) {
                    return tool.label && tool.label.toLowerCase().includes(searchQuery);
                }) // Ensure label exists
                    .filter(function (tool) {
                    return selectedTools === "all-tools" || selectedTools === tool.category;
                })
                    .map(function (tool, index) {
                    var randomIndex = Math.floor(Math.random() * toolsSectionThemes.length);
                    var randomColor = toolsSectionThemes[randomIndex];
                    return ((0, jsx_runtime_1.jsx)(react_2.motion.div, { variants: variants1, initial: "inactive", whileInView: "active", viewport: { once: true }, "data-color": randomColor, className: (0, utils_1.cn)("w-full relative center tools flex-col border rounded-lg", "theme-".concat(randomIndex)), children: (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { children: (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, { className: "w-full rounded-lg", children: (0, jsx_runtime_1.jsxs)("div", { onClick: function () {
                                        var targetPath = tool.label
                                            .toLocaleLowerCase()
                                            .replace(/\s+/g, "_");
                                        tool.isFree
                                            ? navigate("/" + targetPath)
                                            : navigate("/pricing");
                                    }, className: (0, utils_1.cn)("tols h-full w-full flex-1 group relative gap-4 flex-col duration-500 cursor-pointer flex items-center justify-center rounded-xl pt-2 pb-7"), children: [(0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, { className: "text-white", children: (0, jsx_runtime_1.jsx)("p", { children: tool.info }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-end w-full px-3", children: (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)(tool.isFree
                                                    ? "bg-[rgba(21,128,61,.10)]"
                                                    : "bg-orange-100 dark:bg-transparent", "rounded-full w-7 h-7 z-10  text-xs whitespace-nowrap absolute left-3 top-3 flex items-center justify-center"), children: tool.isFree ? "🟢" : "🔒" }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center ease-linear scale-95 duration-100 group-hover:scale-110 justify-center rounded-xl w-12 h-12 sm:w-22 sm:h-22", children: (0, jsx_runtime_1.jsx)(tool.icon, { size: "lg" }) }), (0, jsx_runtime_1.jsx)("p", { className: "font-medium text-ellipsis max-w-[150px] overflow-hidden text-sm whitespace-nowrap text-secondary-foreground", children: tool.label })] }) }) }, index) }, index));
                }) })] }));
};
exports.default = ToolsSection;
