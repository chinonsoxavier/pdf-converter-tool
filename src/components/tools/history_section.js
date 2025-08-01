"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var export_1 = require("@/assets/svg/export");
var container_layout_1 = __importDefault(require("../layout/container_layout"));
var lucide_react_1 = require("lucide-react");
var tooltip_1 = require("../ui/tooltip");
var react_1 = require("motion/react");
var HistorySection = function () {
    var variants1 = {
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
    var variants2 = {
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
    return ((0, jsx_runtime_1.jsx)(react_1.motion.div, { variants: variants1, initial: "inactive", whileInView: "active", viewport: { once: true }, children: (0, jsx_runtime_1.jsxs)(container_layout_1.default, { className: "flex space-y-3 max-w-xl flex-col pt-10 pb-20 border-t", children: [(0, jsx_runtime_1.jsx)(react_1.motion.div, { variants: variants1, initial: "inactive", whileInView: "active", viewport: { once: true }, children: (0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-medium text-primary-foreground text-left", children: "Recent Activities" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "grid sm:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3 sm:gap-5", children: [(0, jsx_runtime_1.jsxs)(react_1.motion.div, { variants: variants2, initial: "inactive", whileInView: "active", viewport: { once: true }, className: "flex border hover:bg-secondary p-4 rounded-md items-center justify-between mx-auto w-full ax-w-xl gap-3 bg-secondary/50", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-full overflow-hidden items-center gap-3 justify-start", children: [(0, jsx_runtime_1.jsx)(export_1.PdfToWord, {}), (0, jsx_runtime_1.jsx)("p", { className: "truncate", children: "dwsd dnsd.pdf" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3 justify-end", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-secondary-foreground text-sm whitespace-nowrap", children: "2.2 MB" }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { children: (0, jsx_runtime_1.jsxs)(tooltip_1.TooltipTrigger, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { size: 19, className: "text-secondary-foreground" }), (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, { className: "text-white", children: "Download File" })] }) })] })] }), (0, jsx_runtime_1.jsxs)(react_1.motion.div, { variants: variants2, initial: "inactive", whileInView: "active", viewport: { once: true }, className: "flex border hover:bg-secondary p-4 rounded-md items-center justify-between mx-auto w-full ax-w-xl gap-3 bg-secondary/50", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-full overflow-hidden items-center gap-3 justify-start", children: [(0, jsx_runtime_1.jsx)(export_1.PdfToWord, {}), (0, jsx_runtime_1.jsx)("p", { className: "truncate", children: "dwsd dnsd.pdf" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3 justify-end", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-secondary-foreground text-sm whitespace-nowrap", children: "2.2 MB" }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { children: (0, jsx_runtime_1.jsxs)(tooltip_1.TooltipTrigger, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { size: 19, className: "text-secondary-foreground" }), (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, { className: "text-white", children: "Download File" })] }) })] })] }), (0, jsx_runtime_1.jsxs)(react_1.motion.div, { variants: variants2, initial: "inactive", whileInView: "active", viewport: { once: true }, className: "flex border hover:bg-secondary p-4 rounded-md items-center justify-between mx-auto w-full ax-w-xl gap-3 bg-secondary/50", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-full overflow-hidden items-center gap-3 justify-start", children: [(0, jsx_runtime_1.jsx)(export_1.PdfToWord, {}), (0, jsx_runtime_1.jsx)("p", { className: "truncate", children: "dwsd dnsd.pdf" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3 justify-end", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-secondary-foreground text-sm whitespace-nowrap", children: "2.2 MB" }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { children: (0, jsx_runtime_1.jsxs)(tooltip_1.TooltipTrigger, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { size: 19, className: "text-secondary-foreground" }), (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, { className: "text-white", children: "Download File" })] }) })] })] })] })] }) }));
};
exports.default = HistorySection;
