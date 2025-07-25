import ContainerLayout from "@/components/layout/container_layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const DashboardSettingsMainView = () => {
  return (
    <ContainerLayout className="space-y-4 flex-col py-8">
      <h2 className="text-2xl font-bold text-primary-foreground">Settings</h2>

      <div className="grid gap-4 large:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage admin access and security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
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
            <CardDescription>Configure email notifications</CardDescription>
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
    </ContainerLayout>
  );
}

export default DashboardSettingsMainView