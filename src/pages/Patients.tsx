import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
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
  const [genderFilter, setGenderFilter] = useState('');
  const [villageFilter, setVillageFilter] = useState('');
  const [minAge, setMinAge] = useState<string>('');
  const [maxAge, setMaxAge] = useState<string>('');

  const { data: patients, isLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: async () => {
      const response = await api.get('/patients');
      return response.data;
    },
  });

  const normalizedPatients = patients || [];

  const genders = useMemo(() => {
    const set = new Set<string>();
    normalizedPatients.forEach((p: any) => {
      const g = p?.gender?.name;
      if (g) set.add(g);
    });
    return Array.from(set);
  }, [normalizedPatients]);

  const villages = useMemo(() => {
    const set = new Set<string>();
    normalizedPatients.forEach((p: any) => {
      const v = p?.address?.village?.name || p?.village?.name || p?.village_name || p?.address?.village_name;
      if (v) set.add(v);
    });
    return Array.from(set);
  }, [normalizedPatients]);

  const filteredPatients = useMemo(() => {
    const q = (searchQuery || '').trim().toLowerCase();
    return normalizedPatients.filter((p: any) => {
      if (!p) return false;

      // Search text matching
      if (q) {
        const hay = [p.name, p.phone, p.abha_id, p.email, p.address?.line1]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }

      // Gender filter
      if (genderFilter) {
        if ((p?.gender?.name || '').toLowerCase() !== genderFilter.toLowerCase()) return false;
      }

      // Village filter
      if (villageFilter) {
        const v = (p?.address?.village?.name || p?.village?.name || p?.village_name || '').toLowerCase();
        if (!v.includes(villageFilter.toLowerCase())) return false;
      }

      // Age filter (uses dob when available)
      const computeAge = (dob: string | undefined) => {
        if (!dob) return null;
        const diff = Date.now() - new Date(dob).getTime();
        return Math.floor(diff / 31557600000);
      };

      const age = computeAge(p.dob || p.date_of_birth || p.birth_date);
      if (minAge) {
        const min = Number(minAge);
        if (age == null || age < min) return false;
      }
      if (maxAge) {
        const max = Number(maxAge);
        if (age == null || age > max) return false;
      }

      return true;
    });
  }, [normalizedPatients, searchQuery, genderFilter, villageFilter, minAge, maxAge]);

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
        <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-2">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients by name, phone, or ABHA..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="w-40">
              <Select value={genderFilter} onValueChange={(v) => setGenderFilter(v)}>
                <SelectTrigger>
                  <SelectValue>{genderFilter || 'All genders'}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All genders</SelectItem>
                  {genders.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-48">
              <Select value={villageFilter} onValueChange={(v) => setVillageFilter(v)}>
                <SelectTrigger>
                  <SelectValue>{villageFilter || 'All villages'}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All villages</SelectItem>
                  {villages.map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Min age"
                value={minAge}
                onChange={(e) => setMinAge(e.target.value)}
                className="w-24"
              />
              <Input
                type="number"
                placeholder="Max age"
                value={maxAge}
                onChange={(e) => setMaxAge(e.target.value)}
                className="w-24"
              />
            </div>
          </div>
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
            ) : filteredPatients?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No patients found
                </TableCell>
              </TableRow>
            ) : (
              filteredPatients?.map((patient: any) => (
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
