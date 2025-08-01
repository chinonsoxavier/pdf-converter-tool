"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeToggle = ModeToggle;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
var theme_provider_1 = require("./theme_provider");
function ModeToggle() {
    var setTheme = (0, theme_provider_1.useTheme)().setTheme;
    return ((0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, { children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "ghost", className: "text-primary-foreground hover:text-white", size: "icon", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Sun, { className: "h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" }), (0, jsx_runtime_1.jsx)(lucide_react_1.Moon, { className: "absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Toggle theme" })] }) }), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuContent, { align: "end", children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { className: "hover:text-white", onClick: function () { return setTheme("light"); }, children: "Light" }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: function () { return setTheme("dark"); }, children: "Dark" }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: function () { return setTheme("system"); }, children: "System" })] })] }));
}
