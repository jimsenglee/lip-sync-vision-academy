import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Pages
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Transcription from "./pages/Transcription";
import Education from "./pages/Education";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";

// New Transcription Pages
import RealTimeTranscription from "./pages/transcription/RealTimeTranscription";
import VideoUpload from "./pages/transcription/VideoUpload";
import VideoGuidelines from "./pages/transcription/VideoGuidelines";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import ContentManagement from "./pages/admin/ContentManagement";
import SystemAnalytics from "./pages/admin/SystemAnalytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Protected User Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['user']}>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Transcription Routes - User Only */}
            <Route path="/transcription" element={
              <ProtectedRoute allowedRoles={['user']}>
                <DashboardLayout>
                  <Transcription />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/transcription/realtime" element={
              <ProtectedRoute allowedRoles={['user']}>
                <DashboardLayout>
                  <RealTimeTranscription />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/transcription/upload" element={
              <ProtectedRoute allowedRoles={['user']}>
                <DashboardLayout>
                  <VideoUpload />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/transcription/guidelines" element={
              <ProtectedRoute allowedRoles={['user']}>
                <DashboardLayout>
                  <VideoGuidelines />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Education Routes - User Only */}
            <Route path="/education" element={
              <ProtectedRoute allowedRoles={['user']}>
                <DashboardLayout>
                  <Education />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Reports Routes - User Only */}
            <Route path="/reports" element={
              <ProtectedRoute allowedRoles={['user']}>
                <DashboardLayout>
                  <Reports />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Profile Routes - Both User and Admin */}
            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={['user', 'admin']}>
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute allowedRoles={['user', 'admin']}>
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout>
                  <AdminDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout>
                  <UserManagement />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/content" element={
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout>
                  <ContentManagement />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/analytics" element={
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout>
                  <SystemAnalytics />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;