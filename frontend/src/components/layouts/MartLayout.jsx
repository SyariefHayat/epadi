import React from 'react'

import Navbar from '../modules/mart/Navbar'
import FooterSection from '@/pages/landing/Footer'

const MartLayout = ({ children }) => {
    return (
        <div className="w-full min-h-screen font-Poppins">
            <Navbar />
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
                {children}
            </div>
            <FooterSection />
        </div>
    )
}

export default MartLayout;