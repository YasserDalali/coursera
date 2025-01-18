const Menu = () => {
    const menuCategories = [
        {
            id: 1,
            name: "Starters",
            items: [
                {
                    id: 1,
                    name: "Greek Salad",
                    description: "Fresh tomatoes, cucumbers, olives, and feta cheese",
                    price: 12.99,
                    image: "https://placehold.co/300x200/gray/white?text=Greek+Salad"
                },
                {
                    id: 2,
                    name: "Bruschetta",
                    description: "Grilled bread with tomatoes, garlic, and herbs",
                    price: 9.99,
                    image: "https://placehold.co/300x200/gray/white?text=Bruschetta"
                }
            ]
        },
        {
            id: 2,
            name: "Main Courses",
            items: [
                {
                    id: 3,
                    name: "Grilled Sea Bass",
                    description: "Fresh sea bass with Mediterranean herbs and lemon",
                    price: 28.99,
                    image: "https://placehold.co/300x200/gray/white?text=Grilled+Sea+Bass"
                },
                {
                    id: 4,
                    name: "Lamb Chops",
                    description: "Grilled lamb chops with rosemary and garlic",
                    price: 32.99,
                    image: "https://placehold.co/300x200/gray/white?text=Lamb+Chops"
                }
            ]
        },
        {
            id: 3,
            name: "Desserts",
            items: [
                {
                    id: 5,
                    name: "Baklava",
                    description: "Traditional phyllo pastry with nuts and honey",
                    price: 8.99,
                    image: "https://placehold.co/300x200/gray/white?text=Baklava"
                },
                {
                    id: 6,
                    name: "Lemon Sorbet",
                    description: "Refreshing homemade lemon sorbet",
                    price: 6.99,
                    image: "https://placehold.co/300x200/gray/white?text=Lemon+Sorbet"
                }
            ]
        }
    ]

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900">Our Menu</h1>
                    <p className="mt-4 text-xl text-gray-500">
                        Discover our selection of Mediterranean dishes
                    </p>
                </div>

                <div className="mt-12">
                    {menuCategories.map((category) => (
                        <div key={category.id} className="mb-16">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">{category.name}</h2>
                            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                {category.items.map((item) => (
                                    <div key={item.id} className="group relative">
                                        <div className="aspect-w-4 aspect-h-3 bg-gray-200 rounded-lg overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-center object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
                                        </div>
                                        <div className="mt-4">
                                            <div className="flex justify-between">
                                                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                                <p className="text-lg font-medium text-yellow-600">${item.price}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                        </div>
                                        <button className="mt-4 w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors duration-200">
                                            Add to Order
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-500 mb-4">
                        All our dishes are prepared fresh to order. Please inform us of any allergies.
                    </p>
                    <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700">
                        View Full Menu PDF
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Menu 