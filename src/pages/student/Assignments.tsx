import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, Clock, CheckCircle, AlertCircle, Calendar } from "lucide-react";

const Assignments = () => {
  const assignments = [
    {
      id: "ASG001",
      title: "Data Structures - Binary Tree Implementation",
      course: "CS301",
      courseName: "Data Structures",
      dueDate: "2024-03-15",
      status: "submitted",
      submittedDate: "2024-03-14",
      score: 85,
      maxScore: 100,
      description: "Implement a binary tree with insertion, deletion, and traversal methods.",
      attachments: 2
    },
    {
      id: "ASG002",
      title: "Database Design - ER Diagram",
      course: "CS302",
      courseName: "Database Management",
      dueDate: "2024-03-20",
      status: "pending",
      submittedDate: null,
      score: null,
      maxScore: 100,
      description: "Create an ER diagram for a library management system.",
      attachments: 0
    },
    {
      id: "ASG003",
      title: "Web Development - React Portfolio",
      course: "CS303",
      courseName: "Web Development",
      dueDate: "2024-03-18",
      status: "overdue",
      submittedDate: null,
      score: null,
      maxScore: 100,
      description: "Build a personal portfolio website using React.",
      attachments: 0
    },
    {
      id: "ASG004",
      title: "Software Engineering - Project Plan",
      course: "CS304",
      courseName: "Software Engineering",
      dueDate: "2024-03-25",
      status: "submitted",
      submittedDate: "2024-03-24",
      score: 92,
      maxScore: 100,
      description: "Create a detailed project plan for a software development project.",
      attachments: 3
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted": return "bg-success text-success-foreground";
      case "pending": return "bg-warning text-warning-foreground";
      case "overdue": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted": return <CheckCircle className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      case "overdue": return <AlertCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const pendingAssignments = assignments.filter(a => a.status === "pending" || a.status === "overdue");
  const submittedAssignments = assignments.filter(a => a.status === "submitted");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Assignments</h1>
        <p className="text-muted-foreground mt-1">Track your assignments and submissions</p>
      </div>

      {/* Assignment Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Submitted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{submittedAssignments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{pendingAssignments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {submittedAssignments.length > 0 
                ? Math.round(submittedAssignments.reduce((acc, a) => acc + (a.score || 0), 0) / submittedAssignments.length)
                : 0}%
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Assignments</TabsTrigger>
          <TabsTrigger value="submitted">Submitted Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Pending Assignments
              </CardTitle>
              <CardDescription>Assignments that need to be completed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingAssignments.map((assignment) => (
                  <div key={assignment.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-foreground">{assignment.title}</h3>
                        <p className="text-sm text-muted-foreground">{assignment.courseName} - {assignment.course}</p>
                        <p className="text-sm text-muted-foreground">{assignment.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(assignment.status)}>
                          {getStatusIcon(assignment.status)}
                          <span className="ml-1 capitalize">{assignment.status}</span>
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </span>
                        <span>Max Score: {assignment.maxScore}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm" className="gap-2">
                          <Upload className="h-4 w-4" />
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submitted">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Submitted Assignments
              </CardTitle>
              <CardDescription>Your completed assignments and grades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Submitted Date</TableHead>
                      <TableHead className="text-center">Score</TableHead>
                      <TableHead className="text-center">Attachments</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submittedAssignments.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{assignment.title}</div>
                            <div className="text-sm text-muted-foreground">{assignment.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{assignment.courseName}</Badge>
                        </TableCell>
                        <TableCell>
                          {assignment.submittedDate ? new Date(assignment.submittedDate).toLocaleDateString() : '-'}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="space-y-1">
                            <div className="font-semibold text-primary">
                              {assignment.score}/{assignment.maxScore}
                            </div>
                            <Progress 
                              value={(assignment.score || 0) / assignment.maxScore * 100} 
                              className="h-1 w-16 mx-auto" 
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {assignment.attachments} files
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
      </Tabs>
    </div>
  );
};

export default Assignments;
