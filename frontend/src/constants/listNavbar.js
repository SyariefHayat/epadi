import { 
    ClipboardList, 
    HandCoins, 
    Home, 
    Leaf, 
    MessageSquareText, 
    Settings, 
    User, 
    Wallet 
} from "lucide-react"

export const LIST_NAVBAR = [
    {
        title: "Beranda",
        url: "/"
    },
    {
        title: "Tentang Kami",
        url: "/about-us"
    },
    {
        title: "Pasar",
        subMenu: [
            {
                title: "Harga Pasar",
                url: "/price-market"
            },
            {
                title: "Pasar Padi",
                url: "/marketplace"
            }
        ]
    },
    {
        title: "Komunitas",
        url: "/community",
    },
    {
        title: "Kerja Sama",
        url: "/cooperation"
    },
    {
        title: "Berita",
        url: "/news"
    },
]

export const LIST_NAVBAR_DB = [
    {
        title: "Main",
        items: [
            {
                title: "Dashboard",
                url: "#",
                icon: Home,
            },
        ],
    },
    {
        title: "Manajemen",
        items: [
            {
                title: "Biodata",
                url: "#",
                icon: User,
            },
            {
                title: "Rantai Pasok",
                url: "#",
                icon: HandCoins,
            },
            {
                title: "Ekonomi",
                url: "#",
                icon: Wallet,
            },
            {
                title: "Sosial",
                url: "#",
                icon: ClipboardList,
            },
            {
                title: "Prediksi",
                url: "#",
                icon: MessageSquareText,
            },
            {
                title: "Lingkungan",
                url: "#",
                icon: Leaf,
            },
        ],
    },
    {
        title: "Lainnya",
        items: [
            {
                title: "Pengaturan",
                url: "#",
                icon: Settings,
            },
        ],
    },
]

export const LIST_NAVBAR_MALL = [
    {
        title: "Distribusi",
        url: "/mall/distribusi",
        subMenu: [
            {
                title: "Status Rantai Pasok",
                url: "/mall/distribusi/status"
            },
            {
                title: "Pelacakan Pengiriman",
                url: "/mall/distribusi/pelacakan"
            },
            {
                title: "Peta Distribusi Padi",
                url: "/mall/distribusi/peta"
            },
            {
                title: "Mitra Gudang & Logistik",
                url: "/mall/distribusi/mitra"
            },
            {
                title: "Laporan Distribusi",
                url: "/mall/distribusi/laporan"
            }
        ]
    },
    {
        title: "Pendanaan",
        url: "/mall/pendanaan",
        subMenu: [
            {
                title: "Semua Proyek Pendanaan",
                url: "/mall/pendanaan"
            },
            {
                title: "Proyek Aktif",
                url: "/mall/pendanaan/aktif"
            },
            {
                title: "Proyek Sukses",
                url: "/mall/pendanaan/sukses"
            },
            {
                title: "Ajukan Pendanaan",
                url: "/mall/pendanaan/ajukan"
            },
            {
                title: "Riwayat Pendanaan",
                url: "/mall/pendanaan/riwayat"
            }
        ]
    },
    {
        title: "Training",
        url: "/mall/training",
        subMenu: [
            {
                title: "Jadwal Training",
                url: "/mall/training"
            },
            {
                title: "Materi Online",
                url: "/mall/training/materi"
            },
            {
                title: "Sertifikasi & Rekap Pelatihan",
                url: "/mall/training/sertifikasi"
            },
            {
                title: "Daftar Training",
                url: "/mall/training/daftar"
            },
            {
                title: "Galeri Dokumentasi",
                url: "/mall/training/galeri"
            }
        ]
    }
]