import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Reservations from '../Reservations'

// Mock the navigation function
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}))

describe('Reservations Component', () => {
    const renderComponent = () => {
        return render(
            <BrowserRouter>
                <Reservations />
            </BrowserRouter>
        )
    }

    beforeEach(() => {
        // Clear mock function calls before each test
        mockNavigate.mockClear()
    })

    test('initializes with available time slots', () => {
        renderComponent()
        const timeSelect = screen.getByLabelText(/time/i)
        const timeOptions = Array.from(timeSelect.children)

        // Check if we have the expected number of time slots (9 slots + 1 placeholder)
        expect(timeOptions).toHaveLength(10)
        expect(timeOptions[1].value).toBe('17:00') // First actual time slot
        expect(timeOptions[timeOptions.length - 1].value).toBe('21:00') // Last time slot
    })

    test('updates available times when date is selected', async () => {
        renderComponent()
        const dateInput = screen.getByLabelText(/date/i)

        // Select a date
        const testDate = '2024-02-01'
        fireEvent.change(dateInput, { target: { value: testDate } })

        // Verify that time slots are still available
        const timeSelect = screen.getByLabelText(/time/i)
        expect(timeSelect.children.length).toBeGreaterThan(1)
    })

    test('submits form successfully and navigates to confirmation page', async () => {
        renderComponent()

        // Fill out the form
        fireEvent.change(screen.getByLabelText(/full name/i), {
            target: { value: 'John Doe' },
        })
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'john@example.com' },
        })
        fireEvent.change(screen.getByLabelText(/phone/i), {
            target: { value: '1234567890' },
        })
        fireEvent.change(screen.getByLabelText(/date/i), {
            target: { value: '2024-02-01' },
        })
        fireEvent.change(screen.getByLabelText(/time/i), {
            target: { value: '18:00' },
        })

        // Submit the form
        fireEvent.click(screen.getByText(/confirm reservation/i))

        // Wait for navigation to occur
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/booking-confirmed')
        })
    })

    test('validates required fields before submission', async () => {
        renderComponent()

        // Try to submit without filling required fields
        fireEvent.click(screen.getByText(/confirm reservation/i))

        // Check for HTML5 validation
        const nameInput = screen.getByLabelText(/full name/i)
        expect(nameInput).toBeInvalid()
    })

    test('prevents selecting past dates', () => {
        renderComponent()
        const dateInput = screen.getByLabelText(/date/i)
        const today = new Date().toISOString().split('T')[0]

        // Verify min attribute is set to today
        expect(dateInput).toHaveAttribute('min', today)
    })
}) 