import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from './store/authStore';
import { useLookupsStore } from './store/lookupsStore';
import { api } from './lib/api';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AppLayout } from './components/layout/AppLayout';

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientNew from "./pages/PatientNew";
import PatientView from "./pages/PatientView";
import Pregnancies from "./pages/Pregnancies";
import Visits from "./pages/Visits";
import Immunizations from "./pages/Immunizations";
import ImmunizationNew from "./pages/ImmunizationNew";
import VisitNew from "./pages/VisitNew";
import Reminders from "./pages/Reminders";
import VoiceNotes from "./pages/VoiceNotes";
import PregnancyNew from "./pages/PregnancyNew";
import AuditLogs from "./pages/AuditLogs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const initAuth = useAuthStore((state) => state.initAuth);
  const setLookups = useLookupsStore((state) => state.setLookups);
  const isLoaded = useLookupsStore((state) => state.isLoaded);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  useEffect(() => {
    // Fetch lookups on app load
    const fetchLookups = async () => {
      try {
        const response = await api.get('/lookups');
        setLookups(response.data);
      } catch (error) {
        console.error('Failed to fetch lookups:', error);
      }
    };

    if (!isLoaded) {
      fetchLookups();
    }
  }, [setLookups, isLoaded]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Accept common misspelling of 'pregnancies' and redirect to correct path */}
            <Route path="/pregancies" element={<Navigate to="/pregnancies" replace />} />
            <Route path="/pregancies/new" element={<Navigate to="/pregnancies/new" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Dashboard />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/patients"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Patients />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/patients/new"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <PatientNew />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/patients/:id"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <PatientView />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/pregnancies"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Pregnancies />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/pregnancies/new"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <PregnancyNew />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/visits"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Visits />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/visits/new"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <VisitNew />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/immunizations"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Immunizations />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/immunizations/new"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <ImmunizationNew />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/reminders"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Reminders />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/voice-notes"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <VoiceNotes />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/audit-logs"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <AuditLogs />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
