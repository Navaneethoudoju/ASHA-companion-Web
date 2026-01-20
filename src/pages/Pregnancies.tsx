import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { patientsApi } from '@/lib/patients';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
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

const Pregnancies = () => {
  const { data: pregnancies, isLoading } = useQuery({
    queryKey: ['pregnancies'],
    queryFn: async () => {
      const response = await api.get('/pregnancies');
      return response.data;
    },
  });

  // fetch patients so we can resolve patient_id -> patient.name
  const { data: patients } = useQuery({
    queryKey: ['patients'],
    queryFn: async () => {
      const res = await patientsApi.list();
      return res.data;
    },
  });

  const patientMap = useMemo(() => {
    const m = new Map();
    (patients || []).forEach((p: any) => {
      const id = p?.id ?? p?.patient_id ?? p?.patientId;
      if (id != null) m.set(Number(id), p?.name || p?.full_name || `Patient #${id}`);
    });
    return m;
  }, [patients]);

  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pregnancies</h1>
          <p className="text-muted-foreground">Track pregnancy records</p>
        </div>
        <Button onClick={() => navigate('/pregnancies/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Pregnancy
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>EDD</TableHead>
              <TableHead>Risk Level</TableHead>
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
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  </TableRow>
                ))
            ) : pregnancies?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No pregnancies found
                </TableCell>
              </TableRow>
            ) : (
              pregnancies?.map((pregnancy: any) => {
                const id = pregnancy?.id ?? pregnancy?.pregnancy_id ?? JSON.stringify(pregnancy);
                const resolvedPatientId = pregnancy?.patient_id != null ? Number(pregnancy.patient_id) : null;
                const patientName =
                  pregnancy?.patient?.name ||
                  patientMap.get(resolvedPatientId) ||
                  pregnancy?.patient_name ||
                  pregnancy?.patient?.full_name ||
                  (resolvedPatientId ? `Patient #${resolvedPatientId}` : '-');

                return (
                  <TableRow key={id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{patientName || '-'}</TableCell>
                    <TableCell>
                      {pregnancy.start_date ? new Date(pregnancy.start_date).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell>{pregnancy.edd ? new Date(pregnancy.edd).toLocaleDateString() : '-'}</TableCell>
                    <TableCell>{pregnancy.risk_level?.name || '-'}</TableCell>
                    <TableCell>{pregnancy.pregnancy_status?.name || '-'}</TableCell>
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

export default Pregnancies;
