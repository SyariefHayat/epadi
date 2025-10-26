import React from 'react'

import WhySection from './WhySection'
import Footer from '@/pages/landing/Footer'
import FeaturesSection from './FeaturesSection'
import HeroSection from '@/pages/landing/HeroSection'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import RegionSummarySection from './RegionSummarySection'

const Home = () => {
    return (
        <DefaultLayout>
            <HeroSection />
            <WhySection />
            <FeaturesSection />
            <RegionSummarySection />
            <Footer />
        </DefaultLayout>
    )
}

export default Home