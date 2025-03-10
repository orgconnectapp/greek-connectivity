
import React, { useState } from 'react';
import { CalendarIcon, DollarSign, PlusCircle, Receipt } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface CreateDueChargeModalProps {
  onDueCreated?: () => void;
}

const CreateDueChargeModal: React.FC<CreateDueChargeModalProps> = ({ onDueCreated }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [dueType, setDueType] = useState('regular');
  const [dueDate, setDueDate] = useState<Date>();
  const [description, setDescription] = useState('');

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
    });
    
    toast.success(`Due charge "${title}" has been created.`);
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
  };
  
  const validateForm = () => {
    return title.trim() !== '' && 
           amount.trim() !== '' && 
           !isNaN(parseFloat(amount)) && 
           parseFloat(amount) > 0 && 
           dueDate !== undefined;
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Receipt className="h-4 w-4" />
          Create Due Charge
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Due Charge</DialogTitle>
          <DialogDescription>
            Create a new due charge that will be added to members' accounts.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
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
