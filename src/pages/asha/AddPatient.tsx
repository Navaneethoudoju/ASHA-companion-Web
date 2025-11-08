import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { mockHouseholds } from "@/lib/mockData";

const AddPatient = () => {
  const [householdId, setHouseholdId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [relation, setRelation] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [address, setAddress] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bp, setBp] = useState("");
  const [notes, setNotes] = useState("");
  
  const [addPregnancy, setAddPregnancy] = useState(false);
  const [lmpDate, setLmpDate] = useState("");
  const [expectedDelivery, setExpectedDelivery] = useState("");
  const [riskStatus, setRiskStatus] = useState("");
  
  const [addChild, setAddChild] = useState(false);
  const [birthWeight, setBirthWeight] = useState("");
  const [immunizationStatus, setImmunizationStatus] = useState("");
  const [nextVaccineDate, setNextVaccineDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!householdId || !patientName || !gender || !dob) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate saving to database
    console.log("Saving patient data:", {
      householdId,
      patientName,
      gender,
      dob,
      relation,
      phone,
      aadhaar,
      address,
      height,
      weight,
      bp,
      notes,
      pregnancy: addPregnancy ? { lmpDate, expectedDelivery, riskStatus } : null,
      child: addChild ? { birthWeight, immunizationStatus, nextVaccineDate } : null
    });

    toast.success("Patient details saved successfully!");
    
    // Reset form
    setHouseholdId("");
    setPatientName("");
    setGender("");
    setDob("");
    setRelation("");
    setPhone("");
    setAadhaar("");
    setAddress("");
    setHeight("");
    setWeight("");
    setBp("");
    setNotes("");
    setAddPregnancy(false);
    setLmpDate("");
    setExpectedDelivery("");
    setRiskStatus("");
    setAddChild(false);
    setBirthWeight("");
    setImmunizationStatus("");
    setNextVaccineDate("");
  };

  return (
    <Layout role="ASHA">
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Add New Patient</h1>
          <p className="text-muted-foreground">Enter patient details to add to the system</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="household">Household *</Label>
                  <Select value={householdId} onValueChange={setHouseholdId}>
                    <SelectTrigger id="household">
                      <SelectValue placeholder="Select household" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockHouseholds.map((household) => (
                        <SelectItem key={household.id} value={household.id.toString()}>
                          {household.headName} - {household.address}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name *</Label>
                  <Input
                    id="patientName"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter patient name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="relation">Relation to Head</Label>
                  <Input
                    id="relation"
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    placeholder="e.g., Son, Daughter, Wife"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aadhaar">Aadhaar Number</Label>
                  <Input
                    id="aadhaar"
                    value={aadhaar}
                    onChange={(e) => setAadhaar(e.target.value)}
                    placeholder="12-digit Aadhaar"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Full address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Height in cm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Weight in kg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bp">Blood Pressure</Label>
                  <Input
                    id="bp"
                    value={bp}
                    onChange={(e) => setBp(e.target.value)}
                    placeholder="e.g., 120/80"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional notes or observations"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Pregnancy Details</CardTitle>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="pregnancy-toggle"
                    checked={addPregnancy}
                    onCheckedChange={setAddPregnancy}
                  />
                  <Label htmlFor="pregnancy-toggle">Add pregnancy details</Label>
                </div>
              </div>
            </CardHeader>
            {addPregnancy && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lmpDate">LMP Date</Label>
                    <Input
                      id="lmpDate"
                      type="date"
                      value={lmpDate}
                      onChange={(e) => setLmpDate(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expectedDelivery">Expected Delivery</Label>
                    <Input
                      id="expectedDelivery"
                      type="date"
                      value={expectedDelivery}
                      onChange={(e) => setExpectedDelivery(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="riskStatus">Risk Status</Label>
                    <Select value={riskStatus} onValueChange={setRiskStatus}>
                      <SelectTrigger id="riskStatus">
                        <SelectValue placeholder="Select risk status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Normal">Normal</SelectItem>
                        <SelectItem value="High Risk">High Risk</SelectItem>
                        <SelectItem value="Very High Risk">Very High Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Child Health Details</CardTitle>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="child-toggle"
                    checked={addChild}
                    onCheckedChange={setAddChild}
                  />
                  <Label htmlFor="child-toggle">Add child health details</Label>
                </div>
              </div>
            </CardHeader>
            {addChild && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="birthWeight">Birth Weight (kg)</Label>
                    <Input
                      id="birthWeight"
                      type="number"
                      step="0.1"
                      value={birthWeight}
                      onChange={(e) => setBirthWeight(e.target.value)}
                      placeholder="Birth weight"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="immunizationStatus">Immunization Status</Label>
                    <Select value={immunizationStatus} onValueChange={setImmunizationStatus}>
                      <SelectTrigger id="immunizationStatus">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Up to date">Up to date</SelectItem>
                        <SelectItem value="Pending BCG">Pending BCG</SelectItem>
                        <SelectItem value="Pending DPT">Pending DPT</SelectItem>
                        <SelectItem value="Pending OPV">Pending OPV</SelectItem>
                        <SelectItem value="Pending Measles">Pending Measles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nextVaccineDate">Next Vaccine Date</Label>
                    <Input
                      id="nextVaccineDate"
                      type="date"
                      value={nextVaccineDate}
                      onChange={(e) => setNextVaccineDate(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          <div className="flex justify-end space-x-4 mt-6">
            <Button type="button" variant="outline" onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Button type="submit">Save Patient Details</Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddPatient;
