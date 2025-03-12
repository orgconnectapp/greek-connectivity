
import * as React from "react";
import { useState } from "react";
import { CalendarIcon, Users, UserPlus, Check } from "lucide-react";
import { format } from "date-fns";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import { EventType, Member } from "./types";

// Mock data for members
const MOCK_MEMBERS: Member[] = [
  {
    id: "1",
    name: "Jason Smith",
    email: "jason@greeksync.com",
    role: "President",
    status: "active",
    profileImage: "https://i.pravatar.cc/150?u=jason",
  },
  {
    id: "2",
    name: "Emma Johnson",
    email: "emma@greeksync.com",
    role: "Vice President",
    status: "active",
    profileImage: "https://i.pravatar.cc/150?u=emma",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@greeksync.com",
    role: "Treasurer",
    status: "active",
    profileImage: "https://i.pravatar.cc/150?u=michael",
  },
  {
    id: "4",
    name: "Sophia Garcia",
    email: "sophia@greeksync.com",
    role: "Secretary",
    status: "active",
    profileImage: "https://i.pravatar.cc/150?u=sophia",
  },
  {
    id: "5",
    name: "Alex Williams",
    email: "alex@greeksync.com",
    role: "Event Coordinator",
    status: "active",
    profileImage: "https://i.pravatar.cc/150?u=alex",
  },
  {
    id: "6",
    name: "Jessica Lee",
    email: "jessica@greeksync.com",
    role: "Former President",
    status: "alumni",
    profileImage: "https://i.pravatar.cc/150?u=jessica",
  },
  {
    id: "7",
    name: "David Chen",
    email: "david@greeksync.com",
    role: "Former Treasurer",
    status: "alumni",
    profileImage: "https://i.pravatar.cc/150?u=david",
  },
];

const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  date: z.date({ required_error: "Please select a date" }),
  startTime: z.string().min(1, "Please select a start time"),
  endTime: z.string().min(1, "Please select an end time"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  description: z.string().optional(),
  type: z.enum(["meeting", "social", "service", "fundraiser", "other"] as const),
});

type EventFormValues = z.infer<typeof eventSchema>;

const EVENT_TYPES = {
  meeting: { label: "Meeting", color: "bg-blue-100 text-blue-800" },
  social: { label: "Social", color: "bg-purple-100 text-purple-800" },
  service: { label: "Service", color: "bg-green-100 text-green-800" },
  fundraiser: { label: "Fundraiser", color: "bg-amber-100 text-amber-800" },
  other: { label: "Other", color: "bg-gray-100 text-gray-800" },
};

