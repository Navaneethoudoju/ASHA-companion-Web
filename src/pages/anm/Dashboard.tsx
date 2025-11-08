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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>ASHA Workers Overview</CardTitle>
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

          <Card>
            <CardHeader>
              <CardTitle>Health Coverage Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Maternal Health Coverage</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-pink-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div className="border-b pb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Immunization Coverage</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="pb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Disease Surveillance</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ANMDashboard;
