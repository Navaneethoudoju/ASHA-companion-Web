import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit } from "lucide-react";
import { mockMedicine } from "@/lib/mockData";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const Medicine = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("Tablet");
  const [batchNumber, setBatchNumber] = useState("");
  const [availableQty, setAvailableQty] = useState<number | "">("");
  const [unitType, setUnitType] = useState("Strips");
  const [receivedDate, setReceivedDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const resetForm = () => {
    setName("");
    setType("Tablet");
    setBatchNumber("");
    setAvailableQty("");
    setUnitType("Strips");
    setReceivedDate("");
    setExpiryDate("");
  };

  const handleSave = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!name) return toast.error("Medicine Name is required");
    if (availableQty === "" || availableQty === null) return toast.error("Quantity is required");
    if (!expiryDate) return toast.error("Expiry Date is required");

    const nextId = mockMedicine.length ? Math.max(...mockMedicine.map(m => m.id)) + 1 : 1;
    const newMed: any = {
      id: nextId,
      name,
      type,
      batchNumber,
      availableQty: Number(availableQty),
      unitType,
      receivedDate: receivedDate || null,
      expiryDate,
    };

    mockMedicine.push(newMed);
    toast.success("Medicine saved");
    setOpen(false);
    resetForm();
    // try redirecting to dashboard path
    try { window.location.href = '/medicine/dashboard'; } catch { /* ignore */ }
  };

  return (
    <Layout role="ASHA">
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Medicine Stock</h1>
            <p className="text-muted-foreground">Manage medicine inventory</p>
          </div>
          <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Medicine
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Medicine</DialogTitle>
              </DialogHeader>
              <form onSubmit={(e) => handleSave(e)} className="space-y-4 max-h-[70vh] overflow-auto pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Medicine Name</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Paracetamol" />
                  </div>
                  <div>
                    <Label>Medicine Type</Label>
                    <Select value={type} onValueChange={(v) => setType(v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tablet">Tablet</SelectItem>
                        <SelectItem value="Syrup">Syrup</SelectItem>
                        <SelectItem value="Capsule">Capsule</SelectItem>
                        <SelectItem value="Ointment">Ointment</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Batch Number</Label>
                    <Input value={batchNumber} onChange={(e) => setBatchNumber(e.target.value)} />
                  </div>
                  <div>
                    <Label>Quantity Available</Label>
                    <Input type="number" min={0} value={availableQty as any} onChange={(e) => setAvailableQty(e.target.value === "" ? "" : Number(e.target.value))} />
                  </div>
                  <div>
                    <Label>Unit Type</Label>
                    <Select value={unitType} onValueChange={(v) => setUnitType(v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Strips">Strips</SelectItem>
                        <SelectItem value="Bottles">Bottles</SelectItem>
                        <SelectItem value="Packets">Packets</SelectItem>
                        <SelectItem value="Boxes">Boxes</SelectItem>
                        <SelectItem value="Tablets">Tablets</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Received Date</Label>
                    <Input type="date" value={receivedDate} onChange={(e) => setReceivedDate(e.target.value)} />
                  </div>
                  <div>
                    <Label>Expiry Date</Label>
                    <Input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                  </div>
                </div>

                <DialogFooter>
                  <div className="flex w-full justify-end gap-2">
                    <Button variant="outline" type="button" onClick={() => { setOpen(false); resetForm(); }}>Cancel</Button>
                    <Button type="submit">Save Medicine</Button>
                  </div>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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
