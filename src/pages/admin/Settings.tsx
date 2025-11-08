import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  return (
    <Layout role="ADMIN">
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-muted-foreground">Configure system preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system-name">System Name</Label>
                <Input id="system-name" defaultValue="ASHA Companion" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" defaultValue="admin@asha.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Contact Phone</Label>
                <Input id="contact-phone" defaultValue="1800-XXX-XXXX" />
              </div>
              <Button onClick={() => toast.success("Settings saved successfully")}>
                Save Settings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Database Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Backup Database</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Create a backup of the entire database
                </p>
                <Button variant="outline" onClick={() => toast.success("Database backup downloaded")}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Backup
                </Button>
              </div>
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">System Statistics</h3>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between">
                    <span className="text-muted-foreground">Database Size:</span>
                    <span className="font-medium">2.4 MB</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-muted-foreground">Last Backup:</span>
                    <span className="font-medium">2024-11-07</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-muted-foreground">Total Records:</span>
                    <span className="font-medium">158</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
