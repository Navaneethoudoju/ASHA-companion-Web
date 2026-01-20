import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

const Patients = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: patients, isLoading } = useQuery({
    queryKey: ['patients', searchQuery],
    queryFn: async () => {
      const response = await api.get('/patients', {
        params: { q: searchQuery },
      });
      return response.data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patients</h1>
          <p className="text-muted-foreground">Manage patient records</p>
        </div>
        <Button onClick={() => navigate('/patients/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Patient
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients by name, phone, or ABHA..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>ABHA ID</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  </TableRow>
                ))
            ) : patients?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No patients found
                </TableCell>
              </TableRow>
            ) : (
              patients?.map((patient: any) => (
                <TableRow
                  key={patient.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => navigate(`/patients/${patient.id}`)}
                >
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.gender?.name || '-'}</TableCell>
                  <TableCell>{patient.phone || '-'}</TableCell>
                  <TableCell>{patient.abha_id || '-'}</TableCell>
                  <TableCell>
                    {new Date(patient.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Patients;
