import React from 'react'
import { Eye, Tractor, TrendingDown } from 'lucide-react'

const WhySection = () => {
    return (
        <section className="w-full h-full px-4 sm:px-6 lg:px-20 bg-white md:pb-14">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight text-gray-900 text-center mb-8 sm:mb-12 lg:mb-20">
                    Mengapa EPADI Hadir ?
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
                    <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 p-6 sm:p-8 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 group">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-green-500 flex items-center justify-center shadow-md group-hover:bg-green-600 transition-colors duration-300">
                            <Tractor 
                                size={32} 
                                className="text-white sm:w-10 sm:h-10 lg:w-12 lg:h-12" 
                            />
                        </div>
                        <h4 className="text-sm sm:text-base lg:text-lg xl:text-xl font-medium text-gray-800 leading-relaxed px-2">
                            Petani sering dirugikan. Rantai distribusi yang panjang membuat margin keuntungan petani sangat tipis.
                        </h4>
                    </div>

                    <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 p-6 sm:p-8 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 group">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-green-500 flex items-center justify-center shadow-md group-hover:bg-green-600 transition-colors duration-300">
                            <TrendingDown 
                                size={32} 
                                className="text-white sm:w-10 sm:h-10 lg:w-12 lg:h-12" 
                            />
                        </div>
                        <h4 className="text-sm sm:text-base lg:text-lg xl:text-xl font-medium text-gray-800 leading-relaxed px-2">
                            Harga konsumen tidak stabil. Masyarakat sering membayar lebih mahal karena biaya distribusi berlapis.
                        </h4>
                    </div>

                    <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 p-6 sm:p-8 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 group lg:col-span-1 md:max-w-md md:mx-auto lg:max-w-none lg:mx-0">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-green-500 flex items-center justify-center shadow-md group-hover:bg-green-600 transition-colors duration-300">
                            <Eye 
                                size={32} 
                                className="text-white sm:w-10 sm:h-10 lg:w-12 lg:h-12" 
                            />
                        </div>
                        <h4 className="text-sm sm:text-base lg:text-lg xl:text-xl font-medium text-gray-800 leading-relaxed px-2">
                            Kurangnya transparansi. Informasi stok, kualitas, dan harga sering tidak jelas di tingkat pasar.
                        </h4>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhySection