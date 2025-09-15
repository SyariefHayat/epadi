import React from 'react'

import CarouselComp from '@/components/modules/mart/CarouselComp'
import StoreRecommend from '@/components/modules/mart/StoreRecommend'
import PopulerProduct from '@/components/modules/mart/PopulerProduct'
import ForYou from '@/components/modules/mart/ForYou'
import FeaturedCategory from '@/components/modules/mart/FeaturedCategory'
import MartLayout from '@/components/layouts/MartLayout'

const Mart = () => {
    return (
        <MartLayout>
            <CarouselComp />
            <FeaturedCategory />
            <PopulerProduct />
            <StoreRecommend />
            <ForYou />
        </MartLayout>
    )
}

export default Mart