"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

interface ThemeModeToggleProps {
  className?: string;
  onClick?: () => void;
  iconSize?: number;
}

function ThemeModeToggle({
  className,
  onClick,
  iconSize = 16,
}: ThemeModeToggleProps) {
  const { setTheme } = useTheme();

  const handleOnClick = (theme: string) => {
    setTheme(theme);
    if (onClick) onClick();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn("outline-transparent rounded-full", className)}
        >
          <Sun
            size={iconSize}
            className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Moon
            size={iconSize}
            className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="z-[110]">
        <DropdownMenuItem onClick={() => handleOnClick("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleOnClick("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleOnClick("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ThemeModeToggle;
