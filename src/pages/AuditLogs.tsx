import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

const AuditLogs = () => {
  const [tableName, setTableName] = useState('');
  const [recordId, setRecordId] = useState('');

  const { data: logs, isLoading } = useQuery({
    queryKey: ['audit-logs', tableName, recordId],
    queryFn: async () => {
      const params: any = { limit: 50 };
      if (tableName) params.table_name = tableName;
      if (recordId) params.record_id = recordId;
      
      const response = await api.get('/audit', { params });
      return response.data;
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Audit Logs</h1>
        <p className="text-muted-foreground">View system activity logs</p>
      </div>

      <Card className="p-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="table">Table Name</Label>
            <Input
              id="table"
              placeholder="Filter by table..."
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="record">Record ID</Label>
            <Input
              id="record"
              placeholder="Filter by record ID..."
              value={recordId}
              onChange={(e) => setRecordId(e.target.value)}
            />
          </div>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Table</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Record ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                  </TableRow>
                ))
            ) : logs?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No audit logs found
                </TableCell>
              </TableRow>
            ) : (
              logs?.map((log: any) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.table_name}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.record_id}</TableCell>
                  <TableCell>{log.user?.name || '-'}</TableCell>
                  <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default AuditLogs;
