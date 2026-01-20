import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { visitsApi } from '@/lib/visits';
import { patientsApi } from '@/lib/patients';
import { useLookupsStore } from '@/store/lookupsStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const schema = z.object({
  patient_id: z.string().min(1, 'Patient is required'),
  visit_type_id: z.string().min(1, 'Visit type is required'),
  visit_date: z.string().min(1, 'Visit date is required'),
  notes: z.string().optional(),
});

type Form = z.infer<typeof schema>;

const VisitNew = () => {
  const navigate = useNavigate();
  const { visitTypes, isLoaded } = useLookupsStore();

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema) });

  // fetch patients for select
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
        visit_type_id: parseInt(data.visit_type_id),
        visit_date: data.visit_date,
        notes: data.notes || undefined,
      };
      await visitsApi.create(payload as any);
      toast.success('Visit created');
      navigate('/visits');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create visit');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create Visit</CardTitle>
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
              <Label>Visit Type</Label>
              <Select onValueChange={(v) => setValue('visit_type_id', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select visit type" />
                </SelectTrigger>
                <SelectContent>
                  {visitTypes.map((t) => (
                    <SelectItem key={t.id} value={t.id.toString()}>{t.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.visit_type_id && <p className="text-destructive text-sm">{errors.visit_type_id.message}</p>}
            </div>

            <div>
              <Label>Visit Date</Label>
              <Input type="date" {...register('visit_date')} />
              {errors.visit_date && <p className="text-destructive text-sm">{errors.visit_date.message}</p>}
            </div>

            <div>
              <Label>Notes</Label>
              <Input {...register('notes')} />
            </div>

            <div className="col-span-2 flex justify-end">
              <Button type="submit" disabled={isSubmitting || !isLoaded}>{isSubmitting ? 'Creating...' : 'Create visit'}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitNew;
