
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Members from "./pages/Members";
import Dues from "./pages/Dues";
import Fundraisers from "./pages/Fundraisers";
import Messages from "./pages/Messages";
import MessageBoard from "./pages/MessageBoard";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import ExternalPayment from "./pages/ExternalPayment";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/message-board" replace />} />
            <Route path="/dashboard" element={<Index />} />
            <Route path="/members" element={<Members />} />
            <Route path="/dues" element={<Dues />} />
            <Route path="/fundraisers" element={<Fundraisers />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/message-board" element={<MessageBoard />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
          {/* External routes (no Layout) */}
          <Route path="/external-payment/:paymentId" element={<ExternalPayment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
