import { useState } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { GraduationCap, Home, Users, FileText, User, LogOut, BookOpen, Calendar, Bell, CreditCard, Receipt } from "lucide-react";
import { toast } from "sonner";

const StudentLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const navItems = [
    { to: "/student", icon: Home, label: "Dashboard" },
    { to: "/student/attendance", icon: Users, label: "Attendance" },
    { to: "/student/results", icon: FileText, label: "Results" },
    { to: "/student/assignments", icon: BookOpen, label: "Assignments" },
    { to: "/student/timetable", icon: Calendar, label: "Timetable" },
    { to: "/student/fee-payment", icon: CreditCard, label: "Fee Payment" },
    { to: "/student/fee-receipts", icon: Receipt, label: "Fee Receipts" },
    { to: "/student/notifications", icon: Bell, label: "Notifications" },
    { to: "/student/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card shadow-soft">
        <div className="flex h-16 items-center px-6 justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">CSMSS COE</h1>
              <p className="text-xs text-muted-foreground">Student Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-foreground">John Doe</p>
                <p className="text-xs text-muted-foreground">CS2024001</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Secondary Navigation */}
      <nav className="sticky top-16 z-40 w-full border-b border-border bg-card">
        <div className="flex h-14 items-center px-6 gap-6 overflow-x-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/student"}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors border-b-2 ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
