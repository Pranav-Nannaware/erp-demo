import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Book, Calendar, FileText, GraduationCap, TrendingUp, Users, CreditCard, Receipt } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const quickStats = [
    { title: "Attendance", value: "92%", icon: Users, color: "text-success" },
    { title: "CGPA", value: "8.7", icon: TrendingUp, color: "text-primary" },
    { title: "Courses", value: "6", icon: Book, color: "text-warning" },
    { title: "Pending Fees", value: "₹52,000", icon: CreditCard, color: "text-destructive" },
  ];

  const upcomingClasses = [
    { time: "09:00 AM", subject: "Data Structures", room: "Room 301" },
    { time: "11:00 AM", subject: "Database Management", room: "Lab 2" },
    { time: "02:00 PM", subject: "Web Development", room: "Room 205" },
  ];

  const recentAnnouncements = [
    {
      title: "Mid-Semester Exams",
      date: "Posted 2 hours ago",
      content: "Mid-semester examinations will be conducted from March 15-22. Check your timetable.",
    },
    {
      title: "Workshop on Machine Learning",
      date: "Posted 5 hours ago",
      content: "A hands-on workshop on ML fundamentals will be held on Saturday, 10 AM at Seminar Hall.",
    },
    {
      title: "Library Hours Extended",
      date: "Posted 1 day ago",
      content: "Library will remain open until 10 PM during exam weeks.",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome Back, Student!</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening with your academics today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingClasses.map((class_, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-3 rounded-lg bg-accent"
              >
                <div className="flex flex-col items-center justify-center min-w-[80px] h-16 bg-primary text-primary-foreground rounded-md">
                  <span className="text-xs font-semibold">Time</span>
                  <span className="text-sm font-bold">{class_.time}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{class_.subject}</h4>
                  <p className="text-sm text-muted-foreground">{class_.room}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Fee Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Fee Status
            </CardTitle>
            <CardDescription>Your fee payment status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-accent">
                <div>
                  <h4 className="font-semibold text-foreground">Tuition Fee - Semester 1</h4>
                  <p className="text-sm text-muted-foreground">Due: Mar 15, 2024</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-destructive">₹45,000</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-accent">
                <div>
                  <h4 className="font-semibold text-foreground">Library Fee</h4>
                  <p className="text-sm text-muted-foreground">Due: Mar 20, 2024</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-destructive">₹2,000</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-accent">
                <div>
                  <h4 className="font-semibold text-foreground">Laboratory Fee</h4>
                  <p className="text-sm text-muted-foreground">Due: Mar 25, 2024</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-destructive">₹5,000</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button asChild className="flex-1">
                <Link to="/student/fee-payment">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay Fees
                </Link>
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link to="/student/fee-receipts">
                  <Receipt className="h-4 w-4 mr-2" />
                  View Receipts
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Assignments
            </CardTitle>
            <CardDescription>Your pending assignments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-accent">
                <div>
                  <h4 className="font-semibold text-foreground">Data Structures Assignment</h4>
                  <p className="text-sm text-muted-foreground">Due: Mar 18, 2024</p>
                </div>
                <Badge variant="destructive">Pending</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-accent">
                <div>
                  <h4 className="font-semibold text-foreground">Database Design Project</h4>
                  <p className="text-sm text-muted-foreground">Due: Mar 22, 2024</p>
                </div>
                <Badge variant="destructive">Pending</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-accent">
                <div>
                  <h4 className="font-semibold text-foreground">Web Development Lab</h4>
                  <p className="text-sm text-muted-foreground">Due: Mar 25, 2024</p>
                </div>
                <Badge variant="destructive">Pending</Badge>
              </div>
            </div>
            <Button asChild className="w-full">
              <Link to="/student/assignments">
                <FileText className="h-4 w-4 mr-2" />
                View All Assignments
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Recent Announcements
            </CardTitle>
            <CardDescription>Latest updates from college</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAnnouncements.map((announcement, index) => (
              <div key={index} className="border-b border-border last:border-0 pb-4 last:pb-0">
                <h4 className="font-semibold text-foreground">{announcement.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{announcement.date}</p>
                <p className="text-sm text-muted-foreground">{announcement.content}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
