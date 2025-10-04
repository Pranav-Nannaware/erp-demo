import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

import Auth from "./pages/Auth";
import StudentLayout from "./components/layouts/StudentLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import FacultyLayout from "./components/layouts/FacultyLayout";
import Dashboard from "./pages/student/Dashboard";
import Attendance from "./pages/student/Attendance";
import Results from "./pages/student/Results";
import Assignments from "./pages/student/Assignments";
import Timetable from "./pages/student/Timetable";
import Notifications from "./pages/student/Notifications";
import Profile from "./pages/student/Profile";
import FeePayment from "./pages/student/FeePayment";
import FeeReceipts from "./pages/student/FeeReceipts";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageAttendance from "./pages/admin/ManageAttendance";
import Announcements from "./pages/admin/Announcements";
import Reports from "./pages/admin/Reports";
import FeeManagement from "./pages/admin/FeeManagement";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import FacultyClasses from "./pages/faculty/FacultyClasses";
import FacultyStudents from "./pages/faculty/FacultyStudents";
import FacultyFeeManagement from "./pages/faculty/FacultyFeeManagement";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          
          {/* Student Routes */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="results" element={<Results />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
            <Route path="fee-payment" element={<FeePayment />} />
            <Route path="fee-receipts" element={<FeeReceipts />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="students" element={<ManageStudents />} />
            <Route path="attendance" element={<ManageAttendance />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="reports" element={<Reports />} />
            <Route path="fee-management" element={<FeeManagement />} />
          </Route>

          {/* Faculty Routes */}
          <Route path="/faculty" element={<FacultyLayout />}>
            <Route index element={<FacultyDashboard />} />
            <Route path="classes" element={<FacultyClasses />} />
            <Route path="students" element={<FacultyStudents />} />
            <Route path="fee-management" element={<FacultyFeeManagement />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
