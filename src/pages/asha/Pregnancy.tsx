import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye } from "lucide-react";
import { mockPregnancies } from "@/lib/mockData";
import { toast } from "sonner";

const Pregnancy = () => {
  return (
    <Layout role="ASHA">
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Pregnancy Management</h1>
            <p className="text-muted-foreground">Track ANC visits and pregnancy status</p>
          </div>
          <Button onClick={() => toast.success("Add pregnancy dialog would open")}>
            <Plus className="mr-2 h-4 w-4" />
            Register Pregnancy
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pregnant Women</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>LMP Date</TableHead>
                  <TableHead>Expected Delivery</TableHead>
                  <TableHead>ANC Visits</TableHead>
                  <TableHead>Risk Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPregnancies.map((pregnancy) => (
                  <TableRow key={pregnancy.id}>
                    <TableCell className="font-medium">{pregnancy.personName}</TableCell>
                    <TableCell>{pregnancy.lmpDate}</TableCell>
                    <TableCell>{pregnancy.expectedDelivery}</TableCell>
                    <TableCell>{pregnancy.ancVisits} / 4</TableCell>
                    <TableCell>
                      <Badge variant={pregnancy.riskStatus === "High Risk" ? "destructive" : "secondary"}>
                        {pregnancy.riskStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => toast.info(`Viewing ${pregnancy.personName}`)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Pregnancy;
