import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { patientsApi } from '@/lib/patients';
import { useLookupsStore } from '@/store/lookupsStore';
import { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

const Immunizations = () => {
  const { data: immunizations, isLoading } = useQuery({
    queryKey: ['immunizations'],
    queryFn: async () => {
      const response = await api.get('/immunizations');
      return response.data;
    },
  });

  // fetch patients to resolve patient_id -> name
  const { data: patients } = useQuery({
    queryKey: ['patients'],
    queryFn: async () => {
      const res = await patientsApi.list();
      return res.data;
    },
  });

  const { vaccines, immunizationStatuses } = useLookupsStore();

  const patientMap = useMemo(() => {
    const m = new Map<number, string>();
    (patients || []).forEach((p: any) => {
      const id = p?.id ?? p?.patient_id ?? p?.patientId;
      if (id != null) m.set(Number(id), p?.name || p?.full_name || `Patient #${id}`);
    });
    return m;
  }, [patients]);

  const vaccineMap = useMemo(() => {
    const m = new Map<number, string>();
    (vaccines || []).forEach((v: any) => {
      if (v?.id != null) m.set(Number(v.id), v.name);
    });
    return m;
  }, [vaccines]);

  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Immunizations</h1>
          <p className="text-muted-foreground">Track immunization records</p>
        </div>
        <Button onClick={() => navigate('/immunizations/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Immunization
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Vaccine</TableHead>
              <TableHead>Dose</TableHead>
              <TableHead>Date Given</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  </TableRow>
                ))
            ) : immunizations?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No immunizations found
                </TableCell>
              </TableRow>
            ) : (
              immunizations?.map((immunization: any) => {
                const id = immunization?.id ?? immunization?.immunization_id ?? JSON.stringify(immunization);
                const resolvedPatientId = immunization?.patient_id != null ? Number(immunization.patient_id) : immunization?.patient?.id ? Number(immunization.patient.id) : null;
                const patientName = immunization?.patient?.name || patientMap.get(resolvedPatientId) || immunization?.patient_name || (resolvedPatientId ? `Patient #${resolvedPatientId}` : '-');
                const vaccineId = immunization?.vaccine_id ?? immunization?.vaccine?.id;
                const vaccineName = immunization?.vaccine?.name || vaccineMap.get(Number(vaccineId)) || immunization.vaccine_name || '-';
                const statusName = immunization.immunization_status?.name || immunization.immunization_status_name || '-';

                return (
                  <TableRow key={id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{patientName || '-'}</TableCell>
                    <TableCell>{vaccineName}</TableCell>
                    <TableCell>{immunization.dose_number ?? '-'}</TableCell>
                    <TableCell>
                      {immunization.date_given ? new Date(immunization.date_given).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell>
                      {immunization.due_date ? new Date(immunization.due_date).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell>{statusName}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Immunizations;
