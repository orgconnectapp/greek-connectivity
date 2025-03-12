
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventCalendar from "@/components/calendar/EventCalendar";
import CalendarIntegration from "@/components/calendar/CalendarIntegration";
import CreateEventDialog from "@/components/calendar/CreateEventDialog";
import { Event } from "@/components/calendar/types";

const Calendar = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
    // In a real application, this would open a modal with event details
    console.log("Selected event:", event);
  };

  return (
    <div className="container max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">
            View and manage organization events and activities
          </p>
        </div>
        <CreateEventDialog />
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="integration">Calendar Integration</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar" className="mt-6">
          <EventCalendar onEventSelect={handleEventSelect} />
        </TabsContent>
        <TabsContent value="integration" className="mt-6">
          <CalendarIntegration />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Calendar;
