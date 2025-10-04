import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CreditCard, Receipt, Calendar, DollarSign, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface FeeStructure {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  description: string;
}

const FeePayment = () => {
  const [selectedFee, setSelectedFee] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock fee data
  const feeStructures: FeeStructure[] = [
    {
      id: "tuition-sem1",
      name: "Tuition Fee - Semester 1",
      amount: 45000,
      dueDate: "2024-03-15",
      status: "pending",
      description: "Semester 1 tuition fee for Computer Science Engineering"
    },
    {
      id: "library-fee",
      name: "Library Fee",
      amount: 2000,
      dueDate: "2024-03-20",
      status: "pending",
      description: "Annual library membership and access fee"
    },
    {
      id: "lab-fee",
      name: "Laboratory Fee",
      amount: 5000,
      dueDate: "2024-03-25",
      status: "pending",
      description: "Laboratory equipment and maintenance fee"
    },
    {
      id: "exam-fee",
      name: "Examination Fee",
      amount: 3000,
      dueDate: "2024-04-01",
      status: "pending",
      description: "Mid-semester examination fee"
    },
    {
      id: "hostel-fee",
      name: "Hostel Fee",
      amount: 25000,
      dueDate: "2024-02-28",
      status: "overdue",
      description: "Monthly hostel accommodation fee"
    }
  ];

  const paidFees = [
    {
      id: "tuition-sem0",
      name: "Tuition Fee - Semester 0",
      amount: 45000,
      paidDate: "2024-01-15",
      receiptNo: "RCP-2024-001",
      description: "Semester 0 tuition fee"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-4 w-4" />;
      case 'overdue': return <AlertCircle className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const handlePayment = async () => {
    if (!selectedFee || !paymentMethod) {
      toast.error("Please select a fee and payment method");
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const fee = feeStructures.find(f => f.id === selectedFee);
      if (fee) {
        toast.success(`Payment of ₹${fee.amount.toLocaleString()} processed successfully!`);
        // In a real app, this would update the fee status
        setSelectedFee("");
        setPaymentMethod("");
      }
      setIsProcessing(false);
    }, 2000);
  };

  const totalPending = feeStructures
    .filter(fee => fee.status === 'pending')
    .reduce((sum, fee) => sum + fee.amount, 0);

  const totalOverdue = feeStructures
    .filter(fee => fee.status === 'overdue')
    .reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Fee Payment</h1>
        <p className="text-muted-foreground mt-1">Manage your fee payments and view payment history</p>
      </div>

      {/* Fee Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Fees</CardTitle>
            <Calendar className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalPending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {feeStructures.filter(f => f.status === 'pending').length} fees pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Fees</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalOverdue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {feeStructures.filter(f => f.status === 'overdue').length} fees overdue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{paidFees.reduce((sum, fee) => sum + fee.amount, 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {paidFees.length} fees paid
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Make Payment
          </CardTitle>
          <CardDescription>Select a fee and payment method to proceed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fee-select">Select Fee</Label>
            <Select value={selectedFee} onValueChange={setSelectedFee}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a fee to pay" />
              </SelectTrigger>
              <SelectContent>
                {feeStructures.map((fee) => (
                  <SelectItem key={fee.id} value={fee.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{fee.name}</span>
                      <span className="ml-2 font-semibold">₹{fee.amount.toLocaleString()}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedFee && (
            <div className="p-4 bg-accent rounded-lg">
              {(() => {
                const fee = feeStructures.find(f => f.id === selectedFee);
                return fee ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{fee.name}</span>
                      <Badge className={getStatusColor(fee.status)}>
                        {getStatusIcon(fee.status)}
                        <span className="ml-1 capitalize">{fee.status}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{fee.description}</p>
                    <div className="flex items-center justify-between">
                      <span>Amount:</span>
                      <span className="font-bold text-lg">₹{fee.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Due Date:</span>
                      <span>{new Date(fee.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="payment-method">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit-card">Credit Card</SelectItem>
                <SelectItem value="debit-card">Debit Card</SelectItem>
                <SelectItem value="net-banking">Net Banking</SelectItem>
                <SelectItem value="upi">UPI</SelectItem>
                <SelectItem value="wallet">Digital Wallet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handlePayment} 
            disabled={!selectedFee || !paymentMethod || isProcessing}
            className="w-full"
          >
            {isProcessing ? "Processing Payment..." : `Pay ₹${selectedFee ? feeStructures.find(f => f.id === selectedFee)?.amount.toLocaleString() : '0'}`}
          </Button>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This is a demo payment system. No actual payment will be processed.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Recent Payments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Recent Payments
          </CardTitle>
          <CardDescription>Your recent fee payments and receipts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paidFees.map((fee) => (
              <div key={fee.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-semibold">{fee.name}</h4>
                  <p className="text-sm text-muted-foreground">{fee.description}</p>
                  <p className="text-xs text-muted-foreground">Paid on: {new Date(fee.paidDate).toLocaleDateString()}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-bold">₹{fee.amount.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Receipt: {fee.receiptNo}</p>
                  <Button variant="outline" size="sm">
                    <Receipt className="h-4 w-4 mr-2" />
                    View Receipt
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeePayment;
