"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var utils_1 = require("@/lib/utils");
var DashboardSidebarLayout = function () {
    var location = (0, react_router_dom_1.useLocation)();
    return ((0, jsx_runtime_1.jsx)("aside", { className: "bg-muted duration-500 overflow-x-clip w-0 dark:bg-secondary border-r h-full md:w-full max-w-[270px] z-10", children: (0, jsx_runtime_1.jsx)("nav", { className: "center w-full py-8", children: (0, jsx_runtime_1.jsxs)("ul", { className: "w-full px-2 space-y-2", children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/dashboard", className: (0, utils_1.cn)(location.pathname === "/dashboard" ||
                                location.pathname === "/dashboard/"
                                ? "bg-primary text-white"
                                : "hover:bg-accent/50 dark:hover:bg-primary/50 hover:text-white text-primary-foreground", "flex py-3 px-4 duration-200 font-medium rounded-lg cursor-pointer gap-2 w-full items-center justify-start"), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.GaugeIcon, {}), "Overview"] }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/dashboard/users", className: (0, utils_1.cn)(location.pathname === "/dashboard/users"
                                ? "bg-primary text-white"
                                : "hover:bg-accent/50 dark:hover:bg-primary/50 hover:text-white text-primary-foreground", "flex py-3 px-4 duration-200 font-medium rounded-lg cursor-pointer gap-2 w-full items-center justify-start"), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users2Icon, {}), "Users"] }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/dashboard/tools", className: (0, utils_1.cn)(location.pathname === "/dashboard/tools"
                                ? "bg-primary text-white"
                                : "hover:bg-accent/50 dark:hover:bg-primary/50 hover:text-white text-primary-foreground", "flex py-3 px-4 duration-200 font-medium rounded-lg cursor-pointer gap-2 w-full items-center justify-start"), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ToolCaseIcon, {}), "Tools"] }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/dashboard/content", className: (0, utils_1.cn)(location.pathname === "/dashboard/content"
                                ? "bg-primary text-white"
                                : "hover:bg-accent/50 dark:hover:bg-primary/50 hover:text-white text-primary-foreground", "flex py-3 px-4 duration-200 font-medium rounded-lg cursor-pointer gap-2 w-full items-center justify-start"), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Box, {}), "Content"] }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/dashboard/analytics", className: (0, utils_1.cn)(location.pathname === "/dashboard/analytics"
                                ? "bg-primary text-white"
                                : "hover:bg-accent/50 dark:hover:bg-primary/50 hover:text-white text-primary-foreground", "flex py-3 px-4 duration-200 font-medium rounded-lg cursor-pointer gap-2 w-full items-center justify-start"), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.DatabaseZap, {}), "Analytics"] }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/dashboard/settings", className: (0, utils_1.cn)(location.pathname === "/dashboard/settings"
                                ? "bg-primary text-white"
                                : "hover:bg-accent/50 dark:hover:bg-primary/50 hover:text-white text-primary-foreground", "flex py-3 px-4 duration-200 font-medium rounded-lg cursor-pointer gap-2 w-full items-center justify-start"), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.SettingsIcon, {}), "Settings"] }) })] }) }) }));
};
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
exports.default = DashboardSidebarLayout;
