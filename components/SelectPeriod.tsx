import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch } from "react";

export default function PeriodDropDown({
  period,
  setPeriod,
}: {
  period: "daily" | "weekly" | "monthly";
  setPeriod: Dispatch<React.SetStateAction<"daily" | "weekly" | "monthly">>;
}) {
  return (
    <Select value={period} onValueChange={(item: any) => setPeriod(item)}>
      <SelectTrigger className="w-[110px] max-md:mr-auto">
        <SelectValue placeholder="Select period " />
      </SelectTrigger>
      <SelectContent>
        {["daily", "weekly", "monthly"].map((item, index) => (
          <SelectItem
            key={index}
            value={item} // month number as value
          >
            {item.slice(0, 1).toUpperCase() + item.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
