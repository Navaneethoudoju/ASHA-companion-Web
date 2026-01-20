import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { patientsApi } from '@/lib/patients';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const PatientView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: patient, isLoading } = useQuery({
    queryKey: ['patient', id],
    queryFn: async () => {
      const res = await patientsApi.get(id || '');
      return res.data;
    },
    enabled: !!id,
  });

  if (!id) return <div>Invalid patient id</div>;

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Patient Details</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="space-y-2">
              <div><strong>Name:</strong> {patient?.name}</div>
              <div><strong>Gender:</strong> {patient?.gender?.name}</div>
              <div><strong>DOB:</strong> {patient?.dob || '-'}</div>
              <div><strong>Phone:</strong> {patient?.phone || '-'}</div>
              <div><strong>ABHA:</strong> {patient?.abha_id || '-'}</div>
              <div><strong>Facility:</strong> {patient?.address?.facility?.name || '-'}</div>
              <div className="mt-4 flex gap-2">
                <Button onClick={() => navigate('/patients')}>Back to list</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientView;
