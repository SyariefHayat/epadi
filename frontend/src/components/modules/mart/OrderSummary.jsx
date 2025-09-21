import React from 'react'
import { Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'

const OrderSummary = ({ totalPrice, selectedItemsCount }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-4">
            <h3 className="font-semibold text-gray-900 mb-4">Ringkasan Belanja</h3>
            
            <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                    <span>Total Belanja</span>
                    <span className="font-medium">
                        Rp{totalPrice.toLocaleString('id-ID')}
                    </span>
                </div>
            </div>

            {/* Voucher Section */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 text-yellow-600">
                    <Tag className="w-4 h-4" />
                    <span className="text-sm font-medium">Pakai voucher biar hemat, yuk!</span>
                    <button className="ml-auto">
                        <span className="text-sm">›</span>
                    </button>
                </div>
            </div>

            <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>Beli ({selectedItemsCount})</span>
            </div>
            
            <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
                disabled={selectedItemsCount === 0}
            >
                Beli Sekarang
            </Button>
        </div>
    )
}

export default OrderSummary