import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, User, Download } from "lucide-react";

const Timetable = () => {
  const timeSlots = [
    { time: "09:00 - 10:00", period: "1" },
    { time: "10:00 - 11:00", period: "2" },
    { time: "11:00 - 12:00", period: "3" },
    { time: "12:00 - 13:00", period: "4" },
    { time: "13:00 - 14:00", period: "Lunch" },
    { time: "14:00 - 15:00", period: "5" },
    { time: "15:00 - 16:00", period: "6" },
    { time: "16:00 - 17:00", period: "7" },
  ];

  const timetable = {
    Monday: [
      { period: "1", subject: "Data Structures", code: "CS301", faculty: "Dr. Smith", room: "Room 301", type: "Lecture" },
      { period: "2", subject: "Data Structures", code: "CS301", faculty: "Dr. Smith", room: "Room 301", type: "Tutorial" },
      { period: "3", subject: "Database Management", code: "CS302", faculty: "Prof. Johnson", room: "Lab 2", type: "Lab" },
      { period: "4", subject: "Database Management", code: "CS302", faculty: "Prof. Johnson", room: "Lab 2", type: "Lab" },
      { period: "5", subject: "Web Development", code: "CS303", faculty: "Dr. Williams", room: "Room 205", type: "Lecture" },
      { period: "6", subject: "Web Development", code: "CS303", faculty: "Dr. Williams", room: "Room 205", type: "Tutorial" },
      { period: "7", subject: "Free Period", code: "", faculty: "", room: "", type: "Free" },
    ],
    Tuesday: [
      { period: "1", subject: "Software Engineering", code: "CS304", faculty: "Prof. Brown", room: "Room 108", type: "Lecture" },
      { period: "2", subject: "Software Engineering", code: "CS304", faculty: "Prof. Brown", room: "Room 108", type: "Tutorial" },
      { period: "3", subject: "Operating Systems", code: "CS305", faculty: "Dr. Davis", room: "Room 302", type: "Lecture" },
      { period: "4", subject: "Operating Systems", code: "CS305", faculty: "Dr. Davis", room: "Room 302", type: "Tutorial" },
      { period: "5", subject: "Computer Networks", code: "CS306", faculty: "Prof. Wilson", room: "Lab 3", type: "Lab" },
      { period: "6", subject: "Computer Networks", code: "CS306", faculty: "Prof. Wilson", room: "Lab 3", type: "Lab" },
      { period: "7", subject: "Free Period", code: "", faculty: "", room: "", type: "Free" },
    ],
    Wednesday: [
      { period: "1", subject: "Data Structures", code: "CS301", faculty: "Dr. Smith", room: "Room 301", type: "Lecture" },
      { period: "2", subject: "Data Structures", code: "CS301", faculty: "Dr. Smith", room: "Room 301", type: "Tutorial" },
      { period: "3", subject: "Database Management", code: "CS302", faculty: "Prof. Johnson", room: "Lab 2", type: "Lab" },
      { period: "4", subject: "Database Management", code: "CS302", faculty: "Prof. Johnson", room: "Lab 2", type: "Lab" },
      { period: "5", subject: "Web Development", code: "CS303", faculty: "Dr. Williams", room: "Room 205", type: "Lecture" },
      { period: "6", subject: "Web Development", code: "CS303", faculty: "Dr. Williams", room: "Room 205", type: "Tutorial" },
      { period: "7", subject: "Free Period", code: "", faculty: "", room: "", type: "Free" },
    ],
    Thursday: [
      { period: "1", subject: "Software Engineering", code: "CS304", faculty: "Prof. Brown", room: "Room 108", type: "Lecture" },
      { period: "2", subject: "Software Engineering", code: "CS304", faculty: "Prof. Brown", room: "Room 108", type: "Tutorial" },
      { period: "3", subject: "Operating Systems", code: "CS305", faculty: "Dr. Davis", room: "Room 302", type: "Lecture" },
      { period: "4", subject: "Operating Systems", code: "CS305", faculty: "Dr. Davis", room: "Room 302", type: "Tutorial" },
      { period: "5", subject: "Computer Networks", code: "CS306", faculty: "Prof. Wilson", room: "Lab 3", type: "Lab" },
      { period: "6", subject: "Computer Networks", code: "CS306", faculty: "Prof. Wilson", room: "Lab 3", type: "Lab" },
      { period: "7", subject: "Free Period", code: "", faculty: "", room: "", type: "Free" },
    ],
    Friday: [
      { period: "1", subject: "Data Structures", code: "CS301", faculty: "Dr. Smith", room: "Room 301", type: "Lecture" },
      { period: "2", subject: "Data Structures", code: "CS301", faculty: "Dr. Smith", room: "Room 301", type: "Tutorial" },
      { period: "3", subject: "Database Management", code: "CS302", faculty: "Prof. Johnson", room: "Lab 2", type: "Lab" },
      { period: "4", subject: "Database Management", code: "CS302", faculty: "Prof. Johnson", room: "Lab 2", type: "Lab" },
      { period: "5", subject: "Web Development", code: "CS303", faculty: "Dr. Williams", room: "Room 205", type: "Lecture" },
      { period: "6", subject: "Web Development", code: "CS303", faculty: "Dr. Williams", room: "Room 205", type: "Tutorial" },
      { period: "7", subject: "Free Period", code: "", faculty: "", room: "", type: "Free" },
    ],
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Lecture": return "bg-primary text-primary-foreground";
      case "Tutorial": return "bg-success text-success-foreground";
      case "Lab": return "bg-warning text-warning-foreground";
      case "Free": return "bg-muted text-muted-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as keyof typeof timetable;
  const todayClasses = timetable[today] || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Class Timetable</h1>
          <p className="text-muted-foreground mt-1">Your weekly class schedule</p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      {/* Today's Classes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today's Classes ({today})
          </CardTitle>
          <CardDescription>Your classes for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todayClasses.map((class_, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center justify-center min-w-[60px] h-12 bg-primary text-primary-foreground rounded-md">
                    <span className="text-xs font-semibold">Period</span>
                    <span className="text-sm font-bold">{class_.period}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{class_.subject}</h4>
                    <p className="text-sm text-muted-foreground">{class_.code}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {class_.faculty}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {class_.room}
                  </span>
                  <Badge className={getTypeColor(class_.type)}>
                    {class_.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Timetable */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Weekly Timetable
          </CardTitle>
          <CardDescription>Complete weekly class schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-border p-2 text-left font-medium">Time</th>
                  {Object.keys(timetable).map((day) => (
                    <th key={day} className="border border-border p-2 text-center font-medium min-w-[200px]">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot, slotIndex) => (
                  <tr key={slot.time}>
                    <td className="border border-border p-2 font-medium text-sm">
                      <div className="space-y-1">
                        <div>{slot.time}</div>
                        <div className="text-xs text-muted-foreground">Period {slot.period}</div>
                      </div>
                    </td>
                    {Object.values(timetable).map((dayClasses, dayIndex) => {
                      const class_ = dayClasses[slotIndex];
                      return (
                        <td key={dayIndex} className="border border-border p-2">
                          {class_ && class_.subject !== "Free Period" ? (
                            <div className="space-y-1">
                              <div className="font-medium text-sm">{class_.subject}</div>
                              <div className="text-xs text-muted-foreground">{class_.code}</div>
                              <div className="text-xs text-muted-foreground">{class_.faculty}</div>
                              <div className="text-xs text-muted-foreground">{class_.room}</div>
                              <Badge className={`text-xs ${getTypeColor(class_.type)}`}>
                                {class_.type}
                              </Badge>
                            </div>
                          ) : (
                            <div className="text-center text-muted-foreground text-sm">
                              {slot.period === "Lunch" ? "Lunch Break" : "Free"}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Timetable;
