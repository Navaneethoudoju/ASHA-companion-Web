import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId || !password) {
      toast.error("Please enter User ID and password");
      return;
    }

    // Mock authentication - in real app, this would check against database
    const mockUsers = [
      { id: "ASHA001", password: "asha123", role: "ASHA", name: "Sita Devi" },
      { id: "ANM001", password: "anm123", role: "ANM", name: "Rekha Kumari" },
      { id: "PHC001", password: "phc123", role: "PHC", name: "Dr. Amit Kumar" },
      { id: "ADMIN001", password: "admin123", role: "ADMIN", name: "Admin User" }
    ];

    const user = mockUsers.find(u => u.id === userId && u.password === password);

    if (!user) {
      toast.error("Invalid User ID or password");
      return;
    }

    toast.success(`Welcome back, ${user.name}!`);
    
    // Route based on user role from database
    if (user.role === "ASHA") {
      navigate("/asha/dashboard");
    } else if (user.role === "ANM") {
      navigate("/anm/dashboard");
    } else if (user.role === "PHC") {
      navigate("/phc/dashboard");
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">ASHA Companion</CardTitle>
          <CardDescription className="text-center">
            Digital Health Record & Workflow Management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                type="text"
                placeholder="Enter your User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-4">
              Demo IDs: ASHA001, ANM001, PHC001, ADMIN001 (Password: role123)
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
