import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import { mockVillages } from "@/lib/mockData";
import { toast } from "sonner";

const Villages = () => {
  return (
    <Layout role="ADMIN">
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Village Management</h1>
            <p className="text-muted-foreground">Manage villages and their details</p>
          </div>
          <Button onClick={() => toast.success("Add village dialog would open")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Village
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Villages</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Village Name</TableHead>
                  <TableHead>Block</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockVillages.map((village) => (
                  <TableRow key={village.id}>
                    <TableCell className="font-medium">{village.name}</TableCell>
                    <TableCell>{village.block}</TableCell>
                    <TableCell>{village.district}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => toast.info(`Editing ${village.name}`)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => toast.success(`Village ${village.name} deleted`)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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

export default Villages;
