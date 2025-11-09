import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import { mockHouseholds, mockUser } from "@/lib/mockData";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Households = () => {
  const [open, setOpen] = useState(false);
  const [headName, setHeadName] = useState("");
  const [membersCount, setMembersCount] = useState<number | "">("");
  const [address, setAddress] = useState("");
  const [waterSource, setWaterSource] = useState("Tap");
  const [sanitationType, setSanitationType] = useState("Toilet");
  const [economicStatus, setEconomicStatus] = useState<"BPL" | "APL">("BPL");

  // Linked ASHA ID: prefer sessionStorage, fallback to mockUser.id
  const linkedAshaId = typeof window !== "undefined" && sessionStorage.getItem("ashaId")
    ? Number(sessionStorage.getItem("ashaId") )
    : mockUser?.id;

  const handleView = (id: number) => {
    toast.info(`Viewing household ${id}`);
  };

  const handleEdit = (id: number) => {
    toast.info(`Editing household ${id}`);
  };

  const handleDelete = (id: number) => {
    const idx = mockHouseholds.findIndex(h => h.id === id);
    if (idx !== -1) {
      mockHouseholds.splice(idx, 1);
      toast.success(`Household ${id} deleted`);
    }
  };

  const resetForm = () => {
    setHeadName("");
    setMembersCount("");
    setAddress("");
    setWaterSource("Tap");
    setSanitationType("Toilet");
    setEconomicStatus("BPL");
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!headName.trim()) return toast.error("Head of Household is required");
    if (!membersCount || Number(membersCount) <= 0) return toast.error("Total Members must be a positive number");

    const nextId = mockHouseholds.length ? Math.max(...mockHouseholds.map(h => h.id)) + 1 : 1;
    const newHousehold = {
      id: nextId,
      villageId: mockUser?.villageId ?? null,
      headName: headName.trim(),
      address: address.trim(),
      membersCount: Number(membersCount),
      waterSource,
      sanitationType,
      economicStatus,
      linkedAshaId,
    } as any;

    // Append to mock data (in-memory)
    mockHouseholds.push(newHousehold);
    toast.success("Household added");
    setOpen(false);
    resetForm();
  };

  return (
    <Layout role="ASHA">
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Household Management</h1>
            <p className="text-muted-foreground">Manage household records</p>
          </div>

          <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) resetForm(); }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Household
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Household</DialogTitle>
              </DialogHeader>

              <form onSubmit={(e) => handleSubmit(e)} className="grid gap-4">
                <div>
                  <Label htmlFor="headName">Head of Household</Label>
                  <Input id="headName" value={headName} onChange={(e) => setHeadName(e.target.value)} />
                </div>

                <div>
                  <Label htmlFor="membersCount">Total Members</Label>
                  <Input id="membersCount" type="number" min={1} value={membersCount as any} onChange={(e) => setMembersCount(e.target.value === "" ? "" : Number(e.target.value))} />
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>

                <div>
                  <Label htmlFor="waterSource">Water Source</Label>
                  <Select value={waterSource} onValueChange={(val) => setWaterSource(val)}>
                    <SelectTrigger id="waterSource">
                      <SelectValue placeholder="Select water source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tap">Tap</SelectItem>
                      <SelectItem value="Well">Well</SelectItem>
                      <SelectItem value="Handpump">Handpump</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sanitationType">Sanitation Type</Label>
                  <Select value={sanitationType} onValueChange={(val) => setSanitationType(val)}>
                    <SelectTrigger id="sanitationType">
                      <SelectValue placeholder="Select sanitation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Toilet">Toilet</SelectItem>
                      <SelectItem value="Open Defecation">Open Defecation</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Economic Status</Label>
                  <RadioGroup value={economicStatus} onValueChange={(val) => setEconomicStatus(val as "BPL" | "APL")}
                    className="flex gap-4 mt-2 items-center"
                  >
                    <label className="flex items-center gap-2">
                      <RadioGroupItem value="BPL" id="bpl" />
                      <span>BPL</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <RadioGroupItem value="APL" id="apl" />
                      <span>APL</span>
                    </label>
                  </RadioGroup>
                </div>

                {/* hidden linked ASHA ID (taken from session or mockUser) */}
                <input type="hidden" name="linkedAshaId" value={linkedAshaId} />

                <DialogFooter>
                  <div className="flex w-full justify-end gap-2">
                    <Button variant="outline" onClick={() => setOpen(false)} type="button">Cancel</Button>
                    <Button type="submit">Add</Button>
                  </div>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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
