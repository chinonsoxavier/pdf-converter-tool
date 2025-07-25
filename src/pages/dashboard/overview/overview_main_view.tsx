import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, DollarSign, FileText, Plus, TrendingUp, Users } from "lucide-react";

const DashboardOverviewMainView = () => {

  const stats = {
    totalUsers: 1247,
    premiumUsers: 342,
    totalTools: 156,
    monthlyRevenue: 12450,
    pageViews: 45230,
    conversionRate: 3.2,
  };

    return (
        <div className="flex-wrap h-full overflow-y-scroll fle items-center justify-center flex-col px-4 max-width mx-auto space-y-4 py-10">
          <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(230px,1fr))] w-full">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.totalUsers.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Premium Users
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.premiumUsers}</div>
                <p className="text-xs text-muted-foreground">
                  +8% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Revenue
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${stats.monthlyRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  +15% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Page Views
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.pageViews.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  +22% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid w-full gap-4 grid-cols-[repeat(auto-fit,minmax(230px,1fr))]">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        New premium user registered
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2 minutes ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Tool "AI Content Generator" updated
                      </p>
                      <p className="text-xs text-muted-foreground">
                        15 minutes ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        New article published
                      </p>
                      <p className="text-xs text-muted-foreground">
                        1 hour ago
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Tool
                </Button>
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Create Article
                </Button>
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
    );
}

export default DashboardOverviewMainView