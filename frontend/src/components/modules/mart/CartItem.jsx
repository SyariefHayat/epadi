import React from 'react'
import { Minus, Plus, Trash2 } from 'lucide-react'

const CartItem = ({ 
    item, 
    isSelected, 
    onToggleSelect, 
    onUpdateQuantity, 
    onRemove 
}) => {
    return (
        <div className="p-4 border-b border-gray-200 last:border-b-0">
            <div className="flex gap-4">
                <label className="flex items-start gap-3 flex-1 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelect(item.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                    />
                    
                    <div className="flex gap-3 flex-1">
                        <div className="w-20 h-20 bg-[url(/product.jpg)] bg-cover bg-center rounded-lg flex items-center justify-center">
                        </div>
                        
                        <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">
                                {item.productName}
                            </h4>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg font-bold text-gray-900">
                                    Rp{item.price.toLocaleString('id-ID')}
                                </span>
                                <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                                    {item.discount}%
                                </span>
                                <span className="text-sm text-gray-500 line-through">
                                    Rp{item.originalPrice.toLocaleString('id-ID')}
                                </span>
                            </div>
                            <div className="text-sm text-gray-600 mb-3">
                                {item.size}
                            </div>
                        </div>
                    </div>
                </label>
            </div>
            
            <div className="w-full h-full flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => onRemove(item.id)}>
                    <Trash2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Hapus Produk</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 cursor-pointer"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">
                        {item.quantity}
                    </span>
                    <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 text-white bg-yellow-400 border border-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-500 cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartItem