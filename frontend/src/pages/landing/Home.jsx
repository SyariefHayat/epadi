import React from 'react'

import WhySection from './WhySection'
import Footer from '@/pages/landing/Footer'
import FeaturesSection from './FeaturesSection'
import HeroSection from '@/pages/landing/HeroSection'
import DefaultLayout from '@/components/layouts/DefaultLayout'

const Home = () => {
    return (
        <DefaultLayout>
            <HeroSection />
            <WhySection />
            <FeaturesSection />
            <Footer />
        </DefaultLayout>
    )
}

export default Home