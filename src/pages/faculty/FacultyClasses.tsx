import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, Calendar, Clock, MapPin, Plus } from "lucide-react";

const FacultyClasses = () => {
  const myClasses = [
    {
      id: "CS301",
      name: "Data Structures",
      semester: 6,
      department: "Computer Science",
      students: 45,
      schedule: "Mon, Wed, Fri - 09:00 AM",
      room: "Room 301",
      credits: 4,
      status: "Active"
    },
    {
      id: "CS302",
      name: "Database Management",
      semester: 6,
      department: "Computer Science",
      students: 42,
      schedule: "Tue, Thu - 11:00 AM",
      room: "Lab 2",
      credits: 3,
      status: "Active"
    },
    {
      id: "CS303",
      name: "Web Development",
      semester: 6,
      department: "Computer Science",
      students: 38,
      schedule: "Mon, Wed - 02:00 PM",
      room: "Room 205",
      credits: 4,
      status: "Active"
    },
    {
      id: "CS304",
      name: "Software Engineering",
      semester: 6,
      department: "Computer Science",
      students: 40,
      schedule: "Tue, Thu - 04:00 PM",
      room: "Room 108",
      credits: 3,
      status: "Active"
    }
  ];

  const upcomingSessions = [
    {
      class: "Data Structures",
      date: "Today",
      time: "09:00 AM",
      room: "Room 301",
      topic: "Binary Trees Implementation",
      students: 45
    },
    {
      class: "Database Management",
      date: "Today",
      time: "11:00 AM",
      room: "Lab 2",
      topic: "SQL Joins and Subqueries",
      students: 42
    },
    {
      class: "Web Development",
      date: "Tomorrow",
      time: "02:00 PM",
      room: "Room 205",
      topic: "React Hooks and State Management",
      students: 38
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success text-success-foreground";
      case "Inactive": return "bg-muted text-muted-foreground";
      default: return "bg-warning text-warning-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Classes</h1>
          <p className="text-muted-foreground mt-1">Manage your courses and teaching schedule</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Class
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Class Overview</TabsTrigger>
          <TabsTrigger value="schedule">Today's Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                My Courses
              </CardTitle>
              <CardDescription>All courses you are currently teaching</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course Code</TableHead>
                      <TableHead>Course Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead className="text-center">Semester</TableHead>
                      <TableHead className="text-center">Students</TableHead>
                      <TableHead className="text-center">Credits</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myClasses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.id}</TableCell>
                        <TableCell>{course.name}</TableCell>
                        <TableCell>{course.department}</TableCell>
                        <TableCell className="text-center">{course.semester}</TableCell>
                        <TableCell className="text-center">{course.students}</TableCell>
                        <TableCell className="text-center">{course.credits}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={getStatusColor(course.status)}>
                            {course.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Today's Classes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Sessions
                </CardTitle>
                <CardDescription>Your scheduled classes for today and tomorrow</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingSessions.map((session, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-3 rounded-lg bg-accent"
                  >
                    <div className="flex flex-col items-center justify-center min-w-[80px] h-16 bg-primary text-primary-foreground rounded-md">
                      <span className="text-xs font-semibold">Time</span>
                      <span className="text-sm font-bold">{session.time}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{session.class}</h4>
                      <p className="text-sm text-muted-foreground">{session.topic}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {session.room}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {session.students} students
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {session.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Common teaching tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start gap-2">
                  <Users className="h-4 w-4" />
                  Mark Attendance
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <BookOpen className="h-4 w-4" />
                  Upload Assignment
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule Class
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Users className="h-4 w-4" />
                  View Student List
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FacultyClasses;
