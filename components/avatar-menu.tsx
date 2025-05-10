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
import { LogOut, User, Dumbbell } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
interface AvatarMenuProps {
  imageUrl?: string;
  fallback: string;
}

export function AvatarMenu({
  imageUrl = "/placeholder.svg?height=40&width=40",
  fallback,
}: AvatarMenuProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onLogoutClick = () => {
    authClient
      .signOut()
      .then(() => {
        void router.refresh();
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
          asChild
          className="cursor-pointer flex items-center gap-2"
        >
          <Link href="/app">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/app/plans" className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4" />
            <span>Plans</span>
          </Link>
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
