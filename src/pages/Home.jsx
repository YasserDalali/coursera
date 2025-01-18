import { Link } from 'react-router-dom'

const Home = () => {
    // Sample weekly specials data
    const weeklySpecials = [
        {
            id: 1,
            name: "Mediterranean Salad",
            description: "Fresh mixed greens with feta cheese, olives, and our house dressing",
            price: 12.99,
            image: "https://placehold.co/300x200/gray/white?text=Mediterranean+Salad"
        },
        {
            id: 2,
            name: "Lemon Herb Chicken",
            description: "Grilled chicken breast with lemon herb sauce and roasted vegetables",
            price: 18.99,
            image: "https://placehold.co/300x200/gray/white?text=Lemon+Herb+Chicken"
        },
        {
            id: 3,
            name: "Seafood Pasta",
            description: "Fresh seafood with linguine in a white wine sauce",
            price: 24.99,
            image: "https://placehold.co/300x200/gray/white?text=Seafood+Pasta"
        },
        {
            id: 4,
            name: "Vegetarian Pizza",
            description: "Wood-fired pizza with fresh vegetables and mozzarella",
            price: 16.99,
            image: "https://placehold.co/300x200/gray/white?text=Vegetarian+Pizza"
        }
    ]

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                            Little Lemon
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Chicago's finest Mediterranean cuisine, bringing the flavors of the Mediterranean to your table.
                        </p>
                        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                            <div className="rounded-md shadow">
                                <Link
                                    to="/reservations"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 md:py-4 md:text-lg md:px-10"
                                >
                                    Book a Table
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlights Section */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Weekly Specials
                        </h2>
                        <div className="mt-8">
                            <Link
                                to="/order-online"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
                            >
                                Order Online
                            </Link>
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className="flex overflow-x-auto pb-8 space-x-8">
                            {weeklySpecials.map((dish) => (
                                <div
                                    key={dish.id}
                                    className="flex-none w-80 bg-white rounded-lg shadow-lg overflow-hidden"
                                >
                                    <div className="flex-shrink-0">
                                        <img className="h-48 w-full object-cover" src={dish.image} alt={dish.name} />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-baseline justify-between">
                                            <h3 className="text-lg font-semibold text-gray-900">{dish.name}</h3>
                                            <p className="text-sm font-medium text-yellow-600">${dish.price}</p>
                                        </div>
                                        <p className="mt-4 text-base text-gray-500">{dish.description}</p>
                                        <div className="mt-6">
                                            <Link
                                                to={`/menu/${dish.id}`}
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl">
                        What Our Customers Say
                    </h2>
                    <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Sample testimonials */}
                        {[1, 2, 3].map((index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-bold">Customer Name</h4>
                                        <div className="flex items-center mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`h-5 w-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-4 text-gray-600">
                                    "Amazing food and great service! The Mediterranean flavors are authentic and the atmosphere is wonderful."
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                About Little Lemon
                            </h2>
                            <p className="mt-3 max-w-3xl text-lg text-gray-500">
                                Little Lemon is a charming Mediterranean restaurant, focused on traditional recipes served with a modern twist. We use only the freshest ingredients and traditional cooking techniques to ensure an unforgettable dining experience.
                            </p>
                            <div className="mt-8">
                                <Link
                                    to="/about"
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200"
                                >
                                    Learn More About Us
                                </Link>
                            </div>
                        </div>
                        <div className="mt-10 lg:mt-0">
                            <div className="aspect-w-3 aspect-h-2">
                                <div className="w-full h-96 bg-gray-200 rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home 