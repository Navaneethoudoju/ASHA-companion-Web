import React, { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye } from "lucide-react";
import { mockChildren } from "@/lib/mockData";
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
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const ChildHealth = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [dob, setDob] = useState("");
  const [sex, setSex] = useState("Male");
  const [birthWeight, setBirthWeight] = useState<number | "">("");
  const [currentWeight, setCurrentWeight] = useState<number | "">("");
  const [bcgGiven, setBcgGiven] = useState(false);
  const [opv1, setOpv1] = useState(false);
  const [opv2, setOpv2] = useState(false);
  const [opv3, setOpv3] = useState(false);
  const [dpt1, setDpt1] = useState(false);
  const [dpt2, setDpt2] = useState(false);
  const [dpt3, setDpt3] = useState(false);
  const [measlesGiven, setMeaslesGiven] = useState(false);
  const [illnessNotes, setIllnessNotes] = useState("");

  const ageYears = useMemo(() => {
    if (!dob) return "";
    const b = new Date(dob);
    if (isNaN(b.getTime())) return "";
    const ref = new Date();
    let age = ref.getFullYear() - b.getFullYear();
    const m = ref.getMonth() - b.getMonth();
    if (m < 0 || (m === 0 && ref.getDate() < b.getDate())) age--;
    return age >= 0 ? String(age) : "";
  }, [dob]);

  const resetForm = () => {
    setName("");
    setFatherName("");
    setDob("");
    setSex("Male");
    setBirthWeight("");
    setCurrentWeight("");
    setBcgGiven(false);
    setOpv1(false);
    setOpv2(false);
    setOpv3(false);
    setDpt1(false);
    setDpt2(false);
    setDpt3(false);
    setMeaslesGiven(false);
    setIllnessNotes("");
  };

  const handleSave = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!name) return toast.error("Child name is required");
    if (!dob) return toast.error("Date of birth is required");
    const nextId = mockChildren.length ? Math.max(...mockChildren.map((c) => c.id)) + 1 : 1;
    const vaccines: string[] = [];
    if (bcgGiven) vaccines.push("BCG");
    if (opv1) vaccines.push("OPV1");
    if (opv2) vaccines.push("OPV2");
    if (opv3) vaccines.push("OPV3");
    if (dpt1) vaccines.push("DPT1");
    if (dpt2) vaccines.push("DPT2");
    if (dpt3) vaccines.push("DPT3");
    if (measlesGiven) vaccines.push("Measles");

    const newChild: any = {
      id: nextId,
      name,
      fatherName,
      dob,
      age: ageYears === "" ? null : Number(ageYears),
      sex,
      birthWeight: birthWeight === "" ? null : Number(birthWeight),
      weight: currentWeight === "" ? null : Number(currentWeight),
      vaccinesGiven: vaccines,
      immunizationStatus: vaccines.length ? vaccines.join(", ") : "Pending",
      illnessNotes,
    };

    mockChildren.push(newChild);
    toast.success("Child record saved");
    setOpen(false);
    resetForm();
  };

  return (
    <Layout role="ASHA">
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Child Health Management</h1>
            <p className="text-muted-foreground">Track immunization and growth monitoring</p>
          </div>

          <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Child
              </Button>
            </DialogTrigger>
            <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Child</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => handleSave(e)} className="space-y-4 max-h-[70vh] overflow-auto pr-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label>Child Name</Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Child name" />
                      </div>
                      <div>
                        <Label>Father Name</Label>
                        <Input value={fatherName} onChange={(e) => setFatherName(e.target.value)} placeholder="Father name" />
                      </div>
                      <div>
                        <Label>Date of Birth</Label>
                        <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                      </div>
                      <div>
                        <Label>Age (years)</Label>
                        <Input readOnly value={ageYears} />
                      </div>
                      <div>
                        <Label>Sex</Label>
                        <div className="flex items-center gap-4 mt-2">
                          <label className="flex items-center gap-2">
                            <RadioGroup value={sex} onValueChange={(v) => setSex(v)}>
                              <RadioGroupItem value="Male" id="child-sex-m" />
                            </RadioGroup>
                            <span>Male</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <RadioGroup value={sex} onValueChange={(v) => setSex(v)}>
                              <RadioGroupItem value="Female" id="child-sex-f" />
                            </RadioGroup>
                            <span>Female</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <Label>Birth Weight (kg)</Label>
                        <Input type="number" step="0.1" value={birthWeight as any} onChange={(e) => setBirthWeight(e.target.value === "" ? "" : Number(e.target.value))} />
                      </div>
                      <div>
                        <Label>Current Weight (kg)</Label>
                        <Input type="number" step="0.1" value={currentWeight as any} onChange={(e) => setCurrentWeight(e.target.value === "" ? "" : Number(e.target.value))} />
                      </div>
                    </div>
                    <div className="border-t pt-3">
                      <h3 className="font-semibold">Given Doses / Vaccinations</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" checked={bcgGiven} onChange={(e) => setBcgGiven(e.target.checked)} />
                          <span>BCG</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" checked={opv1} onChange={(e) => setOpv1(e.target.checked)} />
                          <span>OPV1</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" checked={opv2} onChange={(e) => setOpv2(e.target.checked)} />
                          <span>OPV2</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" checked={opv3} onChange={(e) => setOpv3(e.target.checked)} />
                          <span>OPV3</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" checked={dpt1} onChange={(e) => setDpt1(e.target.checked)} />
                          <span>DPT1</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" checked={dpt2} onChange={(e) => setDpt2(e.target.checked)} />
                          <span>DPT2</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" checked={dpt3} onChange={(e) => setDpt3(e.target.checked)} />
                          <span>DPT3</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" checked={measlesGiven} onChange={(e) => setMeaslesGiven(e.target.checked)} />
                          <span>Measles</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <Label>Illness Notes</Label>
                      <Textarea value={illnessNotes} onChange={(e) => setIllnessNotes(e.target.value)} />
                    </div>
                    <DialogFooter>
                      <div className="flex w-full justify-end gap-2">
                        <Button variant="outline" type="button" onClick={() => { setOpen(false); resetForm(); }}>Cancel</Button>
                        <Button type="submit">Save Child</Button>
                      </div>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
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
