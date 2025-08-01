"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var utils_1 = require("@/lib/utils");
var ContainerLayout = function (_a) {
    var children = _a.children, style = _a.style, id = _a.id, _b = _a.className, className = _b === void 0 ? "" : _b;
    return ((0, jsx_runtime_1.jsx)("section", { id: id, style: style, className: (0, utils_1.cn)("flex w-full items-center mx-auto justify-center flex-col"), children: (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)(className, "flex max-width"), children: children }) }));
};
exports.default = ContainerLayout;
