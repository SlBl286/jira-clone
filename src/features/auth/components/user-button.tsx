"use client"
import { Loader, LogOut } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"


import { useLogout } from "../api/use-logout"

import { useCurrent } from "../api/use-current"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import DottedSeprator from "@/components/dotted-separator"


export const UserButton = () => {
    const {mutate} = useLogout();
    const { data, isLoading } = useCurrent();

    if (isLoading) {
        return (
            <div className=" size-10 rounded-full flex items-center justify-center bg-neutral-200 boder border-neutral-300 ">
                <Loader className="size-4 animate-spin text-muted-foreground" />
            </div>
        )
    }

    if (!data) {
        return null
    }
    const { name, email } = data;

    const avatarFallback = name ? name.charAt(0).toUpperCase() : email.charAt(0).toUpperCase() ?? "U"
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative">
                <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
                    <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="bottom" className="w-60" sideOffset={10}>
                <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
                    <Avatar className="size-[52px] hover:opacity-75 transition border border-neutral-300">
                        <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
                            {avatarFallback}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex flex-col  items-center justify-center ">
                    <p className="test-sm font-medium text-neutral-900">
                        {name || "User"}
                    </p>
                    <p className="text-sx text-neutral-500">{email}</p>
                </div>
                <DottedSeprator className="mb-1"/>
                <DropdownMenuItem onClick={()=> {mutate()}}
                 className="h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer">
                    <LogOut className="size-4 mr-2"/>
                    Logout 
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
} 