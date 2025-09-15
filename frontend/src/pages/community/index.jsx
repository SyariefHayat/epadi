import React from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import NavBar from "../landing/NavBar";
import Footer from "../landing/Footer";
import DefaultLayout from "@/components/layouts/DefaultLayout";

const Community = () => {
    const communityCards = [
        {
            title: "Budidaya Padi",
            description: "Tips dan trik menanam padi berkualitas.",
            content: "Diskusi seputar teknik menanam, perawatan, dan panen padi.",
            footer: "Bergabung Sekarang",
        },
        {
            title: "Pemasaran Hasil Panen",
            description: "Strategi menjual beras ke pasar.",
            content: "Sharing pengalaman distribusi dan akses ke pembeli besar.",
            footer: "Ikuti Forum",
        },
        {
            title: "Pupuk & Nutrisi",
            description: "Informasi pupuk terbaik untuk padi.",
            content: "Komunitas berbagi pengalaman penggunaan pupuk organik & kimia.",
            footer: "Pelajari Lebih Lanjut",
        },
        {
            title: "Teknologi Pertanian",
            description: "Inovasi modern untuk petani padi.",
            content: "Diskusi alat pertanian, IoT, dan teknologi baru.",
            footer: "Lihat Diskusi",
        },
        {
            title: "Harga Beras",
            description: "Update harga beras terkini.",
            content: "Pantau harga beras di berbagai daerah.",
            footer: "Cek Sekarang",
        },
        {
            title: "Komunitas Petani",
            description: "Koneksi antar petani padi.",
            content: "Forum silaturahmi, berbagi pengalaman, dan solusi bersama.",
            footer: "Gabung Grup",
        },
    ];

    return (
        <DefaultLayout>
            <NavBar />
            <div className="w-full min-h-screen p-6 sm:p-10">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Komunitas Padi
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {communityCards.map((card, index) => (
                        <Card
                            key={index}
                            className="shadow-md hover:shadow-xl transition rounded-2xl"
                        >
                            <CardHeader>
                                <CardTitle>{card.title}</CardTitle>
                                <CardDescription>{card.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>{card.content}</p>
                            </CardContent>
                            <CardFooter>
                                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer">
                                    {card.footer}
                                </button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
            <Footer />
        </DefaultLayout>
    );
};

export default Community;