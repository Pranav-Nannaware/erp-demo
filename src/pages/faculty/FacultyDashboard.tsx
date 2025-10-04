import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Calendar, TrendingUp, Clock, Award } from "lucide-react";

const FacultyDashboard = () => {
  const stats = [
    { title: "Total Classes", value: "12", icon: BookOpen, color: "text-primary" },
    { title: "Total Students", value: "180", icon: Users, color: "text-success" },
    { title: "This Week Classes", value: "8", icon: Calendar, color: "text-warning" },
    { title: "Average Rating", value: "4.8", icon: Award, color: "text-destructive" },
  ];

  const upcomingClasses = [
    { time: "09:00 AM", subject: "Data Structures", room: "Room 301", students: 45 },
    { time: "11:00 AM", subject: "Database Management", room: "Lab 2", students: 42 },
    { time: "02:00 PM", subject: "Web Development", room: "Room 205", students: 38 },
    { time: "04:00 PM", subject: "Software Engineering", room: "Room 108", students: 40 },
  ];

  const recentActivities = [
    { action: "Attendance marked", details: "Data Structures - 45 students present", time: "2 hours ago" },
    { action: "Assignment graded", details: "Web Development - 38 submissions", time: "4 hours ago" },
    { action: "New announcement posted", details: "Mid-term exam schedule", time: "1 day ago" },
    { action: "Student consultation", details: "CS2024001 - John Doe", time: "2 days ago" },
  ];

  const studentPerformance = [
    { name: "Data Structures", avgScore: 85, totalStudents: 45, attendance: 92 },
    { name: "Database Management", avgScore: 82, totalStudents: 42, attendance: 89 },
    { name: "Web Development", avgScore: 88, totalStudents: 38, attendance: 95 },
    { name: "Software Engineering", avgScore: 80, totalStudents: 40, attendance: 87 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Faculty Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your teaching overview.</p>
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
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Classes
            </CardTitle>
            <CardDescription>Your scheduled classes for today</CardDescription>
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
                  <p className="text-xs text-muted-foreground">{class_.students} students enrolled</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>Your recent teaching activities</CardDescription>
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
      </div>

      {/* Student Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Course Performance Overview
          </CardTitle>
          <CardDescription>Student performance across your courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studentPerformance.map((course, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent">
                <div>
                  <h4 className="font-semibold text-foreground">{course.name}</h4>
                  <p className="text-sm text-muted-foreground">{course.totalStudents} students</p>
                </div>
                <div className="text-right space-y-1">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Avg Score</p>
                      <p className="text-sm font-bold text-primary">{course.avgScore}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Attendance</p>
                      <p className="text-sm font-bold text-success">{course.attendance}%</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyDashboard;
