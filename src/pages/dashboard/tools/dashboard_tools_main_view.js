"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var container_layout_1 = __importDefault(require("@/components/layout/container_layout"));
var badge_1 = require("@/components/ui/badge");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var dialog_1 = require("@/components/ui/dialog");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var select_1 = require("@/components/ui/select");
var table_1 = require("@/components/ui/table");
var textarea_1 = require("@/components/ui/textarea");
var utils_1 = require("@/lib/utils");
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var DashboardToolsMainView = function () {
    var _a = (0, react_1.useState)([
        {
            id: 1,
            name: "AI Content Generator",
            category: "AI Tools",
            status: "active",
            affiliateLink: "https://example.com/ref123",
            commission: "30%",
        },
        {
            id: 2,
            name: "SEO Analyzer",
            category: "Marketing",
            status: "active",
            affiliateLink: "https://seo.com/ref456",
            commission: "25%",
        },
        {
            id: 3,
            name: "Design Studio",
            category: "Design",
            status: "inactive",
            affiliateLink: "",
            commission: "20%",
        },
    ]), tools = _a[0], _ = _a[1];
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(container_layout_1.default, { className: "space-y-5 flex-col py-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold", children: "Tool Management" }), (0, jsx_runtime_1.jsxs)(dialog_1.Dialog, { children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4 mr-2" }), "Add Tool"] }) }), (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { children: [(0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, { children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: "Add New Tool" }), (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, { children: "Add a new tool to your directory" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-4 py-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-4 items-center gap-4", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "name", className: "text-right", children: "Name" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "name", className: "col-span-3" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-4 items-center gap-4", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "category", className: "text-right", children: "Category" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "col-span-3", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "Select category" }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "ai", children: "AI Tools" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "marketing", children: "Marketing" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "design", children: "Design" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "productivity", children: "Productivity" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-4 items-center gap-4", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "affiliate", className: "text-right", children: "Affiliate Link" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "affiliate", className: "col-span-3", placeholder: "https://..." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-4 items-center gap-4", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "commission", className: "text-right", children: "Commission" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "commission", className: "col-span-3", placeholder: "25%" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-4 items-center gap-4", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "description", className: "text-right", children: "Description" }), (0, jsx_runtime_1.jsx)(textarea_1.Textarea, { id: "description", className: "col-span-3" })] })] }), (0, jsx_runtime_1.jsx)(dialog_1.DialogFooter, { children: (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", children: "Add Tool" }) })] })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "Tools Directory" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Manage your tools and affiliate links" })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)(table_1.Table, { children: [(0, jsx_runtime_1.jsx)(table_1.TableHeader, { children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Name" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Category" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Status" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Affiliate Link" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Commission" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Actions" })] }) }), (0, jsx_runtime_1.jsx)(table_1.TableBody, { children: tools.map(function (tool) { return ((0, jsx_runtime_1.jsxs)(table_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(table_1.TableCell, { className: "font-medium", children: tool.name }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "outline", children: tool.category }) }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: (0, jsx_runtime_1.jsx)(badge_1.Badge, { className: (0, utils_1.cn)(tool.status === 'active' ? 'text-white' : 'text-primary-foreground'), variant: tool.status === "active" ? "default" : "secondary", children: tool.status }) }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: tool.affiliateLink ? ((0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", children: (0, jsx_runtime_1.jsx)(lucide_react_1.ExternalLink, { className: "h-4 w-4" }) })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-muted-foreground", children: "No link" })) }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: tool.commission }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { className: "h-4 w-4" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "h-4 w-4" }) })] }) })] }, tool.id)); }) })] }) })] })] }) }));
};
exports.default = DashboardToolsMainView;
