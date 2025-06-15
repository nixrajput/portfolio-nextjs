"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

interface ThemeModeToggleProps {
  className?: string;
  iconSize?: number;
  onClick?: () => void;
}

function ThemeModeToggle({
  className,
  iconSize = 16,
  onClick,
}: ThemeModeToggleProps) {
  const { setTheme } = useTheme();

  const handleSetTheme = (theme: "light" | "dark" | "system") => {
    setTheme(theme);
    onClick?.();
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
        <DropdownMenuItem onClick={() => handleSetTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSetTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSetTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ThemeModeToggle;
