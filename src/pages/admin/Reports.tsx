import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Download, TrendingUp, Users, BookOpen, Calendar, Award } from "lucide-react";

const Reports = () => {
  const attendanceData = [
    { department: "Computer Science", attendance: 92, students: 524 },
    { department: "Electronics", attendance: 89, students: 486 },
    { department: "Mechanical", attendance: 88, students: 512 },
    { department: "Civil", attendance: 91, students: 445 },
    { department: "Electrical", attendance: 87, students: 398 },
    { department: "Chemical", attendance: 90, students: 380 }
  ];

  const performanceData = [
    { semester: "Sem 1", avgCGPA: 8.2, students: 1200 },
    { semester: "Sem 2", avgCGPA: 8.4, students: 1180 },
    { semester: "Sem 3", avgCGPA: 8.6, students: 1150 },
    { semester: "Sem 4", avgCGPA: 8.7, students: 1120 },
    { semester: "Sem 5", avgCGPA: 8.8, students: 1090 },
    { semester: "Sem 6", avgCGPA: 8.9, students: 1060 }
  ];

  const courseDistribution = [
    { name: "Computer Science", value: 524, color: "#8884d8" },
    { name: "Electronics", value: 486, color: "#82ca9d" },
    { name: "Mechanical", value: 512, color: "#ffc658" },
    { name: "Civil", value: 445, color: "#ff7300" },
    { name: "Electrical", value: 398, color: "#00ff00" },
    { name: "Chemical", value: 380, color: "#ff00ff" }
  ];

  const monthlyStats = [
    { month: "Jan", admissions: 45, graduations: 38, fees: 125000 },
    { month: "Feb", admissions: 52, graduations: 42, fees: 142000 },
    { month: "Mar", admissions: 38, graduations: 35, fees: 118000 },
    { month: "Apr", admissions: 41, graduations: 40, fees: 135000 },
    { month: "May", admissions: 48, graduations: 45, fees: 148000 },
    { month: "Jun", admissions: 55, graduations: 50, fees: 162000 }
  ];

  const facultyStats = [
    { name: "Total Faculty", value: 185, change: "+5%", color: "text-primary" },
    { name: "Active Courses", value: 156, change: "+2%", color: "text-success" },
    { name: "Research Papers", value: 89, change: "+12%", color: "text-warning" },
    { name: "Awards Won", value: 23, change: "+8%", color: "text-destructive" }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">Comprehensive insights into college operations</p>
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {facultyStats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <TrendingUp className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.color}`}>{stat.change} from last period</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="attendance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Department-wise Attendance
                </CardTitle>
                <CardDescription>Average attendance across departments</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="attendance" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Summary</CardTitle>
                <CardDescription>Detailed attendance statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attendanceData.map((dept, index) => (
                    <div key={dept.department} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{dept.department}</p>
                        <p className="text-sm text-muted-foreground">{dept.students} students</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{dept.attendance}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Academic Performance Trend
                </CardTitle>
                <CardDescription>Average CGPA progression over semesters</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semester" />
                    <YAxis domain={[7, 10]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="avgCGPA" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key academic indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData.map((sem) => (
                    <div key={sem.semester} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{sem.semester}</p>
                        <p className="text-sm text-muted-foreground">{sem.students} students</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-success">{sem.avgCGPA}</p>
                        <p className="text-xs text-muted-foreground">Avg CGPA</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="enrollment">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Department Distribution
                </CardTitle>
                <CardDescription>Student enrollment by department</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={courseDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {courseDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enrollment Summary</CardTitle>
                <CardDescription>Department-wise student count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseDistribution.map((dept, index) => (
                    <div key={dept.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <p className="font-medium">{dept.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">{dept.value}</p>
                        <p className="text-xs text-muted-foreground">students</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Monthly Financial Overview
                </CardTitle>
                <CardDescription>Revenue and operations over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="admissions" fill="#8884d8" name="Admissions" />
                    <Bar yAxisId="left" dataKey="graduations" fill="#82ca9d" name="Graduations" />
                    <Bar yAxisId="right" dataKey="fees" fill="#ffc658" name="Fees (₹)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">
                    ₹{monthlyStats.reduce((acc, month) => acc + month.fees, 0).toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">Last 6 months</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Admissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {monthlyStats.reduce((acc, month) => acc + month.admissions, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Last 6 months</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Graduations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-warning">
                    {monthlyStats.reduce((acc, month) => acc + month.graduations, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Last 6 months</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
