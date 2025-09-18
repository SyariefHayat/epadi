import React from 'react'

const Navbar = () => {
    return (
        <header className="absolute w-full top-0 left-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <nav className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <a href="/" className="flex items-center space-x-3 group">
                            <div>
                                <span className="hidden sm:block text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                                    Ekosistem Padi Digital
                                </span>
                                <span className="block sm:hidden text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                                    EPADI
                                </span>
                            </div>
                        </a>
                    </div>
                    
                    <div>
                        <a
                            href="/login"
                            className="inline-flex items-center px-4 py-2 bg-gray-50 hover:bg-green-50 text-gray-700 hover:text-green-600 font-medium rounded-lg transition-all duration-200 border border-gray-200 hover:border-green-200 group"
                        >
                            <span>Masuk</span>
                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar