"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var export_1 = require("@/assets/svg/export");
var ToolsFileExtensionCard = function (_a) {
    var fileType = _a.fileType;
    var fileTypes = ["doc", "docx"];
    var toolsFilesExtensionIcon = [
        { label: "pptt", icon: export_1.PowerPointIcon },
        { label: "doc", icon: export_1.WordIcon },
    ];
    return toolsFilesExtensionIcon.map(function (ext, index) {
        return ext.label === fileType && ((0, jsx_runtime_1.jsx)("div", { className: "w-full gap-4 center flex-col min-w-[150px] shadow bg-white p-3 min-h-[200px] rounded-lg", children: (0, jsx_runtime_1.jsx)(ext.icon, { size: "xl" }) }, index));
    });
};
exports.default = ToolsFileExtensionCard;
