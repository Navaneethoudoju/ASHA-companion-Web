import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Send } from "lucide-react";
import { toast } from "sonner";
import { mockHouseholds, mockPregnancies, mockChildren } from "@/lib/mockData";

const Reports = () => {
  return (
    <Layout role="ASHA">
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Monthly Reports</h1>
          <p className="text-muted-foreground">Generate and submit monthly activity reports</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Household Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Total households visited this month</p>
              <Button className="w-full" variant="outline" onClick={() => toast.success("Downloading household report")}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Pregnancy Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">ANC visits and pregnancy tracking</p>
              <Button className="w-full" variant="outline" onClick={() => toast.success("Downloading pregnancy report")}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Immunization Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Child immunization tracking</p>
              <Button className="w-full" variant="outline" onClick={() => toast.success("Downloading immunization report")}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submit Monthly Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Report Summary - November 2024</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Total Households Visited: {mockHouseholds.length}</li>
                <li>• Pregnant Women Registered: {mockPregnancies.length}</li>
                <li>• Children Immunized: {mockChildren.length}</li>
                <li>• Medicine Distributed: 15 items</li>
              </ul>
            </div>
            <Button className="w-full" onClick={() => toast.success("Monthly report submitted successfully")}>
              <Send className="mr-2 h-4 w-4" />
              Submit Report to ANM
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;
