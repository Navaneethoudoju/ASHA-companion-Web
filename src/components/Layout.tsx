import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Users, Baby, Heart, Pill, FileText, BarChart3, Settings, LogOut, UserCog } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  role: "ASHA" | "ANM" | "ADMIN";
}

const Layout = ({ children, role }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const ashaMenuItems = [
    { to: "/asha/dashboard", icon: Home, label: "Dashboard" },
    { to: "/asha/households", icon: Users, label: "Households" },
    { to: "/asha/pregnancy", icon: Heart, label: "Pregnancy" },
    { to: "/asha/child-health", icon: Baby, label: "Child Health" },
    { to: "/asha/medicine", icon: Pill, label: "Medicine Stock" },
    { to: "/asha/reports", icon: FileText, label: "Reports" }
  ];

  const anmMenuItems = [
    { to: "/anm/dashboard", icon: Home, label: "Dashboard" },
    { to: "/anm/asha-workers", icon: Users, label: "ASHA Workers" },
    { to: "/anm/reports", icon: FileText, label: "Reports" },
    { to: "/anm/analytics", icon: BarChart3, label: "Analytics" }
  ];

  const adminMenuItems = [
    { to: "/admin/dashboard", icon: Home, label: "Dashboard" },
    { to: "/admin/users", icon: UserCog, label: "Users" },
    { to: "/admin/villages", icon: Users, label: "Villages" },
    { to: "/admin/settings", icon: Settings, label: "Settings" }
  ];

  const menuItems = role === "ASHA" ? ashaMenuItems : role === "ANM" ? anmMenuItems : adminMenuItems;

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 border-r bg-card">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-primary">ASHA Companion</h1>
          <p className="text-sm text-muted-foreground mt-1">{role} Portal</p>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            return (
              <Link key={item.to} to={item.to}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
