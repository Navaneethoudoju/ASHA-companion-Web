import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// ASHA Routes
import ASHADashboard from "./pages/asha/Dashboard";
import AddPatient from "./pages/asha/AddPatient";
import Households from "./pages/asha/Households";
import Pregnancy from "./pages/asha/Pregnancy";
import ChildHealth from "./pages/asha/ChildHealth";
import Medicine from "./pages/asha/Medicine";
import Reports from "./pages/asha/Reports";

// ANM Routes
import ANMDashboard from "./pages/anm/Dashboard";
import ASHAWorkers from "./pages/anm/ASHAWorkers";
import ReportsReview from "./pages/anm/ReportsReview";
import Analytics from "./pages/anm/Analytics";

// PHC Routes
import PHCDashboard from "./pages/phc/Dashboard";

// Admin Routes
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Villages from "./pages/admin/Villages";
import Settings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          
          {/* ASHA Routes */}
          <Route path="/asha/dashboard" element={<ASHADashboard />} />
          <Route path="/asha/add-patient" element={<AddPatient />} />
          <Route path="/asha/households" element={<Households />} />
          <Route path="/asha/pregnancy" element={<Pregnancy />} />
          <Route path="/asha/child-health" element={<ChildHealth />} />
          <Route path="/asha/medicine" element={<Medicine />} />
          <Route path="/asha/reports" element={<Reports />} />
          
          {/* ANM Routes */}
          <Route path="/anm/dashboard" element={<ANMDashboard />} />
          <Route path="/anm/asha-workers" element={<ASHAWorkers />} />
          <Route path="/anm/reports" element={<ReportsReview />} />
          <Route path="/anm/analytics" element={<Analytics />} />
          
          {/* PHC Routes */}
          <Route path="/phc/dashboard" element={<PHCDashboard />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/villages" element={<Villages />} />
          <Route path="/admin/settings" element={<Settings />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
