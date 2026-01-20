import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
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

const VoiceNotes = () => {
  const { data: voiceNotes, isLoading } = useQuery({
    queryKey: ['voice-notes'],
    queryFn: async () => {
      const response = await api.get('/voice');
      return response.data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Voice Notes</h1>
          <p className="text-muted-foreground">Manage voice recordings</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Voice Note
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Visit</TableHead>
              <TableHead>Recorded At</TableHead>
              <TableHead>Transcript</TableHead>
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
            ) : voiceNotes?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No voice notes found
                </TableCell>
              </TableRow>
            ) : (
              voiceNotes?.map((note: any) => (
                <TableRow key={note.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{note.patient?.name || '-'}</TableCell>
                  <TableCell>{note.visit_id || '-'}</TableCell>
                  <TableCell>{new Date(note.recorded_at).toLocaleDateString()}</TableCell>
                  <TableCell className="max-w-xs truncate">{note.transcript || 'No transcript'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default VoiceNotes;
