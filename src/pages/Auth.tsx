import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GraduationCap, AlertCircle } from "lucide-react";
import { toast } from "sonner";

// Hardcoded credentials for demo
const DEMO_CREDENTIALS = {
  admin: { email: "admin@college.edu", password: "admin123", name: "Admin User" },
  student: { email: "student@college.edu", password: "student123", name: "John Doe", id: "CS2024001" },
  faculty: { email: "faculty@college.edu", password: "faculty123", name: "Dr. Smith", id: "FAC001" }
};

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    setTimeout(() => {
      // Check credentials
      const user = Object.values(DEMO_CREDENTIALS).find(u => u.email === email && u.password === password);
      
      if (user) {
        localStorage.setItem("userRole", email.includes("admin") ? "admin" : email.includes("faculty") ? "faculty" : "student");
        localStorage.setItem("userName", user.name);
        if (user.id) localStorage.setItem("userId", user.id);
        
        toast.success(`Welcome ${user.name}!`);
        
        if (email.includes("admin")) {
          navigate("/admin");
        } else if (email.includes("faculty")) {
          navigate("/faculty");
        } else {
          navigate("/student");
        }
      } else {
        setError("Invalid email or password. Please check the demo credentials below.");
        toast.error("Invalid credentials");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      toast.success("Registration successful! Please login with demo credentials.");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-subtle p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">CSMSS College of Engineering</h1>
          <p className="text-muted-foreground">Student Portal</p>
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Access your student, faculty, or admin portal</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="student@college.edu"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                  
                  {/* Demo Credentials */}
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Demo Credentials:</h4>
                    <div className="space-y-1 text-xs">
                      <p><strong>Admin:</strong> admin@college.edu / admin123</p>
                      <p><strong>Student:</strong> student@college.edu / student123</p>
                      <p><strong>Faculty:</strong> faculty@college.edu / faculty123</p>
                    </div>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input
                      id="studentId"
                      name="studentId"
                      placeholder="CS2024001"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registerEmail">Email</Label>
                    <Input
                      id="registerEmail"
                      name="email"
                      type="email"
                      placeholder="student@college.edu"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registerPassword">Password</Label>
                    <Input
                      id="registerPassword"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
