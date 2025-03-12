
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Members from "./pages/Members";
import Dues from "./pages/Dues";
import Fundraisers from "./pages/Fundraisers";
import Messages from "./pages/Messages";
import MessageBoard from "./pages/MessageBoard";
import AdminPanel from "./pages/AdminPanel";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ExternalPayment from "./pages/ExternalPayment";
import Auth from "./pages/Auth";
import VerifyEmail from "./pages/VerifyEmail";
import AuthLayout from "./components/layout/AuthLayout";
import UserProfile from "./pages/UserProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth routes with AuthLayout */}
            <Route element={<AuthLayout />}>
              <Route path="/auth" element={<Auth />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
            </Route>
            
            {/* Main app routes with Layout */}
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/message-board" replace />} />
              <Route path="/dashboard" element={<Index />} />
              <Route path="/members" element={<Members />} />
              <Route path="/dues" element={<Dues />} />
              <Route path="/fundraisers" element={<Fundraisers />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/message-board" element={<MessageBoard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:username" element={<UserProfile />} />
            </Route>
            
            {/* External routes (no Layout) */}
            <Route path="/external-payment/:paymentId" element={<ExternalPayment />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
