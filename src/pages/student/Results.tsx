import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp } from "lucide-react";

const Results = () => {
  const currentSemester = {
    subjects: [
      { code: "CS301", name: "Data Structures", mid: 85, end: 88, internal: 92, total: 88, grade: "A+" },
      { code: "CS302", name: "Database Management", mid: 78, end: 82, internal: 88, total: 82, grade: "A" },
      { code: "CS303", name: "Web Development", mid: 92, end: 90, internal: 95, total: 91, grade: "A+" },
      { code: "CS304", name: "Operating Systems", mid: 80, end: 85, internal: 90, total: 84, grade: "A" },
      { code: "CS305", name: "Computer Networks", mid: 88, end: 86, internal: 89, total: 87, grade: "A+" },
      { code: "CS306", name: "Software Engineering", mid: 82, end: 84, internal: 87, total: 84, grade: "A" },
    ],
    cgpa: 8.7,
    sgpa: 8.9,
  };

  const previousSemesters = [
    { semester: "Semester 5", sgpa: 8.5, cgpa: 8.6 },
    { semester: "Semester 4", sgpa: 8.8, cgpa: 8.7 },
    { semester: "Semester 3", sgpa: 8.6, cgpa: 8.5 },
    { semester: "Semester 2", sgpa: 8.4, cgpa: 8.3 },
    { semester: "Semester 1", sgpa: 8.2, cgpa: 8.2 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Examination Results</h1>
        <p className="text-muted-foreground mt-1">View your academic performance and grades</p>
      </div>

      {/* CGPA Overview */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Current CGPA
            </CardTitle>
            <CardDescription>Cumulative Grade Point Average</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">{currentSemester.cgpa}</div>
            <p className="text-sm text-muted-foreground mt-2">Out of 10.0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Semester SGPA</CardTitle>
            <CardDescription>Semester Grade Point Average</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-success">{currentSemester.sgpa}</div>
            <p className="text-sm text-muted-foreground mt-2">Semester 6</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Semester</TabsTrigger>
          <TabsTrigger value="previous">Previous Semesters</TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          <Card>
            <CardHeader>
              <CardTitle>Semester 6 Results</CardTitle>
              <CardDescription>Detailed marks and grades for current semester</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Code</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="text-center">Mid-Term</TableHead>
                    <TableHead className="text-center">End-Term</TableHead>
                    <TableHead className="text-center">Internal</TableHead>
                    <TableHead className="text-center">Total</TableHead>
                    <TableHead className="text-center">Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentSemester.subjects.map((subject) => (
                    <TableRow key={subject.code}>
                      <TableCell className="font-medium">{subject.code}</TableCell>
                      <TableCell>{subject.name}</TableCell>
                      <TableCell className="text-center">{subject.mid}</TableCell>
                      <TableCell className="text-center">{subject.end}</TableCell>
                      <TableCell className="text-center">{subject.internal}</TableCell>
                      <TableCell className="text-center font-semibold">{subject.total}</TableCell>
                      <TableCell className="text-center">
                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full bg-success text-success-foreground">
                          {subject.grade}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="previous">
          <Card>
            <CardHeader>
              <CardTitle>Academic History</CardTitle>
              <CardDescription>Performance across all previous semesters</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Semester</TableHead>
                    <TableHead className="text-center">SGPA</TableHead>
                    <TableHead className="text-center">CGPA</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previousSemesters.map((sem) => (
                    <TableRow key={sem.semester}>
                      <TableCell className="font-medium">{sem.semester}</TableCell>
                      <TableCell className="text-center">{sem.sgpa}</TableCell>
                      <TableCell className="text-center font-semibold">{sem.cgpa}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Results;
