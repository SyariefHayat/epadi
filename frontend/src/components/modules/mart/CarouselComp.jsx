import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const CarouselComp = () => {
    return (
        <Carousel className="flex w-full h-[200px] sm:h-[280px] md:h-[350px] overflow-hidden mb-5 rounded-md relative border">
            <CarouselContent className="h-full">
                <CarouselItem className="h-full">
                    <div className="w-full h-full">
                        <img src="/5874132.jpg" alt="Banner 2" className="w-full h-full object-cover" />
                    </div>
                </CarouselItem>
                <CarouselItem className="h-full">
                    <img src="/7005204.jpg" alt="Banner 1" className="w-full h-full object-cover" />
                </CarouselItem>
                <CarouselItem className="h-full">
                    <img src="/7203616.jpg" alt="Banner 3" className="w-full h-full object-cover" />
                </CarouselItem>
                <CarouselItem className="h-full">
                    <img src="/7401563.jpg" alt="Banner 4" className="w-full h-full object-cover" />
                </CarouselItem>
                <CarouselItem className="h-full">
                    <img src="/8963508.jpg" alt="Banner 5" className="w-full h-full object-cover" />
                </CarouselItem>
            </CarouselContent>

            <CarouselPrevious className="bg-white hover:bg-yellow-500 hover:text-white transition shadow absolute bottom-2 left-2 sm:bottom-4 sm:left-4 md:bottom-0 md:left-10" />
            <CarouselNext className="bg-white hover:bg-yellow-500 hover:text-white transition shadow absolute bottom-2 right-2 sm:bottom-4 sm:right-4 md:bottom-0 md:right-10" />
        </Carousel>
    )
}

export default CarouselComp;