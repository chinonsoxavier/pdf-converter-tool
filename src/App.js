"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var landing_page_1 = __importDefault(require("./pages/landing/landing_page"));
var signin_page_1 = __importDefault(require("./pages/signin/signin_page"));
var signup_page_1 = __importDefault(require("./pages/signup/signup_page"));
var forgot_password_page_1 = __importDefault(require("./pages/forgot-password/forgot_password_page"));
var theme_provider_1 = require("./components/theme_provider");
var pdf_to_word_converter_1 = __importDefault(require("./pages/tools/pdf_to_word/pdf_to_word_converter"));
var word_to_pdf_converter_1 = __importDefault(require("./pages/tools/word_to_pdf/word_to_pdf_converter"));
var overview_main_view_1 = __importDefault(require("./pages/dashboard/overview/overview_main_view"));
var dashboard_layout_view_1 = __importDefault(require("./pages/dashboard/dashboard_layout_view"));
var dashboard_users_main_view_1 = __importDefault(require("./pages/dashboard/users/dashboard_users_main_view"));
var dashboard_tools_main_view_1 = __importDefault(require("./pages/dashboard/tools/dashboard_tools_main_view"));
var dashboard_settings_main_view_1 = __importDefault(require("./pages/dashboard/settings/dashboard_settings_main_view"));
var dashboard_content_main_view_1 = __importDefault(require("./pages/dashboard/content/dashboard_content_main_view"));
var dashboard_analytics_main_view_1 = __importDefault(require("./pages/dashboard/analytics/dashboard_analytics_main_view"));
var scroll_manager_1 = __importDefault(require("./components/scroll_manager"));
var tool_download_layout_1 = __importDefault(require("./components/tools/layout_types/tool_download_layout"));
var merge_pdf_1 = __importDefault(require("./pages/tools/merge_pdf/merge_pdf"));
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
// Set workerSrc to the imported worker=
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`
var App = function () {
    return ((0, jsx_runtime_1.jsxs)(theme_provider_1.ThemeProvider, { defaultTheme: "dark", storageKey: "vite-ui-theme", children: [(0, jsx_runtime_1.jsx)(scroll_manager_1.default, { smoothRestore: true }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(landing_page_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/signin", element: (0, jsx_runtime_1.jsx)(signin_page_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/signup", element: (0, jsx_runtime_1.jsx)(signup_page_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/forgot-password", element: (0, jsx_runtime_1.jsx)(forgot_password_page_1.default, {}) }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Route, { path: "/dashboard", element: (0, jsx_runtime_1.jsx)(dashboard_layout_view_1.default, {}), children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { index: true, element: (0, jsx_runtime_1.jsx)(overview_main_view_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/dashboard/users", element: (0, jsx_runtime_1.jsx)(dashboard_users_main_view_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/dashboard/tools", element: (0, jsx_runtime_1.jsx)(dashboard_tools_main_view_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/dashboard/settings", element: (0, jsx_runtime_1.jsx)(dashboard_settings_main_view_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/dashboard/content", element: (0, jsx_runtime_1.jsx)(dashboard_content_main_view_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/dashboard/analytics", element: (0, jsx_runtime_1.jsx)(dashboard_analytics_main_view_1.default, {}) })] }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/pdf_to_word", element: (0, jsx_runtime_1.jsx)(pdf_to_word_converter_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/pdf_to_word/download/:id", element: (0, jsx_runtime_1.jsx)(tool_download_layout_1.default, { label: "PDF file has been converted to WORD" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/merge_pdf", element: (0, jsx_runtime_1.jsx)(merge_pdf_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/merge_pdf/download/:id", element: (0, jsx_runtime_1.jsx)(tool_download_layout_1.default, { label: "Pdf files has been merged" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/split_pdf", element: (0, jsx_runtime_1.jsx)(pdf_to_word_converter_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/split_pdf/download/:id", element: (0, jsx_runtime_1.jsx)(tool_download_layout_1.default, { label: "Pdf files has been split" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/word_to_pdf", element: (0, jsx_runtime_1.jsx)(word_to_pdf_converter_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/word_to_pdf/download/:id", element: (0, jsx_runtime_1.jsx)(tool_download_layout_1.default, { label: "Word files has been converted to PDF" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/split_word", element: (0, jsx_runtime_1.jsx)(word_to_pdf_converter_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/split_pdf/download/:id", element: (0, jsx_runtime_1.jsx)(tool_download_layout_1.default, { label: "Word files has been converted to PDF" }) })] })] }));
};
exports.default = App;
