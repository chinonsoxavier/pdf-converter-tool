"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminDashboard;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var tabs_1 = require("@/components/ui/tabs");
var badge_1 = require("@/components/ui/badge");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var textarea_1 = require("@/components/ui/textarea");
var select_1 = require("@/components/ui/select");
var table_1 = require("@/components/ui/table");
var dialog_1 = require("@/components/ui/dialog");
var switch_1 = require("@/components/ui/switch");
var lucide_react_1 = require("lucide-react");
function AdminDashboard() {
    var _a = (0, react_1.useState)("overview"), activeTab = _a[0], setActiveTab = _a[1];
    var _b = (0, react_1.useState)([
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
    ]), tools = _b[0], setTools = _b[1];
    var _c = (0, react_1.useState)([
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
    ]), users = _c[0], setUsers = _c[1];
    var _d = (0, react_1.useState)([
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
    ]), articles = _d[0], setArticles = _d[1];
    var _e = (0, react_1.useState)(false), isAddToolOpen = _e[0], setIsAddToolOpen = _e[1];
    var _f = (0, react_1.useState)(false), isAddUserOpen = _f[0], setIsAddUserOpen = _f[1];
    var _g = (0, react_1.useState)(false), isAddArticleOpen = _g[0], setIsAddArticleOpen = _g[1];
    var stats = {
        totalUsers: 1247,
        premiumUsers: 342,
        totalTools: 156,
        monthlyRevenue: 12450,
        pageViews: 45230,
        conversionRate: 3.2,
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-background", children: [(0, jsx_runtime_1.jsx)("div", { className: "border-b", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex h-16 items-center px-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Shield, { className: "h-6 w-6" }), (0, jsx_runtime_1.jsx)("h1", { className: "text-xl font-semibold", children: "Admin Dashboard" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "ml-auto flex items-center space-x-4", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", size: "sm", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4 mr-2" }), "View Site"] }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", size: "sm", children: "Logout" })] })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1 space-y-4 p-8 pt-6", children: (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, { value: activeTab, onValueChange: setActiveTab, className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)(tabs_1.TabsList, { className: "grid w-full grid-cols-6", children: [(0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "overview", children: "Overview" }), (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "tools", children: "Tools" }), (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "users", children: "Users" }), (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "analytics", children: "Analytics" }), (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "content", children: "Content" }), (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "settings", children: "Settings" })] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, { value: "content", className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold", children: "Content Management" }), (0, jsx_runtime_1.jsxs)(dialog_1.Dialog, { open: isAddArticleOpen, onOpenChange: setIsAddArticleOpen, children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4 mr-2" }), "New Article"] }) }), (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: "max-w-2xl", children: [(0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, { children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: "Create New Article" }), (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, { children: "Write a new blog post or article" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-4 py-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-4 items-center gap-4", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "articleTitle", className: "text-right", children: "Title" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "articleTitle", className: "col-span-3" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-4 items-center gap-4", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "articleCategory", className: "text-right", children: "Category" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "col-span-3", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "Select category" }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "news", children: "News" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "tutorials", children: "Tutorials" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "reviews", children: "Reviews" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "guides", children: "Guides" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-4 items-start gap-4", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "articleContent", className: "text-right mt-2", children: "Content" }), (0, jsx_runtime_1.jsx)(textarea_1.Textarea, { id: "articleContent", className: "col-span-3 min-h-[200px]" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-4 items-center gap-4", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "articleStatus", className: "text-right", children: "Status" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "col-span-3", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "Select status" }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "draft", children: "Draft" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "published", children: "Published" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "scheduled", children: "Scheduled" })] })] })] })] }), (0, jsx_runtime_1.jsxs)(dialog_1.DialogFooter, { children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", children: "Save Draft" }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", children: "Publish" })] })] })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "Articles & Blog Posts" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Manage your blog content and news articles" })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)(table_1.Table, { children: [(0, jsx_runtime_1.jsx)(table_1.TableHeader, { children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Title" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Status" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Author" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Date" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Views" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Actions" })] }) }), (0, jsx_runtime_1.jsx)(table_1.TableBody, { children: articles.map(function (article) { return ((0, jsx_runtime_1.jsxs)(table_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(table_1.TableCell, { className: "font-medium", children: article.title }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: article.status === "published"
                                                                            ? "default"
                                                                            : "secondary", children: article.status }) }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: article.author }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: article.date }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: article.views.toLocaleString() }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { className: "h-4 w-4" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "h-4 w-4" }) })] }) })] }, article.id)); }) })] }) })] })] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, { value: "settings", className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold", children: "Settings" }), (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-4 md:grid-cols-2", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "Security Settings" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Manage admin access and security" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "two-factor", children: "Two-Factor Authentication" }), (0, jsx_runtime_1.jsx)(switch_1.Switch, { id: "two-factor" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "login-alerts", children: "Login Alerts" }), (0, jsx_runtime_1.jsx)(switch_1.Switch, { id: "login-alerts", defaultChecked: true })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", className: "w-full bg-transparent", children: "Change Password" })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "Site Configuration" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "General site settings" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "site-name", children: "Site Name" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "site-name", defaultValue: "Tool Directory" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "site-description", children: "Site Description" }), (0, jsx_runtime_1.jsx)(textarea_1.Textarea, { id: "site-description", defaultValue: "The best directory for digital tools" })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { className: "w-full", children: "Save Changes" })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "Analytics Integration" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Connect external analytics services" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "ga-id", children: "Google Analytics ID" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "ga-id", placeholder: "GA-XXXXXXXXX" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "gtm-id", children: "Google Tag Manager ID" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "gtm-id", placeholder: "GTM-XXXXXXX" })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { className: "w-full", children: "Connect Analytics" })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "Email Settings" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Configure email notifications" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "user-notifications", children: "User Registration Notifications" }), (0, jsx_runtime_1.jsx)(switch_1.Switch, { id: "user-notifications", defaultChecked: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "payment-notifications", children: "Payment Notifications" }), (0, jsx_runtime_1.jsx)(switch_1.Switch, { id: "payment-notifications", defaultChecked: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "weekly-reports", children: "Weekly Reports" }), (0, jsx_runtime_1.jsx)(switch_1.Switch, { id: "weekly-reports" })] })] })] })] })] })] }) })] }));
}
