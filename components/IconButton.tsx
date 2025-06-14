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
  text?: string
  variant:
    | "link"
    | "outline"
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

function IconButton({ tooltip, IconButton, variant, text }: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size={"lg"} variant={variant}>
          {IconButton ? <IconButton size={50} /> : null}
          {text}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default IconButton;
