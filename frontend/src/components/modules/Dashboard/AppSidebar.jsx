import React from "react"
import { Link } from "react-router-dom"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"

import { 
    LIST_NAVBAR_ADMIN_DB, 
    LIST_NAVBAR_FARMER_DB, 
    LIST_NAVBAR_OPERATOR_DB
} from "@/constants/listNavbar"

import NavUser from "./NavUser"
import EachUtils from "@/utils/EachUtils"
import { useAuth } from "@/context/AuthContext"

const AppSidebar = () => {
    const { userData } = useAuth();

    return (
        <Sidebar>
            <SidebarHeader className="h-16 border-b border-sidebar-border">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="/dashboard">
                                <div className="flex aspect-square size-10 p-1 items-center justify-center rounded-lg text-sidebar-primary-foreground bg-green-500">
                                    <img src="/logo.png" alt="logo yayasan" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="truncate font-semibold">Epadi</span>
                                    <span className="truncate">v1.0.0</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <EachUtils
                    of={
                        userData.role === "admin"
                            ? LIST_NAVBAR_ADMIN_DB
                            : userData.role === "operator"
                            ? LIST_NAVBAR_OPERATOR_DB
                            : LIST_NAVBAR_FARMER_DB
                    }
                    render={(item, index) => (
                        <SidebarGroup key={index} className="py-1 px-2">
                            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <EachUtils
                                        of={item.items}
                                        render={(item, index) => (
                                            <SidebarMenuItem key={index}>
                                                <SidebarMenuButton asChild>
                                                    <Link to={item.url}>
                                                        <item.icon size={20} color="#9ca3af" />
                                                        <span>{item.title}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        )}
                                    />
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    )}
                />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    )
}

export default AppSidebar