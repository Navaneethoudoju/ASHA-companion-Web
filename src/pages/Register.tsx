import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useLookupsStore } from '@/store/lookupsStore';
import { api } from '@/lib/api';
import { authApi } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Stethoscope } from 'lucide-react';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  // Keep phone validation aligned with backend (min 6)
  phone: z.string().min(6, 'Phone number must be at least 6 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role_id: z.string().min(1, 'Role is required'),
  facility_id: z.string().optional(),
});

type RegisterForm = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const { roles, facilities, isLoaded } = useLookupsStore();
  const { isAuthenticated } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // When lookups load, default to the first role (required) so form validation passes
  useEffect(() => {
    if (roles && roles.length > 0) {
      // set default role if not already set
      setValue('role_id', (roles[0].id).toString());
    }
    if (facilities && facilities.length > 0) {
      // don't force facility, but provide a default selectable value if none set
      // leave it optional — only set if user hasn't chosen one
      // (we don't auto-set facility to avoid surprising the user)
    }
  }, [roles, facilities, setValue]);

  // When roles/facilities load, prefill the select fields to the first option
  useEffect(() => {
    if (roles && roles.length > 0) {
      // Only set if no value present
      setValue('role_id', (roles[0].id).toString());
    }
    if (facilities && facilities.length > 0) {
      setValue('facility_id', ''); // leave empty by default (optional)
    }
  }, [roles, facilities, setValue]);

  const onSubmit = async (data: RegisterForm) => {
    try {
      const payload = {
        ...data,
        role_id: parseInt(data.role_id),
        facility_id: data.facility_id ? parseInt(data.facility_id) : undefined,
      };
  await authApi.register(payload);
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error: any) {
      const server = error.response?.data;
      if (server) {
        if (server.error) {
          toast.error(server.error);
        } else if (server.message) {
          toast.error(server.message);
        } else if (server.issues) {
          const msgs = server.issues.map((i: any) => i.message).join('; ');
          toast.error(msgs || 'Registration validation failed');
        } else {
          toast.error('Registration failed. Please try again.');
        }
      } else {
        toast.error(error.message || 'Registration failed. Please try again.');
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
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>Register for ASHA EHR System</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Hidden inputs to integrate custom Select with react-hook-form */}
            <input type="hidden" {...register('role_id')} />
            <input type="hidden" {...register('facility_id')} />
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="role_id">Role</Label>
              <Select onValueChange={(value) => setValue('role_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id.toString()}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.role_id && (
                <p className="text-sm text-destructive">{errors.role_id.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="facility_id">Facility (Optional)</Label>
              <Select onValueChange={(value) => setValue('facility_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select facility" />
                </SelectTrigger>
                <SelectContent>
                  {facilities.map((facility) => (
                    <SelectItem key={facility.id} value={facility.id.toString()}>
                      {facility.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting || !isLoaded}>
              {isSubmitting ? 'Creating account...' : 'Register'}
            </Button>
            {!isLoaded && (
              <p className="text-center text-sm text-muted-foreground mt-2">Loading lookups... please wait</p>
            )}

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link to="/login" className="text-primary hover:underline">
                Login here
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
