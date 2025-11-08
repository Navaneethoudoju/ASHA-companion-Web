import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye } from "lucide-react";
import { mockChildren } from "@/lib/mockData";
import { toast } from "sonner";

const ChildHealth = () => {
  return (
    <Layout role="ASHA">
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Child Health Management</h1>
            <p className="text-muted-foreground">Track immunization and growth monitoring</p>
          </div>
          <Button onClick={() => toast.success("Add child dialog would open")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Child
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Children (0-5 years)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Date of Birth</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Immunization Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockChildren.map((child) => (
                  <TableRow key={child.id}>
                    <TableCell className="font-medium">{child.name}</TableCell>
                    <TableCell>{child.dob}</TableCell>
                    <TableCell>{child.weight}</TableCell>
                    <TableCell>
                      <Badge variant={child.immunizationStatus.includes("Pending") ? "outline" : "secondary"}>
                        {child.immunizationStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => toast.info(`Viewing ${child.name}`)}>
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

export default ChildHealth;
