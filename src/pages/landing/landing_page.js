"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var hero_section_1 = __importDefault(require("@/components/landing/hero_section"));
var tools_section_1 = __importDefault(require("@/components/landing/tools_section"));
var get_premium_section_1 = __importDefault(require("@/components/landing/get_premium_section"));
var header_1 = __importDefault(require("@/components/layout/header"));
var footer_1 = __importDefault(require("@/components/layout/footer"));
var email_capture_1 = require("@/components/landing/email_capture");
var sidemenu_layout_1 = __importDefault(require("@/components/layout/sidemenu_layout"));
var LandingPage = function () {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(header_1.default, {}), (0, jsx_runtime_1.jsx)(sidemenu_layout_1.default, {}), (0, jsx_runtime_1.jsxs)("main", { children: [(0, jsx_runtime_1.jsx)(hero_section_1.default, {}), (0, jsx_runtime_1.jsx)(tools_section_1.default, {}), (0, jsx_runtime_1.jsx)(get_premium_section_1.default, {}), (0, jsx_runtime_1.jsx)(email_capture_1.EmailCapture, {})] }), (0, jsx_runtime_1.jsx)(footer_1.default, {})] }));
};
exports.default = LandingPage;
