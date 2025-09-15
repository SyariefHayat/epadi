import React from 'react'
import { MessageCircle } from 'lucide-react'

const NavMessage = () => {
    return (
        <div className="relative group inline-block">
            <MessageCircle size={23} className="cursor-pointer text-gray-700 hover:text-yellow-500 transition" />
            
            <div className="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-xl p-2 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all z-20 border border-gray-200">
                <div className="pb-2 mb-2 text-center border-b border-gray-200 font-semibold text-gray-800">
                    Pesan
                </div>
                <div className="text-center py-4">
                    Kamu belum memiliki pesan
                </div>
                <div className="pt-2 mt-2 text-center border-t border-gray-200 font-semibold text-gray-800">
                    <a href="/message" className="text-yellow-500 hover:underline text-sm font-medium">Lihat Semua</a>
                </div>
            </div>
        </div>
    )
}

export default NavMessage