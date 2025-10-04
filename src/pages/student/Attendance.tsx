import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

const Attendance = () => {
  const attendanceData = [
    { subject: "Data Structures", present: 42, total: 45, percentage: 93.3 },
    { subject: "Database Management", present: 38, total: 45, percentage: 84.4 },
    { subject: "Web Development", present: 44, total: 45, percentage: 97.8 },
    { subject: "Operating Systems", present: 40, total: 45, percentage: 88.9 },
    { subject: "Computer Networks", present: 41, total: 45, percentage: 91.1 },
    { subject: "Software Engineering", present: 39, total: 45, percentage: 86.7 },
  ];

  const recentAttendance = [
    { date: "Mar 10, 2024", subject: "Data Structures", status: "present" },
    { date: "Mar 10, 2024", subject: "Web Development", status: "present" },
    { date: "Mar 09, 2024", subject: "Database Management", status: "absent" },
    { date: "Mar 09, 2024", subject: "Operating Systems", status: "present" },
    { date: "Mar 08, 2024", subject: "Computer Networks", status: "present" },
  ];

  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return "text-success";
    if (percentage >= 75) return "text-warning";
    return "text-destructive";
  };

  const getStatusIcon = (status: string) => {
    if (status === "present") return <CheckCircle2 className="h-5 w-5 text-success" />;
    if (status === "absent") return <XCircle className="h-5 w-5 text-destructive" />;
    return <AlertCircle className="h-5 w-5 text-warning" />;
  };

  const overallPercentage = attendanceData.reduce((acc, curr) => acc + curr.percentage, 0) / attendanceData.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Attendance</h1>
        <p className="text-muted-foreground mt-1">Track your class attendance and performance</p>
      </div>

      {/* Overall Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Attendance</CardTitle>
          <CardDescription>Your cumulative attendance across all subjects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-4xl font-bold ${getStatusColor(overallPercentage)}`}>
              {overallPercentage.toFixed(1)}%
            </span>
            <span className="text-muted-foreground">
              Required: 75%
            </span>
          </div>
          <Progress value={overallPercentage} className="h-3" />
        </CardContent>
      </Card>

      {/* Subject-wise Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Subject-wise Attendance</CardTitle>
          <CardDescription>Detailed attendance breakdown for each subject</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attendanceData.map((item) => (
              <div key={item.subject} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{item.subject}</span>
                  <span className={`font-semibold ${getStatusColor(item.percentage)}`}>
                    {item.percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{item.present} / {item.total} classes</span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance</CardTitle>
          <CardDescription>Your attendance records for the past few days</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAttendance.map((record, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{record.date}</TableCell>
                  <TableCell>{record.subject}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(record.status)}
                      <span className="capitalize">{record.status}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Attendance;
