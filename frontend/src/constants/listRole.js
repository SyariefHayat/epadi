import { 
    CircleDollarSign, 
    ShoppingBag, 
    Sun, 
    Zap 
} from "lucide-react";

export const LIST_ROLE = [
    {
        id: 'farmer',
        title: 'Petani',
        description: 'Saya ingin menjual hasil panen dan bergabung dengan komunitas petani',
        signup_desc: 'Bergabunglah dengan komunitas petani digital dan akses berbagai layanan untuk mengembangkan usaha tani Anda.',
        icon: Sun,
        route: '/signup/farmer',
        color: 'bg-green-500',
        textColor: 'text-green-500',
        textHover: 'text-green-700',
        bgColor: 'bg-green-600',
        borderColor: 'border-green-200',
        focusColor: 'ring-green-500'
    },
    {
        id: 'distributor',
        title: 'Distributor',
        description: 'Saya ingin mendistribusikan produk pertanian ke berbagai wilayah',
        signup_desc: 'Bergabunglah sebagai mitra distribusi produk pertanian untuk memperluas jangkauan pasar.',
        icon: Zap,
        route: '/signup/distributor',
        color: 'bg-blue-500',
        textColor: 'text-blue-500',
        textHover: 'text-blue-700',
        bgColor: 'bg-blue-600',
        borderColor: 'border-blue-200',
        focusColor: 'ring-blue-500'
    },
    {
        id: 'investor',
        title: 'Investor',
        description: 'Saya ingin berinvestasi dalam sektor pertanian dan agribisnis',
        signup_desc: 'Bergabunglah untuk berinvestasi di sektor pertanian dan agribisnis, serta dukung pertumbuhan ekosistem hijau.',
        icon: CircleDollarSign,
        route: '/signup/investor',
        color: 'bg-purple-500',
        textColor: 'text-purple-500',
        textHover: 'text-purple-700',
        bgColor: 'bg-purple-600',
        borderColor: 'border-purple-200',
        focusColor: 'ring-purple-500'
    },
    {
        id: 'buyer',
        title: 'Pembeli',
        description: 'Saya ingin membeli produk pertanian langsung dari petani',
        signup_desc: 'Bergabunglah untuk membeli produk pertanian berkualitas langsung dari petani terpercaya.',
        icon: ShoppingBag,
        route: '/signup/buyer',
        color: 'bg-orange-500',
        textColor: 'text-orange-500',
        textHover: 'text-orange-700',
        bgColor: 'bg-orange-600',
        borderColor: 'border-orange-200',
        focusColor: 'ring-orange-500'
    }
];