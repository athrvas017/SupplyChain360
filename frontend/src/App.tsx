import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import FloatingChat from "./components/FloatingChat.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

const Index = lazy(() => import("./pages/Index.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Auth = lazy(() => import("./pages/Auth.tsx"));
const DashboardPage = lazy(() => import("./pages/DashboardPage.tsx"));
const CompliancePage = lazy(() => import("./pages/CompliancePage.tsx"));
const TracePage = lazy(() => import("./pages/TracePage.tsx"));
const RiskDashboardPage = lazy(() => import("./pages/RiskDashboardPage.tsx"));
const RoutesPage = lazy(() => import("./pages/RoutesPage.tsx"));
const GraphLibraryPage = lazy(() => import("./pages/GraphLibraryPage.tsx"));
const IntelligencePage = lazy(() => import("./pages/IntelligencePage.tsx"));
const ResiliencePage = lazy(() => import("./pages/ResiliencePage.tsx"));
const StrategicPage = lazy(() => import("./pages/StrategicPage.tsx"));

import { SupplyChainProvider } from "./context/SupplyChainContext.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SupplyChainProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <FloatingChat />
        <Suspense 
          fallback={
            <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
              <div className="size-10 border-4 border-brand/30 border-t-brand rounded-full animate-spin"></div>
              <p className="text-muted-foreground font-display font-medium text-sm tracking-widest uppercase animate-pulse">
                Initializing Interface...
              </p>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            {/* Trace is public so judges can demo without login */}
            <Route path="/trace" element={<TracePage />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/library" element={<GraphLibraryPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/risk" element={<RiskDashboardPage />} />
              <Route path="/compliance" element={<CompliancePage />} />
              <Route path="/intelligence" element={<IntelligencePage />} />
              <Route path="/resilience" element={<ResiliencePage />} />
              <Route path="/strategic" element={<StrategicPage />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </TooltipProvider>
    </SupplyChainProvider>
  </QueryClientProvider>
);

export default App;
