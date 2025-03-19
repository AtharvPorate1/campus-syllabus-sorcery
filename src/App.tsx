
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Classroom from "./pages/Classroom";
import Syllabus from "./pages/Syllabus";
import Course from "./pages/Course";
import ReviseRoom from "./pages/ReviseRoom";
import TestRoom from "./pages/TestRoom";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/classroom" element={<Classroom />} />
              <Route path="/classroom/syllabus/:id" element={<Syllabus />} />
              <Route path="/classroom/course/:id" element={<Course />} />
              <Route path="/reviseroom" element={<ReviseRoom />} />
              <Route path="/testroom" element={<TestRoom />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
