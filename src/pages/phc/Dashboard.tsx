import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileCheck, TrendingUp, AlertCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockASHAWorkers, mockPregnancies, mockChildren } from "@/lib/mockData";
import { toast } from "sonner";

const PHCDashboard = () => {
  const handleDownloadReport = () => {
    toast.success("Generating PDF report...");
  };

  return (
    <Layout role="PHC">
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">PHC Staff Dashboard</h1>
            <p className="text-muted-foreground">Supervise and approve ASHA worker submissions</p>
          </div>
          <Button onClick={handleDownloadReport}>
            <Download className="h-4 w-4 mr-2" />
            Download Monthly Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total ASHA Workers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockASHAWorkers.length}</div>
              <p className="text-xs text-muted-foreground">Active workers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Reports awaiting review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Overall Coverage</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">Health service reach</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Critical Cases</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Requiring attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>ANM Area Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">ANM Rekha Kumari - Sadar Block</p>
                      <p className="text-sm text-muted-foreground">2 ASHA workers assigned</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Good</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="text-center p-2 bg-pink-50 rounded">
                      <p className="text-lg font-bold text-pink-600">{mockPregnancies.length}</p>
                      <p className="text-xs text-muted-foreground">ANC Cases</p>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <p className="text-lg font-bold text-blue-600">{mockChildren.length}</p>
                      <p className="text-xs text-muted-foreground">Children</p>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <p className="text-lg font-bold text-green-600">28</p>
                      <p className="text-xs text-muted-foreground">Visits</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">ANM Sunita Devi - North Block</p>
                      <p className="text-sm text-muted-foreground">3 ASHA workers assigned</p>
                    </div>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Needs Attention</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="text-center p-2 bg-pink-50 rounded">
                      <p className="text-lg font-bold text-pink-600">8</p>
                      <p className="text-xs text-muted-foreground">ANC Cases</p>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <p className="text-lg font-bold text-blue-600">15</p>
                      <p className="text-xs text-muted-foreground">Children</p>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <p className="text-lg font-bold text-green-600">18</p>
                      <p className="text-xs text-muted-foreground">Visits</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Health Trends (This Month)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Immunization Coverage</span>
                    <span className="text-sm">85%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">ANC Visit Compliance</span>
                    <span className="text-sm">92%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-pink-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Disease Reporting</span>
                    <span className="text-sm">78%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Monthly Report Submission</span>
                    <span className="text-sm">60%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pending Report Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div>
                  <p className="font-medium">Sita Devi - November 2024</p>
                  <p className="text-sm text-muted-foreground">Submitted: 2024-11-08 • Village: Rampur</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => toast.info("Viewing report details")}>
                    View
                  </Button>
                  <Button size="sm" onClick={() => toast.success("Report approved")}>
                    Approve
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => toast.error("Report rejected")}>
                    Reject
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div>
                  <p className="font-medium">Rekha Kumari - November 2024</p>
                  <p className="text-sm text-muted-foreground">Submitted: 2024-11-07 • Village: Shyampur</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => toast.info("Viewing report details")}>
                    View
                  </Button>
                  <Button size="sm" onClick={() => toast.success("Report approved")}>
                    Approve
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => toast.error("Report rejected")}>
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PHCDashboard;
