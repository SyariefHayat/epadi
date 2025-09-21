import React from 'react'
import CartItem from './CartItem'
import EmptyCart from './EmptyCart'

const CartItemList = ({ 
    cartItems, 
    selectedItems, 
    onToggleSelectItem, 
    onUpdateQuantity, 
    onRemoveItem 
}) => {
    if (cartItems.length === 0) {
        return <EmptyCart />
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg">
            {cartItems.map((item) => (
                <CartItem
                    key={item.id}
                    item={item}
                    isSelected={selectedItems.includes(item.id)}
                    onToggleSelect={onToggleSelectItem}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemoveItem}
                />
            ))}
        </div>
    )
}

export default CartItemList