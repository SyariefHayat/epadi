import React from "react";

import NavBar from "./NavBar";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
    return (
        <section className="w-full h-full lg:h-screen overflow-hidden bg-white">
            <NavBar />

            <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center px-4 sm:px-8 lg:px-20 py-12 sm:pt-14 lg:pt-0">
                <div className="w-full lg:w-1/2 flex flex-col justify-center gap-5 text-center lg:text-left mb-14 lg:mb-20 max-w-2xl lg:max-w-none">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-gray-900">
                        Dari Petani ke Konsumen <br className="hidden md:block" /> Tanpa
                        Perantara
                    </h1>
                    <p className="text-base sm:text-lg md:text-2xl text-gray-600 leading-relaxed">
                        EPADI adalah ekosistem padi digital yang <br className="hidden md:block" /> memutus rantai distribusi
                        lama
                    </p>
                    <p className="text-sm sm:text-base md:text-lg text-gray-500 font-medium">
                        Pembiayaan Micro • Gudang Digital • Logistik Cerdas • Pasar Beras Digital
                    </p>
                    <div className="flex justify-center lg:justify-start">
                        <a href="/signup">
                            <Button className="w-fit bg-green-600 hover:bg-green-700 py-4 sm:py-6 px-6 sm:px-8 text-sm sm:text-base md:text-lg cursor-pointer shadow-md">
                                Mulai Sekarang
                            </Button>
                        </a>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex items-center justify-center mt-0 sm:mt-10">
                    <img
                        src="/mockup.png"
                        alt="Mockup aplikasi EPADI"
                        className="w-full ml-6 md:ml-12 lg:max-w-2xl lg:mb-16 lg:ml-12 xl:ml-48"
                    />
            </div>                                                                              
            </div>
        </section>
    );
};

export default HeroSection;