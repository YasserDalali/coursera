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
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        // When the component mounts, fetch available times for today
        const today = new Date()
        fetchAPI(today).then(times => setAvailableTimes(times))
    }, [])

    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                return value.length < 2 ? 'Name must be at least 2 characters long' : ''
            case 'email':
                return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email address' : ''
            case 'phone':
                return !/^\+?[\d\s-]{10,}$/.test(value) ? 'Please enter a valid phone number' : ''
            case 'date':
                const selectedDate = new Date(value)
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                return selectedDate < today ? 'Please select a future date' : ''
            case 'time':
                return !value ? 'Please select a time' : ''
            case 'guests':
                const numGuests = parseInt(value)
                return numGuests < 1 || numGuests > 8 ? 'Number of guests must be between 1 and 8' : ''
            default:
                return ''
        }
    }

    const validateForm = () => {
        const newErrors = {}
        Object.keys(formData).forEach(key => {
            if (key !== 'specialRequests' && key !== 'occasion') { // These fields are optional
                const error = validateField(key, formData[key])
                if (error) newErrors[key] = error
            }
        })
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = async (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }

        // Validate field on change
        const error = validateField(name, value)
        if (error) {
            setErrors(prev => ({
                ...prev,
                [name]: error
            }))
        }

        // If date changes, fetch new available times
        if (name === 'date') {
            const selectedDate = new Date(value)
            const times = await fetchAPI(selectedDate)
            setAvailableTimes(times)
        }
    }

    const handleBlur = (e) => {
        const { name, value } = e.target
        const error = validateField(name, value)
        if (error) {
            setErrors(prev => ({
                ...prev,
                [name]: error
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        if (!validateForm()) {
            setIsSubmitting(false)
            return
        }

        try {
            const success = await submitAPI(formData)
            if (success) {
                navigate('/booking-confirmed')
            }
        } catch (error) {
            console.error('Error submitting booking:', error)
            setErrors(prev => ({
                ...prev,
                submit: 'Failed to submit booking. Please try again.'
            }))
        } finally {
            setIsSubmitting(false)
        }
    }

    const isFormValid = () => {
        return Object.keys(errors).length === 0 &&
            formData.name &&
            formData.email &&
            formData.phone &&
            formData.date &&
            formData.time &&
            formData.guests
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

                    {errors.submit && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            {errors.submit}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow" noValidate>
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
                                            minLength="2"
                                            pattern="[A-Za-z\s]+"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`mt-1 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500`}
                                            aria-invalid={errors.name ? 'true' : 'false'}
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                        )}
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
                                            onBlur={handleBlur}
                                            className={`mt-1 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500`}
                                            aria-invalid={errors.email ? 'true' : 'false'}
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                        )}
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
                                            pattern="[\d\s-+]+"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`mt-1 block w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500`}
                                            aria-invalid={errors.phone ? 'true' : 'false'}
                                        />
                                        {errors.phone && (
                                            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                        )}
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
                                            onBlur={handleBlur}
                                            min={new Date().toISOString().split('T')[0]}
                                            className={`mt-1 block w-full border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500`}
                                            aria-invalid={errors.date ? 'true' : 'false'}
                                        />
                                        {errors.date && (
                                            <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                                        )}
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
                                            onBlur={handleBlur}
                                            className={`mt-1 block w-full border ${errors.time ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500`}
                                            aria-invalid={errors.time ? 'true' : 'false'}
                                        >
                                            <option value="">Select a time</option>
                                            {availableTimes.map(time => (
                                                <option key={time} value={time}>
                                                    {time.replace(':', ':')} {parseInt(time) >= 12 ? 'PM' : 'AM'}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.time && (
                                            <p className="mt-1 text-sm text-red-600">{errors.time}</p>
                                        )}
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
                                            onBlur={handleBlur}
                                            className={`mt-1 block w-full border ${errors.guests ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500`}
                                            aria-invalid={errors.guests ? 'true' : 'false'}
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                                            ))}
                                        </select>
                                        {errors.guests && (
                                            <p className="mt-1 text-sm text-red-600">{errors.guests}</p>
                                        )}
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
                                    maxLength={500}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                                    placeholder="Any dietary restrictions or special requests?"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    {formData.specialRequests.length}/500 characters
                                </p>
                            </div>
                        </div>

                        <div className="pt-5">
                            <button
                                type="submit"
                                disabled={!isFormValid() || isSubmitting}
                                className={`w-full py-3 px-6 rounded-md text-white transition-colors duration-200 ${isFormValid() && !isSubmitting
                                    ? 'bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
                                    : 'bg-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {isSubmitting ? 'Confirming...' : 'Confirm Reservation'}
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