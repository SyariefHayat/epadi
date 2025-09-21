import React from "react"

import {
    IconChartBar,
    IconDashboard,
    IconFolder,
    IconInnerShadowTop,
    IconListDetails,
    IconUsers,
} from "@tabler/icons-react"

import {
    Home,
    Truck,
    LineChart,
    TreeDeciduous,
    Users,
    ExternalLink,
    Activity,
    Calendar,
    Smartphone,
    User
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import NavMain from "./NavMain"
import NavUser from "./NavUser"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        { 
            title: "Dashboard", 
            url: "#", 
            icon: Home 
        },
    ],
};

const AppSidebar = () => {
    return (
        <Sidebar collapsible="offcanvas" className="border-none outline-none">
            <SidebarHeader className="bg-green-500">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-5"
                        >
                            <a href="#" className="text-white">
                                <IconInnerShadowTop className="!size-5" />
                                <span className="text-base uppercase font-semibold">Dashboard Admin</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="bg-green-500 text-white">
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter className="bg-green-500 text-white">
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar