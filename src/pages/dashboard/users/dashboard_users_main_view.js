"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var container_layout_1 = __importDefault(require("@/components/layout/container_layout"));
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var dialog_1 = require("@/components/ui/dialog");
var input_1 = require("@/components/ui/input");
var react_label_1 = require("@radix-ui/react-label");
var lucide_react_1 = require("lucide-react");
var badge_1 = require("@/components/ui/badge");
var select_1 = require("@/components/ui/select");
var table_1 = require("@/components/ui/table");
var react_1 = require("react");
var utils_1 = require("@/lib/utils");
var DashboardUsersMainView = function () {
    var _a = (0, react_1.useState)([
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            plan: "Premium",
            status: "active",
            joined: "2024-01-15",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            plan: "Free",
            status: "active",
            joined: "2024-02-20",
        },
        {
            id: 3,
            name: "Mike Johnson",
            email: "mike@example.com",
            plan: "Premium",
            status: "suspended",
            joined: "2024-01-10",
        },
    ]), users = _a[0], _ = _a[1];
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(container_layout_1.default, { className: "space-y-4 flex-col py-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold", children: "User Management" }), (0, jsx_runtime_1.jsxs)(dialog_1.Dialog, { children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4 mr-2" }), "Add User"] }) }), (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { children: [(0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, { children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: "Add New User" }), (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, { children: "Create a new user account" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-4 py-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-4 items-center gap-4", children: [(0, jsx_runtime_1.jsx)(react_label_1.Label, { htmlFor: "userName", className: "text-right", children: "Name" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "userName", className: "col-span-3" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-4 items-center gap-4", children: [(0, jsx_runtime_1.jsx)(react_label_1.Label, { htmlFor: "userEmail", className: "text-right", children: "Email" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "userEmail", type: "email", className: "col-span-3" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-4 items-center gap-4", children: [(0, jsx_runtime_1.jsx)(react_label_1.Label, { htmlFor: "userPlan", className: "text-right", children: "Plan" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "col-span-3", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "Select plan" }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "free", children: "Free" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "premium", children: "Premium" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "enterprise", children: "Enterprise" })] })] })] })] }), (0, jsx_runtime_1.jsx)(dialog_1.DialogFooter, { children: (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", children: "Add User" }) })] })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "User Accounts" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Manage user accounts and premium access" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2 mb-4", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "h-4 w-4 text-muted-foreground" }), (0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "Search users...", className: "max-w-sm" })] }), (0, jsx_runtime_1.jsxs)(table_1.Table, { children: [(0, jsx_runtime_1.jsx)(table_1.TableHeader, { children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Name" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Email" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Plan" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Status" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Joined" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Actions" })] }) }), (0, jsx_runtime_1.jsx)(table_1.TableBody, { children: users.map(function (user) { return ((0, jsx_runtime_1.jsxs)(table_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(table_1.TableCell, { className: "font-medium", children: user.name }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: user.email }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: (0, jsx_runtime_1.jsx)(badge_1.Badge, { className: (0, utils_1.cn)(user.plan === "Premium"
                                                                ? "bg-orange-500"
                                                                : "text-bg-foreground bg-green-900 text-white"), variant: user.plan === "Premium" ? "default" : "secondary", children: user.plan }) }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: (0, jsx_runtime_1.jsx)(badge_1.Badge, { className: (0, utils_1.cn)(user.status !== 'active' && 'bg-secndary text-primary-foreground'), variant: user.status === "active" ? "default" : "destructive", children: user.status }) }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: user.joined }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { className: "h-4 w-4" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "h-4 w-4" }) })] }) })] }, user.id)); }) })] })] })] })] }) }));
};
exports.default = DashboardUsersMainView;
