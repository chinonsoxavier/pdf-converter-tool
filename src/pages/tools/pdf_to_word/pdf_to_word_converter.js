"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var converter_layout_1 = __importDefault(require("@/components/tools/layout_types/converter_layout"));
var react_1 = require("react");
var PdfToWordConverter = function () {
    var _a = (0, react_1.useState)(null), file = _a[0], setFile = _a[1];
    return ((0, jsx_runtime_1.jsx)("div", { className: "", children: (0, jsx_runtime_1.jsx)(converter_layout_1.default, { actionButtonText: "Convert Pdf To Word", label: "Pdf To Word Converter", desc: "Convert PDFs to editable Word documents", fileType: ['pdf'], file: file, setFile: setFile, convertingStateText: "Converting PDF To Word" }) }));
};
exports.default = PdfToWordConverter;
