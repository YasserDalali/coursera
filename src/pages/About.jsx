const About = () => {
    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="lg:text-center">
                    <h2 className="text-base text-yellow-600 font-semibold tracking-wide uppercase">Our Story</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Welcome to Little Lemon
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        A family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
                    </p>
                </div>

                <div className="mt-20">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                        <div className="space-y-5">
                            <h3 className="text-2xl font-bold text-gray-900">Our History</h3>
                            <p className="text-gray-500">
                                Founded in Chicago, Little Lemon has been serving authentic Mediterranean cuisine since [Year].
                                Our recipes have been passed down through generations, each adding their own modern interpretation
                                while maintaining the authentic flavors that make Mediterranean cuisine so special.
                            </p>
                            <div className="aspect-w-3 aspect-h-2">
                                <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <h3 className="text-2xl font-bold text-gray-900">Our Philosophy</h3>
                            <p className="text-gray-500">
                                At Little Lemon, we believe in using only the freshest ingredients and traditional cooking
                                methods to create dishes that delight our guests. Our commitment to quality and authenticity
                                is reflected in every dish we serve.
                            </p>
                            <div className="aspect-w-3 aspect-h-2">
                                <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20">
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-10">Meet Our Team</h3>
                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((index) => (
                            <div key={index} className="text-center">
                                <div className="mx-auto h-40 w-40 rounded-full bg-gray-200"></div>
                                <div className="mt-4">
                                    <h4 className="text-lg font-bold">Team Member Name</h4>
                                    <p className="text-gray-500">Position</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-20">
                    <div className="bg-gray-50 rounded-lg px-6 py-12">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Visit Us Today</h3>
                            <p className="text-gray-500 max-w-2xl mx-auto">
                                Experience the taste of the Mediterranean at Little Lemon. We're located in the heart of Chicago,
                                ready to serve you our delicious dishes in a warm and welcoming atmosphere.
                            </p>
                            <div className="mt-8">
                                <div className="aspect-w-16 aspect-h-9">
                                    <div className="w-full h-96 bg-gray-200 rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About 