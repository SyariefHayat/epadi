import React from "react"

import {
    IconInnerShadowTop,
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
    Boxes,
    ShoppingCart,
    BarChart3
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
            title: "Manajemen Stok", 
            url: "#", 
            icon: Boxes,
            items: [
                { title: "Stok Gudang", url: "#" },
                { title: "Kualitas Komoditas", url: "#" },
                { title: "Riwayat Penerimaan", url: "#" }
            ]
        },
        { 
            title: "Pengiriman", 
            url: "#", 
            icon: Truck,
            items: [
                { title: "Tracking Armada", url: "#" },
                { title: "Jadwal Pengiriman", url: "#" },
                { title: "Optimasi Rute", url: "#" }
            ]
        },
        { 
            title: "Permintaan & Pasar", 
            url: "#", 
            icon: ShoppingCart,
            items: [
                { title: "Permintaan Aktif", url: "#" },
                { title: "Harga Pasar", url: "#" },
                { title: "Prediksi Permintaan", url: "#" }
            ]
        },
        { 
            title: "Kinerja Logistik", 
            url: "#", 
            icon: BarChart3,
            items: [
                { title: "KPI Distribusi", url: "#" },
                { title: "Biaya Operasional", url: "#" },
                { title: "Laporan Bulanan", url: "#" }
            ]
        },
        { 
            title: "Faktor Eksternal", 
            url: "#", 
            icon: ExternalLink,
            items: [
                { title: "Kebijakan Pemerintah", url: "#" },
                { title: "Cuaca & Iklim", url: "#" },
                { title: "Tren Pasar", url: "#" }
            ]
        },
        { 
            title: "Layanan Digital", 
            url: "#", 
            icon: Smartphone,
            items: [
                { title: "E-Marketplace", url: "#" },
                { title: "Konsultasi Ahli", url: "#" },
                { title: "Akses Pembiayaan", url: "#" }
            ]
        }
    ]
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
                                <span className="text-base uppercase font-semibold">Dashboard Distributor</span>
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