import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import { mockHouseholds } from "@/lib/mockData";
import { toast } from "sonner";

const Households = () => {
  const handleAdd = () => {
    toast.success("Add household dialog would open here");
  };

  const handleView = (id: number) => {
    toast.info(`Viewing household ${id}`);
  };

  const handleEdit = (id: number) => {
    toast.info(`Editing household ${id}`);
  };

  const handleDelete = (id: number) => {
    toast.success(`Household ${id} deleted`);
  };

  return (
    <Layout role="ASHA">
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Household Management</h1>
            <p className="text-muted-foreground">Manage household records</p>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Household
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Households</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Head of Family</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockHouseholds.map((household) => (
                  <TableRow key={household.id}>
                    <TableCell>{household.id}</TableCell>
                    <TableCell className="font-medium">{household.headName}</TableCell>
                    <TableCell>{household.address}</TableCell>
                    <TableCell>{household.membersCount}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleView(household.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleEdit(household.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(household.id)}>
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

export default Households;
