import { useState } from 'react'

const OrderOnline = () => {
    const [cart, setCart] = useState([])
    const [orderType, setOrderType] = useState('delivery')

    const menuItems = [
        {
            category: "Starters",
            items: [
                { id: 1, name: "Greek Salad", price: 12.99, description: "Fresh tomatoes, cucumbers, olives, and feta cheese" },
                { id: 2, name: "Bruschetta", price: 9.99, description: "Grilled bread with tomatoes, garlic, and herbs" }
            ]
        },
        {
            category: "Main Courses",
            items: [
                { id: 3, name: "Grilled Sea Bass", price: 28.99, description: "Fresh sea bass with Mediterranean herbs and lemon" },
                { id: 4, name: "Lamb Chops", price: 32.99, description: "Grilled lamb chops with rosemary and garlic" }
            ]
        },
        {
            category: "Desserts",
            items: [
                { id: 5, name: "Baklava", price: 8.99, description: "Traditional phyllo pastry with nuts and honey" },
                { id: 6, name: "Lemon Sorbet", price: 6.99, description: "Refreshing homemade lemon sorbet" }
            ]
        }
    ]

    const addToCart = (item) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id)
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                )
            }
            return [...prevCart, { ...item, quantity: 1 }]
        })
    }

    const removeFromCart = (itemId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== itemId))
    }

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(itemId)
            return
        }
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === itemId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        )
    }

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Order Online
                    </h1>
                    <p className="mt-4 text-lg text-gray-500">
                        Order your favorite Mediterranean dishes for pickup or delivery
                    </p>
                </div>

                {/* Order Type Selection */}
                <div className="max-w-3xl mx-auto mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => setOrderType('delivery')}
                                className={`px-6 py-2 rounded-md ${orderType === 'delivery'
                                    ? 'bg-yellow-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Delivery
                            </button>
                            <button
                                onClick={() => setOrderType('pickup')}
                                className={`px-6 py-2 rounded-md ${orderType === 'pickup'
                                    ? 'bg-yellow-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Pickup
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Menu Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow">
                            {menuItems.map((category, index) => (
                                <div key={index} className="p-6 border-b last:border-b-0">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h2>
                                    <div className="space-y-6">
                                        {category.items.map((item) => (
                                            <div key={item.id} className="flex justify-between items-center">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                                    <p className="text-gray-500">{item.description}</p>
                                                    <p className="text-yellow-600 font-medium">${item.price.toFixed(2)}</p>
                                                </div>
                                                <button
                                                    onClick={() => addToCart(item)}
                                                    className="ml-4 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors duration-200"
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cart Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow p-6 sticky top-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Order</h2>
                            {cart.length === 0 ? (
                                <p className="text-gray-500">Your cart is empty</p>
                            ) : (
                                <>
                                    <div className="space-y-4 mb-6">
                                        {cart.map((item) => (
                                            <div key={item.id} className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-medium">{item.name}</h3>
                                                    <p className="text-gray-500">${item.price.toFixed(2)}</p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="text-gray-500 hover:text-gray-700"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-8 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="text-gray-500 hover:text-gray-700"
                                                    >
                                                        +
                                                    </button>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="ml-2 text-red-500 hover:text-red-700"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t pt-4">
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total:</span>
                                            <span>${calculateTotal().toFixed(2)}</span>
                                        </div>
                                        <button
                                            className="mt-6 w-full bg-yellow-500 text-white py-3 px-6 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
                                        >
                                            Proceed to Checkout
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderOnline 