"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("../ui/button");
var landing_store_1 = __importDefault(require("@/pages/landing/store/landing_store"));
var utils_1 = require("@/lib/utils");
var accordion_1 = require("@/components/ui/accordion");
var export_1 = require("@/assets/svg/export");
var SidemenuLyout = function () {
    var sideMenuOpen = (0, landing_store_1.default)().sideMenuOpen;
    var toggleSideMenuOpen = (0, landing_store_1.default)().toggleSideMenuOpen;
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)(sideMenuOpen ? "w-full" : "w-0", "fixed h-lvh duration-500  backdrop-blur-[2px] z-20 right-0 bottom-0 overflow-hidden top-0 max-w-lvw"), children: (0, jsx_runtime_1.jsxs)("aside", { className: (0, utils_1.cn)(sideMenuOpen ? "w-full" : "w-0", "overflow-hidden fixed max-w-sm z-20 top-0 bottom-0 shadow duration-500 right-0 py-10 bg-white dark:bg-primary"), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between px-8 mb-10 w-full", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-start gap-5", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { className: "", variant: "outline", children: "Sign Up" }), (0, jsx_runtime_1.jsx)(button_1.Button, { children: "Sign In" })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-end", children: (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, { onClick: toggleSideMenuOpen, className: "w-full cursor-pointer text-secondary-foreground h-full" }) })] }), (0, jsx_runtime_1.jsx)(accordion_1.Accordion, { type: "single", collapsible: true, children: [
                        {
                            label: "CONVERT TO PDF ",
                            tools: [
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
                            ],
                        },
                        {
                            label: "CONVERT FROM PDF",
                            tools: [
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
                            ],
                        },
                        {
                            label: "MERGE AND SPLIT",
                            tools: [
                                {
                                    label: "Merge PDF",
                                    icon: export_1.MergePdf,
                                },
                                {
                                    label: "Split PDF",
                                    icon: export_1.SplitPdf,
                                },
                            ],
                        },
                        {
                            label: "PDF SECURITY",
                            tools: [
                                {
                                    label: "Protect PDF",
                                    icon: export_1.LockPdf,
                                },
                                {
                                    label: "Unlock PDF",
                                    icon: export_1.UnlockPdf,
                                },
                            ],
                        },
                        {
                            label: "PDF ORGANIZATION",
                            tools: [
                                {
                                    label: "Rotate PDF",
                                    icon: export_1.RotatePdf, // Placeholder icon
                                },
                                {
                                    label: "Compress PDF",
                                    icon: export_1.CompressPdf, // Placeholder icon
                                },
                                {
                                    label: "Add Watermark",
                                    icon: export_1.PdfToWord, // Placeholder icon
                                },
                                {
                                    label: "Rotate Pdf",
                                    icon: export_1.RotatePdf, // Placeholder icon
                                },
                            ],
                        },
                    ].map(function (tool, index) { return ((0, jsx_runtime_1.jsxs)(accordion_1.AccordionItem, { value: index + 1, children: [(0, jsx_runtime_1.jsx)(accordion_1.AccordionTrigger, { className: "px-8 text-[17px] font-semibold text-primary-foreground", children: tool.label }), tool.tools.map(function (tool, toolIndex) { return ((0, jsx_runtime_1.jsxs)(accordion_1.AccordionContent, { className: "flex text-base text-secondary-foreground font-medium items-start justify-start px-8 gap-2", children: [(0, jsx_runtime_1.jsx)(tool.icon, { size: "sm" }), tool.label] }, toolIndex)); })] }, index)); }) })] }) }));
};
exports.default = SidemenuLyout;
