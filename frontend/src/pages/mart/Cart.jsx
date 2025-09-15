import React from 'react'

import useCart from '@/hooks/useCart'
import Navbar from '@/components/modules/mart/Navbar'
import MartLayout from '@/components/layouts/MartLayout'
import CartHeader from '@/components/modules/mart/CartHeader'
import CartItemList from '@/components/modules/mart/CartItemList'
import OrderSummary from '@/components/modules/mart/OrderSummary'
import SelectAllCheckbox from '@/components/modules/mart/SelectAllCheckbox'

const Cart = () => {
    const initialCartItems = [
        {
            id: 1,
            storeName: "Tani Jagung Nusantara",
            productName: "Jagung Pipil Kering",
            price: 35000,
            originalPrice: 50000,
            discount: 30,
            size: "50 Kg",
            quantity: 2,
            image: "/product.jpg"
        },
        {
            id: 2,
            storeName: "Jagung Segar Makmur",
            productName: "Jagung Manis Segar",
            price: 15000,
            originalPrice: 20000,
            discount: 25,
            size: "1 Kg",
            quantity: 5,
            image: "/product.jpg"
        },
        {
            id: 3,
            storeName: "Bibit Jagung Indonesia",
            productName: "Jagung Bisi 18",
            price: 50000,
            originalPrice: 75000,
            discount: 33,
            size: "1 Pack",
            quantity: 1,
            image: "/product.jpg"
        },
        {
            id: 4,
            storeName: "Hibrida Seed Center",
            productName: "Benih Jagung Hibrida",
            price: 45000,
            originalPrice: 60000,
            discount: 25,
            size: "100 Butir",
            quantity: 3,
            image: "/product.jpg"
        },
        {
            id: 5,
            storeName: "Pakan Jagung Ternak",
            productName: "Jagung Pakan Ternak",
            price: 25000,
            originalPrice: 35000,
            discount: 29,
            size: "20 Kg",
            quantity: 4,
            image: "/product.jpg"
        }
    ]

    const {
        cartItems,
        selectAll,
        selectedItems,
        totalPrice,
        updateQuantity,
        removeItem,
        toggleSelectAll,
        toggleSelectItem
    } = useCart(initialCartItems)

    return (
        <MartLayout>
            <div className="max-w-7xl mx-auto py-6">
                <CartHeader />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        <SelectAllCheckbox 
                            selectAll={selectAll}
                            onToggleSelectAll={toggleSelectAll}
                        />

                        <CartItemList
                            cartItems={cartItems}
                            selectedItems={selectedItems}
                            onToggleSelectItem={toggleSelectItem}
                            onUpdateQuantity={updateQuantity}
                            onRemoveItem={removeItem}
                        />
                    </div>

                    <div className="lg:col-span-1">
                        <OrderSummary 
                            totalPrice={totalPrice}
                            selectedItemsCount={selectedItems.length}
                        />
                    </div>
                </div>
            </div>
        </MartLayout>
    )
}

export default Cart