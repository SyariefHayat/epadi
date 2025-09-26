import React from "react"
import { toast } from "sonner";
import { useAtom } from "jotai";

import {
	ChevronsUpDown,
	LogOut,
} from "lucide-react";

import {
	Avatar,
	AvatarFallback,
} from "@/components/ui/avatar";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";

import { getInitial } from "@/utils/getInitial";
import { userDataAtomStorage } from "@/jotai/atoms";
import { apiInstanceExpress } from "@/services/apiInstance";

const NavUser = () => {
	const { isMobile } = useSidebar();
	const [userData, setUserData] = useAtom(userDataAtomStorage);

	const handleLogout = async () => {
		if (!userData) return;

		try {
			const payload = { NIK: userData.NIK };
			const response = await apiInstanceExpress.post("/sign-out", payload);
			if (response.status === 200) {
				toast.success("Sign out berhasil");
				
				setTimeout(() => {
					setUserData(null);
					localStorage.removeItem("userData");
				}, 2000);
			}
		} catch (error) {
			toast.error("Sign out gagal");
			console.error(error);
		}
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								{/* <AvatarImage 
									src={getProfilePicture(userData)}
									referrerPolicy="no-referrer"
									className="object-cover"
								/> */}
								<AvatarFallback className="rounded-lg">{getInitial("Shadcn")}</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">Shadcn</span>
								<span className="truncate text-xs">shadcn@example.com</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									{/* <AvatarImage src={getProfilePicture(userData)} /> */}
									<AvatarFallback className="rounded-lg">{getInitial("Shadcn")}</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">Shadcn</span>
								    <span className="truncate text-xs">shadcn@example.com</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
							<LogOut />
							Keluar
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

export default NavUser