"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("../ui/button");
var container_layout_1 = __importDefault(require("../layout/container_layout"));
var how_to_section_1 = __importDefault(require("./how_to_section"));
var react_1 = require("motion/react");
var HeroSection = function () {
    var variants1 = {
        inactive: {
            y: 100,
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
            y: 250,
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
            y: 200,
            opacity: 0,
        },
        active: {
            y: 0,
            opacity: 1,
            transition: { duration: 1.8 },
        },
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(container_layout_1.default, { id: "hero_section", className: "text-center max-width h-full space-y-7 py-40 flex items-center justify-center flex-col", children: [(0, jsx_runtime_1.jsx)(react_1.motion.div, { variants: variants1, initial: "inactive", whileInView: "active", viewport: { once: true }, children: (0, jsx_runtime_1.jsx)("h1", { className: "text-center sm:text-5xl text-primary-foreground text-4xl font-semibold", children: "Free & Premium PDF Tool" }) }), (0, jsx_runtime_1.jsx)(react_1.motion.div, { variants: variants2, initial: "inactive", whileInView: "active", viewport: { once: true }, children: (0, jsx_runtime_1.jsx)("p", { className: "text-lg max-w-2xl text-primary-foreground sm:text-xl", children: "Merge, split, convert, compress \u2014 all in one platform. Professional PDF tools for everyone." }) }), (0, jsx_runtime_1.jsx)(react_1.motion.div, { variants: variants3, initial: "inactive", whileInView: "active", viewport: { once: true }, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center gap-5", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", className: "dark:bg-[#222831]", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRightCircleIcon, { className: "rotate-90" }), "Explore tools"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "bg-primary dark:bg-[#ce1c1c] ", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Crown, { className: "" }), "Subscribe"] })] }) })] }), (0, jsx_runtime_1.jsx)(how_to_section_1.default, {})] }));
};
exports.default = HeroSection;
