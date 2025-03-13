
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, DollarSign, FileText, Image, Plus, Check, X, Upload, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

// Define the form schema with zod
const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  goalAmount: z.coerce.number().min(1, 'Goal amount must be greater than 0'),
  goalDate: z.date().min(new Date(), 'Goal date must be in the future'),
  image: z.instanceof(File).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateFundraiserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateFundraiserDialog = ({ open, onOpenChange }: CreateFundraiserDialogProps) => {
  const [step, setStep] = useState<'form' | 'review'>('form');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      goalAmount: undefined,
      goalDate: undefined,
      image: undefined,
    },
  });
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('image', file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onSubmit = (data: FormValues) => {
    if (step === 'form') {
      setStep('review');
    } else {
      // Here you would typically send the data to your API
      console.log('Fundraiser data submitted:', data);
      
      // Show success toast
      toast({
        title: "Fundraiser Created",
        description: "Your fundraiser will go live once approved by an admin",
      });
      
      // Reset form and close dialog
      form.reset();
      setImagePreview(null);
      setStep('form');
      onOpenChange(false);
    }
  };
  
  const handleBack = () => {
    setStep('form');
  };
  
  const handleClose = () => {
    form.reset();
    setImagePreview(null);
    setStep('form');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {step === 'form' ? 'Create New Fundraiser' : 'Review Fundraiser Details'}
          </DialogTitle>
          <DialogDescription>
            {step === 'form' 
              ? 'Fill out the details for your new fundraising campaign.' 
              : 'Please review the information before submitting your fundraiser.'}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 'form' ? (
              <>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fundraiser Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter fundraiser title" {...field} />
                      </FormControl>
                      <FormDescription>
                        Choose a clear, descriptive title for your fundraiser.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your fundraiser and its purpose" 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Provide details about why you're raising funds and how they'll be used.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="goalAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Goal Amount ($)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            type="number"
                            placeholder="500"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Set a realistic fundraising goal.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="goalDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Goal Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Choose the end date for your fundraiser.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormItem>
                  <FormLabel>Fundraiser Image</FormLabel>
                  <div className="space-y-4">
                    {imagePreview ? (
                      <div className="relative">
                        <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
                          <img
                            src={imagePreview}
                            alt="Fundraiser preview"
                            className="w-full h-full object-cover"
                          />
                        </AspectRatio>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setImagePreview(null);
                            form.setValue('image', undefined);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-md p-12 text-center">
                        <Image className="h-10 w-10 text-muted-foreground mb-2" />
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            Drag and drop an image, or click to browse
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById('image-upload')?.click()}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Image
                          </Button>
                        </div>
                      </div>
                    )}
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageChange}
                    />
                  </div>
                  <FormDescription>
                    Add an image that represents your fundraiser. 16:9 aspect ratio recommended.
                  </FormDescription>
                </FormItem>
              </>
            ) : (
              // Review step
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-muted-foreground">Fundraiser Title</Label>
                        <p className="text-lg font-medium">{form.getValues('title')}</p>
                      </div>
                      
                      <div>
                        <Label className="text-muted-foreground">Description</Label>
                        <p className="whitespace-pre-wrap">{form.getValues('description')}</p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <Label className="text-muted-foreground">Goal Amount</Label>
                          <p className="text-lg font-medium">${form.getValues('goalAmount')}</p>
                        </div>
                        <div className="flex-1">
                          <Label className="text-muted-foreground">End Date</Label>
                          <p className="text-lg font-medium">
                            {form.getValues('goalDate') ? format(form.getValues('goalDate'), "PPP") : 'Not set'}
                          </p>
                        </div>
                      </div>
                      
                      {imagePreview && (
                        <div>
                          <Label className="text-muted-foreground">Fundraiser Image</Label>
                          <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden mt-2">
                            <img
                              src={imagePreview}
                              alt="Fundraiser preview"
                              className="w-full h-full object-cover"
                            />
                          </AspectRatio>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              {step === 'form' ? (
                <Button type="submit" className="w-full sm:w-auto">
                  Review
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleBack}
                    className="w-full sm:w-auto"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Edit
                  </Button>
                  <Button type="submit" className="w-full sm:w-auto">
                    <Check className="mr-2 h-4 w-4" />
                    Submit
                  </Button>
                </>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFundraiserDialog;
