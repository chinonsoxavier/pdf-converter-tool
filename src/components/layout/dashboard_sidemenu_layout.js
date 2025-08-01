"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var utils_1 = require("@/lib/utils");
var button_1 = require("../ui/button");
var lucide_react_1 = require("lucide-react");
var dashboard_layout_store_1 = __importDefault(require("@/pages/dashboard/dashboard_layout_store/dashboard_layout_store"));
var react_router_dom_1 = require("react-router-dom");
var DashboardSidemenuLayout = function () {
    var sideMenuOpen = (0, dashboard_layout_store_1.default)().sideMenuOpen;
    var toggleSideMenuOpen = (0, dashboard_layout_store_1.default)().toggleSideMenuOpen;
    var location = (0, react_router_dom_1.useLocation)();
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)(sideMenuOpen ? "w-full" : "w-0", "fixed h-lvh duration-500  backdrop-blur-[2px] z-20 right-0 bottom-0 overflow-hidden top-0 max-w-lvw"), children: (0, jsx_runtime_1.jsxs)("aside", { className: (0, utils_1.cn)(sideMenuOpen ? "w-full" : "w-0", "overflow-hidden fixed px-6 border max-w-sm z-20 top-0 bottom-0 shadow duration-500 right-0 py-10 bg-white dark:bg-primary"), children: [(0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)(sideMenuOpen ? "" : ""), children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center text-primary justify-between w-full", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.DoorOpenIcon, {}), " Logout"] }), (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, { onClick: toggleSideMenuOpen, className: "text-primary-foreground" })] }) }), (0, jsx_runtime_1.jsx)("nav", { className: "center w-full py-8", children: (0, jsx_runtime_1.jsxs)("ul", { className: "w-full px-2 space-y-2", children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { onClick: toggleSideMenuOpen, to: "/dashboard", className: (0, utils_1.cn)(location.pathname === "/dashboard" ||
                                        location.pathname === "/dashboard/"
                                        ? "bg-primary dark:bg-secondary text-white"
                                        : "hover:bg-accent/50 dark:hover:bg-secondary/50 hover:text-white text-primary-foreground", "flex py-3 px-4 duration-200 font-medium rounded-lg cursor-pointer gap-2 w-full items-center justify-start"), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.GaugeIcon, {}), "Overview"] }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { onClick: toggleSideMenuOpen, to: "/dashboard/users", className: (0, utils_1.cn)(location.pathname === "/dashboard/users"
                                        ? "bg-primary dark:bg-secondary text-white"
                                        : "hover:bg-accent/50 dark:hover:bg-secondary/50 hover:text-white text-primary-foreground", "flex py-3 px-4 duration-200 font-medium rounded-lg cursor-pointer gap-2 w-full items-center justify-start"), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users2Icon, {}), "Users"] }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { onClick: toggleSideMenuOpen, to: "/dashboard/tools", className: (0, utils_1.cn)(location.pathname === "/dashboard/tools"
                                        ? "bg-primary dark:bg-secondary text-white"
                                        : "hover:bg-accent/50 dark:hover:bg-secondary/50 hover:text-white text-primary-foreground", "flex py-3 px-4 duration-200 font-medium rounded-lg cursor-pointer gap-2 w-full items-center justify-start"), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ToolCaseIcon, {}), "Tools"] }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { onClick: toggleSideMenuOpen, to: "/dashboard/content", className: (0, utils_1.cn)(location.pathname === "/dashboard/content"
                                        ? "bg-primary dark:bg-secondary text-white"
                                        : "hover:bg-accent/50 dark:hover:bg-secondary/50 hover:text-white text-primary-foreground", "flex py-3 px-4 duration-200 font-medium rounded-lg cursor-pointer gap-2 w-full items-center justify-start"), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Box, {}), "Content"] }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { onClick: toggleSideMenuOpen, to: "/dashboard/analytics", className: (0, utils_1.cn)(location.pathname === "/dashboard/analytics"
                                        ? "bg-primary dark:bg-secondary text-white"
                                        : "hover:bg-accent/50 dark:hover:bg-secondary/50 hover:text-white text-primary-foreground", "flex py-3 px-4 duration-200 font-medium rounded-lg cursor-pointer gap-2 w-full items-center justify-start"), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.DatabaseZap, {}), "Analytics"] }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { onClick: toggleSideMenuOpen, to: "/dashboard/settings", className: (0, utils_1.cn)(location.pathname === "/dashboard/settings"
                                        ? "bg-primary dark:bg-secondary text-white"
                                        : "hover:bg-accent/50 dark:hover:bg-secondary/50 hover:text-white text-primary-foreground", "flex py-3 px-4 duration-200 font-medium rounded-lg cursor-pointer gap-2 w-full items-center justify-start"), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.SettingsIcon, {}), "Settings"] }) })] }) })] }) }));
};
exports.default = DashboardSidemenuLayout;
