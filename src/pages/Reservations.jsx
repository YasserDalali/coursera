import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchAPI, submitAPI } from '../api/bookingApi'

const Reservations = () => {
    const navigate = useNavigate()
    const [availableTimes, setAvailableTimes] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        occasion: 'none',
        specialRequests: ''
    })

    useEffect(() => {
        // When the component mounts, fetch available times for today
        const today = new Date()
        fetchAPI(today).then(times => setAvailableTimes(times))
    }, [])

    const handleChange = async (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))

        // If date changes, fetch new available times
        if (name === 'date') {
            const selectedDate = new Date(value)
            const times = await fetchAPI(selectedDate)
            setAvailableTimes(times)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const success = await submitAPI(formData)
            if (success) {
                navigate('/booking-confirmed')
            }
        } catch (error) {
            console.error('Error submitting booking:', error)
            // Handle error - you might want to show an error message to the user
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Reserve a Table
                        </h1>
                        <p className="mt-4 text-lg text-gray-500">
                            Book your dining experience at Little Lemon
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow">
                        <div className="space-y-6">
                            {/* Personal Information */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Reservation Details */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Reservation Details</h3>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            id="date"
                                            required
                                            value={formData.date}
                                            onChange={handleChange}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                                            Time
                                        </label>
                                        <select
                                            name="time"
                                            id="time"
                                            required
                                            value={formData.time}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                                        >
                                            <option value="">Select a time</option>
                                            {availableTimes.map(time => (
                                                <option key={time} value={time}>
                                                    {time.replace(':', ':')} {parseInt(time) >= 12 ? 'PM' : 'AM'}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
                                            Number of Guests
                                        </label>
                                        <select
                                            name="guests"
                                            id="guests"
                                            required
                                            value={formData.guests}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="occasion" className="block text-sm font-medium text-gray-700">
                                            Occasion
                                        </label>
                                        <select
                                            name="occasion"
                                            id="occasion"
                                            value={formData.occasion}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                                        >
                                            <option value="none">None</option>
                                            <option value="birthday">Birthday</option>
                                            <option value="anniversary">Anniversary</option>
                                            <option value="date">Date Night</option>
                                            <option value="business">Business Meal</option>
                                            <option value="special">Special Occasion</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Special Requests */}
                            <div>
                                <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700">
                                    Special Requests
                                </label>
                                <textarea
                                    name="specialRequests"
                                    id="specialRequests"
                                    rows={4}
                                    value={formData.specialRequests}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                                    placeholder="Any dietary restrictions or special requests?"
                                />
                            </div>
                        </div>

                        <div className="pt-5">
                            <button
                                type="submit"
                                className="w-full bg-yellow-500 text-white py-3 px-6 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
                            >
                                Confirm Reservation
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        <p>For parties larger than 8, please call us directly at (555) 123-4567</p>
                        <p className="mt-2">Reservation required for all parties. Confirmation email will be sent after booking.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reservations 