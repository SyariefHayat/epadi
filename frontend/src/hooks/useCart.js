import { useState } from 'react'

const useCart = (initialCartItems = []) => {
    const [cartItems, setCartItems] = useState(initialCartItems)
    const [selectAll, setSelectAll] = useState(false)
    const [selectedItems, setSelectedItems] = useState([])

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return
        setCartItems(items =>
            items.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        )
    }

    const removeItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id))
        setSelectedItems(selected => selected.filter(itemId => itemId !== id))
    }

    const toggleSelectAll = () => {
        setSelectAll(!selectAll)
        if (!selectAll) {
            setSelectedItems(cartItems.map(item => item.id))
        } else {
            setSelectedItems([])
        }
    }

    const toggleSelectItem = (id) => {
        setSelectedItems(selected => {
            if (selected.includes(id)) {
                return selected.filter(itemId => itemId !== id)
            } else {
                return [...selected, id]
            }
        })
    }

    const totalPrice = cartItems
        .filter(item => selectedItems.includes(item.id))
        .reduce((total, item) => total + (item.price * item.quantity), 0)

    return {
        cartItems,
        selectAll,
        selectedItems,
        totalPrice,
        updateQuantity,
        removeItem,
        toggleSelectAll,
        toggleSelectItem
    }
}

export default useCart