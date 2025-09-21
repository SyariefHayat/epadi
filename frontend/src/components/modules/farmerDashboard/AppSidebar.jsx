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
    Smartphone
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
        { 
            title: "Rantai Pasok", 
            url: "#", 
            icon: Truck,
            items: [
                {
                    title: "Key Performance Indicator",
                    url: "#"
                },
                {
                    title: "Distribusi Padi",
                    url: "#"
                }
            ]
        },
        { 
            title: "Ekonomi", 
            url: "#", 
            icon: LineChart,
            items: [
                {
                    title: "Produktivitas",
                    url: "#"
                },
                {
                    title: "Produksi",
                    url: "#"
                },
                {
                    title: "Permintaan",
                    url: "#"
                },
                {
                    title: "Efektivitas Pembiayaan Budidaya",
                    url: "#"
                },
                {
                    title: "Kualitas Komoditas",
                    url: "#"
                },
                {
                    title: "Luas Lahan",
                    url: "#"
                },
                {
                    title: "Stok Padi",
                    url: "#"
                },
                {
                    title: "Saprodi",
                    url: "#"
                },
                {
                    title: "Sarana dan Prasarana",
                    url: "#"
                },
            ]
        },
        { 
            title: "Lingkungan", 
            url: "#", 
            icon: TreeDeciduous,
            items: [
                {
                    title: "Mitigasi Limbah",
                    url: "#"
                },
                {
                    title: "Daur Ulang Limbah",
                    url: "#"
                },
                {
                    title: "Mitigasi Emisi Karbon",
                    url: "#"
                },
                {
                    title: "Kondisi Existing",
                    url: "#"
                },
                {
                    title: "Hama",
                    url: "#"
                },
            ]
        },
        { 
            title: "Sosial", 
            url: "#", 
            icon: Users,
            items: [
                {
                    title: "Peningkatan Pendapatan Petani",
                    url: "#"
                },
                {
                    title: "Peningkatan Fungsi Kelembagaan",
                    url: "#"
                },
                {
                    title: "Rekomendasi Budidaya Berdaya Asing",
                    url: "#"
                },
            ]
        },
        { 
            title: "External", 
            url: "#", 
            icon: ExternalLink,
            items: [
                {
                    title: "Kebijakan Pemerintah",
                    url: "#"
                },
                {
                    title: "Degradasi Lingkungan",
                    url: "#"
                },
                {
                    title: "Nilai-Nilai Sosial",
                    url: "#"
                },
            ]
        },
        { 
            title: "Prediksi", 
            url: "#", 
            icon: Activity,
            items: [
                {
                    title: "Cuaca",
                    url: "#"
                },
                {
                    title: "Supply dan Demand",
                    url: "#"
                },
            ]
        },
        { title: "Kalender Tanam", url: "#", icon: Calendar },
        { title: "Layanan Digital", url: "#", icon: Smartphone },
    ],
};

const AppSidebar = () => {
    return (
        <Sidebar collapsible="offcanvas">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-5"
                        >
                            <a href="#">
                                <IconInnerShadowTop className="!size-5" />
                                <span className="text-base uppercase font-semibold">Dashboard Petani</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar