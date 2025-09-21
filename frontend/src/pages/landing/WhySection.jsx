import React from 'react'

import EachUtils from '@/utils/EachUtils'
import { LIST_PROBLEM } from '@/constants/listProblem'

const WhySection = () => {
    return (
        <section className="w-full h-full px-4 sm:px-6 lg:px-20 bg-white md:pb-14">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight text-gray-900 text-center mb-8 sm:mb-12 lg:mb-20">
                    Mengapa EPADI Hadir ?
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-5">
                    <EachUtils 
                        of={LIST_PROBLEM}
                        render={(item, index) => (
                            <div 
                                key={index} 
                                className="group flex flex-col items-start text-start space-y-3 sm:space-y-4 p-6 sm:p-8 rounded-2xl border bg-white transition-all duration-300 ease-in-out hover:bg-green-600"
                            >
                                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-15 lg:h-15 rounded-full bg-green-500 flex items-center justify-center shadow-md transition-colors duration-300 ease-in-out group-hover:bg-white">
                                    <item.icon 
                                        size={32} 
                                        className="text-white sm:w-10 sm:h-10 lg:w-8 lg:h-8 transition-transform duration-300 ease-in-out group-hover:text-green-600"
                                    />
                                </div>
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 transition-colors duration-300 ease-in-out group-hover:text-white">
                                    {item.title}
                                </h3>
                                <h4 className="text-sm sm:text-base lg:text-lg xl:text-xl font-medium text-gray-800 leading-relaxed transition-colors duration-300 ease-in-out group-hover:text-gray-100">
                                    {item.desc}
                                </h4>
                            </div>
                        )}
                    />
                </div>
            </div>
        </section>
    )
}

export default WhySection