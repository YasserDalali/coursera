const ConfirmedBooking = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
                    <div className="mb-4">
                        <svg
                            className="mx-auto h-12 w-12 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Booking Confirmed!
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Thank you for choosing Little Lemon. Your reservation has been successfully confirmed.
                        We look forward to serving you!
                    </p>
                    <p className="text-sm text-gray-500">
                        A confirmation email has been sent to your email address.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ConfirmedBooking 