import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { 
    Funnel, 
    List, 
    MapPin, 
    Store, 
    Star, 
    Users, 
    Package, 
    Clock, 
    RefreshCw, 
    Shield,
    X
} from 'lucide-react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import EachUtils from '@/utils/EachUtils'
import { Button } from '@/components/ui/button'
import { Checkbox } from "@/components/ui/checkbox"
import { LIST_FOR_YOU } from '@/constants/listForYou'
import MartLayout from '@/components/layouts/MartLayout'
import { LIST_LOCATION } from '@/constants/listLocation'
import { LIST_FEATURED_CATEGORY } from '@/constants/listFeaturedCategory'

const StoreRecommendations = () => {
    const navigate = useNavigate();

    const [visibleCount, setVisibleCount] = useState(12);
    const [selectedStoreType, setSelectedStoreType] = useState('all');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    
    const showMore = () => {
        setVisibleCount((prev) => prev + 12);
    };

    const refreshRecommendations = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
            setVisibleCount(12);
        }, 1000);
    };

    const generateStores = () => {
        const storeMap = new Map();
        
        LIST_FOR_YOU.forEach(product => {
            if (!storeMap.has(product.store)) {
                storeMap.set(product.store, {
                    id: product.slugStore,
                    name: product.store,
                    location: product.location,
                    image: product.image, // Use product image as store avatar
                    rating: (4.0 + Math.random() * 1.0).toFixed(1), // Random rating 4.0-5.0
                    totalProducts: Math.floor(Math.random() * 500) + 50, // 50-550 products
                    totalSold: Math.floor(Math.random() * 10000) + 1000, // 1000-11000 sold
                    responseTime: Math.floor(Math.random() * 60) + 5, // 5-65 minutes
                    joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
                    isVerified: Math.random() > 0.3, // 70% verified
                    isOnline: Math.random() > 0.2, // 80% online
                    category: LIST_FEATURED_CATEGORY[Math.floor(Math.random() * LIST_FEATURED_CATEGORY.length)].name,
                    followers: Math.floor(Math.random() * 5000) + 100,
                    badge: Math.random() > 0.5 ? ['Terpercaya', 'Best Seller', 'Respon Cepat', 'Toko Pilihan'][Math.floor(Math.random() * 4)] : null
                });
            }
        });
        
        return Array.from(storeMap.values());
    };

    const allStores = generateStores();

    const getRecommendedStores = () => {
        let stores = [...allStores];
        
        switch(selectedStoreType) {
            case 'all':
                return stores.sort((a, b) => b.rating - a.rating);
            case 'verified':
                return stores.filter(store => store.isVerified).sort((a, b) => b.rating - a.rating);
            case 'nearby':
                return stores.filter((_, index) => index % 3 === 0).sort((a, b) => b.followers - a.followers);
            case 'bestseller':
                return stores.filter(store => store.badge === 'Best Seller' || store.totalSold > 5000).sort((a, b) => b.totalSold - a.totalSold);
            case 'responsive':
                return stores.filter(store => store.responseTime < 30).sort((a, b) => a.responseTime - b.responseTime);
            default:
                return stores;
        }
    };

    const recommendedStores = getRecommendedStores();

    const storeTypes = [
        { value: 'all', label: 'Semua Toko', icon: Store },
        { value: 'verified', label: 'Toko Terverifikasi', icon: Shield },
        { value: 'nearby', label: 'Toko Terdekat', icon: MapPin },
        { value: 'bestseller', label: 'Best Seller', icon: Package },
        { value: 'responsive', label: 'Respon Cepat', icon: Clock }
    ];

    const getStoreTypeInfo = () => {
        const typeInfo = {
            all: 'Semua toko terpilih dengan rating dan kualitas terbaik',
            verified: 'Toko yang sudah diverifikasi dan terpercaya',
            nearby: 'Toko terdekat dengan lokasi kamu untuk pengiriman lebih cepat',
            bestseller: 'Toko dengan penjualan tertinggi dan produk terlaris',
            responsive: 'Toko dengan waktu respon tercepat untuk pelayanan optimal'
        };
        return typeInfo[selectedStoreType] || '';
    };

    const SidebarContent = () => (
        <>
            <div className="bg-white border border-gray-200 rounded-lg mb-6">
                <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                    <div className="flex items-center gap-2">
                        <Store className="w-4 h-4 text-gray-600" />
                        <h3 className="font-medium text-gray-900">Jenis Toko</h3>
                    </div>
                </div>
                <div className="p-4">
                    <EachUtils 
                        of={storeTypes}
                        render={(item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="py-2">
                                    <div 
                                        className={`flex items-center gap-2 cursor-pointer p-2 rounded transition-colors ${
                                            selectedStoreType === item.value 
                                                ? 'bg-emerald-50 text-emerald-600' 
                                                : 'text-gray-700 hover:text-emerald-600'
                                        }`}
                                        onClick={() => {
                                            setSelectedStoreType(item.value);
                                            if (window.innerWidth < 1024) {
                                                setShowMobileFilters(false);
                                            }
                                        }}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="text-sm">{item.label}</span>
                                    </div>
                                </div>
                            );
                        }}
                    />
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg mb-6">
                <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                    <div className="flex items-center gap-2">
                        <List className="w-4 h-4 text-gray-600" />
                        <h3 className="font-medium text-gray-900">Kategori</h3>
                    </div>
                </div>
                <div className="p-4">
                    <EachUtils 
                        of={LIST_FEATURED_CATEGORY}
                        render={(item, index) => (
                            <div key={index} className="py-2">
                                <p 
                                    className="text-sm text-gray-700 hover:text-emerald-600 cursor-pointer transition-colors"
                                    onClick={() => navigate(`/mart/category/${item.url}`)}
                                >
                                    {item.name}
                                </p>
                            </div>
                        )}
                    />
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg">
                <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                    <div className="flex items-center gap-2">
                        <Funnel className="w-4 h-4 text-gray-600" />
                        <h3 className="font-medium text-gray-900">Filter</h3>
                    </div>
                </div>
                <div className="p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Lokasi</h4>
                    <div className="space-y-2">
                        <EachUtils 
                            of={LIST_LOCATION}
                            render={(item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Checkbox className="w-4 h-4" />
                                    <label className="text-sm text-gray-700 cursor-pointer hover:text-emerald-600 transition-colors">
                                        {item.nama}
                                    </label>
                                </div>
                            )}
                        />
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <MartLayout>
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="w-full h-[300px] sm:h-[350px] lg:h-[400px] mb-5 rounded-md bg-[url(/category.jpeg)] bg-cover bg-center flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 text-center text-white px-4">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Rekomendasi Toko</h2>
                        </div>
                        <p className="text-lg sm:text-xl opacity-90">Temukan toko terbaik dengan produk berkualitas dan pelayanan terpercaya</p>
                    </div>
                </div>

                <div className="lg:hidden mb-4">
                    <Button
                        onClick={() => setShowMobileFilters(true)}
                        variant="outline"
                        className="flex items-center gap-2 w-full justify-center"
                    >
                        <Funnel className="w-4 h-4" />
                        Filter & Kategori
                    </Button>
                </div>

                <div className="flex gap-4 lg:gap-8">
                    <div className="hidden lg:block w-64 flex-shrink-0">
                        <SidebarContent />
                    </div>

                    {showMobileFilters && (
                        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
                            <div className="fixed inset-y-0 left-0 w-80 max-w-full bg-gray-50 shadow-xl overflow-y-auto">
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-semibold text-gray-900">Filter & Kategori</h2>
                                        <Button
                                            onClick={() => setShowMobileFilters(false)}
                                            variant="outline"
                                            size="sm"
                                            className="p-2"
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <SidebarContent />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-gray-200 gap-3">
                            <div className="flex items-center gap-2">
                                <Store className="w-4 h-4 text-emerald-500" />
                                <p className="text-sm text-gray-600">
                                    {recommendedStores.length} toko direkomendasikan
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                <Button
                                    onClick={refreshRecommendations}
                                    variant="outline"
                                    size="sm"
                                    disabled={isRefreshing}
                                    className="flex items-center justify-center gap-2"
                                >
                                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                                    <span>Refresh</span>
                                </Button>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600 whitespace-nowrap">Urutkan:</span>
                                    <Select defaultValue="recommended">
                                        <SelectTrigger className="w-full sm:w-40 h-9">
                                            <SelectValue placeholder="Direkomendasikan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="recommended">Direkomendasikan</SelectItem>
                                            <SelectItem value="rating">Rating Tertinggi</SelectItem>
                                            <SelectItem value="followers">Pengikut Terbanyak</SelectItem>
                                            <SelectItem value="products">Produk Terbanyak</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Store className="w-5 h-5 text-emerald-600" />
                                <h3 className="font-medium text-emerald-900">
                                    {storeTypes.find(type => type.value === selectedStoreType)?.label}
                                </h3>
                            </div>
                            <p className="text-sm text-emerald-700">
                                {getStoreTypeInfo()}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-8">
                            <EachUtils
                                of={recommendedStores.slice(0, visibleCount)}
                                render={(store, index) => (
                                    <div 
                                        key={index} 
                                        className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                                        onClick={() => navigate(`/mart/store/${store.id}`)}
                                    >
                                        <div className="relative">
                                            <div className="h-24 sm:h-32 bg-gradient-to-r from-emerald-100 to-teal-100"></div>
                                            <div className="absolute -bottom-6 sm:-bottom-8 left-4">
                                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden">
                                                    <img 
                                                        src={store.image} 
                                                        alt={store.name} 
                                                        className="w-full h-full object-cover" 
                                                    />
                                                </div>
                                            </div>
                                            
                                            {store.badge && (
                                                <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                                                    <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                                        {store.badge}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                                                <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                                                    store.isOnline 
                                                        ? 'bg-green-100 text-green-700' 
                                                        : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                    <div className={`w-2 h-2 rounded-full ${
                                                        store.isOnline ? 'bg-green-500' : 'bg-gray-400'
                                                    }`}></div>
                                                    <span className="hidden sm:inline">{store.isOnline ? 'Online' : 'Offline'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="p-3 sm:p-4 pt-8 sm:pt-10">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate">
                                                    {store.name}
                                                </h3>
                                                {store.isVerified && (
                                                    <Shield className="w-4 h-4 text-blue-500 fill-current flex-shrink-0" />
                                                )}
                                            </div>
                                            
                                            <div className="flex items-center text-sm text-gray-600 mb-3">
                                                <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                                                <span className="truncate">{store.location}</span>
                                            </div>
                                            
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                    <span className="text-sm font-medium text-gray-900">{store.rating}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                                    <Users className="w-4 h-4" />
                                                    <span className="truncate">{store.followers}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-3 text-center border-t pt-3">
                                                <div>
                                                    <div className="text-base sm:text-lg font-semibold text-gray-900">
                                                        {store.totalProducts}
                                                    </div>
                                                    <div className="text-xs text-gray-600">Produk</div>
                                                </div>
                                                <div>
                                                    <div className="text-base sm:text-lg font-semibold text-gray-900">
                                                        {store.totalSold.toLocaleString('id-ID')}
                                                    </div>
                                                    <div className="text-xs text-gray-600">Terjual</div>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-3 text-center">
                                                <div className="text-xs text-gray-600">
                                                    Respon ~{store.responseTime} menit
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                        </div>

                        {visibleCount < recommendedStores.length && (
                            <div className="text-center">
                                <Button
                                    onClick={showMore}
                                    variant="outline"
                                    className="px-6 sm:px-8 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer w-full sm:w-auto"
                                >
                                    Tampilkan Lebih Banyak
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MartLayout>
    )
}

export default StoreRecommendations