
import { useState } from "react";
import EventCalendar from "@/components/calendar/EventCalendar";
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

      <EventCalendar onEventSelect={handleEventSelect} />
    </div>
  );
};

export default Calendar;
