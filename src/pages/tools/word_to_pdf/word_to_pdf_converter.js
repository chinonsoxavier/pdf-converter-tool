"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var converter_layout_1 = __importDefault(require("@/components/tools/layout_types/converter_layout"));
var react_1 = require("react");
var WordToPdfConverter = function () {
    var _a = (0, react_1.useState)(null), file = _a[0], setFile = _a[1];
    return ((0, jsx_runtime_1.jsx)("div", { className: " to-primary/5 min-h-lvh from-white bg-gradient-to-t to-80% dark:from-primary dark:to-[rgb(4,9,30)]", children: (0, jsx_runtime_1.jsx)(converter_layout_1.default, { actionButtonText: "Convert Word To Pdf", convertingStateText: "Converting Word To Pdf", label: "Word To Pdf Converter", desc: "Convert Word Documents to Pdf", fileType: ["doc", "docx"], file: file, setFile: setFile }) }));
};
exports.default = WordToPdfConverter;
