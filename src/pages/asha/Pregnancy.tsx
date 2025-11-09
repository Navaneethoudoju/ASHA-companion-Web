import React, { useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye } from "lucide-react";
import { mockPregnancies, mockUser } from "@/lib/mockData";
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

// helper: format date YYYY-MM-DD
const formatDate = (d: Date | null) => {
  if (!d) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

// add days to a date
const addDays = (d: Date, days: number) => {
  const n = new Date(d);
  n.setDate(n.getDate() + days);
  return n;
};

const Pregnancy = () => {
  const [open, setOpen] = useState(false);

  // Personal & Identification
  const [patientId, setPatientId] = useState<number | "new">("new");
  const linkedAshaId = useMemo(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("ashaId")) return Number(sessionStorage.getItem("ashaId"));
    return mockUser?.id;
  }, []);
  const [registrationDate, setRegistrationDate] = useState<string>(formatDate(new Date()));

  // Pregnancy Details
  const [lmp, setLmp] = useState<string>("");
  const [edd, setEdd] = useState<string>("");
  const [gravida, setGravida] = useState<number | "">(1);
  const [para, setPara] = useState<number | "">(0);
  const [abortions, setAbortions] = useState<number | "">(0);
  const [livingChildren, setLivingChildren] = useState<number | "">(0);

  // Antenatal Checkups
  const [anc1, setAnc1] = useState<string>("");
  const [anc2, setAnc2] = useState<string>("");
  const [anc3, setAnc3] = useState<string>("");
  const [anc4, setAnc4] = useState<string>("");
  const [hbLevel, setHbLevel] = useState<number | "">("");
  const [bp, setBp] = useState<string>("");
  const [weight, setWeight] = useState<number | "">("");
  const [complications, setComplications] = useState<string>("");

  // Immunization & Supplements
  const [tt1, setTt1] = useState<string>("");
  const [tt2, setTt2] = useState<string>("");
  const [ifaGiven, setIfaGiven] = useState<number | "">(0);
  const [calciumGiven, setCalciumGiven] = useState<number | "">(0);
  const [dewormingGiven, setDewormingGiven] = useState<string>("No");

  // Delivery Details
  const [deliveryDate, setDeliveryDate] = useState<string>("");
  const [deliveryPlace, setDeliveryPlace] = useState<string>("Home");
  const [conductedBy, setConductedBy] = useState<string>("");
  const [deliveryOutcome, setDeliveryOutcome] = useState<string>("Live Birth");
  const [birthWeight, setBirthWeight] = useState<number | "">("");
  const [babySex, setBabySex] = useState<string>("Male");

  // PNC
  const [pnc1, setPnc1] = useState<string>("");
  const [pnc2, setPnc2] = useState<string>("");
  const [pnc3, setPnc3] = useState<string>("");
  const [pncComplications, setPncComplications] = useState<string>("");

  // Scheme & Referral
  // (Scheme & Referral removed)

  // System
  const [recordStatus, setRecordStatus] = useState<string>("Active");

  // compute EDD whenever LMP changes (add 280 days)
  useEffect(() => {
    if (!lmp) return setEdd("");
    const d = new Date(lmp);
    if (isNaN(d.getTime())) return setEdd("");
    const ed = addDays(d, 280);
    setEdd(formatDate(ed));
  }, [lmp]);

  const resetForm = () => {
    setPatientId("new");
    setRegistrationDate(formatDate(new Date()));
    setLmp("");
    setEdd("");
    setGravida(1);
    setPara(0);
    setAbortions(0);
    setLivingChildren(0);
    setAnc1("");
    setAnc2("");
    setAnc3("");
    setAnc4("");
    setHbLevel("");
    setBp("");
    setWeight("");
    setComplications("");
    setTt1("");
    setTt2("");
    setIfaGiven(0);
    setCalciumGiven(0);
    setDewormingGiven("No");
    setDeliveryDate("");
    setDeliveryPlace("Home");
    setConductedBy("");
    setDeliveryOutcome("Live Birth");
    setBirthWeight("");
    setBabySex("Male");
    setPnc1("");
    setPnc2("");
    setPnc3("");
    setPncComplications("");
  // scheme & referral reset removed
    setRecordStatus("Active");
  };

  const validateRequired = () => {
    if (!lmp) return "LMP is required";
    if (!anc1) return "ANC 1 Date is required";
    if (!tt1) return "TT1 Date is required";
    return null;
  };

  const handleSave = (e?: React.FormEvent) => {
    e?.preventDefault();
    const err = validateRequired();
    if (err) return toast.error(err);

    const nextId = mockPregnancies.length ? Math.max(...mockPregnancies.map(p => p.id)) + 1 : 1;
    const newPregnancy: any = {
      id: nextId,
      patientId: patientId === "new" ? null : patientId,
      ashaId: linkedAshaId,
      registrationDate,
      lmp,
      expectedDelivery: edd,
      gravida: Number(gravida),
      para: Number(para),
      abortions: Number(abortions),
      livingChildren: Number(livingChildren),
      ancDates: { anc1, anc2, anc3, anc4 },
      hbLevel: hbLevel === "" ? null : Number(hbLevel),
      bp,
      weight: weight === "" ? null : Number(weight),
      complications,
      tt1,
      tt2,
      ifaGiven: Number(ifaGiven),
      calciumGiven: Number(calciumGiven),
      dewormingGiven: dewormingGiven === "Yes",
  // include delivery and pnc only if record is delivered
  ...(recordStatus === "Delivered" ? { delivery: { deliveryDate, deliveryPlace, conductedBy, deliveryOutcome, birthWeight: birthWeight === "" ? null : Number(birthWeight), babySex } } : {}),
  ...(recordStatus === "Delivered" ? { pnc: { pnc1, pnc2, pnc3, pncComplications } } : {}),
  // scheme & referral removed
      status: recordStatus,
      personName: patientId === "new" ? "New Woman" : `Patient ${patientId}`,
      ancVisits: [anc1, anc2, anc3, anc4].filter(Boolean).length,
  // high risk if complications provided or HB < 11
  riskStatus: (Boolean(complications && complications.trim()) || (hbLevel !== "" && Number(hbLevel) < 11)) ? "High Risk" : "Normal",
    };

    mockPregnancies.push(newPregnancy);
    toast.success("Pregnancy record saved");
    setOpen(false);
    resetForm();
  };

  return (
    <Layout role="ASHA">
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Pregnancy Management</h1>
            <p className="text-muted-foreground">Track ANC visits and pregnancy status</p>
          </div>

          <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Register Pregnancy
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Register Pregnancy</DialogTitle>
              </DialogHeader>

              <form onSubmit={(e) => handleSave(e)} className="space-y-4 max-h-[70vh] overflow-auto pr-2">
                {/* Personal & Identification */}
                <div className="border-b pb-2">
                  <h3 className="font-semibold">Personal & Identification</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                    <div>
                      <Label>Patient</Label>
                      <Select value={String(patientId)} onValueChange={(v) => setPatientId(v === "new" ? "new" : Number(v))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select patient or New" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New Woman</SelectItem>
                          {mockPregnancies.map(p => (
                            <SelectItem key={p.id} value={String(p.id)}>{p.personName}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Registration Date</Label>
                      <Input type="date" value={registrationDate} onChange={(e) => setRegistrationDate(e.target.value)} />
                    </div>

                    <div>
                      <Label>ASHA ID</Label>
                      <Input value={String(linkedAshaId ?? "")} readOnly />
                    </div>
                  </div>
                </div>

                {/* Pregnancy Details */}
                <div className="border-b pb-2">
                  <h3 className="font-semibold">Pregnancy Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                    <div>
                      <Label>LMP</Label>
                      <Input type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} />
                    </div>
                    <div>
                      <Label>EDD </Label>
                      <Input type="date" value={edd} readOnly />
                    </div>
                    <div>
                      <Label>Living Children</Label>
                      <Input type="number" min={0} value={livingChildren as any} onChange={(e) => setLivingChildren(e.target.value === "" ? "" : Number(e.target.value))} />
                    </div>
                  </div>
                </div>

                {/* Antenatal Checkups */}
                <div className="border-b pb-2">
                  <h3 className="font-semibold">Antenatal Checkups</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                    <div>
                      <Label>ANC Date</Label>
                      <Input type="date" value={anc1} onChange={(e) => setAnc1(e.target.value)} />
                    </div>
                    <div>
                      <Label>Hemoglobin (HB)</Label>
                      <Input type="number" step="0.1" value={hbLevel as any} onChange={(e) => setHbLevel(e.target.value === "" ? "" : Number(e.target.value))} />
                    </div>
                    <div>
                      <Label>Blood Pressure (BP)</Label>
                      <Input type="text" value={bp} onChange={(e) => setBp(e.target.value)} />
                    </div>
                    <div>
                      <Label>Weight (kg)</Label>
                      <Input type="number" step="0.1" value={weight as any} onChange={(e) => setWeight(e.target.value === "" ? "" : Number(e.target.value))} />
                    </div>
                    <div className="md:col-span-3">
                      <Label>Any Complications</Label>
                      <Textarea value={complications} onChange={(e) => setComplications(e.target.value)} />
                    </div>
                  </div>
                </div>

                {/* Immunization & Supplements */}
                <div className="border-b pb-2">
                  <h3 className="font-semibold">Immunization & Supplements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                    <div>
                      <Label>TT1 Date</Label>
                      <Input type="date" value={tt1} onChange={(e) => setTt1(e.target.value)} />
                    </div>
                    <div>
                      <Label>TT2 Date</Label>
                      <Input type="date" value={tt2} onChange={(e) => setTt2(e.target.value)} />
                    </div>
                    <div>
                      <Label>IFA Tablets Given</Label>
                      <Input type="number" min={0} value={ifaGiven as any} onChange={(e) => setIfaGiven(e.target.value === "" ? "" : Number(e.target.value))} />
                    </div>
                    <div>
                      <Label>Calcium Tablets Given</Label>
                      <Input type="number" min={0} value={calciumGiven as any} onChange={(e) => setCalciumGiven(e.target.value === "" ? "" : Number(e.target.value))} />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Deworming Given</Label>
                      <div className="flex items-center gap-4 mt-2">
                        <label className="flex items-center gap-2">
                          <RadioGroup value={dewormingGiven} onValueChange={(v) => setDewormingGiven(v)}>
                            <RadioGroupItem value="Yes" id="dew-yes" />
                          </RadioGroup>
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <RadioGroup value={dewormingGiven} onValueChange={(v) => setDewormingGiven(v)}>
                            <RadioGroupItem value="No" id="dew-no" />
                          </RadioGroup>
                          <span>No</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Details (visible only when Delivered) */}
                {recordStatus === "Delivered" && (
                  <div className="border-b pb-2">
                  <h3 className="font-semibold">Delivery Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                    <div>
                      <Label>Delivery Date</Label>
                      <Input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
                    </div>
                    <div>
                      <Label>Delivery Place</Label>
                      <Select value={deliveryPlace} onValueChange={(v) => setDeliveryPlace(v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select place" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Home">Home</SelectItem>
                          <SelectItem value="Institution">Institution</SelectItem>
                          <SelectItem value="In transit">In transit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Conducted By</Label>
                      <Input value={conductedBy} onChange={(e) => setConductedBy(e.target.value)} />
                    </div>
                    
                    <div>
                      <Label>Birth Weight (kg)</Label>
                      <Input type="number" step="0.1" value={birthWeight as any} onChange={(e) => setBirthWeight(e.target.value === "" ? "" : Number(e.target.value))} />
                    </div>
                    <div>
                      <Label>Baby Sex</Label>
                      <div className="flex items-center gap-4 mt-2">
                        <label className="flex items-center gap-2">
                          <RadioGroup value={babySex} onValueChange={(v) => setBabySex(v)}>
                            <RadioGroupItem value="Male" id="sex-m" />
                          </RadioGroup>
                          <span>Male</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <RadioGroup value={babySex} onValueChange={(v) => setBabySex(v)}>
                            <RadioGroupItem value="Female" id="sex-f" />
                          </RadioGroup>
                          <span>Female</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  </div>
                )}

                {/* PNC (visible only when Delivered) */}
                {recordStatus === "Delivered" && (
                  <div className="border-b pb-2">
                  <h3 className="font-semibold">Postnatal Care (PNC)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                    <div>
                      <Label>PNC Date</Label>
                      <Input type="date" value={pnc1} onChange={(e) => setPnc1(e.target.value)} />
                    </div>
                    <div className="md:col-span-3">
                      <Label>PNC Complications</Label>
                      <Textarea value={pncComplications} onChange={(e) => setPncComplications(e.target.value)} />
                    </div>
                  </div>
                  </div>
                )}

                {/* Scheme & Referral removed */}

                {/* System */}
                <div>
                  <Label>Record Status</Label>
                  <Select value={recordStatus} onValueChange={(v) => setRecordStatus(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <DialogFooter>
                  <div className="flex w-full justify-end gap-2">
                    <Button variant="outline" type="button" onClick={() => { setOpen(false); resetForm(); }}>Cancel</Button>
                    <Button type="submit">Save Pregnancy</Button>
                  </div>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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
                    <TableCell>{(pregnancy as any).lmp || pregnancy.lmpDate}</TableCell>
                    <TableCell>{pregnancy.expectedDelivery || pregnancy.expectedDelivery}</TableCell>
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
