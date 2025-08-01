"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ToolDownload;
var jsx_runtime_1 = require("react/jsx-runtime");
var tools_section_1 = __importDefault(require("@/components/landing/tools_section"));
var footer_1 = __importDefault(require("@/components/layout/footer"));
var header_1 = __importDefault(require("@/components/layout/header"));
var sidemenu_layout_1 = __importDefault(require("@/components/layout/sidemenu_layout"));
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function ToolDownload(_a) {
    var label = _a.label;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(header_1.default, {}), (0, jsx_runtime_1.jsx)(sidemenu_layout_1.default, {}), (0, jsx_runtime_1.jsx)("div", { className: " to-primary/5 pb-20", children: (0, jsx_runtime_1.jsxs)("div", { className: "mx-auto", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center px-4 mb-8 py-20 to-primary/5 from-white bg-gradient-to-t to-80% dark:from-primary dark:to-[rgb(4,9,30)]", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl sm:text-4xl font-semibold text-gray-800 mb-6", children: label }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center flex-wrap justify-center gap-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "icon", className: "rounded-full bg-gray-600 hover:bg-gray-700 text-white", children: (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, { className: "w-5 h-5" }) }), (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "text-white px-8 py-3 rounded-lg font-medium", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { className: "w-5 h-5 mr-2" }), "Download PDF"] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex gap-2" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { size: "icon", className: "rounded-full text-white w-10 h-10", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Share2, { className: "w-5 h-5" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { size: "icon", className: "rounded-full text-white w-10 h-10", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "w-5 h-5" }) })] })] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "", children: (0, jsx_runtime_1.jsx)(tools_section_1.default, {}) })] }) }), (0, jsx_runtime_1.jsx)(footer_1.default, {})] }));
}
