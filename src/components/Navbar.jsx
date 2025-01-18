import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        {/* Logo placeholder */}
                        <Link to="/" className="w-32 h-12 bg-gray-200 flex items-center justify-center">
                            <div className="w-full h-full relative overflow-hidden">
                                <div className="absolute inset-0 flex">
                                    <div className="w-full h-full border-2 border-gray-400">
                                        <div className="absolute inset-0 transform rotate-45">
                                            <div className="w-full h-0.5 bg-gray-400 absolute top-1/2 -translate-y-1/2"></div>
                                            <div className="h-full w-0.5 bg-gray-400 absolute left-1/2 -translate-x-1/2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="hidden sm:flex sm:space-x-8 items-center">
                        <Link to="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                            Home
                        </Link>
                        <Link to="/about" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                            About
                        </Link>
                        <Link to="/menu" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                            Menu
                        </Link>
                        <Link to="/reservations" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                            Reservations
                        </Link>
                        <Link to="/order-online" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                            Order Online
                        </Link>
                        <Link to="/login" className="bg-yellow-500 text-white hover:bg-yellow-600 px-4 py-2 rounded-md text-sm font-medium">
                            Login
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="sm:hidden flex items-center">
                        <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500">
                            <span className="sr-only">Open main menu</span>
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar 