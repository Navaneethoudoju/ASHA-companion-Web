import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Heart, Baby, Calendar } from "lucide-react";
import { mockHouseholds, mockPregnancies, mockChildren, mockVisits } from "@/lib/mockData";

const ASHADashboard = () => {
  return (
    <Layout role="ASHA">
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Sita Devi</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Households</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockHouseholds.length}</div>
              <p className="text-xs text-muted-foreground">Under your care</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pregnant Women</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockPregnancies.length}</div>
              <p className="text-xs text-muted-foreground">Active cases</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Children (0-5 years)</CardTitle>
              <Baby className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockChildren.length}</div>
              <p className="text-xs text-muted-foreground">Under monitoring</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Visits This Week</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockVisits.length}</div>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Visits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockVisits.map((visit) => (
                  <div key={visit.id} className="flex justify-between items-start border-b pb-3 last:border-0">
                    <div>
                      <p className="font-medium">{visit.householdName}</p>
                      <p className="text-sm text-muted-foreground">{visit.purpose}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{visit.visitDate}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Immunizations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockChildren.filter(c => c.immunizationStatus.includes("Pending")).map((child) => (
                  <div key={child.id} className="flex justify-between items-start border-b pb-3 last:border-0">
                    <div>
                      <p className="font-medium">{child.name}</p>
                      <p className="text-sm text-muted-foreground">{child.immunizationStatus}</p>
                    </div>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pending</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ASHADashboard;
