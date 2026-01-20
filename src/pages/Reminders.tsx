import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Check } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

const Reminders = () => {
  const queryClient = useQueryClient();

  const { data: reminders, isLoading } = useQuery({
    queryKey: ['reminders'],
    queryFn: async () => {
      const response = await api.get('/reminders/my');
      return response.data;
    },
  });

  const completeMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.patch(`/reminders/${id}/complete`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
      toast.success('Reminder marked as complete');
    },
    onError: () => {
      toast.error('Failed to complete reminder');
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reminders</h1>
          <p className="text-muted-foreground">Manage your reminders</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Reminder
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
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
                    <TableCell><Skeleton className="h-8 w-24" /></TableCell>
                  </TableRow>
                ))
            ) : reminders?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No reminders found
                </TableCell>
              </TableRow>
            ) : (
              reminders?.map((reminder: any) => (
                <TableRow key={reminder.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{reminder.patient?.name || '-'}</TableCell>
                  <TableCell>{reminder.reminder_type?.name || '-'}</TableCell>
                  <TableCell>{new Date(reminder.due_date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {reminder.completed_at ? (
                      <span className="text-success">Completed</span>
                    ) : (
                      <span className="text-warning">Pending</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {!reminder.completed_at && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => completeMutation.mutate(reminder.id)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Complete
                      </Button>
                    )}
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

export default Reminders;
