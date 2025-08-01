"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var utils_1 = require("@/lib/utils");
var tools_store_1 = __importDefault(require("@/pages/tools/tools_store"));
var button_1 = require("../ui/button");
var lucide_react_1 = require("lucide-react");
var ConverterLayoutSidebar = function (_a) {
    var label = _a.label, setProcessingTool = _a.setProcessingTool, fileType = _a.fileType, disabled = _a.disabled, contents = _a.contents;
    var sideMenuOpen = (0, tools_store_1.default)().sideMenuOpen;
    return ((0, jsx_runtime_1.jsxs)("aside", { className: (0, utils_1.cn)(sideMenuOpen ? "translate-x-0" : "-translate-x-full", "z-10 absolute pb-6 ight-0 w-full sm:hidden overflow-clip h-full border-l border-r flex-col flex items-center justify-between max-w-[80%] xs:max-w-xs bg-white dark:bg-secondary duration-1000"), children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full overflow-clip", children: [(0, jsx_runtime_1.jsx)("div", { className: "border-b py-6", children: (0, jsx_runtime_1.jsx)("p", { className: "text-xl overflow-ellipsis sm:text-2xl font-medium text-secondary-foreground text-center ", children: label }) }), contents] }), (0, jsx_runtime_1.jsx)("div", { className: "px-6 w-full", children: (0, jsx_runtime_1.jsxs)(button_1.Button, { disabled: disabled, onClick: function () { return setProcessingTool(true); }, className: "max-w-sm text-lg sm:text-xl [&_svg]:size-6 group rounded-lg py-0 flex items-center h w-full", type: "submit", children: ["Convert ", fileType.toUpperCase(), " File", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRightCircleIcon, {})] }) })] }));
};
exports.default = ConverterLayoutSidebar;
