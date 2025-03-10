
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Download, ExternalLink, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

type CalendarProvider = "google" | "outlook" | "apple" | "ical";

interface CalendarIntegrationProps {
  className?: string;
}

const CalendarIntegration = ({ className }: CalendarIntegrationProps) => {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveWebhook = async () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Webhook URL saved",
        description: "Your calendar integration webhook has been saved successfully.",
      });
    }, 1000);
  };

  const handleExportCalendar = (provider: CalendarProvider) => {
    // In a real app, these would be actual export URLs
    const exportUrls = {
      google: "https://calendar.google.com/calendar/r?cid=webcal://",
      outlook: "https://outlook.office.com/calendar/addcalendar?url=webcal://",
      apple: "webcal://",
      ical: "/api/calendar/export/ical",
    };

    // Create a specific message for each provider
    const messages = {
      google: "Opening Google Calendar integration...",
      outlook: "Opening Outlook Calendar integration...",
      apple: "Opening Apple Calendar integration...",
      ical: "Downloading iCal file...",
    };

    // Show toast
    toast({
      title: "Calendar Export",
      description: messages[provider],
    });

    // In a real app, you'd handle the actual integration here
    // For now, we'll just simulate it
    if (provider === "ical") {
      // Simulate downloading an iCal file
      setTimeout(() => {
        toast({
          title: "Calendar Downloaded",
          description: "Your iCal file has been downloaded.",
        });
      }, 1500);
    } else {
      // Simulate opening a new window for other providers
      window.open(`#${provider}-calendar-demo`, "_blank");
    }
  };

  const handleShareCalendar = () => {
    if (navigator.share) {
      navigator.share({
        title: "Organization Calendar",
        text: "Check out our organization's calendar of events!",
        url: window.location.href,
      })
        .then(() => {
          toast({
            title: "Calendar Shared",
            description: "Thank you for sharing our calendar!",
          });
        })
        .catch((error) => {
          console.error("Error sharing calendar:", error);
        });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          title: "Link Copied",
          description: "Calendar link copied to clipboard.",
        });
      });
    }
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Calendar Integration
        </CardTitle>
        <CardDescription>
          Connect with your favorite calendar applications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 justify-start h-auto py-6"
            onClick={() => handleExportCalendar("google")}
          >
            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-red-600" />
            </div>
            <div className="text-left">
              <div className="font-medium">Google Calendar</div>
              <div className="text-xs text-muted-foreground">Add to your Google Calendar</div>
            </div>
            <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 justify-start h-auto py-6"
            onClick={() => handleExportCalendar("outlook")}
          >
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-left">
              <div className="font-medium">Outlook</div>
              <div className="text-xs text-muted-foreground">Add to your Outlook Calendar</div>
            </div>
            <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 justify-start h-auto py-6"
            onClick={() => handleExportCalendar("apple")}
          >
            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-gray-600" />
            </div>
            <div className="text-left">
              <div className="font-medium">Apple Calendar</div>
              <div className="text-xs text-muted-foreground">Add to your Apple Calendar</div>
            </div>
            <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 justify-start h-auto py-6"
            onClick={() => handleExportCalendar("ical")}
          >
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
              <Download className="h-4 w-4 text-purple-600" />
            </div>
            <div className="text-left">
              <div className="font-medium">iCal File</div>
              <div className="text-xs text-muted-foreground">Download as .ics file</div>
            </div>
          </Button>
        </div>
        
        <div className="pt-4 border-t">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Custom Webhook URL</Label>
            <div className="flex gap-2">
              <Input
                id="webhook-url"
                placeholder="Enter webhook URL for calendar sync"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
              <Button onClick={handleSaveWebhook} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Use a webhook to sync our calendar with your own systems
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={handleShareCalendar}
        >
          <Share2 className="h-4 w-4" />
          Share Calendar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CalendarIntegration;
