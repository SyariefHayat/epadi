import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import EachUtils from '@/utils/EachUtils'
import { Button } from '@/components/ui/button'
import { LIST_STORE } from '@/constants/listStore'

const StoreRecommend = () => {
    const navigate = useNavigate();
    
    return (
        <div className="w-full h-full my-10 sm:my-6">
            <div className="flex items-center justify-between gap-3 mb-5">
                <p className="text-lg sm:text-xl font-semibold text-gray-800">Rekomendasi Toko</p>
                
                <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-green-600 hover:bg-green-100">
                    <Link to="/mart/store" className="flex items-center space-x-1">
                        <span className="text-sm sm:text-base">Lihat Semua</span>
                        <ArrowRight size={16} />
                    </Link>
                </Button>
            </div>

            <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                <EachUtils 
                    of={LIST_STORE}
                    render={(item, index) => (
                        <div 
                            key={index}
                            onClick={() => navigate(`/mart/store/${item.name}`)}
                            className="w-full bg-gray-100 rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden flex flex-col min-h-[240px] sm:min-h-[280px] md:min-h-[320px]"
                        >
        
                            <div className="flex-1">
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-32 sm:h-40 md:h-48 object-cover" 
                                />
                            </div>
                            
                            <div className="p-2 sm:p-3 flex flex-col justify-between">
                                <p className="font-semibold text-xs sm:text-sm text-gray-800 line-clamp-2 mb-1">
                                    {item.name}
                                </p>
                                <span className="text-xs text-gray-500">{item.location}</span>
                            </div>

                        </div>
                    )}
                />
            </div>
            
        </div>
    )
}

export default StoreRecommend;