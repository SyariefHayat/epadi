import React from 'react';

import EachUtils from '@/utils/EachUtils';
import { Button } from '@/components/ui/button';
import { LIST_FEATURES } from '@/constants/listFeatures';

const FeaturesSection = () => {
    return (
        <section className="w-full h-full py-12 md:py-5 px-4 sm:px-6 lg:px-20 bg-white md:mb-5">
            <div className="max-w-7xl mx-auto mt-5">
                <h3 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-gray-900 text-center mb-12 lg:mb-20">
                Apa Yang Kami Tawarkan?
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <EachUtils 
                        of={LIST_FEATURES}
                        render={(item, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
                            >
                                <div className="text-center">
                                    <div className="mb-6 flex justify-center">
                                        <img
                                            src={item.icon}
                                            alt={item.title}
                                            className="w-56 h-56 object-contain"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">
                                    {item.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                    {item.description}
                                    </p>
                                </div>
                            </div>
                        )}
                    />
                </div>

                <div className="text-center mt-12">
                    <a href="/signup" className="text-center mt-12">
                        <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 sm:py-6 px-6 sm:px-8 text-sm sm:text-base md:text-lg rounded-full shadow-md cursor-pointer">Mulai Sekarang</Button>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;