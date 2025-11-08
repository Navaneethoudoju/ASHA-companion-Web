import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit } from "lucide-react";
import { mockMedicine } from "@/lib/mockData";
import { toast } from "sonner";

const Medicine = () => {
  return (
    <Layout role="ASHA">
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Medicine Stock</h1>
            <p className="text-muted-foreground">Manage medicine inventory</p>
          </div>
          <Button onClick={() => toast.success("Add medicine dialog would open")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Medicine
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medicine Name</TableHead>
                  <TableHead>Available Quantity</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockMedicine.map((med) => {
                  const isLowStock = med.availableQty < 50;
                  return (
                    <TableRow key={med.id}>
                      <TableCell className="font-medium">{med.name}</TableCell>
                      <TableCell>{med.availableQty}</TableCell>
                      <TableCell>{med.expiryDate}</TableCell>
                      <TableCell>
                        <Badge variant={isLowStock ? "destructive" : "secondary"}>
                          {isLowStock ? "Low Stock" : "In Stock"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => toast.info(`Editing ${med.name}`)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Medicine;
