import React, { useState } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import EachUtils from '@/utils/EachUtils';
import { Button } from '@/components/ui/button';
import { LIST_FOR_YOU } from '@/constants/listForYou';

const ForYou = () => {
    const [visibleCount, setVisibleCount] = useState(10);
    const navigate = useNavigate();

    const showMore = () => {
        setVisibleCount((prev) => prev + 10);
    };

    return (
        <div className="w-full h-full my-10 sm:my-6">
            <div className="flex items-center justify-between gap-3 mb-5">
                <p className="text-lg sm:text-xl font-semibold text-gray-800">Untuk Kamu</p>
                
                <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-green-600 hover:bg-green-100">
                    <Link to="/mart/for-you" className="flex items-center space-x-1">
                        <span className="text-sm sm:text-base">Lihat Semua</span>
                        <ArrowRight size={16} />
                    </Link>
                </Button>
            </div>

            <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                <EachUtils
                    of={LIST_FOR_YOU.slice(0, visibleCount)}
                    render={(item, index) => (
                        <div 
                            key={index}
                            onClick={() => navigate(`/mart/store/${item.slugStore}/${item.slugProduct}`)}
                            className="w-full bg-gray-100 rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden flex flex-col min-h-[280px] sm:min-h-[320px]"
                        >
                            <div className="relative flex-1">
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-32 sm:h-40 md:h-44 object-cover" 
                                />
                            </div>
                            
                            <div className="p-2 sm:p-3 flex flex-col justify-between flex-1">
                                <p className="font-semibold text-xs sm:text-sm text-gray-800 line-clamp-2 mb-2">
                                    {item.name}
                                </p>
                                
                                <div className="space-y-1 sm:space-y-1.5">
                                    <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
                                        {item.store}
                                    </p>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <MapPin size={10} className="mr-1 sm:mr-1.5 flex-shrink-0" />
                                        <span className="truncate text-xs">{item.location}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-2 sm:p-3 border-t border-gray-100">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <div className="flex items-baseline space-x-1">
                                        <span className="text-sm sm:text-lg font-bold text-green-600">
                                            Rp {item.price.toLocaleString('id-ID')}
                                        </span>
                                        <span className="text-xs text-gray-500 font-medium">{item.unit}</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-md w-fit">
                                        <span className="font-medium">{item.sold} terjual</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                />
            </div>
            
            {visibleCount < LIST_FOR_YOU.length && (
                <div className="flex justify-center mt-10">
                    <Button 
                        onClick={showMore}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 text-sm sm:text-base w-full sm:w-auto sm:max-w-xs"
                    >
                        Tampilkan Lebih Banyak
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ForYou;