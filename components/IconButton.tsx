import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface Props {
  IconButton?: LucideIcon;
  tooltip: string;
}

function IconButton({ tooltip, IconButton }: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size={"lg"} variant="outline">{IconButton ? <IconButton size={50} /> : null}</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default IconButton;
