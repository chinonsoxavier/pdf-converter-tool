"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("ldrs/react");
require("ldrs/react/TailChase.css");
// Default values shown
var ToolPageLoader = function (_a) {
    var convertingStateText = _a.convertingStateText;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "h-full w-full py-20 flex itex items-center flex-col", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl text-primary-foreground text-center ", children: "Logo" }), (0, jsx_runtime_1.jsx)("h1", { className: "pb-10 pt-10 text-center text-3xl sm:text-[40px] text-secondary-foreground font-semibold", children: convertingStateText }), (0, jsx_runtime_1.jsx)(react_1.TailChase, { size: "50", speed: "1.75", color: "#ce1c1c" })] }));
};
exports.default = ToolPageLoader;
