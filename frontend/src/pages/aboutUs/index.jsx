import React from 'react'

import NavBar from '../landing/NavBar'
import Footer from '../landing/Footer'
import DefaultLayout from '@/components/layouts/DefaultLayout'

const AboutUs = () => {
    return (
        <DefaultLayout>
            <NavBar />
            
            <section className="bg-green-600 py-20">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Tentang Kami
                        </h1>
                        <p className="text-lg md:text-xl text-white max-w-3xl mx-auto leading-relaxed">
                            Membangun ekosistem digital terdepan untuk padi di Indonesia, 
                            mendukung kedaulatan pangan nasional dan kesejahteraan petani.
                        </p>
                    </div>
                </div>
            </section>

            <section className="w-full h-full lg:min-h-screen px-6 sm:px-10 py-16 lg:p-20 flex flex-col lg:flex-row gap-8 lg:gap-12 bg-white">
                <div className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-auto bg-[url('2153.jpg')] bg-cover bg-center rounded-xl shadow-md"></div>

                <div className="w-full lg:w-1/2 flex flex-col justify-center gap-5 text-center lg:text-left">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                    Visi Kami
                    </h2>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-600">
                    Menjadi ekosistem digital terdepan untuk padi di Indonesia, yang mendukung
                    kedaulatan pangan nasional dan meningkatkan kesejahteraan petani.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6 lg:px-0 bg-gray-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Misi Kami</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Empat pilar utama yang menjadi fondasi dalam membangun ekosistem padi yang berkelanjutan
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Rantai Pasok yang Adil</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Menciptakan rantai pasok padi yang adil, transparan, dan efisien untuk semua pihak.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Pemberdayaan Petani</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Memberdayakan petani dengan akses langsung ke pasar nasional dan peluang yang lebih baik.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Solusi Digital Terpercaya</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Memberikan solusi digital yang aman, cepat, dan terukur bagi semua pembeli.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 6V8a2 2 0 00-2-2H10a2 2 0 00-2 2v8a2 2 0 002 2h4a2 2 0 002-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Mitra Strategis</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Menjadi mitra strategis pemerintah dan swasta dalam mendukung ketahanan pangan nasional.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 lg:px-0 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Nilai-Nilai Kami</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Prinsip-prinsip fundamental yang memandu setiap langkah perjalanan kami
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center group">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3-1l-6 2m0-2V5" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Keadilan</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Harga yang layak bagi petani dan wajar bagi konsumen dalam setiap transaksi.
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Transparansi</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Data terbuka, transaksi jelas, dan distribusi yang dapat dipantau secara real-time.
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Keberlanjutan</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Mengedepankan ekosistem pangan yang sehat, berkelanjutan, dan ramah lingkungan.
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Inovasi</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Menggunakan teknologi digital terdepan untuk menjawab tantangan pangan nasional.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </DefaultLayout>
    )
}

export default AboutUs