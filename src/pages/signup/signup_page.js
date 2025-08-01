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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SignUpPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var alert_1 = require("@/components/ui/alert");
var lucide_react_1 = require("lucide-react");
function SignUpPage() {
    var _this = this;
    var _a = (0, react_1.useState)(false), showPassword = _a[0], setShowPassword = _a[1];
    var _b = (0, react_1.useState)(false), showConfirmPassword = _b[0], setShowConfirmPassword = _b[1];
    var _c = (0, react_1.useState)(false), isLoading = _c[0], setIsLoading = _c[1];
    var _d = (0, react_1.useState)(""), error = _d[0], setError = _d[1];
    var _e = (0, react_1.useState)({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    }), formData = _e[0], setFormData = _e[1];
    var _f = (0, react_1.useState)(false), isGoogleLoading = _f[0], setIsGoogleLoading = _f[1];
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setIsLoading(true);
                    setError("");
                    // Validate passwords match
                    if (formData.password !== formData.confirmPassword) {
                        setError("Passwords do not match");
                        setIsLoading(false);
                        return [2 /*return*/];
                    }
                    // Validate password strength
                    if (formData.password.length < 8) {
                        setError("Password must be at least 8 characters long");
                        setIsLoading(false);
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    // Simulate API call
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 2:
                    // Simulate API call
                    _a.sent();
                    // Here you would typically make an API call to your registration endpoint
                    console.log("Registration attempt:", formData);
                    // For demo purposes, show success
                    alert("Registration successful! Please check your email to verify your account.");
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    setError("Registration failed. Please try again.");
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleChange = function (e) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[e.target.name] = e.target.value, _a)));
        });
    };
    var handleGoogleSignUp = function () { return __awaiter(_this, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsGoogleLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    // Simulate Google OAuth flow
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 2:
                    // Simulate Google OAuth flow
                    _a.sent();
                    // Here you would typically redirect to Google OAuth or use a library like NextAuth
                    console.log("Google sign-up initiated");
                    alert("Google sign-up successful!");
                    return [3 /*break*/, 5];
                case 3:
                    err_2 = _a.sent();
                    setError("Google sign-up failed. Please try again.");
                    return [3 /*break*/, 5];
                case 4:
                    setIsGoogleLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen flex items-center justify-center bg-secondary px-4 py-8", children: (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "w-full max-w-md bg-gray-50 dark:bg-primary", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "space-y-1", children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-2xl font-bold text-center", children: "Create account" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { className: "text-center", children: "Enter your information to create your account" })] }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, children: [(0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [error && ((0, jsx_runtime_1.jsx)(alert_1.Alert, { variant: "destructive", children: (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: error }) })), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "firstName", children: "First name" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "firstName", name: "firstName", placeholder: "John", value: formData.firstName, onChange: handleChange, required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "lastName", children: "Last name" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "lastName", name: "lastName", placeholder: "Doe", value: formData.lastName, onChange: handleChange, required: true })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "email", children: "Email" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "email", name: "email", type: "email", placeholder: "m@example.com", value: formData.email, onChange: handleChange, required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "password", children: "Password" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { id: "password", name: "password", type: showPassword ? "text" : "password", placeholder: "Create a password", value: formData.password, onChange: handleChange, required: true }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", variant: "ghost", size: "sm", className: "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent", onClick: function () { return setShowPassword(!showPassword); }, children: showPassword ? ((0, jsx_runtime_1.jsx)(lucide_react_1.EyeOff, { className: "h-4 w-4" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4" })) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "confirmPassword", children: "Confirm password" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { id: "confirmPassword", name: "confirmPassword", type: showConfirmPassword ? "text" : "password", placeholder: "Confirm your password", value: formData.confirmPassword, onChange: handleChange, required: true }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", variant: "ghost", size: "sm", className: "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent", onClick: function () { return setShowConfirmPassword(!showConfirmPassword); }, children: showConfirmPassword ? ((0, jsx_runtime_1.jsx)(lucide_react_1.EyeOff, { className: "h-4 w-4" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4" })) })] })] })] }), (0, jsx_runtime_1.jsxs)(card_1.CardFooter, { className: "flex flex-col py-4 space-y-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", className: "w-full", disabled: isLoading, children: isLoading ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Creating account..."] })) : ("Create account") }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 flex items-center", children: (0, jsx_runtime_1.jsx)("span", { className: "w-full border-t" }) }), (0, jsx_runtime_1.jsx)("div", { className: "relative flex justify-center text-xs uppercase", children: (0, jsx_runtime_1.jsx)("span", { className: "bg-white dark:bg-secondary px-2 text-muted-foreground", children: "Or continue with" }) })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { type: "button", variant: "outline", className: "w-full bg-transparent", onClick: handleGoogleSignUp, disabled: isGoogleLoading, children: [isGoogleLoading ? ((0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "mr-2 h-4 w-4 animate-spin" })) : ((0, jsx_runtime_1.jsxs)("svg", { className: "mr-2 h-4 w-4", viewBox: "0 0 24 24", children: [(0, jsx_runtime_1.jsx)("path", { fill: "currentColor", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }), (0, jsx_runtime_1.jsx)("path", { fill: "currentColor", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }), (0, jsx_runtime_1.jsx)("path", { fill: "currentColor", d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" }), (0, jsx_runtime_1.jsx)("path", { fill: "currentColor", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" })] })), "Continue with Google"] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center text-sm", children: ["Already have an account?", " ", (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/signin", className: "text-blue-600 hover:underline", children: "Sign in" })] })] })] })] }) }));
}
