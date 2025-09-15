import React from 'react'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'

const EmptyCart = () => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Keranjang Kosong</h3>
            <p className="text-gray-600 mb-6">Belum ada produk dalam keranjang Anda</p>
            <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => window.location.href = '/'}
            >
                Mulai Belanja
            </Button>
        </div>
    )
}

export default EmptyCart