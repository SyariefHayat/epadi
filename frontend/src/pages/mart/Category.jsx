import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { 
    Funnel, 
    List, 
    MapPin, 
    Filter, 
    X, 
    ChevronDown 
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
import { LIST_LOCATION } from '@/constants/listLocation'
import MartLayout from '@/components/layouts/MartLayout'
import { LIST_FEATURED_CATEGORY } from '@/constants/listFeaturedCategory'

const Category = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const pathParts = location.pathname.split('/').filter(Boolean);
    const lastSegment = pathParts[pathParts.length - 1];
    const formatText = lastSegment.split("-").join(" ");

    const getBackgroundImage = (segment) => {
        if (segment === "jagung-pipil-kering") {
            return "/jagung-pipil-tablet.png";
        } else if (segment === "jagung-organik") {
            return "/jagung-organik-tablet.png";
        } else if (segment === "jagung-manis-segar") {
            return "/jagung-manis-tablet.png";
        } else if (segment === "jagung-manis-segar") {
            return "/jagung-manis-tablet.png";
        } else if (segment === "jagung-pakan-ternak") {
            return "/jagung-pakan-tablet.png";
        } else if (segment === "jagung-hibrida-unggul") {
            return "/jagung-hibrida-tablet.png";
        }
    };

    const getBackgroundStyle = (segment) => {
        const primaryImage = getBackgroundImage(segment);

        return {
            backgroundImage: `url('${primaryImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        };
    };

    const [visibleCount, setVisibleCount] = useState(12);
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const [expandedSections, setExpandedSections] = useState({
        category: true,
        location: true
    });
    
    const showMore = () => {
        setVisibleCount((prev) => prev + 12);
    };

    const toggleMobileFilter = () => {
        setShowMobileFilter(!showMobileFilter);
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const FilterContent = ({ isMobile = false }) => (
        <div className={`space-y-4 ${isMobile ? 'p-4' : ''}`}>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div 
                    className="px-4 py-3 border-b border-gray-200 bg-gray-50 cursor-pointer"
                    onClick={() => isMobile && toggleSection('category')}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <List className="w-4 h-4 text-gray-600" />
                            <h3 className="font-medium text-gray-900">Kategori</h3>
                        </div>
                        {isMobile && (
                            <ChevronDown 
                                className={`w-4 h-4 text-gray-600 transition-transform ${
                                    expandedSections.category ? 'rotate-180' : ''
                                }`} 
                            />
                        )}
                    </div>
                </div>
                {(!isMobile || expandedSections.category) && (
                    <div className="p-4 max-h-60 overflow-y-auto">
                        <EachUtils 
                            of={LIST_FEATURED_CATEGORY}
                            render={(item, index) => (
                                <div key={index} className="py-2">
                                    <p 
                                        className="text-sm text-gray-700 hover:text-blue-600 cursor-pointer transition-colors"
                                        onClick={() => {
                                            navigate(`/mart/category/${item.url}`);
                                            isMobile && setShowMobileFilter(false);
                                        }}
                                    >
                                        {item.name}
                                    </p>
                                </div>
                            )}
                        />
                    </div>
                )}
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div 
                    className="px-4 py-3 border-b border-gray-200 bg-gray-50 cursor-pointer"
                    onClick={() => isMobile && toggleSection('location')}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Funnel className="w-4 h-4 text-gray-600" />
                            <h3 className="font-medium text-gray-900">Filter Lokasi</h3>
                        </div>
                        {isMobile && (
                            <ChevronDown 
                                className={`w-4 h-4 text-gray-600 transition-transform ${
                                    expandedSections.location ? 'rotate-180' : ''
                                }`} 
                            />
                        )}
                    </div>
                </div>
                {(!isMobile || expandedSections.location) && (
                    <div className="p-4 max-h-60 overflow-y-auto">
                        <div className="space-y-2">
                            <EachUtils 
                                of={LIST_LOCATION}
                                render={(item, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <Checkbox className="w-4 h-4" />
                                        <label className="text-sm text-gray-700 cursor-pointer hover:text-blue-600 transition-colors flex-1">
                                            {item.nama}
                                        </label>
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <MartLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                <div 
                    className={"w-full h-[200px] sm:h-[280px] md:h-[350px] lg:h-[400px] mb-5 rounded-md flex items-center justify-center relative overflow-hidden"}
                    style={getBackgroundStyle(lastSegment)}
                >
                    <div className="absolute inset-0 bg-black/30"></div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold capitalize relative z-10 text-white text-center px-4">
                        {formatText === "category" ? "Semua Kategori" : formatText}
                    </h2>
                </div>

                <div className="lg:hidden mb-4">
                    <Button
                        onClick={toggleMobileFilter}
                        variant="outline"
                        className="w-full sm:w-auto flex items-center gap-2 justify-center"
                    >
                        <Filter className="w-4 h-4" />
                        Filter & Kategori
                    </Button>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                    <div className="hidden lg:block w-64 flex-shrink-0">
                        <FilterContent />
                    </div>

                    {showMobileFilter && (
                        <div className="lg:hidden fixed inset-0 bg-black/50 z-50">
                            <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl overflow-y-auto">
                                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                    <h3 className="font-medium text-gray-900">Filter & Kategori</h3>
                                    <Button
                                        onClick={toggleMobileFilter}
                                        variant="ghost"
                                        size="sm"
                                        className="p-2"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                                <FilterContent isMobile={true} />
                                <div className="p-4 border-t border-gray-200 sticky bottom-0 bg-white">
                                    <Button
                                        onClick={toggleMobileFilter}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        Terapkan Filter
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
                            <p className="text-sm text-gray-600 order-2 sm:order-1">
                                28 produk ditemukan
                            </p>
                            <div className="flex items-center gap-3 order-1 sm:order-2">
                                <span className="text-sm text-gray-600 hidden sm:inline">Urutkan:</span>
                                <Select>
                                    <SelectTrigger className="w-full sm:w-40 h-9">
                                        <SelectValue placeholder="Paling Sesuai" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="newest">Terbaru</SelectItem>
                                        <SelectItem value="highest">Harga Tertinggi</SelectItem>
                                        <SelectItem value="lowest">Harga Terendah</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mb-8">
                            <EachUtils
                                of={LIST_FOR_YOU.slice(0, visibleCount)}
                                render={(item, index) => (
                                    <div 
                                        key={index} 
                                        className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden group"
                                        onClick={() => navigate(`/mart/store/${item.slugStore}/${item.slugProduct}`)}
                                    >
                                        <div className="aspect-square overflow-hidden">
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                            />
                                        </div>
                                        
                                        <div className="p-3 sm:p-4">
                                            <h3 className="font-medium text-gray-900 text-xs sm:text-sm line-clamp-2 mb-2 leading-tight">
                                                {item.name}
                                            </h3>
                                            
                                            <p className="text-xs text-gray-600 mb-1 truncate">
                                                {item.store}
                                            </p>
                                            
                                            <div className="flex items-center text-xs text-gray-500 mb-2 sm:mb-3">
                                                <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                                                <span className="truncate">{item.location}</span>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-sm sm:text-lg font-semibold text-gray-900">
                                                        Rp {item.price.toLocaleString('id-ID')}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {item.unit}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-end">
                                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                        {item.sold} terjual
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                        </div>

                        {visibleCount < LIST_FOR_YOU.length && (
                            <div className="text-center">
                                <Button
                                    onClick={showMore}
                                    variant="outline"
                                    className="w-full sm:w-auto px-6 sm:px-8 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
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

export default Category