const CreateEventDialog = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"create" | "review" | "success">("create");
  const [selectedInviteeType, setSelectedInviteeType] = useState<"active" | "all" | "select">("active");
  const [selectedInvitees, setSelectedInvitees] = useState<string[]>([]);
  
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      location: "",
      description: "",
      type: "meeting",
    },
  });
  
  const onInviteeTypeChange = (value: "active" | "all" | "select") => {
    setSelectedInviteeType(value);
    if (value === "active") {
      setSelectedInvitees(MOCK_MEMBERS.filter(m => m.status === "active").map(m => m.id));
    } else if (value === "all") {
      setSelectedInvitees(MOCK_MEMBERS.map(m => m.id));
    } else {
      setSelectedInvitees([]);
    }
  };
  
  const toggleInvitee = (id: string) => {
    setSelectedInvitees(prev => 
      prev.includes(id) 
        ? prev.filter(inviteeId => inviteeId !== id)
        : [...prev, id]
    );
  };
  
  const getInviteeCount = () => {
    return selectedInviteeType === "select" 
      ? `${selectedInvitees.length} selected`
      : selectedInviteeType === "active" 
        ? `${MOCK_MEMBERS.filter(m => m.status === "active").length} active members`
        : `${MOCK_MEMBERS.length} members`;
  };
  
  const onSubmit = (data: EventFormValues) => {
    if (step === "create") {
      setStep("review");
    } else if (step === "review") {
      // In a real app, this would send the data to the server
      console.log("Event submitted:", { ...data, invitees: selectedInvitees });
      
      // Show success message
      setStep("success");
      
      // Reset the form after 2 seconds and close the dialog
      setTimeout(() => {
        setStep("create");
        form.reset();
        setSelectedInviteeType("active");
        setSelectedInvitees(MOCK_MEMBERS.filter(m => m.status === "active").map(m => m.id));
        setOpen(false);
        
        toast({
          title: "Event submitted",
          description: "Your event will appear on the calendar once approved by an admin.",
        });
      }, 2000);
    }
  };
  
  const goBack = () => {
    if (step === "review") {
      setStep("create");
    }
  };
  
  const reset = () => {
    setStep("create");
    form.reset();
    setSelectedInviteeType("active");
    setSelectedInvitees(MOCK_MEMBERS.filter(m => m.status === "active").map(m => m.id));
  };
  
  const getInviteesByType = () => {
    return MOCK_MEMBERS.filter(member => 
      selectedInviteeType === "all" || 
      (selectedInviteeType === "active" && member.status === "active") ||
      (selectedInviteeType === "select" && selectedInvitees.includes(member.id))
    );
  };
  
  const getSelectedMembers = () => {
    return MOCK_MEMBERS.filter(member => selectedInvitees.includes(member.id));
  };
  
  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) {
        reset();
      }
    }}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          Add Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        {step === "create" && (
          <>
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>
                Fill out the details for your new organization event.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Weekly Meeting" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Event Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "MMMM d, yyyy")
                                ) : (
                                  <span>Select date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select event type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(EVENT_TYPES).map(([value, { label }]) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Student Union, Room 302" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Event details and any additional information" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-3">
                  <Label>Invitees</Label>
                  <Tabs
                    defaultValue="active"
                    value={selectedInviteeType}
                    onValueChange={(value) => onInviteeTypeChange(value as "active" | "all" | "select")}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="active">Active Members</TabsTrigger>
                      <TabsTrigger value="all">All Members</TabsTrigger>
                      <TabsTrigger value="select">Select Individuals</TabsTrigger>
                    </TabsList>
                    <TabsContent value="select" className="p-4 border rounded-md mt-2">
                      <ScrollArea className="h-[150px] w-full pr-4">
                        <div className="space-y-2">
                          {MOCK_MEMBERS.map((member) => (
                            <div 
                              key={member.id} 
                              className="flex items-center space-x-3 rounded-md p-2 hover:bg-muted"
                            >
                              <Checkbox 
                                id={`member-${member.id}`} 
                                checked={selectedInvitees.includes(member.id)}
                                onCheckedChange={() => toggleInvitee(member.id)}
                              />
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={member.profileImage} alt={member.name} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <Label 
                                htmlFor={`member-${member.id}`}
                                className="flex-1 cursor-pointer text-sm"
                              >
                                <span className="font-medium">{member.name}</span>
                                <span className="text-muted-foreground block text-xs">
                                  {member.role} {member.status === "alumni" && "(Alumni)"}
                                </span>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>
                  <FormDescription>
                    {getInviteeCount()} will be invited to this event.
                  </FormDescription>
                </div>
                
                <DialogFooter>
                  <Button type="submit">Review</Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        )}
        
        {step === "review" && (
          <>
            <DialogHeader>
              <DialogTitle>Review Event</DialogTitle>
              <DialogDescription>
                Review your event details before submitting.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="border rounded-md p-4 space-y-3">
                <div>
                  <h3 className="font-medium text-lg">{form.getValues("title")}</h3>
                  <div className="inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium capitalize" 
                    style={{ backgroundColor: `var(--${form.getValues("type")}-light)`, color: `var(--${form.getValues("type")}-dark)` }}>
                    {EVENT_TYPES[form.getValues("type") as EventType].label}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {form.getValues("date") && format(form.getValues("date"), "EEEE, MMMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">
                      {form.getValues("startTime")} - {form.getValues("endTime")}
                    </span>
                  </div>
                </div>
                <p className="text-sm">
                  <strong>Location:</strong> {form.getValues("location")}
                </p>
                {form.getValues("description") && (
                  <p className="text-sm">
                    <strong>Description:</strong> {form.getValues("description")}
                  </p>
                )}
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-2">Invitees ({getInviteeCount()})</h3>
                <ScrollArea className="h-[200px] w-full border rounded-md p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {getInviteesByType().map((member) => (
                      <div key={member.id} className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.profileImage} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <div className="font-medium">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={goBack}>
                  Back
                </Button>
                <Button onClick={form.handleSubmit(onSubmit)}>
                  Submit
                </Button>
              </DialogFooter>
            </div>
          </>
        )}
        
        {step === "success" && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 rounded-full bg-green-100 p-3">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold">Event Submitted Successfully</h2>
            <p className="text-muted-foreground mt-2 mb-6">
              Your event will be added to the calendar once approved by an admin.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventDialog;
