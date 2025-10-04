import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Receipt, Search, Calendar, DollarSign, Users, FileText, TrendingUp } from "lucide-react";

interface StudentFeeInfo {
  id: string;
  studentId: string;
  studentName: string;
  department: string;
  semester: string;
  course: string;
  feeName: string;
  amount: number;
  paidAmount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue' | 'partial';
  paidDate?: string;
  receiptNo?: string;
}

interface CourseFeeSummary {
  courseName: string;
  totalStudents: number;
  paidStudents: number;
  pendingStudents: number;
  overdueStudents: number;
  totalAmount: number;
  collectedAmount: number;
  pendingAmount: number;
}

const FacultyFeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data for faculty's students
  const studentFees: StudentFeeInfo[] = [
    {
      id: "1",
      studentId: "CS2024001",
      studentName: "John Doe",
      department: "Computer Science",
      semester: "Semester 1",
      course: "Data Structures",
      feeName: "Tuition Fee - Semester 1",
      amount: 45000,
      paidAmount: 45000,
      dueDate: "2024-03-15",
      status: "paid",
      paidDate: "2024-01-15",
      receiptNo: "RCP-2024-001"
    },
    {
      id: "2",
      studentId: "CS2024002",
      studentName: "Jane Smith",
      department: "Computer Science",
      semester: "Semester 1",
      course: "Data Structures",
      feeName: "Tuition Fee - Semester 1",
      amount: 45000,
      paidAmount: 0,
      dueDate: "2024-03-15",
      status: "pending"
    },
    {
      id: "3",
      studentId: "CS2024003",
      studentName: "Mike Johnson",
      department: "Computer Science",
      semester: "Semester 1",
      course: "Data Structures",
      feeName: "Tuition Fee - Semester 1",
      amount: 45000,
      paidAmount: 22500,
      dueDate: "2024-03-15",
      status: "partial"
    },
    {
      id: "4",
      studentId: "CS2024004",
      studentName: "Sarah Wilson",
      department: "Computer Science",
      semester: "Semester 1",
      course: "Database Management",
      feeName: "Tuition Fee - Semester 1",
      amount: 45000,
      paidAmount: 45000,
      dueDate: "2024-03-15",
      status: "paid",
      paidDate: "2024-01-20",
      receiptNo: "RCP-2024-002"
    },
    {
      id: "5",
      studentId: "CS2024005",
      studentName: "David Brown",
      department: "Computer Science",
      semester: "Semester 1",
      course: "Database Management",
      feeName: "Tuition Fee - Semester 1",
      amount: 45000,
      paidAmount: 0,
      dueDate: "2024-02-28",
      status: "overdue"
    },
    {
      id: "6",
      studentId: "CS2024006",
      studentName: "Emily Davis",
      department: "Computer Science",
      semester: "Semester 1",
      course: "Web Development",
      feeName: "Tuition Fee - Semester 1",
      amount: 45000,
      paidAmount: 45000,
      dueDate: "2024-03-15",
      status: "paid",
      paidDate: "2024-01-25",
      receiptNo: "RCP-2024-003"
    }
  ];

  const courseFeeSummary: CourseFeeSummary[] = [
    {
      courseName: "Data Structures",
      totalStudents: 3,
      paidStudents: 1,
      pendingStudents: 1,
      overdueStudents: 0,
      totalAmount: 135000,
      collectedAmount: 67500,
      pendingAmount: 67500
    },
    {
      courseName: "Database Management",
      totalStudents: 2,
      paidStudents: 1,
      pendingStudents: 0,
      overdueStudents: 1,
      totalAmount: 90000,
      collectedAmount: 45000,
      pendingAmount: 45000
    },
    {
      courseName: "Web Development",
      totalStudents: 1,
      paidStudents: 1,
      pendingStudents: 0,
      overdueStudents: 0,
      totalAmount: 45000,
      collectedAmount: 45000,
      pendingAmount: 0
    }
  ];

  const filteredStudentFees = studentFees.filter(fee => {
    const matchesSearch = fee.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fee.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fee.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === "all" || fee.course === filterCourse;
    const matchesStatus = filterStatus === "all" || fee.status === filterStatus;
    
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const courses = [...new Set(studentFees.map(f => f.course))];
  const totalStudents = studentFees.length;
  const paidStudents = studentFees.filter(f => f.status === 'paid').length;
  const pendingStudents = studentFees.filter(f => f.status === 'pending').length;
  const overdueStudents = studentFees.filter(f => f.status === 'overdue').length;
  const totalAmount = studentFees.reduce((sum, f) => sum + f.amount, 0);
  const collectedAmount = studentFees.reduce((sum, f) => sum + f.paidAmount, 0);
  const pendingAmount = totalAmount - collectedAmount;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Student Fee Management</h1>
        <p className="text-muted-foreground mt-1">Monitor your students' fee payments and academic progress</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">Students in your courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Students</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paidStudents}</div>
            <p className="text-xs text-muted-foreground">
              {totalStudents > 0 ? Math.round((paidStudents / totalStudents) * 100) : 0}% payment rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Fees</CardTitle>
            <Calendar className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{pendingAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {pendingStudents + overdueStudents} students pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collected Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{collectedAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {totalAmount > 0 ? Math.round((collectedAmount / totalAmount) * 100) : 0}% collection rate
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="student-fees" className="space-y-6">
        <TabsList>
          <TabsTrigger value="student-fees">Student Fees</TabsTrigger>
          <TabsTrigger value="course-summary">Course Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="student-fees" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search & Filter Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Course</label>
                  <Select value={filterCourse} onValueChange={setFilterCourse}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Courses</SelectItem>
                      {courses.map(course => (
                        <SelectItem key={course} value={course}>{course}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Payment Status</label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                      <SelectItem value="partial">Partial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Results</label>
                  <div className="flex items-center h-10 px-3 py-2 text-sm bg-muted rounded-md">
                    {filteredStudentFees.length} student{filteredStudentFees.length !== 1 ? 's' : ''} found
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Student Fees List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Student Fee Status
              </CardTitle>
              <CardDescription>Monitor your students' fee payment status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredStudentFees.map((fee) => (
                  <div key={fee.id} className="border rounded-lg p-6 hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">{fee.studentName}</h3>
                          <Badge className={getStatusColor(fee.status)}>
                            {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {fee.studentId} • {fee.department} • {fee.semester}
                        </p>
                        <p className="text-sm font-medium">{fee.course}</p>
                        <p className="text-sm text-muted-foreground">{fee.feeName}</p>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="text-2xl font-bold">₹{fee.amount.toLocaleString()}</div>
                        {fee.paidAmount > 0 && (
                          <div className="text-sm text-success">
                            Paid: ₹{fee.paidAmount.toLocaleString()}
                          </div>
                        )}
                        {fee.status === 'partial' && (
                          <div className="text-sm text-warning">
                            Remaining: ₹{(fee.amount - fee.paidAmount).toLocaleString()}
                          </div>
                        )}
                        <div className="text-sm text-muted-foreground">
                          Due: {new Date(fee.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {fee.receiptNo && (
                          <span>Receipt: {fee.receiptNo}</span>
                        )}
                        {fee.paidDate && (
                          <span>Paid: {new Date(fee.paidDate).toLocaleDateString()}</span>
                        )}
                        <span>Course: {fee.course}</span>
                      </div>
                      <div className="flex gap-2">
                        {fee.status === 'paid' && fee.receiptNo && (
                          <Button variant="outline" size="sm">
                            <Receipt className="h-4 w-4 mr-2" />
                            View Receipt
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Student Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="course-summary" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Course-wise Fee Summary
              </CardTitle>
              <CardDescription>Fee collection summary for each of your courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {courseFeeSummary.map((course, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold">{course.courseName}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Total Students: {course.totalStudents}</span>
                          <span>Paid: {course.paidStudents}</span>
                          <span>Pending: {course.pendingStudents}</span>
                          <span>Overdue: {course.overdueStudents}</span>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="text-2xl font-bold">₹{course.totalAmount.toLocaleString()}</div>
                        <div className="text-sm text-success">
                          Collected: ₹{course.collectedAmount.toLocaleString()}
                        </div>
                        <div className="text-sm text-warning">
                          Pending: ₹{course.pendingAmount.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Collection Rate</span>
                        <span className="font-semibold">
                          {course.totalAmount > 0 ? Math.round((course.collectedAmount / course.totalAmount) * 100) : 0}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-success h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${course.totalAmount > 0 ? (course.collectedAmount / course.totalAmount) * 100 : 0}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FacultyFeeManagement;
