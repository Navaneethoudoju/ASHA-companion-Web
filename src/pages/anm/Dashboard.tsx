import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Heart, CheckCircle, AlertCircle } from "lucide-react";
import { mockASHAWorkers, mockPregnancies, mockChildren } from "@/lib/mockData";

const ANMDashboard = () => {
  return (
    <Layout role="ANM">
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">ANM Dashboard</h1>
          <p className="text-muted-foreground">Monitor ASHA workers and village health</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">ASHA Workers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockASHAWorkers.length}</div>
              <p className="text-xs text-muted-foreground">Under supervision</p>
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
              <CardTitle className="text-sm font-medium">Immunizations Done</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockChildren.filter(c => c.immunizationStatus === "Up to date").length}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Requires review</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>ASHA Workers Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockASHAWorkers.map((asha) => (
                <div key={asha.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium">{asha.name}</p>
                    <p className="text-sm text-muted-foreground">Village: {asha.village} • Phone: {asha.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{asha.totalHouseholds} Households</p>
                    <p className="text-sm text-muted-foreground">{asha.pendingVisits} pending visits</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ANMDashboard;
