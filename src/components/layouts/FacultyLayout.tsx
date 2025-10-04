import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { GraduationCap, Home, BookOpen, Users, LogOut, CreditCard } from "lucide-react";
import { toast } from "sonner";

const FacultyLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const navItems = [
    { to: "/faculty", icon: Home, label: "Dashboard" },
    { to: "/faculty/classes", icon: BookOpen, label: "My Classes" },
    { to: "/faculty/students", icon: Users, label: "Students" },
    { to: "/faculty/fee-management", icon: CreditCard, label: "Fee Management" },
  ];

  const userName = localStorage.getItem("userName") || "Faculty Member";

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
              <p className="text-xs text-muted-foreground">Faculty Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-warning text-warning-foreground">FC</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground">Faculty Member</p>
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
              end={item.to === "/faculty"}
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

export default FacultyLayout;
