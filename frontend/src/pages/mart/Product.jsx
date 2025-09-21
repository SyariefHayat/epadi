import React, { useState } from 'react'

import { 
    MapPin, 
    Package, 
    Shield, 
    Minus, 
    Plus, 
    ShoppingCart, 
    MessageCircle
} from 'lucide-react'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage 
} from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"

const Product = () => {
    const [selectedImage, setSelectedImage] = useState('/category2.jpg')
    const [quantity, setQuantity] = useState(1)
    
    const productImages = [
        '/category2.jpg',
        '/category2.jpg',
        '/category2.jpg',
        '/category2.jpg',
        '/category2.jpg',
    ]

    const handleQuantityChange = (action) => {
        if (action === 'increase') {
            setQuantity(prev => prev + 1)
        } else if (action === 'decrease' && quantity > 1) {
            setQuantity(prev => prev - 1)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                <div className="mb-4 sm:mb-6 hidden sm:block">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" className="text-gray-600 hover:text-gray-900">
                                    Beranda
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/mart/category/beras-premium" className="text-gray-600 hover:text-gray-900">
                                    Kategori
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-gray-900">
                                    Beras Putih Premium Grade A
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    <div className="space-y-3 sm:space-y-4">
                        <div className="aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white">
                            <img 
                                src={selectedImage} 
                                alt="Beras Putih Premium Grade A" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        <div className="flex gap-2 overflow-x-auto pb-2 sm:grid sm:grid-cols-5 sm:overflow-x-visible sm:pb-0">
                            {productImages.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(image)}
                                    className={`flex-shrink-0 aspect-square w-16 sm:w-auto rounded-md overflow-hidden border-2 transition-colors ${
                                        selectedImage === image ? 'border-yellow-500' : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <img 
                                        src={image} 
                                        alt={`Product ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>

                        <div className="hidden lg:block bg-white rounded-lg p-4 border border-gray-200 cursor-pointer hover:shadow-sm transition-shadow">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar className="size-10">
                                        <AvatarImage src="https://github.com/evilrabbit.png" />
                                        <AvatarFallback>TB</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-gray-900">Toko Beras Makmur</p>
                                        <p className="text-sm text-gray-600">Online 1 jam yang lalu</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1 text-right">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <MapPin className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm">Grobogan, Jawa Tengah</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Package className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm">120 produk</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                                Beras Putih Premium Grade A
                            </h1>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div className="flex gap-3 text-sm">
                                    <p className="text-gray-600">Terjual 600+</p>
                                    <p className="text-gray-600">250 Ulasan</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-b border-gray-200 pb-4 sm:pb-6">
                            <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    Rp 12.500
                                </span>
                                <span className="text-base sm:text-lg text-gray-500 line-through">
                                    Rp 14.500
                                </span>
                                <span className="bg-red-100 text-red-600 text-sm font-medium px-2 py-1 rounded">
                                    -14%
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">per kg</p>
                        </div>

                        <div className="space-y-3 sm:space-y-4 border-b border-gray-200 pb-4 sm:pb-6">
                            <div className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                                <span className="text-sm sm:text-base text-gray-700">Grobogan, Jawa Tengah</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Package className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                                <span className="text-sm sm:text-base text-gray-700">Stok: 1.200 kg tersedia</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                                <span className="text-sm sm:text-base text-gray-700">Kondisi: Baru</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Jumlah
                                </label>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center border border-gray-300 rounded-md">
                                        <button
                                            onClick={() => handleQuantityChange('decrease')}
                                            className="p-2 hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={quantity <= 1}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="px-3 sm:px-4 py-2 text-center min-w-[50px] border-x border-gray-300 text-sm sm:text-base">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => handleQuantityChange('increase')}
                                            className="p-2 hover:bg-gray-50 transition-colors cursor-pointer"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <span className="text-sm text-gray-600">kg</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button 
                                    variant="outline" 
                                    size="lg" 
                                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer h-12 p-3"
                                >
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    <span className="text-sm sm:text-base">Tanya Penjual</span>
                                </Button>
                                <Button 
                                    size="lg" 
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 cursor-pointer h-12 p-3"
                                >
                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                    <span className="text-sm sm:text-base">Tambah ke Keranjang</span>
                                </Button>
                            </div>

                            <Button 
                                size="lg" 
                                className="w-full bg-green-600 hover:bg-green-700 cursor-pointer h-12"
                            >
                                <span className="text-sm sm:text-base font-medium">Beli Sekarang</span>
                            </Button>
                        </div>

                        <div className="lg:hidden bg-white rounded-lg p-4 border border-gray-200">
                            <div className="flex items-center gap-3 mb-3">
                                <Avatar className="size-10">
                                    <AvatarImage src="https://github.com/evilrabbit.png" />
                                    <AvatarFallback>TB</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium text-gray-900">Toko Beras Makmur</p>
                                    <p className="text-sm text-gray-600">Online 1 jam yang lalu</p>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-gray-500" />
                                    <span>Grobogan, Jawa Tengah</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Package className="w-4 h-4 text-gray-500" />
                                    <span>120 produk</span>
                                </div>
                            </div>
                        </div>

                        {/* Product Description */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Deskripsi Produk</h3>
                            <div className="prose prose-sm text-gray-600">
                                <p className="text-sm sm:text-base leading-relaxed">
                                    Beras putih premium Grade A berkualitas tinggi, berasal dari padi pilihan dengan proses penggilingan modern. 
                                    Teksturnya pulen, aromanya wangi, dan sangat cocok untuk konsumsi rumah tangga maupun usaha kuliner.
                                </p>
                                <ul className="mt-3 space-y-1 text-sm sm:text-base">
                                    <li>Kualitas Grade A</li>
                                    <li>Tekstur pulen dan lembut</li>
                                    <li>Beras bersih, tanpa campuran</li>
                                    <li>Kadar air terjaga</li>
                                    <li>Kemasan higienis</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product