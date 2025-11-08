import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Eye } from "lucide-react";
import { toast } from "sonner";

const mockReports = [
  { id: 1, ashaName: "Sita Devi", month: "November 2024", submittedOn: "2024-11-08", status: "Pending" },
  { id: 2, ashaName: "Rekha Kumari", month: "October 2024", submittedOn: "2024-10-31", status: "Approved" }
];

const ReportsReview = () => {
  return (
    <Layout role="ANM">
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Reports Review</h1>
          <p className="text-muted-foreground">Review and approve ASHA monthly reports</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submitted Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between border p-4 rounded-lg">
                  <div>
                    <p className="font-medium">{report.ashaName}</p>
                    <p className="text-sm text-muted-foreground">
                      {report.month} • Submitted: {report.submittedOn}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={report.status === "Approved" ? "secondary" : "outline"}>
                      {report.status}
                    </Badge>
                    {report.status === "Pending" ? (
                      <>
                        <Button size="sm" variant="outline" onClick={() => toast.info("Viewing report details")}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" onClick={() => toast.success("Report approved")}>
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => toast.error("Report rejected")}>
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => toast.info("Viewing approved report")}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
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

export default ReportsReview;
