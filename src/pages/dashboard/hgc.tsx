"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
  BarChart3,
  Users,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  DollarSign,
  TrendingUp,
  FileText,
  Shield,
  Eye,
  Search,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [tools, setTools] = useState([
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
  ]);

  const [users, setUsers] = useState([
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
  ]);

  const [articles, setArticles] = useState([
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
  ]);

  const [isAddToolOpen, setIsAddToolOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isAddArticleOpen, setIsAddArticleOpen] = useState(false);

  const stats = {
    totalUsers: 1247,
    premiumUsers: 342,
    totalTools: 156,
    monthlyRevenue: 12450,
    pageViews: 45230,
    conversionRate: 3.2,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6" />
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View Site
            </Button>
            <Button variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4 p-8 pt-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

         

         

          
          

          <TabsContent value="content" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Content Management</h2>
              <Dialog
                open={isAddArticleOpen}
                onOpenChange={setIsAddArticleOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Article
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Article</DialogTitle>
                    <DialogDescription>
                      Write a new blog post or article
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="articleTitle" className="text-right">
                        Title
                      </Label>
                      <Input id="articleTitle" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="articleCategory" className="text-right">
                        Category
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="news">News</SelectItem>
                          <SelectItem value="tutorials">Tutorials</SelectItem>
                          <SelectItem value="reviews">Reviews</SelectItem>
                          <SelectItem value="guides">Guides</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label
                        htmlFor="articleContent"
                        className="text-right mt-2"
                      >
                        Content
                      </Label>
                      <Textarea
                        id="articleContent"
                        className="col-span-3 min-h-[200px]"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="articleStatus" className="text-right">
                        Status
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Save Draft</Button>
                    <Button type="submit">Publish</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Articles & Blog Posts</CardTitle>
                <CardDescription>
                  Manage your blog content and news articles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {articles.map((article) => (
                      <TableRow key={article.id}>
                        <TableCell className="font-medium">
                          {article.title}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              article.status === "published"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {article.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{article.author}</TableCell>
                        <TableCell>{article.date}</TableCell>
                        <TableCell>{article.views.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <h2 className="text-2xl font-bold">Settings</h2>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage admin access and security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="two-factor">
                      Two-Factor Authentication
                    </Label>
                    <Switch id="two-factor" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-alerts">Login Alerts</Label>
                    <Switch id="login-alerts" defaultChecked />
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Change Password
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Site Configuration</CardTitle>
                  <CardDescription>General site settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input id="site-name" defaultValue="Tool Directory" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-description">Site Description</Label>
                    <Textarea
                      id="site-description"
                      defaultValue="The best directory for digital tools"
                    />
                  </div>
                  <Button className="w-full">Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analytics Integration</CardTitle>
                  <CardDescription>
                    Connect external analytics services
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ga-id">Google Analytics ID</Label>
                    <Input id="ga-id" placeholder="GA-XXXXXXXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gtm-id">Google Tag Manager ID</Label>
                    <Input id="gtm-id" placeholder="GTM-XXXXXXX" />
                  </div>
                  <Button className="w-full">Connect Analytics</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Email Settings</CardTitle>
                  <CardDescription>
                    Configure email notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="user-notifications">
                      User Registration Notifications
                    </Label>
                    <Switch id="user-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="payment-notifications">
                      Payment Notifications
                    </Label>
                    <Switch id="payment-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="weekly-reports">Weekly Reports</Label>
                    <Switch id="weekly-reports" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
