import React, { useState } from 'react'
import { Funnel, List, MapPin, Heart, User, Sparkles, RefreshCw, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import EachUtils from '@/utils/EachUtils'
import { Checkbox } from "@/components/ui/checkbox"
import Navbar from '@/components/modules/mart/Navbar'
import MartLayout from '@/components/layouts/MartLayout'
import { LIST_LOCATION } from '@/constants/listLocation'
import { LIST_FEATURED_CATEGORY } from '@/constants/listFeaturedCategory'
import { LIST_FOR_YOU } from '@/constants/listForYou'
import { Button } from '@/components/ui/button'

const ForYouRecom = () => {
    const navigate = useNavigate();

    const [visibleCount, setVisibleCount] = useState(12);
    const [selectedRecommendationType, setSelectedRecommendationType] = useState('personalized');
    const [isRefreshing, setIsRefreshing] = useState(false);
    
    const showMore = () => {
        setVisibleCount((prev) => prev + 12);
    };

    const refreshRecommendations = () => {
        setIsRefreshing(true);
        // Simulate API call
        setTimeout(() => {
            setIsRefreshing(false);
            setVisibleCount(12); // Reset to initial count
        }, 1000);
    };

    // Simulate different recommendation algorithms
    const getRecommendedProducts = () => {
        let products = [...LIST_FOR_YOU];
        
        switch(selectedRecommendationType) {
            case 'personalized':
                // Simulate personalized recommendations (mixed)
                return products.sort(() => Math.random() - 0.5);
            case 'similar':
                // Simulate similar to viewed items
                return products.filter((_, index) => index % 2 === 0);
            case 'trending':
                // Simulate trending items
                return products.sort((a, b) => b.sold - a.sold);
            case 'nearby':
                // Simulate nearby items
                return products.filter((_, index) => index % 3 === 0);
            default:
                return products;
        }
    };

    const recommendedProducts = getRecommendedProducts();

    const recommendationTypes = [
        { value: 'personalized', label: 'Dipersonalisasi', icon: User },
        { value: 'similar', label: 'Serupa dengan yang Dilihat', icon: Eye },
        { value: 'trending', label: 'Sedang Trending', icon: Sparkles },
        { value: 'nearby', label: 'Dekat Lokasi Kamu', icon: MapPin }
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

    return (
        <MartLayout>
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Header with personalized theme */}
                <div className="w-full h-[400px] mb-5 rounded-md bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 text-center text-white">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Heart className="w-12 h-12 fill-current" />
                            <h2 className="text-5xl font-bold">Untuk Kamu</h2>
                        </div>
                        <p className="text-xl opacity-90">Rekomendasi produk yang disesuaikan dengan preferensi kamu</p>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar */}
                    <div className="w-64 flex-shrink-0">
                        {/* Recommendation Type Filter */}
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
                                                    onClick={() => setSelectedRecommendationType(item.value)}
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

                        {/* Categories */}
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

                        {/* Filters */}
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
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Sort Bar */}
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                <Heart className="w-4 h-4 text-purple-500 fill-current" />
                                <p className="text-sm text-gray-600">
                                    {recommendedProducts.length} produk direkomendasikan untuk kamu
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button
                                    onClick={refreshRecommendations}
                                    variant="outline"
                                    size="sm"
                                    disabled={isRefreshing}
                                    className="flex items-center gap-2"
                                >
                                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                                    <span>Refresh</span>
                                </Button>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">Urutkan:</span>
                                    <Select defaultValue="recommended">
                                        <SelectTrigger className="w-40 h-9">
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

                        {/* Recommendation Info */}
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

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
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
                                            {/* Recommendation Badge */}
                                            <div className="absolute top-2 left-2 z-10">
                                                <div className={`${badge.color} text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
                                                    <Heart className="w-3 h-3 fill-current" />
                                                    <span>{badge.text}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="aspect-square overflow-hidden">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                                                />
                                            </div>
                                            
                                            <div className="p-4">
                                                <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2">
                                                    {item.name}
                                                </h3>
                                                
                                                <p className="text-xs text-gray-600 mb-1">{item.store}</p>
                                                
                                                <div className="flex items-center text-xs text-gray-500 mb-3">
                                                    <MapPin className="w-3 h-3 mr-1" />
                                                    <span className="truncate">{item.location}</span>
                                                </div>
                                                
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="text-lg font-semibold text-gray-900">
                                                            Rp {item.price.toLocaleString('id-ID')}
                                                        </span>
                                                        <span className="text-xs text-gray-500 ml-1">{item.unit}</span>
                                                    </div>
                                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                        {item.sold} terjual
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }}
                            />
                        </div>

                        {/* Load More */}
                        {visibleCount < recommendedProducts.length && (
                            <div className="text-center">
                                <Button
                                    onClick={showMore}
                                    variant="outline"
                                    className="px-8 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
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