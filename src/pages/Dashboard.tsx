import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, Syringe, Bell } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Dashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Fetch various counts
      const [patients, reminders, visits, immunizations] = await Promise.all([
        api.get('/patients'),
        api.get('/reminders/my'),
        api.get('/visits'),
        api.get('/immunizations'),
      ]);
      
      return {
        totalPatients: patients.data.length || 0,
        upcomingReminders: reminders.data.filter((r: any) => !r.completed_at).length || 0,
        recentVisits: visits.data.slice(0, 5).length || 0,
        totalImmunizations: immunizations.data.length || 0,
      };
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Patients',
      value: stats?.totalPatients || 0,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Upcoming Reminders',
      value: stats?.upcomingReminders || 0,
      icon: Bell,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      title: 'Recent Visits',
      value: stats?.recentVisits || 0,
      icon: Calendar,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      title: 'Total Immunizations',
      value: stats?.totalImmunizations || 0,
      icon: Syringe,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to ASHA EHR System</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Use the sidebar to navigate to different modules: Patients, Pregnancies, Visits, 
            Immunizations, Reminders, Voice Notes, and Audit Logs.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
