import React from 'react'
import { ShoppingCart } from 'lucide-react'

import EachUtils from '@/utils/EachUtils'
import { LIST_CART } from '@/constants/listCart'

const NavCart = () => {
    return (
        <div className="relative group inline-block">
            <ShoppingCart size={23} className="cursor-pointer text-gray-700 hover:text-yellow-500 transition" />

            <div className="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-lg p-2 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all z-20 border">
                <div className="pb-2 mb-2 text-center border-b border-gray-200 font-semibold text-gray-800">
                    Keranjang Anda
                </div>

                <EachUtils 
                    of={LIST_CART}
                    render={(item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm">
                            <div className="flex items-center gap-2">
                                <img src={item.image} alt={item.name} className="h-10 w-10 rounded object-cover" />
                                <div>
                                    <p className="font-medium text-gray-800">{item.name}</p>
                                    <p className="text-xs text-gray-500">{item.quantity} x Rp{item.price.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    )}
                />

                <div className="pt-2 mt-2 text-center border-t border-gray-200 font-semibold text-gray-800">
                    <a href="/cart" className="text-yellow-500 hover:underline text-sm font-medium">Lihat Semua</a>
                </div>
            </div>
        </div>
    )
}

export default NavCart