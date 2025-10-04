import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, GraduationCap, Calendar, TrendingUp, Award } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Students", value: "2,845", icon: Users, color: "text-primary" },
    { title: "Total Faculty", value: "185", icon: GraduationCap, color: "text-success" },
    { title: "Active Courses", value: "156", icon: BookOpen, color: "text-warning" },
    { title: "Departments", value: "12", icon: Award, color: "text-destructive" },
  ];

  const recentActivities = [
    { action: "New student registration", details: "CS2024156 - Sarah Johnson", time: "5 mins ago" },
    { action: "Attendance marked", details: "Computer Networks - Room 305", time: "15 mins ago" },
    { action: "Results published", details: "Semester 5 - All departments", time: "1 hour ago" },
    { action: "Fee payment received", details: "EC2023089 - Payment ID: PAY123456", time: "2 hours ago" },
    { action: "New announcement posted", details: "Sports Day - March 25, 2024", time: "3 hours ago" },
  ];

  const departmentStats = [
    { name: "Computer Science", students: 524, avgAttendance: "92%" },
    { name: "Electronics", students: 486, avgAttendance: "89%" },
    { name: "Mechanical", students: 512, avgAttendance: "88%" },
    { name: "Civil", students: 445, avgAttendance: "91%" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of college operations and statistics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
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
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex flex-col gap-1 pb-4 border-b border-border last:border-0 last:pb-0"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="font-medium text-sm text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.details}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Department Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Department Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {departmentStats.map((dept, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-accent"
              >
                <div>
                  <h4 className="font-semibold text-foreground">{dept.name}</h4>
                  <p className="text-sm text-muted-foreground">{dept.students} students</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-success">Avg. Attendance</p>
                  <p className="text-lg font-bold text-success">{dept.avgAttendance}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
