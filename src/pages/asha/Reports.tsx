import React, { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { mockUser } from "@/lib/mockData";

const Reports = () => {
  const [reportType, setReportType] = useState<string>("Pregnancy");
  const [patientName, setPatientName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [dateIncident, setDateIncident] = useState<string>(new Date().toISOString().slice(0, 10));
  const [urgency, setUrgency] = useState<string>("Normal");

  const ashaId = useMemo(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("ashaId")) return String(sessionStorage.getItem("ashaId"));
    return String(mockUser?.id ?? "");
  }, []);

  const validate = () => {
    if (!reportType) return "Report type is required";
    if (!description || !description.trim()) return "Description is required";
    if (!location || !location.trim()) return "Location is required";
    return null;
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const err = validate();
    if (err) return toast.error(err);

    // For now, just show success and redirect
    toast.success("Report submitted successfully");
    try { window.location.href = '/reports/dashboard'; } catch { /* ignore */ }
  };

  return (
    <Layout role="ASHA">
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Submit Report</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Report Type</Label>
                  <Select value={reportType} onValueChange={(v) => setReportType(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pregnancy">Pregnancy</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                      <SelectItem value="Delivery">Delivery</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Patient Name (optional)</Label>
                  <Input value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Patient name" />
                </div>
              </div>

              <div>
                <Label>Summary / Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="h-40" placeholder="Describe the issue (required)" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <Label>Location / Area</Label>
                  <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location (required)" />
                </div>

                <div>
                  <Label>Date of Incident</Label>
                  <Input type="date" value={dateIncident} onChange={(e) => setDateIncident(e.target.value)} />
                </div>

                <div>
                  <Label>Urgency</Label>
                  <Select value={urgency} onValueChange={(v) => setUrgency(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* hidden ASHA ID */}
              <input type="hidden" name="ashaId" value={ashaId} />

              <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => { setReportType("Pregnancy"); setPatientName(""); setDescription(""); setLocation(""); setDateIncident(new Date().toISOString().slice(0,10)); setUrgency("Normal"); }}>
                  Reset
                </Button>
                <Button type="submit">Submit Report</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;
