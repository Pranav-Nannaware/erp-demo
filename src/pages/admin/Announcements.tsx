import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Megaphone, Plus, Edit, Trash2, Eye, Send } from "lucide-react";
import { toast } from "sonner";

const Announcements = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");

  const announcements = [
    {
      id: 1,
      title: "Mid-Semester Exam Schedule",
      content: "The mid-semester examination schedule for all departments has been published. Students are advised to check their respective timetables.",
      priority: "high",
      target: "all",
      status: "published",
      createdDate: "2024-03-10",
      publishedDate: "2024-03-10",
      views: 1250,
      author: "Exam Committee"
    },
    {
      id: 2,
      title: "Library Hours Extended",
      content: "Library will remain open until 10 PM during exam weeks to support student studies.",
      priority: "medium",
      target: "students",
      status: "published",
      createdDate: "2024-03-08",
      publishedDate: "2024-03-08",
      views: 890,
      author: "Library Staff"
    },
    {
      id: 3,
      title: "Workshop on Machine Learning",
      content: "A hands-on workshop on ML fundamentals will be held on Saturday, 10 AM at Seminar Hall. Registration required.",
      priority: "medium",
      target: "students",
      status: "draft",
      createdDate: "2024-03-07",
      publishedDate: null,
      views: 0,
      author: "CS Department"
    },
    {
      id: 4,
      title: "Fee Payment Deadline",
      content: "Last date for semester fee payment is March 15, 2024. Late fees will be applicable after the deadline.",
      priority: "high",
      target: "students",
      status: "published",
      createdDate: "2024-03-05",
      publishedDate: "2024-03-05",
      views: 2100,
      author: "Accounts Office"
    },
    {
      id: 5,
      title: "Sports Day Registration",
      content: "Annual Sports Day registration is now open. Faculty and students can participate in various events.",
      priority: "low",
      target: "all",
      status: "published",
      createdDate: "2024-03-03",
      publishedDate: "2024-03-03",
      views: 650,
      author: "Sports Committee"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-success text-success-foreground";
      case "draft": return "bg-muted text-muted-foreground";
      case "archived": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTargetColor = (target: string) => {
    switch (target) {
      case "all": return "bg-primary text-primary-foreground";
      case "students": return "bg-success text-success-foreground";
      case "faculty": return "bg-warning text-warning-foreground";
      case "admin": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = !selectedPriority || announcement.priority === selectedPriority;
    return matchesSearch && matchesPriority;
  });

  const handlePublish = (id: number) => {
    toast.success("Announcement published successfully!");
  };

  const handleDelete = (id: number) => {
    toast.success("Announcement deleted successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Announcements</h1>
          <p className="text-muted-foreground mt-1">Manage college announcements and notifications</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
              <DialogDescription>
                Create and publish announcements for students, faculty, or all users.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input placeholder="Enter announcement title" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <Textarea placeholder="Enter announcement content" rows={4} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Audience</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="students">Students Only</SelectItem>
                      <SelectItem value="faculty">Faculty Only</SelectItem>
                      <SelectItem value="admin">Admin Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  setIsDialogOpen(false);
                  toast.success("Announcement created successfully!");
                }}>
                  <Send className="h-4 w-4 mr-2" />
                  Publish
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{announcements.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {announcements.filter(a => a.status === "published").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {announcements.filter(a => a.status === "draft").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {announcements.reduce((acc, a) => acc + a.views, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5" />
            Filter Announcements
          </CardTitle>
          <CardDescription>Search and filter through all announcements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search announcements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Announcements Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Announcements</CardTitle>
          <CardDescription>
            {filteredAnnouncements.length} announcements found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead className="text-center">Views</TableHead>
                  <TableHead className="text-center">Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAnnouncements.map((announcement) => (
                  <TableRow key={announcement.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{announcement.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {announcement.content}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(announcement.priority)}>
                        {announcement.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTargetColor(announcement.target)}>
                        {announcement.target}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(announcement.status)}>
                        {announcement.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{announcement.author}</TableCell>
                    <TableCell className="text-center">{announcement.views}</TableCell>
                    <TableCell className="text-center">
                      {new Date(announcement.createdDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        {announcement.status === "draft" && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handlePublish(announcement.id)}
                          >
                            <Send className="h-3 w-3" />
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-destructive"
                          onClick={() => handleDelete(announcement.id)}
                        >
                          <Trash2 className="h-3 w-3" />
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

export default Announcements;
