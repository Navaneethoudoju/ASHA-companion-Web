import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye } from "lucide-react";
import { mockASHAWorkers } from "@/lib/mockData";
import { toast } from "sonner";

const ASHAWorkers = () => {
  return (
    <Layout role="ANM">
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">ASHA Workers</h1>
          <p className="text-muted-foreground">Monitor field workers and their performance</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All ASHA Workers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Village</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Total Households</TableHead>
                  <TableHead>Pending Visits</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockASHAWorkers.map((asha) => (
                  <TableRow key={asha.id}>
                    <TableCell className="font-medium">{asha.name}</TableCell>
                    <TableCell>{asha.village}</TableCell>
                    <TableCell>{asha.phone}</TableCell>
                    <TableCell>{asha.totalHouseholds}</TableCell>
                    <TableCell>{asha.pendingVisits}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => toast.info(`Viewing details of ${asha.name}`)}>
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

export default ASHAWorkers;
