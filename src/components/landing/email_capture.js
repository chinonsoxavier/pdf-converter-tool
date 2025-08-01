"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailCapture = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var container_layout_1 = __importDefault(require("../layout/container_layout"));
var react_2 = require("motion/react");
var EmailCapture = function () {
    var _a = (0, react_1.useState)(""), email = _a[0], setEmail = _a[1];
    var _b = (0, react_1.useState)(false), isSubmitting = _b[0], setIsSubmitting = _b[1];
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            e.preventDefault();
            if (!email)
                return [2 /*return*/];
            setIsSubmitting(true);
            return [2 /*return*/];
        });
    }); };
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
    return ((0, jsx_runtime_1.jsx)(container_layout_1.default, { children: (0, jsx_runtime_1.jsx)(react_2.motion.div, { variants: variants1, initial: "inactive", whileInView: "active", viewport: { once: true }, className: "w-full mb-12 sm:mb-20", children: (0, jsx_runtime_1.jsx)(card_1.Card, { className: "p-6 mt-12 sm:mt-20 mx-auto bg-secondary w-full", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row items-center justify-between  gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start w-full gap-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 min-w-10 bg-accent rounded-full flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Mail, { className: "h-5 w-5 text-white" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold text-lg", children: "Stay Updated" }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground text-sm", children: "Get PDF tips, tool updates, and exclusive features" })] })] }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "flex items-center gap-2 w-full md:w-auto", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { type: "email", placeholder: "Enter your email", value: email, onChange: function (e) { return setEmail(e.target.value); }, className: "md:w-64 border-muted-foreground", required: true }), (0, jsx_runtime_1.jsx)(button_1.Button, { size: "sm", type: "submit", variant: "default", disabled: isSubmitting, className: "shrink-0", children: isSubmitting ? "Adding..." : "Subscribe" })] })] }) }) }) }));
};
exports.EmailCapture = EmailCapture;
