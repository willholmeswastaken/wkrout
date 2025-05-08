"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

interface AvatarMenuProps {
  imageUrl?: string;
  fallback: string;
  onProfileClick?: () => void;
  onLogoutClick?: () => void;
}

export function AvatarMenu({
  imageUrl = "/placeholder.svg?height=40&width=40",
  fallback,
  onProfileClick = () => console.log("Profile clicked"),
  onLogoutClick = () => console.log("Logout clicked"),
}: AvatarMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
          <AvatarImage src={imageUrl || "/placeholder.svg"} alt="User avatar" />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          onClick={onProfileClick}
          className="cursor-pointer flex items-center gap-2"
        >
          <User className="h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onLogoutClick}
          className="cursor-pointer text-destructive flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
