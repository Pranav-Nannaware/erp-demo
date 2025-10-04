import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Receipt, Plus, Search, Calendar, DollarSign, Users, FileText, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface FeeStructure {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  academicYear: string;
  semester: string;
  department: string;
  description: string;
  isActive: boolean;
}

interface StudentFee {
  id: string;
  studentId: string;
  studentName: string;
  department: string;
  semester: string;
  feeStructureId: string;
  feeName: string;
  amount: number;
  paidAmount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue' | 'partial';
  paidDate?: string;
  receiptNo?: string;
}

const FeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddFeeOpen, setIsAddFeeOpen] = useState(false);
  const [isGenerateReceiptOpen, setIsGenerateReceiptOpen] = useState(false);

  // Mock fee structures
  const feeStructures: FeeStructure[] = [
    {
      id: "tuition-sem1",
      name: "Tuition Fee - Semester 1",
      amount: 45000,
      dueDate: "2024-03-15",
      academicYear: "2024-25",
      semester: "Semester 1",
      department: "Computer Science",
      description: "Semester 1 tuition fee for Computer Science Engineering",
      isActive: true
    },
    {
      id: "library-fee",
      name: "Library Fee",
      amount: 2000,
      dueDate: "2024-03-20",
      academicYear: "2024-25",
      semester: "Semester 1",
      department: "All",
      description: "Annual library membership and access fee",
      isActive: true
    },
    {
      id: "lab-fee-cs",
      name: "Laboratory Fee - CS",
      amount: 5000,
      dueDate: "2024-03-25",
      academicYear: "2024-25",
      semester: "Semester 1",
      department: "Computer Science",
      description: "Laboratory equipment and maintenance fee for CS",
      isActive: true
    }
  ];

  // Mock student fees
  const studentFees: StudentFee[] = [
    {
      id: "1",
      studentId: "CS2024001",
      studentName: "John Doe",
      department: "Computer Science",
      semester: "Semester 1",
      feeStructureId: "tuition-sem1",
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
      feeStructureId: "tuition-sem1",
      feeName: "Tuition Fee - Semester 1",
      amount: 45000,
      paidAmount: 0,
      dueDate: "2024-03-15",
      status: "pending"
    },
    {
      id: "3",
      studentId: "EC2024001",
      studentName: "Mike Johnson",
      department: "Electronics",
      semester: "Semester 1",
      feeStructureId: "tuition-sem1",
      feeName: "Tuition Fee - Semester 1",
      amount: 45000,
      paidAmount: 22500,
      dueDate: "2024-03-15",
      status: "partial"
    },
    {
      id: "4",
      studentId: "ME2024001",
      studentName: "Sarah Wilson",
      department: "Mechanical",
      semester: "Semester 1",
      feeStructureId: "tuition-sem1",
      feeName: "Tuition Fee - Semester 1",
      amount: 45000,
      paidAmount: 0,
      dueDate: "2024-02-28",
      status: "overdue"
    }
  ];

  const filteredStudentFees = studentFees.filter(fee => {
    const matchesSearch = fee.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fee.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fee.feeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || fee.department === filterDepartment;
    const matchesStatus = filterStatus === "all" || fee.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const handleGenerateReceipt = (studentFee: StudentFee) => {
    toast.success(`Receipt generated for ${studentFee.studentName} - ${studentFee.feeName}`);
    setIsGenerateReceiptOpen(false);
  };

  const handleAddFeeStructure = () => {
    toast.success("New fee structure added successfully");
    setIsAddFeeOpen(false);
  };

  const departments = [...new Set(studentFees.map(f => f.department))];
  const totalPending = studentFees.filter(f => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0);
  const totalOverdue = studentFees.filter(f => f.status === 'overdue').reduce((sum, f) => sum + f.amount, 0);
  const totalPaid = studentFees.filter(f => f.status === 'paid').reduce((sum, f) => sum + f.paidAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fee Management</h1>
          <p className="text-muted-foreground mt-1">Manage fee structures and student payments</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddFeeOpen} onOpenChange={setIsAddFeeOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Fee Structure
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Fee Structure</DialogTitle>
                <DialogDescription>
                  Create a new fee structure for students
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fee-name">Fee Name</Label>
                  <Input id="fee-name" placeholder="e.g., Tuition Fee - Semester 1" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (₹)</Label>
                    <Input id="amount" type="number" placeholder="45000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="due-date">Due Date</Label>
                    <Input id="due-date" type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="cs">Computer Science</SelectItem>
                        <SelectItem value="ec">Electronics</SelectItem>
                        <SelectItem value="me">Mechanical</SelectItem>
                        <SelectItem value="ce">Civil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sem1">Semester 1</SelectItem>
                        <SelectItem value="sem2">Semester 2</SelectItem>
                        <SelectItem value="sem3">Semester 3</SelectItem>
                        <SelectItem value="sem4">Semester 4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Fee description..." />
                </div>
                <Button onClick={handleAddFeeStructure} className="w-full">
                  Add Fee Structure
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentFees.length}</div>
            <p className="text-xs text-muted-foreground">Students with fees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Fees</CardTitle>
            <Calendar className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalPending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {studentFees.filter(f => f.status === 'pending').length} students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Fees</CardTitle>
            <FileText className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalOverdue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {studentFees.filter(f => f.status === 'overdue').length} students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalPaid.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Amount collected</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="student-fees" className="space-y-6">
        <TabsList>
          <TabsTrigger value="student-fees">Student Fees</TabsTrigger>
          <TabsTrigger value="fee-structures">Fee Structures</TabsTrigger>
        </TabsList>

        <TabsContent value="student-fees" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search & Filter Student Fees
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
                  <label className="text-sm font-medium">Department</label>
                  <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
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

          {/* Student Fees Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Student Fee Records
              </CardTitle>
              <CardDescription>Manage student fee payments and generate receipts</CardDescription>
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
                        <p className="text-sm font-medium">{fee.feeName}</p>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="text-2xl font-bold">₹{fee.amount.toLocaleString()}</div>
                        {fee.paidAmount > 0 && (
                          <div className="text-sm text-success">
                            Paid: ₹{fee.paidAmount.toLocaleString()}
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
                      </div>
                      <div className="flex gap-2">
                        {fee.status === 'paid' && fee.receiptNo && (
                          <Button variant="outline" size="sm">
                            <Receipt className="h-4 w-4 mr-2" />
                            View Receipt
                          </Button>
                        )}
                        <Dialog open={isGenerateReceiptOpen} onOpenChange={setIsGenerateReceiptOpen}>
                          <DialogTrigger asChild>
                            <Button size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              Generate Receipt
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Generate Receipt</DialogTitle>
                              <DialogDescription>
                                Generate receipt for {fee.studentName} - {fee.feeName}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="p-4 bg-accent rounded-lg">
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span>Student:</span>
                                    <span className="font-semibold">{fee.studentName}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Student ID:</span>
                                    <span className="font-semibold">{fee.studentId}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Fee:</span>
                                    <span className="font-semibold">{fee.feeName}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Amount:</span>
                                    <span className="font-semibold">₹{fee.amount.toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                              <Button onClick={() => handleGenerateReceipt(fee)} className="w-full">
                                Generate Receipt
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fee-structures" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Fee Structures
              </CardTitle>
              <CardDescription>Manage fee structures for different departments and semesters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feeStructures.map((structure) => (
                  <div key={structure.id} className="border rounded-lg p-6 hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">{structure.name}</h3>
                          <Badge variant={structure.isActive ? 'default' : 'secondary'}>
                            {structure.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{structure.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Department: {structure.department}</span>
                          <span>Semester: {structure.semester}</span>
                          <span>Academic Year: {structure.academicYear}</span>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="text-2xl font-bold">₹{structure.amount.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">
                          Due: {new Date(structure.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Created for {structure.department} department
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
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

export default FeeManagement;
