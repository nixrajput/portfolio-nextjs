"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const BackButton = ({
  className,
  variant,
  size,
  icon,
  label,
  showIcon = true,
  onClick,
}: {
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  icon?: JSX.Element;
  label?: string;
  showIcon?: boolean;
  onClick?: () => void;
}) => {
  const router = useRouter();

  const handleBack = () => {
    try {
      if (window.history.length > 1) {
        router.back();
      } else {
        router.replace("/");
      }
    } catch (error) {
      console.error("Navigation error:", error);
      router.replace("/");
    }
  };

  return (
    <Button
      className={cn(className)}
      variant={variant || "default"}
      size={size || "default"}
      onClick={onClick || handleBack}
    >
      {showIcon ? (
        icon ? (
          icon
        ) : (
          <IconArrowLeft className="mr-2 h-4 w-4" />
        )
      ) : null}
      {label || "Back"}
    </Button>
  );
};

export default BackButton;
