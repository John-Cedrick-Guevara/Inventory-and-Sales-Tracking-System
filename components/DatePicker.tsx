import React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { defaultEndDate, defaultStartDate } from "@/lib/constants";

interface DatePicker {
  openStartDate: boolean;
  setOpenStartDate: React.Dispatch<React.SetStateAction<boolean>>;
  startDate: Date | undefined;
  setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  openEndDate: boolean;
  setOpenEndDate: React.Dispatch<React.SetStateAction<boolean>>;
  endDate: Date | undefined;
  setEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const DatePicker = ({
  openStartDate,
  setOpenStartDate,
  startDate,
  setStartDate,
  openEndDate,
  setOpenEndDate,
  endDate,
  setEndDate,
}: DatePicker) => {
  return (
    <div className="flex items-center gap-2 max-md:flex-wrap ">
      {/* start date */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="date" className="px-1">
          Select start date:
        </Label>
        <Popover open={openStartDate} onOpenChange={setOpenStartDate}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="w-48 justify-between font-normal"
            >
              {startDate ? startDate.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              captionLayout="dropdown"
              onSelect={(date) => {
                // sets the default date if no selected(-7days)
                setStartDate(date ? date : defaultStartDate);
                setOpenStartDate(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* end date */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="date" className="px-1">
          Select end date:
        </Label>
        <Popover open={openEndDate} onOpenChange={setOpenEndDate}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="w-48 justify-between font-normal"
            >
              {endDate ? endDate.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={endDate}
              captionLayout="dropdown"
              onSelect={(date) => {
                // sets the default date if no selected(today)
                setEndDate(date ? date : defaultEndDate);
                setOpenEndDate(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DatePicker;
