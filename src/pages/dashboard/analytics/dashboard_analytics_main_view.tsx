import ContainerLayout from '@/components/layout/container_layout';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DashboardAnalyticsMainView = () => {
  return (
    <ContainerLayout className="space-y-4 flex-col py-8">
      <h2 className="text-2xl text-primary-foreground font-bold">
        Analytics & Statistics
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Page Views</span>
                <span className="font-bold text-secondary-foreground">45,230</span>
              </div>
              <div className="flex justify-between">
                <span>Unique Visitors</span>
                <span className="font-bold text-secondary-foreground">12,450</span>
              </div>
              <div className="flex justify-between">
                <span>Bounce Rate</span>
                <span className="font-bold text-secondary-foreground">32.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Conversion Rate</span>
                <span className="font-bold text-secondary-foreground">3.2%</span>
              </div>
              <div className="flex justify-between">
                <span>Premium Signups</span>
                <span className="font-bold text-secondary-foreground">89</span>
              </div>
              <div className="flex justify-between">
                <span>Affiliate Clicks</span>
                <span className="font-bold text-secondary-foreground">1,234</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Monthly Revenue</span>
                <span className="font-bold text-secondary-foreground">$12,450</span>
              </div>
              <div className="flex justify-between">
                <span>Affiliate Earnings</span>
                <span className="font-bold text-secondary-foreground">$3,200</span>
              </div>
              <div className="flex justify-between">
                <span>Premium Subscriptions</span>
                <span className="font-bold text-secondary-foreground">$9,250</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Google Analytics Integration</CardTitle>
          <CardDescription>
            Connect your Google Analytics account for detailed insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Button>Connect Google Analytics</Button>
            <Button variant="outline">View Full Report</Button>
          </div>
        </CardContent>
      </Card>
    </ContainerLayout>
  );
}

export default DashboardAnalyticsMainView