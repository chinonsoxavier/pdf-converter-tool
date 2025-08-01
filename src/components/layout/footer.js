"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var dialog_1 = require("@/components/ui/dialog");
var react_1 = require("motion/react");
var Footer = function () {
    var variants1 = {
        inactive: {
            y: 110,
            opacity: 0,
        },
        active: {
            y: 0,
            opacity: 1,
            transition: { duration: 1.5 },
        },
    };
    var variants2 = {
        inactive: {
            y: 120,
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
            y: 130,
            opacity: 0,
        },
        active: {
            y: 0,
            opacity: 1,
            transition: { duration: 1.5 },
        },
    };
    var variants4 = {
        inactive: {
            y: 140,
            opacity: 0,
        },
        active: {
            y: 0,
            opacity: 1,
            transition: { duration: 1.5 },
        },
    };
    return ((0, jsx_runtime_1.jsxs)("footer", { className: "px-4 pt-10 sm:pt-20 border-t", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid max-width mx-auto grid-cols-2 md:grid-cols-5 gap-8", children: [(0, jsx_runtime_1.jsx)(react_1.motion.div, { variants: variants1, initial: "inactive", whileInView: "active", viewport: { once: true }, className: "w-full", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-medium text-primary-foreground mb-4", children: "Member area" }), (0, jsx_runtime_1.jsxs)("ul", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/signin", className: "text-secondary-foreground hover:text-primary-foreground text-sm", children: "Sign In" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/signup", className: "text-secondary-foreground hover:text-primary-foreground text-sm", children: "Sign Up" }) })] })] }) }), (0, jsx_runtime_1.jsx)(react_1.motion.div, { variants: variants1, initial: "inactive", whileInView: "active", viewport: { once: true }, className: "w-full", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-medium text-primary-foreground mb-4", children: "PDF Converter" }), (0, jsx_runtime_1.jsx)("ul", { className: "space-y-2", children: (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/blog", className: "text-secondary-foreground hover:text-primary-foreground text-sm", children: "Blog" }) }) })] }) }), (0, jsx_runtime_1.jsx)(react_1.motion.div, { variants: variants1, initial: "inactive", whileInView: "active", viewport: { once: true }, className: "w-full", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-medium text-primary-foreground mb-4", children: "Company" }), (0, jsx_runtime_1.jsxs)("ul", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "terms-and-privacy", className: "text-secondary-foreground hover:text-primary-foreground text-sm", children: "Terms and Privacy" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", className: "text-secondary-foreground hover:text-primary-foreground text-sm", children: "Developers API" }) })] })] }) }), (0, jsx_runtime_1.jsx)(react_1.motion.div, { variants: variants4, initial: "inactive", whileInView: "active", viewport: { once: true }, className: "w-full", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-medium text-primary-foreground mb-4", children: "Support" }), (0, jsx_runtime_1.jsx)("ul", { className: "space-y-2", children: (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", className: "text-secondary-foreground hover:text-primary-foreground text-sm", children: "Help" }) }) })] }) }), (0, jsx_runtime_1.jsx)(react_1.motion.div, { variants: variants4, initial: "inactive", whileInView: "active", viewport: { once: true }, className: "w-full", children: (0, jsx_runtime_1.jsxs)("div", { className: "col-span-2 md:col-span-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-2 mb-2", children: (0, jsx_runtime_1.jsx)("span", { className: "font-medium whitespace-nowrap text-primary-foreground", children: "Admin" }) }), (0, jsx_runtime_1.jsx)("div", { className: "text-secondary-foreground font-mono text-sm whitespace-nowrap ", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/dashboard", children: "Dashoard" }) }), (0, jsx_runtime_1.jsx)("div", { className: "text-secondary-foreground font-mono text-sm whitespace-nowrap", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/dashboard/users", children: "Users" }) }), (0, jsx_runtime_1.jsx)("div", { className: "text-secondary-foreground font-mono text-sm whitespace-nowrap ", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/dashboard/tools", children: "Tools" }) }), (0, jsx_runtime_1.jsx)("div", { className: "text-secondary-foreground font-mono text-sm whitespace-nowrap", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/dashboard/analysis", children: "Analysis" }) }), (0, jsx_runtime_1.jsx)("div", { className: "text-secondary-foreground font-mono text-sm whitespace-nowrap", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/dashboard/settings", children: "Settings" }) })] }) }), (0, jsx_runtime_1.jsx)(react_1.motion.div, { variants: variants4, initial: "inactive", whileInView: "active", viewport: { once: true }, className: "w-full", children: (0, jsx_runtime_1.jsxs)("div", { className: "col-span-2 md:col-span-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 mb-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-5 h-5 min-w-5 bg-red-500 rounded-sm flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "w-3 h-3 text-white" }) }), (0, jsx_runtime_1.jsx)("span", { className: "font-medium whitespace-nowrap text-primary-foreground", children: "PDF Nest" })] }), (0, jsx_runtime_1.jsx)("div", { className: " font-mono text-secondary-foreground text-sm whitespace-nowrap font-medium", children: "255792515918" }), (0, jsx_runtime_1.jsx)("div", { className: "text-secondary-foreground text-sm", children: "files converted since 2005" })] }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-8 pt-4 border-t" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex max-width mx-auto items-center pb-10 pt-2 justify-between w-full", children: [(0, jsx_runtime_1.jsx)("p", { children: " \u00A9 2025 PDFNest " }), (0, jsx_runtime_1.jsxs)(dialog_1.Dialog, { children: [(0, jsx_runtime_1.jsxs)(dialog_1.DialogTrigger, { className: "text-secondary-foreground", children: ["English", (0, jsx_runtime_1.jsx)("span", { className: "border border-secondary-foreground rounded-sm ml-2", children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, { className: "inline-block fill-secondary-foreground", fill: "#2F2F2F", strokeWidth: 0 }) })] }), (0, jsx_runtime_1.jsx)(dialog_1.DialogContent, { children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, { children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { className: "text-xl sm:text-2xl text-center font-semibold", children: "Select Language" }), (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, { className: "grid grid-cols-[repeat(auto-fit,minmax(110px,1fr))] ", children: [
                                                "English",
                                                "العربية",
                                                "Dansk",
                                                "Deutsch",
                                                "Español",
                                                "Français",
                                                "עברית",
                                                "हिन्दी",
                                                "Indonesia",
                                                "Italiano",
                                                "日本語",
                                                "한국어",
                                                "Lietuvių",
                                                "Norsk",
                                                "Polski",
                                                "Português",
                                                "Русский",
                                                "Svenska",
                                                "ไทย",
                                                "Türkçe",
                                                "Українська",
                                                "Tiếng Việt",
                                                "中文（中国）",
                                                "中文（台灣）",
                                            ].map(function (language, index) { return ((0, jsx_runtime_1.jsx)("button", { className: "w-full whitespace-nowrap cursor-pointer text-left py-2 px-4 dark:hover:bg-gray-700 hover:bg-gray-100 focus:outline-none", children: language }, index)); }) })] }) })] })] })] }));
};
exports.default = Footer;
