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
    Briefcase,
    Layers,
    AlertTriangle,
    FileText,
    Headphones
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
            title: "Portofolio", 
            url: "#", 
            icon: Briefcase,
            items: [
                { title: "Ringkasan Investasi", url: "#" },
                { title: "ROI & Cashflow", url: "#" },
                { title: "Riwayat Transaksi", url: "#" }
            ]
        },
        { 
            title: "Proyek", 
            url: "#", 
            icon: Layers,
            items: [
                { title: "Proyek Aktif", url: "#" },
                { title: "Produktivitas Proyek", url: "#" },
                { title: "Efektivitas Dana", url: "#" }
            ]
        },
        { 
            title: "Pasar & Prediksi", 
            url: "#", 
            icon: LineChart,
            items: [
                { title: "Harga Pasar", url: "#" },
                { title: "Prediksi Supply & Demand", url: "#" },
                { title: "Proyeksi Keuntungan", url: "#" }
            ]
        },
        { 
            title: "Faktor Risiko", 
            url: "#", 
            icon: AlertTriangle,
            items: [
                { title: "Cuaca & Iklim", url: "#" },
                { title: "Kebijakan Pemerintah", url: "#" },
                { title: "Tren Pasar Global", url: "#" }
            ]
        },
        { 
            title: "Laporan & Dokumen", 
            url: "#", 
            icon: FileText,
            items: [
                { title: "Laporan Bulanan", url: "#" },
                { title: "Laporan Tahunan", url: "#" },
                { title: "Dokumen Legal", url: "#" }
            ]
        },
        { 
            title: "Layanan Investor", 
            url: "#", 
            icon: Headphones,
            items: [
                { title: "Konsultasi Keuangan", url: "#" },
                { title: "Dukungan Teknis", url: "#" }
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
                                <span className="text-base uppercase font-semibold">Dashboard Investor</span>
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