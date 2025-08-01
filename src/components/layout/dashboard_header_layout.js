"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("../ui/button");
var mode_toggle_1 = require("../mode_toggle");
var dashboard_layout_store_1 = __importDefault(require("@/pages/dashboard/dashboard_layout_store/dashboard_layout_store"));
var react_router_dom_1 = require("react-router-dom");
var alert_dialog_1 = require("@/components/ui/alert-dialog");
var DashboardHeaderLayout = function () {
    var sideMenuOpen = (0, dashboard_layout_store_1.default)().sideMenuOpen; // Ensure sideMenuOpen exists in the store
    var toggleSideMenuOpen = (0, dashboard_layout_store_1.default)().toggleSideMenuOpen;
    return ((0, jsx_runtime_1.jsx)("header", { className: "overflow-hidden shadow mx-auto border-b bg-white dark:bg-primary borde-y sm:px- sm:py-5 py-3", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between max-width w-full mx-auto", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-primary-foreground text-2xl", children: "Logo" }), (0, jsx_runtime_1.jsxs)("nav", { className: "flex items-center justify-end gap-3", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", children: (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "hidden xs:flex", size: "sm", variant: "secondary", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Eye, {}), " View Site"] }) }), (0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialog, { children: [(0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialogTrigger, { children: (0, jsx_runtime_1.jsx)(button_1.Button, { asChild: true, size: "sm", children: (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ExternalLinkIcon, { className: "inline-flex" }), " Logout"] }) }) }), (0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialogContent, { children: [(0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialogHeader, { children: [(0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialogTitle, { children: "Are you absolutely sure?" }), (0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialogDescription, { children: "This action cannot be undone. This will permanently delete your account and remove your data from our servers." })] }), (0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialogFooter, { children: [(0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialogCancel, { children: "Cancel" }), (0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialogAction, { children: "Continue" })] })] })] }), (0, jsx_runtime_1.jsx)(mode_toggle_1.ModeToggle, {}), sideMenuOpen ? ((0, jsx_runtime_1.jsx)("div", { className: "w-8 h-8 items-center justify-center cursor-pointer text-secondary-foreground flex md:hidden", children: (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, { onClick: toggleSideMenuOpen, className: "w-8 h-8 cursor-pointer block md:hidden" }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "w-8 h-8 p-0 items-center justify-center cursor-pointer text-secondary-foreground flex md:hidden", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Menu, { onClick: toggleSideMenuOpen, className: "w-8 h-8 cursor-pointer block md:hidden" }) }))] })] }) }));
};
exports.default = DashboardHeaderLayout;
