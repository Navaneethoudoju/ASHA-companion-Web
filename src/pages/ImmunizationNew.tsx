import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { immunizationsApi } from '@/lib/immunizations';
import { patientsApi } from '@/lib/patients';
import { useLookupsStore } from '@/store/lookupsStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const schema = z.object({
  patient_id: z.string().min(1, 'Patient is required'),
  vaccine_id: z.string().min(1, 'Vaccine is required'),
  dose_number: z.string().min(1, 'Dose is required'),
  date_given: z.string().min(1, 'Date given is required'),
  due_date: z.string().optional(),
  immunization_status_id: z.string().optional(),
});

type Form = z.infer<typeof schema>;

const ImmunizationNew = () => {
  const navigate = useNavigate();
  const { vaccines, immunizationStatuses, isLoaded } = useLookupsStore();

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema) });

  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    const fetchPatients = async () => {
      try {
        const res = await patientsApi.list();
        if (mounted) setPatients(res.data);
      } catch (err) {
        console.error('Failed to fetch patients', err);
      }
    };
    fetchPatients();
    return () => { mounted = false; };
  }, []);

  const onSubmit = async (data: Form) => {
    try {
      const payload = {
        patient_id: parseInt(data.patient_id),
        vaccine_id: parseInt(data.vaccine_id),
        dose_number: parseInt(data.dose_number),
        date_given: data.date_given,
        due_date: data.due_date || undefined,
        immunization_status_id: data.immunization_status_id ? parseInt(data.immunization_status_id) : undefined,
      };

      await immunizationsApi.create(payload as any);
      toast.success('Immunization created');
      navigate('/immunizations');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create immunization');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create Immunization</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
            <div>
              <Label>Patient</Label>
              <Select onValueChange={(v) => setValue('patient_id', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients?.map((p: any) => {
                    const pid = p?.id ?? p?.patient_id ?? p?.patientId;
                    return (
                      <SelectItem key={pid ?? p?.name} value={pid != null ? String(pid) : ''}>{p.name}</SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {errors.patient_id && <p className="text-destructive text-sm">{errors.patient_id.message}</p>}
            </div>

            <div>
              <Label>Vaccine</Label>
              <Select onValueChange={(v) => setValue('vaccine_id', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vaccine" />
                </SelectTrigger>
                <SelectContent>
                  {vaccines.map((v) => (
                    <SelectItem key={v.id} value={v.id.toString()}>{v.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.vaccine_id && <p className="text-destructive text-sm">{errors.vaccine_id.message}</p>}
            </div>

            <div>
              <Label>Dose Number</Label>
              <Input type="number" {...register('dose_number')} />
              {errors.dose_number && <p className="text-destructive text-sm">{errors.dose_number.message}</p>}
            </div>

            <div>
              <Label>Date Given</Label>
              <Input type="date" {...register('date_given')} />
              {errors.date_given && <p className="text-destructive text-sm">{errors.date_given.message}</p>}
            </div>

            <div>
              <Label>Due Date</Label>
              <Input type="date" {...register('due_date')} />
            </div>

            <div>
              <Label>Status</Label>
              <Select onValueChange={(v) => setValue('immunization_status_id', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {immunizationStatuses.map((s) => (
                    <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2 flex justify-end">
              <Button type="submit" disabled={isSubmitting || !isLoaded}>{isSubmitting ? 'Creating...' : 'Create immunization'}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImmunizationNew;
