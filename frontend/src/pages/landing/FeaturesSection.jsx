import React from 'react';

const FeaturesSection = () => {
    const features = [
        {
            title: "Marketplace Padi",
            description: "Tempat petani mengunggah stok panen secara langsung.",
            icon: "/market.jpg"
        },
        {
            title: "Sistem Pembayaran Aman",
            description: "Model escrow yang memastikan pembayaran diterima petani setelah transaksi sukses.",
            icon: "family.jpg"
        },
        {
            title: "Logistik Terintegrasi",
            description: "Kemitraan dengan penyedia transportasi untuk mempercepat pengiriman.",
            icon: "/distributor.jpg"
        },
        {
            title: "Data & Analitik",
            description: "Pemantauan harga, stok, dan permintaan pasar secara real-time.",
            icon: "/farmer.jpg"
        }
    ];

    return (
        <section className="w-full h-full py-12 md:py-5 px-4 sm:px-6 lg:px-20 bg-white md:mb-5">
            <div className="max-w-7xl mx-auto mt-5">
                <h3 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-gray-900 text-center mb-12 lg:mb-20">
                Apa Yang Kami Tawarkan?
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-green-200"
                        >
                            <div className="text-center">
                                <div className="mb-6 flex justify-center">
                                    <img
                                        src={feature.icon}
                                        alt={feature.title}
                                        className="w-36 h-36 object-contain group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">
                                {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                        Mulai Sekarang
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;