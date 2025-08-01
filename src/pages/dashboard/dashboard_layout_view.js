"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var dashboard_header_layout_1 = __importDefault(require("@/components/layout/dashboard_header_layout"));
var dashboard_sidebar_layout_1 = __importDefault(require("@/components/layout/dashboard_sidebar_layout"));
var dashboard_sidemenu_layout_1 = __importDefault(require("@/components/layout/dashboard_sidemenu_layout"));
var react_router_dom_1 = require("react-router-dom");
var DashboardLayoutView = function () {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "h-lvh", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-[12%] ", children: (0, jsx_runtime_1.jsx)(dashboard_header_layout_1.default, {}) }), (0, jsx_runtime_1.jsx)(dashboard_sidemenu_layout_1.default, {}), (0, jsx_runtime_1.jsxs)("section", { className: "flex h-[88%] items-start justify-start overflow-scrol", children: [(0, jsx_runtime_1.jsx)(dashboard_sidebar_layout_1.default, {}), (0, jsx_runtime_1.jsx)("div", { className: "h-full w-full flex-col overflow-scroll", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}) })] })] }));
};
exports.default = DashboardLayoutView;
