import React from "react"

import {
    AudioWaveform,
    Bell,
    ChartNoAxesCombined,
    House,
    MessageCircle,
    Package,
    ReceiptText,
    Settings,
    ShoppingCart,
    Tag,
    TicketPercent,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"

import NavMain from "./NavMain"
import NavUser from "./NavUser"
import TeamSwitcher from "./TeamSwitcher"

// Sample data
const data = {
    user: {
        name: "Seller",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
    ],
    navMain: [
        {
            title: "Dashboard",
            desc: "Ringkasan toko anda",
            url: "#",
            icon: House,
            isActive: true,
        },
        {
            title: "Produk",
            desc: "Kelola produk anda",
            url: "#",
            icon: Package,
            items: [
                { title: "Daftar Produk", url: "#" },
                { title: "Tambah Produk", url: "#" },
            ],
        },
        {
            title: "Pesanan Masuk",
            desc: "Kelola pesanan pelanggan",
            url: "#",
            icon: ShoppingCart,
            items: [
                { title: "Daftar Pesanan", url: "#" },
            ],
        },
        {
            title: "Laporan Penjualan",
            desc: "Lihat statistik penjualan",
            url: "#",
            icon: ChartNoAxesCombined,
        },
        {
            title: "Promosi & Diskon",
            desc: "Kelola promosi produk",
            url: "#",
            icon: Tag,
        },
    ],
    navSetting: [
        {
            title: "Notifikasi",
            desc: "Kelola notifikasi & pemberitahuan",
            url: "#",
            icon: Bell,
            isActive: true,
        },
        {
            title: "Chat",
            desc: "Kelola percakapan dengan pelanggan",
            url: "#",
            icon: MessageCircle,
            items: [
                { title: "Daftar Chat", url: "#" },
                { title: "Pesan Baru", url: "#" },
            ],
        },
        {
            title: "Pengaturan",
            desc: "Konfigurasi akun & preferensi",
            url: "#",
            icon: Settings,
            items: [
                { title: "Profil Akun", url: "#" },
                { title: "Keamanan", url: "#" },
                { title: "Preferensi Tampilan", url: "#" },
            ],
        },
    ],
}

const AppSidebar = (props) => {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="border-b">
                <TeamSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavMain items={data.navSetting} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

export default AppSidebar