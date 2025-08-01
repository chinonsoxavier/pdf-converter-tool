"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var container_layout_1 = __importDefault(require("../layout/container_layout"));
var react_1 = require("motion/react");
var HowToSection = function () {
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
            y: 110,
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
    var variants4 = {
        inactive: {
            y: 150,
            opacity: 0,
        },
        active: {
            y: 0,
            opacity: 1,
            transition: { duration: 1.8 },
        },
    };
    return ((0, jsx_runtime_1.jsxs)(container_layout_1.default, { className: "border-t flex-col w-full sm:py-20 py-10", children: [(0, jsx_runtime_1.jsx)(react_1.motion.div, { variants: variants4, initial: "inactive", whileInView: "active", viewport: { once: true }, children: (0, jsx_runtime_1.jsx)("h1", { className: "text-primary-foreground font-semibold text-2xl sm:text-3xl text-center", children: "How to Use PDFNest" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start flex-wrap gap-6 sm:gap-10 justify-center py-8 sm:py-14", children: [(0, jsx_runtime_1.jsx)(react_1.motion.div, { variants: variants1, initial: "inactive", whileInView: "active", viewport: { once: true }, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center flex-col", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center rounded-full bg-accent text-white w-10 h-10 mb-3", children: (0, jsx_runtime_1.jsx)("p", { children: "1" }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-primary-foreground font-semibold text-lg sm:text-xl pb-2 sm:pb-4", children: "Upload" }), (0, jsx_runtime_1.jsx)("p", { className: "text-secondary-foreground text-center max-w-xs", children: "Select the Word, Excel, PowerPoint, PDF or other file you wish to convert." })] }) }), (0, jsx_runtime_1.jsx)(react_1.motion.div, { variants: variants2, initial: "inactive", whileInView: "active", viewport: { once: true }, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center flex-col", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center rounded-full bg-accent text-white w-10 h-10 mb-3", children: (0, jsx_runtime_1.jsx)("p", { children: "2" }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-primary-foreground font-semibold text-lg sm:text-xl pb-2 sm:pb-4", children: "Start processing" }), (0, jsx_runtime_1.jsx)("p", { className: "text-secondary-foreground text-center max-w-xs", children: "Our PDF creator will convert your document to PDF or from PDF in seconds." })] }) }), (0, jsx_runtime_1.jsx)(react_1.motion.div, { variants: variants3, initial: "inactive", whileInView: "active", viewport: { once: true }, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center flex-col", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center rounded-full bg-accent text-white w-10 h-10 mb-3", children: (0, jsx_runtime_1.jsx)("p", { children: "3" }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-primary-foreground font-semibold text-lg sm:text-xl pb-2 sm:pb-4", children: "Download" }), (0, jsx_runtime_1.jsx)("p", { className: "text-secondary-foreground text-center max-w-xs", children: "Your new document will be ready to download immediately" })] }) })] })] }));
};
exports.default = HowToSection;
