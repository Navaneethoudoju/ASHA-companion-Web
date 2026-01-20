import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { patientsApi } from '@/lib/patients';
import { useLookupsStore } from '@/store/lookupsStore';
import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

const Visits = () => {
  const { data: visits, isLoading } = useQuery({
    queryKey: ['visits'],
    queryFn: async () => {
      const response = await api.get('/visits');
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

  const { visitTypes } = useLookupsStore();

  const patientMap = useMemo(() => {
    const m = new Map<number, string>();
    (patients || []).forEach((p: any) => {
      const id = p?.id ?? p?.patient_id ?? p?.patientId;
      if (id != null) m.set(Number(id), p?.name || p?.full_name || `Patient #${id}`);
    });
    return m;
  }, [patients]);

  const visitTypeMap = useMemo(() => {
    const m = new Map<number, string>();
    (visitTypes || []).forEach((t: any) => {
      if (t?.id != null) m.set(Number(t.id), t.name);
    });
    return m;
  }, [visitTypes]);

  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Visits</h1>
          <p className="text-muted-foreground">Manage patient visits</p>
        </div>
        <Button onClick={() => navigate('/visits/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Visit
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Visit Type</TableHead>
              <TableHead>Visit Date</TableHead>
              <TableHead>Notes</TableHead>
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
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                  </TableRow>
                ))
            ) : visits?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No visits found
                </TableCell>
              </TableRow>
            ) : (
              visits?.map((visit: any) => {
                const id = visit?.id ?? visit?.visit_id ?? JSON.stringify(visit);
                const resolvedPatientId = visit?.patient_id != null ? Number(visit.patient_id) : visit?.patient?.id ? Number(visit.patient.id) : null;
                const patientName = visit?.patient?.name || patientMap.get(resolvedPatientId) || visit?.patient_name || (resolvedPatientId ? `Patient #${resolvedPatientId}` : '-');
                const visitTypeId = visit?.visit_type_id ?? visit?.visit_type?.id;
                const visitTypeName = visit?.visit_type?.name || visitTypeMap.get(Number(visitTypeId)) || visit?.visit_type_name || '-';

                return (
                  <TableRow key={id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{patientName || '-'}</TableCell>
                    <TableCell>{visitTypeName}</TableCell>
                    <TableCell>{visit.visit_date ? new Date(visit.visit_date).toLocaleDateString() : '-'}</TableCell>
                    <TableCell className="max-w-xs truncate">{visit.notes || '-'}</TableCell>
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

export default Visits;
