import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';
import { authApi } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Stethoscope } from 'lucide-react';
import { useEffect } from 'react';

const loginSchema = z.object({
  // Backend allows phone min length 6 — keep frontend in sync with backend docs
  phone: z.string().min(6, 'Phone number must be at least 6 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: LoginForm) => {
    try {
  const response = await authApi.login(data);
      const { token, user: rawUser } = response.data;
      // Normalize backend user shape to frontend store shape
      // Backend returns { user_id, name, role_id, phone? }
      const user = rawUser
        ? {
            id: rawUser.user_id ?? rawUser.id,
            name: rawUser.name,
            phone: rawUser.phone,
            role_id: rawUser.role_id ?? rawUser.roleId ?? rawUser.role,
            facility_id: rawUser.facility_id ?? rawUser.facilityId,
          }
        : null;

      if (!token || !user) {
        throw new Error('Invalid login response from server');
      }
      login(token, user as any);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: any) {
      // Prefer structured messages returned by server
      const server = error.response?.data;
      if (server) {
        // If backend returns field-level validation (zod issues), attach to form
        if (server.issues && Array.isArray(server.issues)) {
          server.issues.forEach((iss: any) => {
            if (iss.path && iss.path.length > 0) {
              const field = iss.path[0];
              setError(field as any, { type: 'server', message: iss.message });
            }
          });
          const msgs = server.issues.map((i: any) => i.message).join('; ');
          toast.error(msgs || 'Login validation failed');
        } else if (server.error) {
          toast.error(server.error);
        } else if (server.message) {
          toast.error(server.message);
        } else {
          toast.error('Login failed. Please try again.');
        }
      } else {
        toast.error(error.message || 'Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Stethoscope className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">ASHA EHR System</CardTitle>
          <CardDescription>Login to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter phone number"
                {...register('phone')}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/register" className="text-primary hover:underline">
                Register here
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
