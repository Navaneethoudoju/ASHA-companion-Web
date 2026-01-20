import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { patientsApi } from '@/lib/patients';
import { useLookupsStore } from '@/store/lookupsStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const patientSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  gender_id: z.string().min(1, 'Gender is required'),
  dob: z.string().optional(),
  phone: z.string().optional(),
  abha_id: z.string().optional(),
  facility_id: z.string().optional(),
  // village is free-text; we provide suggestions from lookups
  village: z.string().optional(),
});

type PatientForm = z.infer<typeof patientSchema>;

const PatientNew = () => {
  const navigate = useNavigate();
  const { genders, facilities, villages, isLoaded } = useLookupsStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PatientForm>({ resolver: zodResolver(patientSchema) });

  const onSubmit = async (data: PatientForm) => {
    try {
      const payload = {
        name: data.name,
        gender_id: parseInt(data.gender_id),
        dob: data.dob || undefined,
        phone: data.phone || undefined,
        abha_id: data.abha_id || undefined,
        address: {
          facility_id: data.facility_id ? parseInt(data.facility_id) : undefined,
          // prefer lookup id if user selected/matched a known village name
          village_id: (() => {
            const match = villages.find((x) => x.name === (data.village || ''));
            return match ? match.id : undefined;
          })(),
          // also include the typed village name (backend may accept name instead of id)
          village: data.village || undefined,
        },
      };

      const res = await patientsApi.create(payload as any);
      toast.success('Patient created');
      // Backend returns patient_id per README; navigate back to list
      navigate('/patients');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create patient');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create Patient</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input id="name" {...register('name')} />
              {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={(v) => setValue('gender_id', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {genders.map((g) => (
                    <SelectItem key={g.id} value={g.id.toString()}>{g.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.gender_id && <p className="text-destructive text-sm">{errors.gender_id.message}</p>}
            </div>

            <div>
              <Label htmlFor="dob">Date of birth</Label>
              <Input id="dob" type="date" {...register('dob')} />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" {...register('phone')} />
            </div>

            <div>
              <Label htmlFor="abha">ABHA ID</Label>
              <Input id="abha" {...register('abha_id')} />
            </div>

            <div>
              <Label htmlFor="facility">Facility</Label>
              <Select onValueChange={(v) => setValue('facility_id', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select facility" />
                </SelectTrigger>
                <SelectContent>
                  {facilities.map((f) => (
                    <SelectItem key={f.id} value={f.id.toString()}>{f.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="village">Village</Label>
              {/* Textbox with suggestions (datalist) — user can type or pick a known village */}
              <Input id="village" list="villages-list" placeholder="Type or select village" {...register('village')} />
              <datalist id="villages-list">
                {villages.map((v) => (
                  <option key={v.id} value={v.name} />
                ))}
              </datalist>
            </div>

            <div className="col-span-2 flex justify-end">
              <Button type="submit" disabled={isSubmitting || !isLoaded}>{isSubmitting ? 'Creating...' : 'Create patient'}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientNew;
