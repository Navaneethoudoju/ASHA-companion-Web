import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Heart, Baby, Calendar, Plus, ClipboardList, Pill, FileText, CheckCircle } from "lucide-react";
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

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/asha/add-patient">
                <Button className="w-full h-20 flex flex-col items-center justify-center gap-2">
                  <Plus className="h-6 w-6" />
                  <span className="text-sm">Add Patient</span>
                </Button>
              </Link>
              <Link to="/asha/households">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2">
                  <ClipboardList className="h-6 w-6" />
                  <span className="text-sm">Visit Log</span>
                </Button>
              </Link>
              <Link to="/asha/medicine">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2">
                  <Pill className="h-6 w-6" />
                  <span className="text-sm">Medicine</span>
                </Button>
              </Link>
              <Link to="/asha/reports">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2">
                  <FileText className="h-6 w-6" />
                  <span className="text-sm">Reports</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start justify-between border-b pb-3">
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-pink-500 mt-0.5" />
                  <div>
                    <p className="font-medium">ANC Visit - Geeta Devi</p>
                    <p className="text-sm text-muted-foreground">4th ANC checkup due today</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Mark Done
                </Button>
              </div>
              <div className="flex items-start justify-between border-b pb-3">
                <div className="flex items-start gap-3">
                  <Baby className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Immunization - Raju Kumar</p>
                    <p className="text-sm text-muted-foreground">BCG vaccine due</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Mark Done
                </Button>
              </div>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Household Visit - Ram Kumar</p>
                    <p className="text-sm text-muted-foreground">Routine health checkup</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Mark Done
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        

        <Card>
          <CardHeader>
            <CardTitle>Health Tips & Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Vaccination Drive Next Week</p>
                  <p className="text-xs text-muted-foreground">Ensure all children 0-5 years are registered for immunization</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <div className="h-2 w-2 rounded-full bg-green-500 mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Nutritional Support Program</p>
                  <p className="text-xs text-muted-foreground">Distribute IFA tablets to pregnant women during ANC visits</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                <div className="h-2 w-2 rounded-full bg-yellow-500 mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Monsoon Health Advisory</p>
                  <p className="text-xs text-muted-foreground">Educate families about waterborne diseases and hygiene practices</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ASHADashboard;
