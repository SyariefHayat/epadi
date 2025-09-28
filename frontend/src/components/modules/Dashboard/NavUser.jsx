import React from "react"
import { toast } from "sonner";
import { signOut } from "firebase/auth";

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

import { auth } from "@/services/firebase";
import { getInitial } from "@/utils/getInitial";
import { useAuth } from "@/context/AuthContext";
import { apiInstanceExpress } from "@/services/apiInstance";

const NavUser = () => {
	const { isMobile } = useSidebar();
	const { currentUser, userData } = useAuth();

	const handleSignOut = async () => {
		const toastId = toast.loading("Mengeluarkan akun anda...");

		try {
			const token = await currentUser.getIdToken();
			const userSignOut = await apiInstanceExpress.post("/sign-out", {}, {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			});

			if (userSignOut.status === 200) {
				toast.success("Sign out berhasil", { id: toastId });
				await signOut(auth);
			};
		} catch (error) {
			console.error(error);
			toast.error("Sign out gagal", { id: toastId });
		};
	};

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
								<AvatarFallback className="rounded-lg">{getInitial(userData.fullName)}</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">{userData.fullName}</span>
								<span className="truncate text-xs">{userData.role}</span>
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
									<AvatarFallback className="rounded-lg">{getInitial(userData.fullName)}</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">{userData.fullName}</span>
									<span className="truncate text-xs">{userData.role}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
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