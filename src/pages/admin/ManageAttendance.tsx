import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Save } from "lucide-react";
import { toast } from "sonner";

const ManageAttendance = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const students = [
    { id: "CS2024001", name: "John Doe", rollNo: "2024001" },
    { id: "CS2024002", name: "Jane Smith", rollNo: "2024002" },
    { id: "CS2024003", name: "Mike Johnson", rollNo: "2024003" },
    { id: "CS2024004", name: "Sarah Williams", rollNo: "2024004" },
    { id: "CS2024005", name: "David Brown", rollNo: "2024005" },
    { id: "CS2024006", name: "Emily Davis", rollNo: "2024006" },
    { id: "CS2024007", name: "Robert Wilson", rollNo: "2024007" },
    { id: "CS2024008", name: "Lisa Anderson", rollNo: "2024008" },
  ];

  const [attendance, setAttendance] = useState<Record<string, boolean>>(
    students.reduce((acc, student) => ({ ...acc, [student.id]: false }), {})
  );

  const handleAttendanceChange = (studentId: string, checked: boolean) => {
    setAttendance((prev) => ({ ...prev, [studentId]: checked }));
  };

  const handleMarkAllPresent = () => {
    const allPresent = students.reduce((acc, student) => ({ ...acc, [student.id]: true }), {});
    setAttendance(allPresent);
  };

  const handleMarkAllAbsent = () => {
    const allAbsent = students.reduce((acc, student) => ({ ...acc, [student.id]: false }), {});
    setAttendance(allAbsent);
  };

  const handleSaveAttendance = () => {
    const presentCount = Object.values(attendance).filter(Boolean).length;
    toast.success(`Attendance saved! ${presentCount} students marked present.`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manage Attendance</h1>
        <p className="text-muted-foreground mt-1">Mark and track student attendance for classes</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Select Class Details
          </CardTitle>
          <CardDescription>Choose department, semester, and subject to mark attendance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="ec">Electronics</SelectItem>
                  <SelectItem value="me">Mechanical</SelectItem>
                  <SelectItem value="ce">Civil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Semester</label>
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Semester 1</SelectItem>
                  <SelectItem value="2">Semester 2</SelectItem>
                  <SelectItem value="3">Semester 3</SelectItem>
                  <SelectItem value="4">Semester 4</SelectItem>
                  <SelectItem value="5">Semester 5</SelectItem>
                  <SelectItem value="6">Semester 6</SelectItem>
                  <SelectItem value="7">Semester 7</SelectItem>
                  <SelectItem value="8">Semester 8</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ds">Data Structures</SelectItem>
                  <SelectItem value="dbms">Database Management</SelectItem>
                  <SelectItem value="web">Web Development</SelectItem>
                  <SelectItem value="os">Operating Systems</SelectItem>
                  <SelectItem value="cn">Computer Networks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Mark Attendance</CardTitle>
              <CardDescription>Check the boxes to mark students as present</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleMarkAllPresent}>
                Mark All Present
              </Button>
              <Button variant="outline" size="sm" onClick={handleMarkAllAbsent}>
                Mark All Absent
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Present</TableHead>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Checkbox
                        checked={attendance[student.id]}
                        onCheckedChange={(checked) => handleAttendanceChange(student.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{student.rollNo}</TableCell>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              {Object.values(attendance).filter(Boolean).length} out of {students.length} students present
            </p>
            <Button onClick={handleSaveAttendance} className="gap-2">
              <Save className="h-4 w-4" />
              Save Attendance
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageAttendance;
