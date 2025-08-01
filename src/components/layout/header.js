"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("../ui/button");
var lucide_react_1 = require("lucide-react");
var hover_card_1 = require("@/components/ui/hover-card");
var export_1 = require("@/assets/svg/export");
var react_router_dom_1 = require("react-router-dom");
var mode_toggle_1 = require("../mode_toggle");
var react_1 = require("motion/react");
var landing_store_1 = __importDefault(require("@/pages/landing/store/landing_store"));
var Header = function () {
    var variants1 = {
        inactive: {
            x: -50,
            opacity: 0,
        },
        active: {
            x: 0,
            opacity: 1,
            transition: { duration: 1.5 },
        },
    };
    var variants2 = {
        inactive: {
            y: -50,
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
            x: 50,
            opacity: 0,
        },
        active: {
            x: 0,
            opacity: 1,
            transition: { duration: 1.5 },
        },
    };
    var sideMenuOpen = (0, landing_store_1.default)().sideMenuOpen;
    var toggleSideMenuOpen = (0, landing_store_1.default)().toggleSideMenuOpen;
    return ((0, jsx_runtime_1.jsxs)("header", { className: "flex overflow-hidden items-center bg-white dark:bg-primary px-4 border-y sm:px-8 sm:py-5 h-full py-3 justify-between", children: [(0, jsx_runtime_1.jsx)(react_1.motion.div, { variants: variants1, initial: "inactive", whileInView: "active", viewport: { once: true }, children: (0, jsx_runtime_1.jsx)("h1", { className: "text-2xl text-primary-foreground", children: "Logo" }) }), (0, jsx_runtime_1.jsx)(react_1.motion.div, { variants: variants2, initial: "inactive", whileInView: "active", viewport: { once: true }, className: "", children: (0, jsx_runtime_1.jsxs)("ul", { className: "gap-3 hidden md:flex dark:text-white text-light-text", children: [(0, jsx_runtime_1.jsx)("li", { className: "cursor-pointer hidden lg:block font-semibold text-[15px]", children: "MERGE PDF" }), (0, jsx_runtime_1.jsx)("li", { className: "cursor-pointer hidden large:block font-semibold text-[15px]", children: "SPLIT PDF" }), (0, jsx_runtime_1.jsx)("li", { className: "cursor-pointer hidden medium:block font-semibold text-[15px]", children: "COMPRESS PDF" }), (0, jsx_runtime_1.jsx)("li", { className: "cursor-pointer font-semibold text-[15px]", children: (0, jsx_runtime_1.jsxs)(hover_card_1.HoverCard, { children: [(0, jsx_runtime_1.jsxs)(hover_card_1.HoverCardTrigger, { className: "flex items-center justify-center", children: ["CONVERT PDF", (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, { strokeWidth: 0, className: "inline-block fill-dark-text dark:fill-white w-5 h-5" })] }), (0, jsx_runtime_1.jsx)(hover_card_1.HoverCardContent, { className: "mt-10 w-full px-8 before:border-input before:border relative after:rounded-lg z-30 after:-z-10 after:absolute after:bg-white after:inset-0 flex items-center justify-center before:top-0 before:-z-50 before:rotate-45 before:absolute before:bg-white before:w-12 before:h-12 before:", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-8 space-y-3 w-full items-start justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex space-y-1 w-full items-start justify-start flex-col", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold text-light-text text-[15px] whitespace-nowrap", children: "CONVERT TO PDF" }), [
                                                            {
                                                                label: "Jpg to Pdf",
                                                                icon: export_1.JPGTOPDF,
                                                            },
                                                            {
                                                                label: "Word to Pdf",
                                                                icon: export_1.WordToPdf,
                                                            },
                                                            {
                                                                label: "Powerpoint to Pdf",
                                                                icon: export_1.PowerPointToPdf,
                                                            },
                                                            {
                                                                label: "Excel to Pdf",
                                                                icon: export_1.ExcelToPdf,
                                                            },
                                                        ].map(function (tool, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex cursor-pointer items-center justify-start gap-3 py-2 px-4 dark:hover:bg-gray-700 hover:bg-gray-100 focus:outline-none", children: [(0, jsx_runtime_1.jsx)(tool.icon, { size: "sm" }), (0, jsx_runtime_1.jsx)("p", { className: "whitespace-nowrap text-xs font-semibold text-light-text", children: tool.label })] }, index)); })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-y-1 w-full items-start justify-start flex-col", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold text-light-text text-[15px] whitespace-nowrap", children: "CONVERT FROM PDF" }), [
                                                            {
                                                                label: "Pdf to Jpg",
                                                                icon: export_1.PdfToJpg,
                                                            },
                                                            {
                                                                label: "Pdf to Word",
                                                                icon: export_1.PdfToWord,
                                                            },
                                                            {
                                                                label: "Pdf to Powerpoint",
                                                                icon: export_1.PdfToPowerpoint,
                                                            },
                                                            {
                                                                label: "Pdf to Excel",
                                                                icon: export_1.PdfToExcell,
                                                            },
                                                        ].map(function (tool, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex cursor-pointer items-center justify-start gap-3 py-2 px-4 dark:hover:bg-gray-700 hover:bg-gray-100 focus:outline-none", children: [(0, jsx_runtime_1.jsx)(tool.icon, { size: "sm" }), (0, jsx_runtime_1.jsx)("p", { className: "whitespace-nowrap text-xs font-semibold text-light-text", children: tool.label })] }, index)); })] })] }) })] }) }), (0, jsx_runtime_1.jsx)("li", { className: "cursor-pointer font-semibold text-[15px]", children: (0, jsx_runtime_1.jsxs)(hover_card_1.HoverCard, { children: [(0, jsx_runtime_1.jsxs)(hover_card_1.HoverCardTrigger, { className: "flex items-center justify-center", children: ["ALL PDF TOOLS", (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, { strokeWidth: 0, className: "inline-block fill-dark-text dark:fill-white w-5 h-5" })] }), (0, jsx_runtime_1.jsx)(hover_card_1.HoverCardContent, { className: "mt-10 w-full px-8 before:border-input before:border relative after:rounded-lg z-30 after:-z-10 after:absolute after:bg-white after:inset-0 flex items-center justify-center before:top-0 before:-z-50 before:rotate-45 before:absolute before:bg-white before:w-12 before:h-12 before:", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] max-w-4xl gap-8 flex-wrap  space-y-3 w-full items-start text-dark-text justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex space-y-1 w-full items-start justify-start flex-col", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold text-light-text text-[15px] whitespace-nowrap", children: "ORGANISE PDF" }), [
                                                            {
                                                                label: "Merge Pdf",
                                                                icon: export_1.MergePdf,
                                                            },
                                                            {
                                                                label: "Split Pdf",
                                                                icon: export_1.SplitPdf,
                                                            },
                                                            {
                                                                label: "Remove Pages",
                                                                icon: export_1.RemovePages,
                                                            },
                                                            {
                                                                label: "Extract Pages",
                                                                icon: export_1.ExtractPages,
                                                            },
                                                            {
                                                                label: "Organise Pdf",
                                                                icon: export_1.OrganisePdf,
                                                            },
                                                        ].map(function (tool, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex cursor-pointer items-center justify-start gap-3 py-2 px-4 dark:hover:bg-gray-700 hover:bg-gray-100 focus:outline-none", children: [(0, jsx_runtime_1.jsx)(tool.icon, { size: "sm" }), (0, jsx_runtime_1.jsx)("p", { className: "whitespace-nowrap text-[13px] text-dark-text font-semibold", children: tool.label })] }, index)); })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-y-1 w-full items-start justify-start flex-col", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold text-light-text text-[15px] whitespace-nowrap", children: "OPTIMIZE PDF" }), [
                                                            {
                                                                label: "Compress Pdf",
                                                                icon: export_1.CompressPdf,
                                                            },
                                                            {
                                                                label: "Repair Pdf",
                                                                icon: export_1.RepairPdf,
                                                            },
                                                            {
                                                                label: "OCR Pdf",
                                                                icon: export_1.OcrPdf,
                                                            },
                                                        ].map(function (tool, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex cursor-pointer items-center justify-start gap-3 py-2 px-4 dark:hover:bg-gray-700 hover:bg-gray-100 focus:outline-none", children: [(0, jsx_runtime_1.jsx)(tool.icon, { size: "sm" }), (0, jsx_runtime_1.jsx)("p", { className: "whitespace-nowrap text-[13px] text-dark-text font-semibold", children: tool.label })] }, index)); })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-y-1 w-full items-start justify-start flex-col", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold text-light-text text-[15px] whitespace-nowrap", children: "CONVERT TO PDF" }), [
                                                            {
                                                                label: "Jpg to Pdf",
                                                                icon: export_1.JPGTOPDF,
                                                            },
                                                            {
                                                                label: "Word to Pdf",
                                                                icon: export_1.WordToPdf,
                                                            },
                                                            {
                                                                label: "Powerpoint to Pdf",
                                                                icon: export_1.PowerPointToPdf,
                                                            },
                                                            {
                                                                label: "Excel to Pdf",
                                                                icon: export_1.ExcelToPdf,
                                                            },
                                                        ].map(function (tool, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex cursor-pointer items-center justify-start gap-3 py-2 px-4 dark:hover:bg-gray-700 hover:bg-gray-100 focus:outline-none", children: [(0, jsx_runtime_1.jsx)(tool.icon, { size: "sm" }), (0, jsx_runtime_1.jsx)("p", { className: "whitespace-nowrap text-xs font-semibold text-light-text", children: tool.label })] }, index)); })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-y-1 w-full items-start justify-start flex-col", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold text-light-text text-[15px] whitespace-nowrap", children: "CONVERT FROM PDF" }), [
                                                            {
                                                                label: "Pdf to Jpg",
                                                                icon: export_1.PdfToJpg,
                                                            },
                                                            {
                                                                label: "Pdf to Word",
                                                                icon: export_1.PdfToWord,
                                                            },
                                                            {
                                                                label: "Pdf to Powerpoint",
                                                                icon: export_1.PdfToPowerpoint,
                                                            },
                                                            {
                                                                label: "Pdf to Excel",
                                                                icon: export_1.PdfToExcell,
                                                            },
                                                        ].map(function (tool, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex cursor-pointer items-center justify-start gap-3 py-2 px-4 dark:hover:bg-gray-700 hover:bg-gray-100 focus:outline-none", children: [(0, jsx_runtime_1.jsx)(tool.icon, { size: "sm" }), (0, jsx_runtime_1.jsx)("p", { className: "whitespace-nowrap text-xs font-semibold text-light-text", children: tool.label })] }, index)); })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-y-1 w-full items-start justify-start flex-col", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold text-light-text text-[15px] whitespace-nowrap", children: "Edit PDF" }), [
                                                            {
                                                                label: "Rotate Pdf",
                                                                icon: export_1.RotatePdf,
                                                            },
                                                            {
                                                                label: "Add page numbers",
                                                                icon: export_1.AddPagesToPdf,
                                                            },
                                                            {
                                                                label: "Add watermark",
                                                                icon: export_1.WaterMarkPdf,
                                                            },
                                                            {
                                                                label: "Edit Pdf",
                                                                icon: export_1.EditPdf,
                                                            },
                                                        ].map(function (tool, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex cursor-pointer items-center justify-start gap-3 py-2 px-4 dark:hover:bg-gray-700 hover:bg-gray-100 focus:outline-none", children: [(0, jsx_runtime_1.jsx)(tool.icon, { size: "sm" }), (0, jsx_runtime_1.jsx)("p", { className: "whitespace-nowrap text-xs font-semibold text-light-text", children: tool.label })] }, index)); })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-y-1 w-full items-start justify-start flex-col", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold text-light-text text-[15px] whitespace-nowrap", children: "PDF SECURITY" }), [
                                                            {
                                                                label: "Unlock Pdf",
                                                                icon: export_1.UnlockPdf,
                                                            },
                                                            {
                                                                label: "Protect Pdf",
                                                                icon: export_1.LockPdf,
                                                            },
                                                            {
                                                                label: "Sign Pdf",
                                                                icon: export_1.SignPdf,
                                                            },
                                                            {
                                                                label: "Redact Pdf",
                                                                icon: export_1.RedactPdf,
                                                            },
                                                        ].map(function (tool, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex cursor-pointer items-center justify-start gap-3 py-2 px-4 dark:hover:bg-gray-700 hover:bg-gray-100 focus:outline-none", children: [(0, jsx_runtime_1.jsx)(tool.icon, { size: "sm" }), (0, jsx_runtime_1.jsx)("p", { className: "whitespace-nowrap text-xs font-semibold text-light-text", children: tool.label })] }, index)); })] })] }) })] }) })] }) }), (0, jsx_runtime_1.jsx)(react_1.motion.div, { variants: variants3, initial: "inactive", whileInView: "active", viewport: { once: true }, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-end gap-2", children: [(0, jsx_runtime_1.jsxs)("nav", { className: "flex items-center justify-end gap-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { size: "sm", className: "dark:bg-transparent dark:px-0 dark:border-none dark:underline", variant: "ghost", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/signin", children: "Sign In " }) }), (0, jsx_runtime_1.jsx)("span", { className: "bg-gray-400 h-max min-h-8 w-[1px]" }), (0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", className: "hidden xs:flex dark:bg-[#ce1c1c] dark:text-white", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Coffee, {}), "Support Us"] })] }), (0, jsx_runtime_1.jsx)(mode_toggle_1.ModeToggle, {}), sideMenuOpen ? ((0, jsx_runtime_1.jsx)("div", { className: "w-8 h-8 cursor-pointer text-secondary-foreground items-center justify-center flex md:hidden", onClick: toggleSideMenuOpen, children: (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, { className: "w-8 h-8 cursor-pointer" }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "w-8 h-8 p-0 cursor-pointer text-secondary-foreground items-center justify-center flex md:hidden", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Menu, { onClick: toggleSideMenuOpen, className: "w-8 h-8 cursor-pointer" }) }))] }) })] }));
};
exports.default = Header;
