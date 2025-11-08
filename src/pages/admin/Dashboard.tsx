import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MapPin, Heart, Baby } from "lucide-react";
import { mockUsers, mockVillages, mockPregnancies, mockChildren } from "@/lib/mockData";

const AdminDashboard = () => {
  return (
    <Layout role="ADMIN">
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">System-wide overview and management</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockUsers.length}</div>
              <p className="text-xs text-muted-foreground">System users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Villages</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockVillages.length}</div>
              <p className="text-xs text-muted-foreground">Under coverage</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Pregnancies</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockPregnancies.length}</div>
              <p className="text-xs text-muted-foreground">Active cases</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Children Monitored</CardTitle>
              <Baby className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockChildren.length}</div>
              <p className="text-xs text-muted-foreground">0-5 years</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["ASHA", "ANM", "ADMIN"].map((role) => {
                  const count = mockUsers.filter(u => u.role === role).length;
                  return (
                    <div key={role} className="flex justify-between items-center">
                      <span className="text-sm">{role}</span>
                      <span className="font-medium">{count} users</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p className="text-muted-foreground">• New household registered in Rampur</p>
                <p className="text-muted-foreground">• Monthly report submitted by Sita Devi</p>
                <p className="text-muted-foreground">• Immunization completed for Raju Kumar</p>
                <p className="text-muted-foreground">• New pregnancy registered in Shyampur</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
