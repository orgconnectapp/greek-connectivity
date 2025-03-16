import React from "react";
import { Check, Calendar, X, MapPin, Clock, Info } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Event } from "@/components/calendar/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock pending events data
const MOCK_PENDING_EVENTS: Event[] = [
  {
    id: "1",
    title: "End of Semester BBQ",
    description: "Celebrate the end of the semester with food and games!",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 25, 16, 0),
    startTime: "16:00",
    endTime: "19:00",
    location: "Campus Quad",
    type: "social",
    createdBy: "Alex Williams",
    status: "pending"
  },
  {
    id: "2",
    title: "Leadership Workshop",
    description: "Workshop on developing leadership skills and team management.",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 18, 10, 0),
    startTime: "10:00",
    endTime: "12:00",
    location: "Student Union, Conference Room A",
    type: "meeting",
    createdBy: "Emma Johnson",
    status: "pending"
  },
  {
    id: "3",
    title: "Community Garden Volunteer Day",
    description: "Help maintain the community garden and plant new vegetables.",
    date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5, 9, 0),
    startTime: "09:00",
    endTime: "12:00",
    location: "Community Garden, 123 Main St",
    type: "service",
    createdBy: "Sophia Garcia",
    status: "pending"
  }
];

interface EventApprovalSectionProps {
  onEventApproval?: (events: Event[]) => void;
}

const EventApprovalSection: React.FC<EventApprovalSectionProps> = ({ onEventApproval }) => {
  const [pendingEvents, setPendingEvents] = React.useState<Event[]>(MOCK_PENDING_EVENTS);
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

  const handleEventApproval = (id: string, approved: boolean) => {
    // In a real app, this would make an API call to update the event status
    const updatedEvents = pendingEvents.filter(event => event.id !== id);
    setPendingEvents(updatedEvents);
    
    // Update parent component if callback provided
    if (onEventApproval) {
      onEventApproval(updatedEvents);
    }
    
    toast({
      title: approved ? "Event approved" : "Event rejected",
      description: `The event has been ${approved ? 'approved and added to the calendar' : 'rejected'}.`,
    });
  };
  
  const handleEventDoubleClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDetailsOpen(true);
  };
  
  const EVENT_TYPES = {
    meeting: { label: "Meeting", color: "bg-blue-100 text-blue-800" },
    social: { label: "Social", color: "bg-purple-100 text-purple-800" },
    service: { label: "Service", color: "bg-green-100 text-green-800" },
    fundraiser: { label: "Fundraiser", color: "bg-amber-100 text-amber-800" },
    other: { label: "Other", color: "bg-gray-100 text-gray-800" },
  };

  return (
    <div>
      {pendingEvents.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No pending events to approve
        </div>
      ) : (
        <div className="space-y-4">
          {pendingEvents.map(event => (
            <div 
              key={event.id} 
              className="border rounded-lg p-4 space-y-3 cursor-pointer hover:bg-gray-50 transition-colors"
              onDoubleClick={() => handleEventDoubleClick(event)}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <Badge className={EVENT_TYPES[event.type].color}>
                  {EVENT_TYPES[event.type].label}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Created by: {event.createdBy}
              </p>
              
              <p className="text-sm">{event.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{format(event.date, "EEEE, MMMM d, yyyy")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{event.startTime} - {event.endTime}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{event.location}</span>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEventApproval(event.id, true);
                  }}
                  className="bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Approve
                </Button>
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEventApproval(event.id, false);
                  }}
                  variant="destructive"
                  size="sm"
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Event Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  {selectedEvent.title}
                </DialogTitle>
                <DialogDescription>
                  Event details and approval options
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Event Type:</span>
                  <Badge className={EVENT_TYPES[selectedEvent.type].color}>
                    {EVENT_TYPES[selectedEvent.type].label}
                  </Badge>
                </div>
                
                <div>
                  <span className="font-medium">Description:</span>
                  <p className="mt-1">{selectedEvent.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Date:</span>
                    <p className="mt-1 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {format(selectedEvent.date, "EEEE, MMMM d, yyyy")}
                    </p>
                  </div>
                  
                  <div>
                    <span className="font-medium">Time:</span>
                    <p className="mt-1 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {selectedEvent.startTime} - {selectedEvent.endTime}
                    </p>
                  </div>
                </div>
                
                <div>
                  <span className="font-medium">Location:</span>
                  <p className="mt-1 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {selectedEvent.location}
                  </p>
                </div>
                
                <div>
                  <span className="font-medium">Submitted by:</span>
                  <p className="mt-1">{selectedEvent.createdBy}</p>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button 
                  onClick={() => {
                    handleEventApproval(selectedEvent.id, true);
                    setIsDetailsOpen(false);
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Approve Event
                </Button>
                <Button 
                  onClick={() => {
                    handleEventApproval(selectedEvent.id, false);
                    setIsDetailsOpen(false);
                  }}
                  variant="destructive"
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject Event
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventApprovalSection;
