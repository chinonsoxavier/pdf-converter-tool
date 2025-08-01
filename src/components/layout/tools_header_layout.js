"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("../ui/button");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var mode_toggle_1 = require("../mode_toggle");
var react_1 = require("motion/react");
var ToolsHeaderLayout = function (_a) {
    var label = _a.label, LabelIcon = _a.labelIcon;
    var variants1 = {
        inactive: {
            x: -50,
            opacity: 0,
        },
        active: {
            x: 0,
            opacity: 1,
            transition: { duration: 1.5 },
        },
    };
    var variants2 = {
        inactive: {
            y: -50,
            opacity: 0,
        },
        active: {
            y: 0,
            opacity: 1,
            transition: { duration: 1.5 },
        },
    };
    var variants3 = {
        inactive: {
            x: 50,
            opacity: 0,
        },
        active: {
            x: 0,
            opacity: 1,
            transition: { duration: 1.5 },
        },
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("header", { className: "flex overflow-hidden h-[12%] items-center bg-white dark:bg-primary px-4 border-y sm:px-8 sm:py-5 py-3 justify-between", children: [(0, jsx_runtime_1.jsx)(react_1.motion.div, { variants: variants1, initial: "inactive", whileInView: "active", viewport: { once: true }, children: (0, jsx_runtime_1.jsx)("h1", { className: "text-2xl text-primary-foreground", children: "Logo" }) }), (0, jsx_runtime_1.jsx)(react_1.motion.div, { variants: variants2, initial: "inactive", whileInView: "active", viewport: { once: true }, children: (0, jsx_runtime_1.jsxs)("p", { className: "text-2xl sm:text-3xl flex-1 hidden medium:flex font-semibold text-primary-foreground items-center justify-center gap-3 whitespace-nowrap", children: [(0, jsx_runtime_1.jsx)(LabelIcon, {}), " ", label] }) }), (0, jsx_runtime_1.jsx)(react_1.motion.div, { variants: variants3, initial: "inactive", whileInView: "active", viewport: { once: true }, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-end gap-2", children: [(0, jsx_runtime_1.jsxs)("nav", { className: "flex items-center justify-end gap-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button
                                        // size="sm"
                                        , { 
                                            // size="sm"
                                            className: "dark:bg-transparent dark:px-0 dark:border-none dark:underline", variant: "ghost", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/signin", children: "Sign In " }) }), (0, jsx_runtime_1.jsx)("span", { className: "bg-gray-400 h-max min-h-8 w-[1px]" }), (0, jsx_runtime_1.jsxs)(button_1.Button
                                        // size="sm"
                                        , { 
                                            // size="sm"
                                            className: "hidden xs:flex dark:bg-[#ce1c1c] dark:text-white", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Coffee, {}), "Support Us"] })] }), (0, jsx_runtime_1.jsx)(mode_toggle_1.ModeToggle, {}), (0, jsx_runtime_1.jsx)(lucide_react_1.Menu, { className: "w-9 h-9 cursor-pointer text-secondary-foreground block md:hidden" })] }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex shadow items-center justify-center bg-white dark:bg-primary w-full medium:hidden py-6 text-2xl sm:text-3xl gap-3 font-medium text-primary-foreground", children: [(0, jsx_runtime_1.jsx)(LabelIcon, {}), " ", label] })] }));
};
exports.default = ToolsHeaderLayout;
