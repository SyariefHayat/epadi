import React from 'react'
import { ArrowLeft, MapPin } from 'lucide-react'

const CartHeader = () => {
    return (
        <div className="flex items-end justify-between mb-6">
            <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-xl font-semibold">Keranjang</h1>
            </div>
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 cursor-pointer">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Pilih alamat untuk pengiriman</span>
            </button>
        </div>
    )
}

export default CartHeader