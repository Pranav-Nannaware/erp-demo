import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Filter, Mail, Phone, Award, TrendingUp } from "lucide-react";

const FacultyStudents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const courses = [
    { id: "CS301", name: "Data Structures" },
    { id: "CS302", name: "Database Management" },
    { id: "CS303", name: "Web Development" },
    { id: "CS304", name: "Software Engineering" }
  ];

  const students = [
    {
      id: "CS2024001",
      name: "John Doe",
      email: "john.doe@college.edu",
      phone: "+91 98765 43210",
      course: "CS301",
      attendance: 92,
      assignments: 8,
      totalAssignments: 10,
      avgScore: 85,
      lastActive: "2 hours ago"
    },
    {
      id: "CS2024002",
      name: "Jane Smith",
      email: "jane.smith@college.edu",
      phone: "+91 98765 43211",
      course: "CS301",
      attendance: 88,
      assignments: 9,
      totalAssignments: 10,
      avgScore: 92,
      lastActive: "1 hour ago"
    },
    {
      id: "CS2024003",
      name: "Mike Johnson",
      email: "mike.johnson@college.edu",
      phone: "+91 98765 43212",
      course: "CS302",
      attendance: 95,
      assignments: 7,
      totalAssignments: 10,
      avgScore: 78,
      lastActive: "3 hours ago"
    },
    {
      id: "CS2024004",
      name: "Sarah Williams",
      email: "sarah.williams@college.edu",
      phone: "+91 98765 43213",
      course: "CS303",
      attendance: 90,
      assignments: 10,
      totalAssignments: 10,
      avgScore: 88,
      lastActive: "30 mins ago"
    },
    {
      id: "CS2024005",
      name: "David Brown",
      email: "david.brown@college.edu",
      phone: "+91 98765 43214",
      course: "CS304",
      attendance: 85,
      assignments: 6,
      totalAssignments: 10,
      avgScore: 82,
      lastActive: "1 day ago"
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = !selectedCourse || student.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-primary";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return "text-success";
    if (attendance >= 75) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Students</h1>
        <p className="text-muted-foreground mt-1">View and manage students in your courses</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Students
          </CardTitle>
          <CardDescription>Search and filter students by course or name</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Courses</SelectItem>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
          <CardDescription>
            {filteredStudents.length} students found
            {selectedCourse && ` in ${courses.find(c => c.id === selectedCourse)?.name}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead className="text-center">Attendance</TableHead>
                  <TableHead className="text-center">Assignments</TableHead>
                  <TableHead className="text-center">Avg Score</TableHead>
                  <TableHead className="text-center">Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          {student.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {student.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {courses.find(c => c.id === student.course)?.name}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="space-y-1">
                        <div className={`font-semibold ${getAttendanceColor(student.attendance)}`}>
                          {student.attendance}%
                        </div>
                        <Progress value={student.attendance} className="h-1 w-16 mx-auto" />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="space-y-1">
                        <div className="font-semibold">
                          {student.assignments}/{student.totalAssignments}
                        </div>
                        <Progress 
                          value={(student.assignments / student.totalAssignments) * 100} 
                          className="h-1 w-16 mx-auto" 
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className={`font-semibold ${getPerformanceColor(student.avgScore)}`}>
                        {student.avgScore}%
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-sm text-muted-foreground">
                      {student.lastActive}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {Math.round(filteredStudents.reduce((acc, s) => acc + s.attendance, 0) / filteredStudents.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Across all students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {Math.round(filteredStudents.reduce((acc, s) => acc + s.avgScore, 0) / filteredStudents.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Assignment performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Assignment Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {Math.round(filteredStudents.reduce((acc, s) => (s.assignments / s.totalAssignments) * 100, 0) / filteredStudents.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Overall completion rate</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacultyStudents;
