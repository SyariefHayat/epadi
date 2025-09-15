import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { 
    Funnel, 
    List, 
    MapPin, 
    Heart, 
    User, 
    Sparkles, 
    RefreshCw, 
    Eye,
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

const ForYouRecom = () => {
    const navigate = useNavigate();

    const [visibleCount, setVisibleCount] = useState(12);
    const [selectedRecommendationType, setSelectedRecommendationType] = useState('personalized');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    
    const showMore = () => {
        setVisibleCount((prev) => prev + 12);
    };

    const refreshRecommendations = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
            setVisibleCount(12); // Reset to initial count
        }, 1000);
    };

    const getRecommendedProducts = () => {
        let products = [...LIST_FOR_YOU];
        
        switch(selectedRecommendationType) {
            case 'personalized':
                return products.sort(() => Math.random() - 0.5);
            case 'similar':
                return products.filter((_, index) => index % 2 === 0);
            case 'trending':
                return products.sort((a, b) => b.sold - a.sold);
            case 'nearby':
                return products.filter((_, index) => index % 3 === 0);
            default:
                return products;
        }
    };

    const recommendedProducts = getRecommendedProducts();

    const recommendationTypes = [
        { value: 'personalized', label: 'Dipersonalisasi', icon: User, shortLabel: 'Personal' },
        { value: 'similar', label: 'Serupa dengan yang Dilihat', icon: Eye, shortLabel: 'Serupa' },
        { value: 'trending', label: 'Sedang Trending', icon: Sparkles, shortLabel: 'Trending' },
        { value: 'nearby', label: 'Dekat Lokasi Kamu', icon: MapPin, shortLabel: 'Terdekat' }
    ];

    const getRecommendationBadge = (index) => {
        switch(selectedRecommendationType) {
            case 'personalized':
                return { text: 'Untuk Kamu', color: 'bg-gradient-to-r from-purple-500 to-pink-500' };
            case 'similar':
                return { text: 'Serupa', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' };
            case 'trending':
                return { text: 'Trending', color: 'bg-gradient-to-r from-orange-500 to-red-500' };
            case 'nearby':
                return { text: 'Terdekat', color: 'bg-gradient-to-r from-green-500 to-emerald-500' };
            default:
                return { text: 'Rekomendasi', color: 'bg-gradient-to-r from-gray-500 to-gray-600' };
        }
    };

    const SidebarContent = () => (
        <>
            <div className="bg-white border border-gray-200 rounded-lg mb-6">
                <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-gray-600" />
                        <h3 className="font-medium text-gray-900">Jenis Rekomendasi</h3>
                    </div>
                </div>
                <div className="p-4">
                    <EachUtils 
                        of={recommendationTypes}
                        render={(item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="py-2">
                                    <div 
                                        className={`flex items-center gap-2 cursor-pointer p-2 rounded transition-colors ${
                                            selectedRecommendationType === item.value 
                                                ? 'bg-purple-50 text-purple-600' 
                                                : 'text-gray-700 hover:text-purple-600'
                                        }`}
                                        onClick={() => {
                                            setSelectedRecommendationType(item.value);
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
                                    className="text-sm text-gray-700 hover:text-purple-600 cursor-pointer transition-colors"
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
                                    <label className="text-sm text-gray-700 cursor-pointer hover:text-purple-600 transition-colors">
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
                <div className="w-full h-[300px] sm:h-[350px] lg:h-[400px] mb-5 rounded-md bg-[url(/category2.jpg)] bg-cover bg-center flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 text-center text-white px-4">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Untuk Kamu</h2>
                        </div>
                        <p className="text-lg sm:text-xl opacity-90">Rekomendasi produk yang disesuaikan dengan preferensi kamu</p>
                    </div>
                </div>

                <div className="lg:hidden mb-4">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        <EachUtils
                            of={recommendationTypes}
                            render={(item, index) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedRecommendationType(item.value)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                                            selectedRecommendationType === item.value
                                                ? 'bg-purple-100 text-purple-700 border border-purple-200'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{item.shortLabel || item.label}</span>
                                    </button>
                                );
                            }}
                        />
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
                                <Heart className="w-4 h-4 text-purple-500 fill-current" />
                                <p className="text-sm text-gray-600">
                                    {recommendedProducts.length} produk direkomendasikan untuk kamu
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
                                            <SelectItem value="newest">Terbaru</SelectItem>
                                            <SelectItem value="highest">Harga Tertinggi</SelectItem>
                                            <SelectItem value="lowest">Harga Terendah</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-5 h-5 text-purple-600" />
                                <h3 className="font-medium text-purple-900">
                                    {recommendationTypes.find(type => type.value === selectedRecommendationType)?.label}
                                </h3>
                            </div>
                            <p className="text-sm text-purple-700">
                                {selectedRecommendationType === 'personalized' && 'Berdasarkan aktivitas dan preferensi belanja kamu'}
                                {selectedRecommendationType === 'similar' && 'Produk serupa dengan yang pernah kamu lihat'}
                                {selectedRecommendationType === 'trending' && 'Produk yang sedang populer dan banyak dicari'}
                                {selectedRecommendationType === 'nearby' && 'Produk dari toko terdekat dengan lokasi kamu'}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 mb-8">
                            <EachUtils
                                of={recommendedProducts.slice(0, visibleCount)}
                                render={(item, index) => {
                                    const badge = getRecommendationBadge(index);
                                    return (
                                        <div 
                                            key={index} 
                                            className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer overflow-hidden relative"
                                            onClick={() => navigate(`/mart/store/${item.slugStore}/${item.slugProduct}`)}
                                        >
                                            <div className="absolute top-2 left-2 z-10">
                                                <div className={`${badge.color} text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
                                                    <Heart className="w-3 h-3 fill-current" />
                                                    <span className="hidden sm:inline">{badge.text}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="aspect-square overflow-hidden">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                                                />
                                            </div>
                                            
                                            <div className="p-3 sm:p-4">
                                                <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2">
                                                    {item.name}
                                                </h3>
                                                
                                                <p className="text-xs text-gray-600 mb-1 truncate">{item.store}</p>
                                                
                                                <div className="flex items-center text-xs text-gray-500 mb-3">
                                                    <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                                                    <span className="truncate">{item.location}</span>
                                                </div>
                                                
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                                    <div className="flex items-baseline">
                                                        <span className="text-sm sm:text-base font-semibold text-gray-900">
                                                            Rp {item.price.toLocaleString('id-ID')}
                                                        </span>
                                                        <span className="text-xs text-gray-500 ml-1">{item.unit}</span>
                                                    </div>
                                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded text-center">
                                                        {item.sold} terjual
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }}
                            />
                        </div>

                        {visibleCount < recommendedProducts.length && (
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

export default ForYouRecom