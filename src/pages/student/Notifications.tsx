import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, AlertCircle, CheckCircle, Info, Calendar, BookOpen, Users, DollarSign } from "lucide-react";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "Mid-Semester Exam Schedule Released",
      message: "The mid-semester examination schedule for Semester 6 has been published. Please check your timetable.",
      type: "exam",
      priority: "high",
      date: "2024-03-10",
      time: "10:30 AM",
      read: false,
      category: "academic"
    },
    {
      id: 2,
      title: "Assignment Submission Reminder",
      message: "Data Structures assignment is due tomorrow. Please submit your work before the deadline.",
      type: "assignment",
      priority: "medium",
      date: "2024-03-09",
      time: "02:15 PM",
      read: false,
      category: "academic"
    },
    {
      id: 3,
      title: "Library Book Due Soon",
      message: "Your borrowed book 'Introduction to Algorithms' is due in 2 days. Please return or renew it.",
      type: "library",
      priority: "low",
      date: "2024-03-08",
      time: "09:45 AM",
      read: true,
      category: "library"
    },
    {
      id: 4,
      title: "Fee Payment Confirmation",
      message: "Your semester fee payment of ₹45,000 has been successfully processed. Receipt available in downloads.",
      type: "fee",
      priority: "medium",
      date: "2024-03-07",
      time: "11:20 AM",
      read: true,
      category: "financial"
    },
    {
      id: 5,
      title: "Workshop on Machine Learning",
      message: "A hands-on workshop on ML fundamentals will be held on Saturday, 10 AM at Seminar Hall. Registration required.",
      type: "workshop",
      priority: "medium",
      date: "2024-03-06",
      time: "03:30 PM",
      read: false,
      category: "events"
    },
    {
      id: 6,
      title: "Attendance Warning",
      message: "Your attendance in Computer Networks is below 75%. Please attend classes regularly to maintain eligibility.",
      type: "attendance",
      priority: "high",
      date: "2024-03-05",
      time: "01:00 PM",
      read: false,
      category: "academic"
    },
    {
      id: 7,
      title: "Sports Day Registration Open",
      message: "Annual Sports Day registration is now open. Participate in various events and win prizes.",
      type: "sports",
      priority: "low",
      date: "2024-03-04",
      time: "04:15 PM",
      read: true,
      category: "events"
    },
    {
      id: 8,
      title: "Result Published",
      message: "Semester 5 results have been published. Check your academic performance in the results section.",
      type: "result",
      priority: "high",
      date: "2024-03-03",
      time: "12:00 PM",
      read: true,
      category: "academic"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "exam": return <Calendar className="h-4 w-4" />;
      case "assignment": return <BookOpen className="h-4 w-4" />;
      case "library": return <BookOpen className="h-4 w-4" />;
      case "fee": return <DollarSign className="h-4 w-4" />;
      case "workshop": return <Users className="h-4 w-4" />;
      case "attendance": return <AlertCircle className="h-4 w-4" />;
      case "sports": return <Users className="h-4 w-4" />;
      case "result": return <CheckCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const academicNotifications = notifications.filter(n => n.category === "academic");
  const libraryNotifications = notifications.filter(n => n.category === "library");
  const financialNotifications = notifications.filter(n => n.category === "financial");
  const eventNotifications = notifications.filter(n => n.category === "events");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-1">Stay updated with important announcements</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Bell className="h-3 w-3" />
            {unreadCount} unread
          </Badge>
          <Button variant="outline" size="sm">
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Notification Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{unreadCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Academic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{academicNotifications.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {notifications.filter(n => n.priority === "high").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Notifications</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="library">Library</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
              <CardDescription>Complete list of all notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${
                    notification.read ? "bg-muted/50" : "bg-background border-primary/20"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      notification.read ? "bg-muted" : "bg-primary/10"
                    }`}>
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className={`font-semibold ${notification.read ? "text-muted-foreground" : "text-foreground"}`}>
                            {notification.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{notification.date} at {notification.time}</span>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                          {!notification.read && (
                            <Button variant="ghost" size="sm">
                              Mark Read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {[
          { value: "academic", data: academicNotifications, title: "Academic Notifications" },
          { value: "library", data: libraryNotifications, title: "Library Notifications" },
          { value: "financial", data: financialNotifications, title: "Financial Notifications" },
          { value: "events", data: eventNotifications, title: "Event Notifications" }
        ].map(({ value, data, title }) => (
          <TabsContent key={value} value={value}>
            <Card>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{data.length} notifications in this category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.length > 0 ? (
                  data.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border ${
                        notification.read ? "bg-muted/50" : "bg-background border-primary/20"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${
                          notification.read ? "bg-muted" : "bg-primary/10"
                        }`}>
                          {getTypeIcon(notification.type)}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className={`font-semibold ${notification.read ? "text-muted-foreground" : "text-foreground"}`}>
                                {notification.title}
                              </h4>
                              <p className="text-sm text-muted-foreground">{notification.message}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getPriorityColor(notification.priority)}>
                                {notification.priority}
                              </Badge>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{notification.date} at {notification.time}</span>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                View Details
                              </Button>
                              {!notification.read && (
                                <Button variant="ghost" size="sm">
                                  Mark Read
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No notifications in this category
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Notifications;
