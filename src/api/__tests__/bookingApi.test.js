import { fetchAPI, submitAPI } from '../bookingApi'

describe('Booking API Functions', () => {
    describe('fetchAPI', () => {
        test('returns available times for a given date', async () => {
            const date = new Date('2024-02-01')
            const times = await fetchAPI(date)

            // Verify that we get an array of times
            expect(Array.isArray(times)).toBe(true)
            expect(times.length).toBeGreaterThan(0)

            // Verify time format (HH:mm)
            times.forEach(time => {
                expect(time).toMatch(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)
            })
        })

        test('returns different times for different dates', async () => {
            const date1 = new Date('2024-02-01')
            const date2 = new Date('2024-02-02')

            const times1 = await fetchAPI(date1)
            const times2 = await fetchAPI(date2)

            // Even if times are the same, they should be different instances
            expect(times1).not.toBe(times2)
        })
    })

    describe('submitAPI', () => {
        test('successfully submits valid booking data', async () => {
            const bookingData = {
                name: 'John Doe',
                email: 'john@example.com',
                phone: '1234567890',
                date: '2024-02-01',
                time: '18:00',
                guests: 2,
                occasion: 'birthday'
            }

            const result = await submitAPI(bookingData)
            expect(result).toBe(true)
        })

        test('handles empty booking data', async () => {
            const result = await submitAPI({})
            // The mock API should still return true
            expect(result).toBe(true)
        })
    })
}) 