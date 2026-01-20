import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { pregnanciesApi } from '@/lib/pregnancies';
import { patientsApi } from '@/lib/patients';
import { useLookupsStore } from '@/store/lookupsStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const schema = z.object({
  patient_id: z.string().min(1, 'Patient is required'),
  start_date: z.string().min(1, 'Start date is required'),
  edd: z.string().optional(),
  risk_level_id: z.string().optional(),
  pregnancy_status_id: z.string().optional(),
});

type Form = z.infer<typeof schema>;

const PregnancyNew = () => {
  const navigate = useNavigate();
  const { riskLevels, pregnancyStatuses, isLoaded } = useLookupsStore();

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
        start_date: data.start_date,
        edd: data.edd || undefined,
        risk_level_id: data.risk_level_id ? parseInt(data.risk_level_id) : undefined,
        pregnancy_status_id: data.pregnancy_status_id ? parseInt(data.pregnancy_status_id) : undefined,
      };
      await pregnanciesApi.create(payload as any);
      toast.success('Pregnancy created');
      navigate('/pregnancies');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create pregnancy');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create Pregnancy</CardTitle>
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
              <Label>Start Date</Label>
              <Input type="date" {...register('start_date')} />
              {errors.start_date && <p className="text-destructive text-sm">{errors.start_date.message}</p>}
            </div>

            <div>
              <Label>EDD</Label>
              <Input type="date" {...register('edd')} />
            </div>

            <div>
              <Label>Risk Level</Label>
              <Select onValueChange={(v) => setValue('risk_level_id', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  {riskLevels.map((r) => (
                    <SelectItem key={r.id} value={r.id.toString()}>{r.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Pregnancy Status</Label>
              <Select onValueChange={(v) => setValue('pregnancy_status_id', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {pregnancyStatuses.map((s) => (
                    <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2 flex justify-end">
              <Button type="submit" disabled={isSubmitting || !isLoaded}>{isSubmitting ? 'Creating...' : 'Create pregnancy'}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PregnancyNew;
