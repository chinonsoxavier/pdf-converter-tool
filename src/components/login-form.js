"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginForm = LoginForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var utils_1 = require("@/lib/utils");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
function LoginForm(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: (0, utils_1.cn)("flex flex-col gap-6", className) }, props, { children: (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "Login to your account" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Enter your email below to login to your account" })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("form", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid gap-3", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "email", children: "Email" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "email", type: "email", placeholder: "m@example.com", required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "password", children: "Password" }), (0, jsx_runtime_1.jsx)("a", { href: "#", className: "ml-auto inline-block text-sm underline-offset-4 hover:underline", children: "Forgot your password?" })] }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "password", type: "password", required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-3", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", className: "w-full", children: "Login" }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", className: "w-full", children: "Login with Google" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-4 text-center text-sm", children: ["Don't have an account?", " ", (0, jsx_runtime_1.jsx)("a", { href: "#", className: "underline underline-offset-4", children: "Sign up" })] })] }) })] }) })));
}
