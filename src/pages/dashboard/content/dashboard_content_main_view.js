"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var container_layout_1 = __importDefault(require("@/components/layout/container_layout"));
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var textarea_1 = require("@/components/ui/textarea");
var select_1 = require("@/components/ui/select");
var table_1 = require("@/components/ui/table");
var dialog_1 = require("@/components/ui/dialog");
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var utils_1 = require("@/lib/utils");
var DashboardContentMainView = function () {
    var _a = (0, react_1.useState)([
        {
            id: 1,
            title: "10 Best AI Tools for 2024",
            status: "published",
            author: "Admin",
            date: "2024-01-20",
            views: 1250,
        },
        {
            id: 2,
            title: "How to Choose the Right Marketing Tool",
            status: "draft",
            author: "Admin",
            date: "2024-01-18",
            views: 0,
        },
        {
            id: 3,
            title: "Design Trends for Modern Websites",
            status: "published",
            author: "Admin",
            date: "2024-01-15",
            views: 890,
        },
    ]), articles = _a[0], _ = _a[1];
    return ((0, jsx_runtime_1.jsxs)(container_layout_1.default, { className: "space-y-4 flex-col py-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold text-primary-foreground", children: "Content Management" }), (0, jsx_runtime_1.jsxs)(dialog_1.Dialog, { children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4 mr-2" }), "New Article"] }) }), (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: "max-w-2xl", children: [(0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, { children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: "Create New Article" }), (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, { children: "Write a new blog post or article" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-4 py-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-4 items-center gap-4", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "articleTitle", className: "text-right", children: "Title" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "articleTitle", className: "col-span-3" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-4 items-center gap-4", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "articleCategory", className: "text-right", children: "Category" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "col-span-3", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "Select category" }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "news", children: "News" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "tutorials", children: "Tutorials" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "reviews", children: "Reviews" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "guides", children: "Guides" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-4 items-start gap-4", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "articleContent", className: "text-right mt-2", children: "Content" }), (0, jsx_runtime_1.jsx)(textarea_1.Textarea, { id: "articleContent", className: "col-span-3 min-h-[200px]" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-4 items-center gap-4", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "articleStatus", className: "text-right", children: "Status" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "col-span-3", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "Select status" }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "draft", children: "Draft" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "published", children: "Published" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "scheduled", children: "Scheduled" })] })] })] })] }), (0, jsx_runtime_1.jsxs)(dialog_1.DialogFooter, { children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", children: "Save Draft" }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", children: "Publish" })] })] })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "Articles & Blog Posts" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Manage your blog content and news articles" })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)(table_1.Table, { children: [(0, jsx_runtime_1.jsx)(table_1.TableHeader, { children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Title" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Status" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Author" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Date" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Views" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Actions" })] }) }), (0, jsx_runtime_1.jsx)(table_1.TableBody, { children: articles.map(function (article) { return ((0, jsx_runtime_1.jsxs)(table_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(table_1.TableCell, { className: "font-medium", children: article.title }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: (0, jsx_runtime_1.jsx)(badge_1.Badge, { className: (0, utils_1.cn)(article.status === 'published' ? 'text-white' : 'text-primary-foreground'), variant: article.status === "published" ? "default" : "secondary", children: article.status }) }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: article.author }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: article.date }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: article.views.toLocaleString() }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { className: "h-4 w-4" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "h-4 w-4" }) })] }) })] }, article.id)); }) })] }) })] })] }));
};
exports.default = DashboardContentMainView;
