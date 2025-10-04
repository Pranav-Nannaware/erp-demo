import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, Edit, Trash2 } from "lucide-react";

const ManageStudents = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const students = [
    { id: "CS2024001", name: "John Doe", department: "Computer Science", semester: 6, cgpa: 8.7, status: "Active" },
    { id: "CS2024002", name: "Jane Smith", department: "Computer Science", semester: 6, cgpa: 9.1, status: "Active" },
    { id: "EC2024015", name: "Mike Johnson", department: "Electronics", semester: 6, cgpa: 8.3, status: "Active" },
    { id: "ME2024022", name: "Sarah Williams", department: "Mechanical", semester: 6, cgpa: 8.9, status: "Active" },
    { id: "CS2024045", name: "David Brown", department: "Computer Science", semester: 6, cgpa: 7.8, status: "Active" },
    { id: "EC2024033", name: "Emily Davis", department: "Electronics", semester: 6, cgpa: 8.5, status: "Active" },
    { id: "CE2024011", name: "Robert Wilson", department: "Civil", semester: 6, cgpa: 8.2, status: "Active" },
    { id: "CS2024087", name: "Lisa Anderson", department: "Computer Science", semester: 6, cgpa: 9.3, status: "Active" },
  ];

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Students</h1>
          <p className="text-muted-foreground mt-1">View and manage student records</p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add New Student
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Student Database</CardTitle>
          <CardDescription>Search and filter through all enrolled students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Students Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-center">Semester</TableHead>
                  <TableHead className="text-center">CGPA</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell className="text-center">{student.semester}</TableCell>
                    <TableCell className="text-center font-semibold">{student.cgpa}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="default" className="bg-success text-success-foreground">
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Edit className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1 text-destructive">
                          <Trash2 className="h-3 w-3" />
                          Delete
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
    </div>
  );
};

export default ManageStudents;
