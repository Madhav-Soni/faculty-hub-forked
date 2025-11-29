import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Faculty from "./pages/Faculty";
import FacultyProfile from "./pages/FacultyProfile";
import NotFound from "./pages/NotFound";
import Department from "./pages/Department";
import DepartmentDetails from "./pages/DepartmentDetails";
import AddFaculty from "./pages/AddFaculty";
import EditFaculty from "./pages/EditFaculty";
import MainLayout from "./components/MainLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/faculty/:id" element={<FacultyProfile />} />
            <Route path="/faculty/edit/:id" element={<EditFaculty />} />
            <Route path="/department" element={<Department />} />
            <Route path="/department/:departmentId" element={<DepartmentDetails />} />
            <Route path="/add-faculty" element={<AddFaculty />} />
          </Route>
          <Route path="/auth" element={<Auth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
