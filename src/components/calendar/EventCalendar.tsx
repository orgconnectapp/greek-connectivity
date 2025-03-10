
import * as React from "react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths, isSameDay } from "date-fns";

// Mock event data - in a real app, this would come from an API or database
interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  type: "meeting" | "social" | "service" | "fundraiser" | "other";
}

const EVENT_TYPES = {
  meeting: { label: "Meeting", color: "bg-blue-100 text-blue-800" },
  social: { label: "Social", color: "bg-purple-100 text-purple-800" },
  service: { label: "Service", color: "bg-green-100 text-green-800" },
  fundraiser: { label: "Fundraiser", color: "bg-amber-100 text-amber-800" },
  other: { label: "Other", color: "bg-gray-100 text-gray-800" },
};

// Mock events data
const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Weekly Chapter Meeting",
    description: "Regular chapter meeting to discuss upcoming events and initiatives.",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 18, 0),
    location: "Student Union, Room 302",
    type: "meeting",
  },
  {
    id: "2",
    title: "Beach Cleanup",
    description: "Community service event to clean up the local beach.",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 18, 10, 0),
    location: "Main Beach Entrance",
    type: "service",
  },
  {
    id: "3",
    title: "Social Mixer",
    description: "Social event to meet new members and have fun.",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 20, 19, 30),
    location: "The Hub Café",
    type: "social",
  },
  {
    id: "4",
    title: "Bake Sale Fundraiser",
    description: "Fundraising event to support chapter activities.",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 25, 11, 0),
    location: "Campus Quad",
    type: "fundraiser",
  },
];

interface EventCalendarProps {
  onEventSelect?: (event: Event) => void;
}

const EventCalendar = ({ onEventSelect }: EventCalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handlePreviousMonth = () => {
    setCurrentDate(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };

  // Filter events for the selected date
  const selectedDateEvents = MOCK_EVENTS.filter(
    event => selectedDate && isSameDay(event.date, selectedDate)
  );

  // Function to get events for a specific date (for the calendar day rendering)
  const getEventsForDate = (date: Date) => {
    return MOCK_EVENTS.filter(event => isSameDay(event.date, date));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <Card className="w-full lg:w-auto">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Organization Calendar</CardTitle>
            <CardDescription>View and manage organization events</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePreviousMonth}
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="font-medium">
              {format(currentDate, "MMMM yyyy")}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextMonth}
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={currentDate}
            onMonthChange={setCurrentDate}
            modifiers={{
              eventDay: (date) => getEventsForDate(date).length > 0
            }}
            modifiersClassNames={{
              eventDay: "relative bg-primary/10 text-primary font-semibold"
            }}
            components={{
              DayContent: ({ date, ...props }) => {
                const events = getEventsForDate(date);
                return (
                  <div {...props} className="relative">
                    {date.getDate()}
                    {events.length > 0 && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                        <div className="h-1 w-1 rounded-full bg-primary"></div>
                      </div>
                    )}
                  </div>
                );
              }
            }}
          />
        </CardContent>
      </Card>

      <Card className="w-full lg:flex-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Select a date"}
          </CardTitle>
          <CardDescription>
            {selectedDateEvents.length > 0 
              ? `${selectedDateEvents.length} event${selectedDateEvents.length > 1 ? 's' : ''} scheduled`
              : 'No events scheduled'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-4">
              {selectedDateEvents.map(event => (
                <div
                  key={event.id}
                  className="rounded-lg border p-4 hover:bg-accent transition-colors cursor-pointer"
                  onClick={() => onEventSelect?.(event)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-lg">{event.title}</h3>
                    <Badge className={EVENT_TYPES[event.type].color}>
                      {EVENT_TYPES[event.type].label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{format(event.date, "h:mm a")}</span>
                    </div>
                    <div className="sm:ml-3 text-muted-foreground">{event.location}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CalendarIcon className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-1">No events scheduled</h3>
              <p className="text-sm text-muted-foreground">
                Select a different date to view events or add a new event.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EventCalendar;
