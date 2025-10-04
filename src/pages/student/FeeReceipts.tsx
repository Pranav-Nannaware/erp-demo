import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Receipt, Download, Search, Calendar, DollarSign, FileText } from "lucide-react";
import { toast } from "sonner";

interface FeeReceipt {
  id: string;
  receiptNo: string;
  studentId: string;
  studentName: string;
  feeName: string;
  amount: number;
  paidDate: string;
  paymentMethod: string;
  academicYear: string;
  semester: string;
  status: 'paid' | 'refunded';
  description: string;
}

const FeeReceipts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("all");
  const [filterSemester, setFilterSemester] = useState("all");

  // Mock receipt data
  const receipts: FeeReceipt[] = [
    {
      id: "1",
      receiptNo: "RCP-2024-001",
      studentId: "CS2024001",
      studentName: "John Doe",
      feeName: "Tuition Fee - Semester 1",
      amount: 45000,
      paidDate: "2024-01-15",
      paymentMethod: "Credit Card",
      academicYear: "2024-25",
      semester: "Semester 1",
      status: "paid",
      description: "Semester 1 tuition fee for Computer Science Engineering"
    },
    {
      id: "2",
      receiptNo: "RCP-2024-002",
      studentId: "CS2024001",
      studentName: "John Doe",
      feeName: "Library Fee",
      amount: 2000,
      paidDate: "2024-01-20",
      paymentMethod: "UPI",
      academicYear: "2024-25",
      semester: "Semester 1",
      status: "paid",
      description: "Annual library membership and access fee"
    },
    {
      id: "3",
      receiptNo: "RCP-2024-003",
      studentId: "CS2024001",
      studentName: "John Doe",
      feeName: "Laboratory Fee",
      amount: 5000,
      paidDate: "2024-01-25",
      paymentMethod: "Net Banking",
      academicYear: "2024-25",
      semester: "Semester 1",
      status: "paid",
      description: "Laboratory equipment and maintenance fee"
    },
    {
      id: "4",
      receiptNo: "RCP-2023-045",
      studentId: "CS2024001",
      studentName: "John Doe",
      feeName: "Hostel Fee - Refund",
      amount: 25000,
      paidDate: "2023-12-15",
      paymentMethod: "Bank Transfer",
      academicYear: "2023-24",
      semester: "Semester 2",
      status: "refunded",
      description: "Hostel fee refund for early vacation"
    }
  ];

  const filteredReceipts = receipts.filter(receipt => {
    const matchesSearch = receipt.feeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.receiptNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = filterYear === "all" || receipt.academicYear === filterYear;
    const matchesSemester = filterSemester === "all" || receipt.semester === filterSemester;
    
    return matchesSearch && matchesYear && matchesSemester;
  });

  const handleDownloadReceipt = (receipt: FeeReceipt) => {
    toast.success(`Downloading receipt ${receipt.receiptNo}`);
    // In a real app, this would generate and download a PDF
  };

  const handleViewReceipt = (receipt: FeeReceipt) => {
    toast.info(`Opening receipt ${receipt.receiptNo}`);
    // In a real app, this would open a receipt viewer modal
  };

  const totalPaid = receipts
    .filter(r => r.status === 'paid')
    .reduce((sum, receipt) => sum + receipt.amount, 0);

  const totalRefunded = receipts
    .filter(r => r.status === 'refunded')
    .reduce((sum, receipt) => sum + receipt.amount, 0);

  const academicYears = [...new Set(receipts.map(r => r.academicYear))];
  const semesters = [...new Set(receipts.map(r => r.semester))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Fee Receipts</h1>
        <p className="text-muted-foreground mt-1">View and download your fee payment receipts</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Receipts</CardTitle>
            <Receipt className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{receipts.length}</div>
            <p className="text-xs text-muted-foreground">All time receipts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalPaid.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Amount paid</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Refunded</CardTitle>
            <FileText className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRefunded.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Amount refunded</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter Receipts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search receipts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Academic Year</label>
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {academicYears.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Semester</label>
              <Select value={filterSemester} onValueChange={setFilterSemester}>
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Semesters</SelectItem>
                  {semesters.map(semester => (
                    <SelectItem key={semester} value={semester}>{semester}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Results</label>
              <div className="flex items-center h-10 px-3 py-2 text-sm bg-muted rounded-md">
                {filteredReceipts.length} receipt{filteredReceipts.length !== 1 ? 's' : ''} found
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Receipts List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Payment Receipts
          </CardTitle>
          <CardDescription>Your fee payment receipts and transaction history</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredReceipts.length === 0 ? (
            <div className="text-center py-8">
              <Receipt className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No receipts found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReceipts.map((receipt) => (
                <div key={receipt.id} className="border rounded-lg p-6 hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{receipt.feeName}</h3>
                        <Badge variant={receipt.status === 'paid' ? 'default' : 'secondary'}>
                          {receipt.status === 'paid' ? 'Paid' : 'Refunded'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{receipt.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Receipt: {receipt.receiptNo}</span>
                        <span>Student ID: {receipt.studentId}</span>
                        <span>Academic Year: {receipt.academicYear}</span>
                        <span>Semester: {receipt.semester}</span>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="text-2xl font-bold">₹{receipt.amount.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">
                        Paid: {new Date(receipt.paidDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Method: {receipt.paymentMethod}
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Payment Date: {new Date(receipt.paidDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewReceipt(receipt)}>
                        <FileText className="h-4 w-4 mr-2" />
                        View Receipt
                      </Button>
                      <Button size="sm" onClick={() => handleDownloadReceipt(receipt)}>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FeeReceipts;
