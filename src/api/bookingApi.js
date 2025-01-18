// Mock implementation of the booking API functions

// Available time slots (for testing purposes)
const availableTimeSlots = [
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00'
]

/**
 * Fetches available booking times for a given date
 * @param {Date} date - The date to fetch available times for
 * @returns {Promise<string[]>} Array of available time slots
 */
export const fetchAPI = (date) => {
    return new Promise((resolve) => {
        // Simulate API delay
        setTimeout(() => {
            // In a real implementation, this would fetch from a backend API
            // For now, return a subset of the available times based on the date
            // to simulate different availability on different days
            const dayOfWeek = date.getDay()
            const numSlots = 5 + (dayOfWeek % 4) // Different number of slots based on day
            const availableTimes = availableTimeSlots.slice(0, numSlots)

            resolve(availableTimes)
        }, 100)
    })
}

/**
 * Submits a booking request
 * @param {Object} formData - The booking form data
 * @returns {Promise<boolean>} True if booking was successful
 */
export const submitAPI = (formData) => {
    return new Promise((resolve) => {
        // Simulate API delay
        setTimeout(() => {
            // In a real implementation, this would submit to a backend API
            // For now, always return success
            resolve(true)
        }, 100)
    })
} 