"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var export_1 = require("@/assets/svg/export");
var react_1 = require("motion/react");
var tooltip_1 = require("@/components/ui/tooltip");
var utils_1 = require("@/lib/utils");
var react_2 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Tools = function () {
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
    var _a = (0, react_2.useState)(""), searchQuery = _a[0], setSearchQuery = _a[1];
    var _b = (0, react_2.useState)("all-tools"), selectedTools = _b[0], setSelectedTools = _b[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var toolsSectionThemes = [
        "#f2f9fe",
        "#f9fefb",
        "#fffcfa",
        "#fdf8ff",
        "#fff5f8",
        "#f8fcff",
        "#fffdfa",
        "#f7f9fb",
        "#f7fcff",
        "#fffcf9",
        "#fafffe",
        "#faf6f6",
    ];
    return ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-1.5 sm:gap-3 pb-12 sm:pb-20 w-full mt-4", children: [
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
            .slice(0, -1)
            .filter(function (tool) { return tool.label.toLowerCase().includes(searchQuery); })
            .filter(function (tool) {
            return selectedTools === "all-tools" || selectedTools === tool.category;
        })
            .map(function (tool, index) {
            // Generate a random index for the color array
            var randomIndex = Math.floor(Math.random() * toolsSectionThemes.length);
            // Get the random color
            var randomColor = toolsSectionThemes[randomIndex];
            var getColorClass = function (color) {
                return "bg-[".concat(toolsSectionThemes[randomIndex], "]");
            };
            return (
            //   <Tooltip>
            //     <TooltipContent className="text-white">
            //       <p>{showAllTools ? "Hide Tools" : "Show More Tools"}</p>
            //     </TooltipContent>
            //     <motion.div
            //       variants={variants1}
            //       initial={"inactive"}
            //       whileInView={"active"}
            //       viewport={{ once: true }}
            //       className="flex-1 bg-[#fffcfa] dark:bg-secondary border group relative gap-4 flex-col b-[#f9f9f9] hover:borde-primary duration-500 cursor-pointer flex items-center justify-center rounded-xl pt-2 pb-7"
            //     >
            //       hjvhjvgc g
            //       <button
            //         onClick={() => setShowAllTools(!showAllTools)}
            //         style={{
            //           display: showAllTools ? "none" : "flex",
            //         }}
            //       >
            //         <TooltipTrigger className="w-full h-full flex items-center justify-center flex-col">
            //           <div className="flex items-center ease-linear scale-95 duration-100 group-hover:scale-110 justify-center rounded-xl w-12 h-12 sm:w-22 sm:h-22">
            //             <MoreHoriz size="lg" />
            //           </div>
            //           <p className="font-medium text-sm text-light-text">
            //             {showAllTools ? "Hide Tools" : "More Tools"}
            //           </p>
            //         </TooltipTrigger>
            //       </button>
            //     </motion.div>
            //   </Tooltip>
            // ) : (
            (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { children: (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, { children: (0, jsx_runtime_1.jsx)(react_1.motion.div, { variants: variants1, initial: "inactive", whileInView: "active", viewport: { once: true }, className: "w-full ", children: (0, jsx_runtime_1.jsxs)("button", { onClick: function () {
                                // Handle tool click, e.g., navigate to tool page
                                var targetPath = tool.label
                                    .toLocaleLowerCase()
                                    .replace(/\s+/g, "_"); // Replace all spaces with underscores
                                tool.isFree ? navigate(targetPath) : navigate("/pricing");
                            }, className: (0, utils_1.cn)(getColorClass(randomColor), "tools h-full flex-1 group relative gap-4 flex-col duration-500 cursor-pointer flex items-center justify-center rounded-xl pt-2 pb-7"), children: [(0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, { className: "text-white", children: (0, jsx_runtime_1.jsx)("p", { children: tool.info }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-end w-full px-3", children: (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)(tool.isFree
                                            ? "bg-[rgba(21,128,61,.10)] "
                                            : "bg-orage-100 dark:bg-transparent", "rounded-full px-2 text-xs py-1 absolte left-3 top-3 flex items-center justify-center"), children: tool.isFree ? "🟢 Free" : "🔒 Premium" }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center ease-linear scale-95 duration-100 group-hover:scale-110 justify-center rounded-xl w-12 h-12 sm:w-22 sm:h-22 ", children: (0, jsx_runtime_1.jsx)(tool.icon, { size: "lg" }) }), (0, jsx_runtime_1.jsx)("p", { className: "font-medium text-ellipsis max-w-[150px] overflow-hidden text-sm whitespace-nowrap text-secondary-text", children: tool.label })] }, index) }) }) }));
        }) }));
};
exports.default = Tools;
