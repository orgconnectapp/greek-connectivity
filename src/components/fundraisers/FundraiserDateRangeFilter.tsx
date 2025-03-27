
import React from 'react';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type DateRangeType = 'this-semester' | 'last-semester' | 'all-time' | 'custom';

interface FundraiserDateRangeFilterProps {
  dateRange: DateRangeType;
  setDateRange: (range: DateRangeType) => void;
  customStartDate: Date | undefined;
  customEndDate: Date | undefined;
  setCustomStartDate: (date: Date | undefined) => void;
  setCustomEndDate: (date: Date | undefined) => void;
}

const FundraiserDateRangeFilter = ({
  dateRange,
  setDateRange,
  customStartDate,
  customEndDate,
  setCustomStartDate,
  setCustomEndDate,
}: FundraiserDateRangeFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <div className="flex-grow max-w-xs">
        <Select value={dateRange} onValueChange={(value) => setDateRange(value as DateRangeType)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-semester">This Semester</SelectItem>
            <SelectItem value="last-semester">Last Semester</SelectItem>
            <SelectItem value="all-time">All Time</SelectItem>
            <SelectItem value="custom">Custom Date Range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {dateRange === 'custom' && (
        <div className="flex flex-col sm:flex-row gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal w-full sm:w-[200px]",
                  !customStartDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {customStartDate ? format(customStartDate, 'PPP') : <span>Start date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={customStartDate}
                onSelect={setCustomStartDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal w-full sm:w-[200px]",
                  !customEndDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {customEndDate ? format(customEndDate, 'PPP') : <span>End date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={customEndDate}
                onSelect={setCustomEndDate}
                disabled={(date) => customStartDate ? date < customStartDate : false}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default FundraiserDateRangeFilter;
