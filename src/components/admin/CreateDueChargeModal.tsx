
import React, { useState } from 'react';
import { CalendarIcon, DollarSign, PlusCircle, Receipt, CheckSquare, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CreateDueChargeModalProps {
  onDueCreated?: () => void;
}

// Mock members data
const membersData = [
  { id: 1, name: "Jason Smith", role: "President", email: "jason@greeksync.com", status: "active" },
  { id: 2, name: "Emma Johnson", role: "Vice President", email: "emma@greeksync.com", status: "active" },
  { id: 3, name: "Michael Brown", role: "Treasurer", email: "michael@greeksync.com", status: "active" },
  { id: 4, name: "Sophia Garcia", role: "Secretary", email: "sophia@greeksync.com", status: "active" },
  { id: 5, name: "Alex Williams", role: "Event Coordinator", email: "alex@greeksync.com", status: "active" },
  { id: 6, name: "David Lee", role: "Member", email: "david@greeksync.com", status: "inactive" },
  { id: 7, name: "Laura Martinez", role: "Member", email: "laura@greeksync.com", status: "active" },
  { id: 8, name: "Robert Wilson", role: "Member", email: "robert@greeksync.com", status: "active" },
  { id: 9, name: "Christina Taylor", role: "Member", email: "christina@greeksync.com", status: "active" },
  { id: 10, name: "Daniel Anderson", role: "Member", email: "daniel@greeksync.com", status: "alumni" },
  { id: 11, name: "Jennifer Thomas", role: "Member", email: "jennifer@greeksync.com", status: "active" },
  { id: 12, name: "Matthew Harris", role: "Member", email: "matthew@greeksync.com", status: "active" }
];

const CreateDueChargeModal: React.FC<CreateDueChargeModalProps> = ({ onDueCreated }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [dueType, setDueType] = useState('regular');
  const [dueDate, setDueDate] = useState<Date>();
  const [description, setDescription] = useState('');
  const [membersTab, setMembersTab] = useState('active');
  
  // State for selected members
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [selectAllActive, setSelectAllActive] = useState(false);
  
  // Filter members based on tab
  const filteredMembers = membersData.filter(member => {
    if (membersTab === 'all') return true;
    return member.status === membersTab;
  });
  
  // Active members for "select all" option
  const activeMembers = membersData.filter(member => member.status === 'active');
  
  // Handle select all active members
  const handleSelectAllActive = () => {
    if (selectAllActive) {
      // If already selected all, deselect all
      setSelectedMembers([]);
      setSelectAllActive(false);
    } else {
      // Select all active members
      const activeMemberIds = activeMembers.map(member => member.id);
      setSelectedMembers(activeMemberIds);
      setSelectAllActive(true);
    }
  };
  
  // Handle individual member selection
  const handleMemberSelection = (memberId: number, checked: boolean) => {
    if (checked) {
      setSelectedMembers(prev => [...prev, memberId]);
    } else {
      setSelectedMembers(prev => prev.filter(id => id !== memberId));
      // If deselecting a member, ensure selectAllActive is false
      if (selectAllActive) {
        setSelectAllActive(false);
      }
    }
  };
  
  // Check if all active members are selected
  React.useEffect(() => {
    const activeMemberIds = activeMembers.map(member => member.id);
    const allActiveSelected = activeMemberIds.every(id => selectedMembers.includes(id));
    setSelectAllActive(allActiveSelected && activeMemberIds.length > 0);
  }, [selectedMembers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send this data to your backend
    // For now, we'll just simulate a successful creation
    console.log({
      title,
      amount: parseFloat(amount),
      dueType,
      dueDate,
      description,
      createdAt: new Date(),
      selectedMembers,
      selectAllActive,
    });
    
    toast.success(`Due charge "${title}" has been created for ${selectedMembers.length} members.`);
    resetForm();
    setOpen(false);
    
    if (onDueCreated) {
      onDueCreated();
    }
  };
  
  const resetForm = () => {
    setTitle('');
    setAmount('');
    setDueType('regular');
    setDueDate(undefined);
    setDescription('');
    setSelectedMembers([]);
    setSelectAllActive(false);
    setMembersTab('active');
  };
  
  const validateForm = () => {
    return title.trim() !== '' && 
           amount.trim() !== '' && 
           !isNaN(parseFloat(amount)) && 
           parseFloat(amount) > 0 && 
           dueDate !== undefined &&
           selectedMembers.length > 0; // Ensure at least one member is selected
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Receipt className="h-4 w-4" />
          Create Due Charge
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Due Charge</DialogTitle>
          <DialogDescription>
            Create a new due charge that will be added to members' accounts.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  placeholder="Spring 2024 Membership Dues" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    id="amount" 
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="150.00" 
                    className="pl-9"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select value={dueType} onValueChange={setDueType}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select due type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">Regular Dues</SelectItem>
                    <SelectItem value="late">Late Fee</SelectItem>
                    <SelectItem value="event">Event Fee</SelectItem>
                    <SelectItem value="other">Other Charge</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="due-date">Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="due-date"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <textarea 
                  id="description"
                  className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Additional information about this charge"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label>Select Members</Label>
                  <div className="text-sm text-muted-foreground">
                    {selectedMembers.length} selected
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox 
                    id="select-all-active" 
                    checked={selectAllActive}
                    onCheckedChange={() => handleSelectAllActive()}
                  />
                  <Label htmlFor="select-all-active" className="text-sm font-normal cursor-pointer flex items-center">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    Select All Active Members ({activeMembers.length})
                  </Label>
                </div>
                
                <Tabs defaultValue="active" value={membersTab} onValueChange={setMembersTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="inactive">Inactive</TabsTrigger>
                    <TabsTrigger value="all">All</TabsTrigger>
                  </TabsList>
                  
                  <ScrollArea className="h-[300px] border rounded-md p-2 mt-2">
                    <div className="space-y-2 p-1">
                      {filteredMembers.map((member) => (
                        <div key={member.id} className="flex items-center space-x-2 py-2 border-b">
                          <Checkbox 
                            id={`member-${member.id}`} 
                            checked={selectedMembers.includes(member.id)}
                            onCheckedChange={(checked) => handleMemberSelection(member.id, checked === true)}
                          />
                          <Label htmlFor={`member-${member.id}`} className="w-full flex justify-between cursor-pointer">
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-sm text-muted-foreground">{member.email}</div>
                            </div>
                            <div className="text-sm text-muted-foreground font-medium">{member.role}</div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </Tabs>
              </div>
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                resetForm();
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!validateForm()}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Due Charge
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDueChargeModal;
