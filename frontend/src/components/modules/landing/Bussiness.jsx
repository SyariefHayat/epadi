import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Wheat } from 'lucide-react'
import React from 'react'

const Business = () => {
    return (
        <section className="w-full min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10 h-full">
                {/* Image Section */}
                <div className="w-full lg:w-1/2 h-64 lg:h-[624px]">
                    <img 
                        src="./19.jpg" 
                        alt="Business Innovation" 
                        className="w-full h-full object-cover object-center rounded-xl shadow-lg" 
                    />
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 flex flex-col justify-between gap-8 lg:gap-12 h-full">
                    {/* Navigation Buttons */}
                    <div className="flex gap-3">
                        <Button variant="outline" size="icon" className="rounded-full hover:bg-gray-100 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full hover:bg-gray-100 transition-colors">
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-4">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight lg:leading-[1.3] text-gray-900">
                            Growing Innovation
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt vel beatae dicta hic, rerum eveniet recusandae blanditiis ut atque dolore?
                        </p>
                    </div>

                    {/* Statistics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="flex flex-col items-start space-y-3">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
                                <Wheat className="w-6 h-6 text-gray-700" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900">50%</p>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </p>
                        </div>
                        
                        <div className="flex flex-col items-start space-y-3">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
                                <Wheat className="w-6 h-6 text-gray-700" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900">50%</p>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </p>
                        </div>
                        
                        <div className="flex flex-col items-start space-y-3">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
                                <Wheat className="w-6 h-6 text-gray-700" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900">50%</p>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </p>
                        </div>
                    </div>

                    {/* Image Gallery */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="w-full h-32 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg shadow-md"></div>
                        <div className="w-full h-32 bg-gradient-to-br from-gray-500 to-gray-700 rounded-lg shadow-md"></div>
                        <div className="w-full h-32 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg shadow-md"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Business