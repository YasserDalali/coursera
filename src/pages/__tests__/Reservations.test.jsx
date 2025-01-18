import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Reservations from '../Reservations'
import { fetchAPI, submitAPI } from '../../api/bookingApi'

// Mock the API functions
jest.mock('../../api/bookingApi')

// Mock the navigation function
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}))

describe('Reservations Component', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        mockNavigate.mockClear()
        fetchAPI.mockClear()
        submitAPI.mockClear()

        // Mock the fetchAPI to return some time slots
        fetchAPI.mockResolvedValue(['17:00', '18:00', '19:00'])
    })

    const renderComponent = async () => {
        let component
        await act(async () => {
            component = render(
                <BrowserRouter>
                    <Reservations />
                </BrowserRouter>
            )
        })
        return component
    }

    describe('HTML5 Validation Attributes', () => {
        test('name field has correct validation attributes', () => {
            renderComponent()
            const nameInput = screen.getByLabelText(/full name/i)
            expect(nameInput).toHaveAttribute('required')
            expect(nameInput).toHaveAttribute('minLength', '2')
            expect(nameInput).toHaveAttribute('pattern', '[A-Za-z\\s]+')
        })

        test('email field has correct validation attributes', () => {
            renderComponent()
            const emailInput = screen.getByLabelText(/email/i)
            expect(emailInput).toHaveAttribute('required')
            expect(emailInput).toHaveAttribute('type', 'email')
        })

        test('phone field has correct validation attributes', () => {
            renderComponent()
            const phoneInput = screen.getByLabelText(/phone/i)
            expect(phoneInput).toHaveAttribute('required')
            expect(phoneInput).toHaveAttribute('pattern', '[\\d\\s-+]+')
        })

        test('date field has correct validation attributes', () => {
            renderComponent()
            const dateInput = screen.getByLabelText(/date/i)
            expect(dateInput).toHaveAttribute('required')
            expect(dateInput).toHaveAttribute('type', 'date')
            expect(dateInput).toHaveAttribute('min', new Date().toISOString().split('T')[0])
        })

        test('time field has correct validation attributes', () => {
            renderComponent()
            const timeSelect = screen.getByLabelText(/time/i)
            expect(timeSelect).toHaveAttribute('required')
        })

        test('guests field has correct validation attributes', () => {
            renderComponent()
            const guestsSelect = screen.getByLabelText(/number of guests/i)
            expect(guestsSelect).toHaveAttribute('required')
        })
    })

    describe('JavaScript Validation', () => {
        test('validates name field correctly', async () => {
            renderComponent()
            const nameInput = screen.getByLabelText(/full name/i)

            // Test invalid input
            fireEvent.change(nameInput, { target: { value: 'A' } })
            fireEvent.blur(nameInput)
            expect(await screen.findByText(/name must be at least 2 characters/i)).toBeInTheDocument()

            // Test valid input
            fireEvent.change(nameInput, { target: { value: 'John Doe' } })
            fireEvent.blur(nameInput)
            expect(screen.queryByText(/name must be at least 2 characters/i)).not.toBeInTheDocument()
        })

        test('validates email field correctly', async () => {
            renderComponent()
            const emailInput = screen.getByLabelText(/email/i)

            // Test invalid input
            fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
            fireEvent.blur(emailInput)
            expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument()

            // Test valid input
            fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
            fireEvent.blur(emailInput)
            expect(screen.queryByText(/please enter a valid email address/i)).not.toBeInTheDocument()
        })

        test('validates phone field correctly', async () => {
            renderComponent()
            const phoneInput = screen.getByLabelText(/phone/i)

            // Test invalid input
            fireEvent.change(phoneInput, { target: { value: '123' } })
            fireEvent.blur(phoneInput)
            expect(await screen.findByText(/please enter a valid phone number/i)).toBeInTheDocument()

            // Test valid input
            fireEvent.change(phoneInput, { target: { value: '123-456-7890' } })
            fireEvent.blur(phoneInput)
            expect(screen.queryByText(/please enter a valid phone number/i)).not.toBeInTheDocument()
        })

        test('validates date field correctly', async () => {
            renderComponent()
            const dateInput = screen.getByLabelText(/date/i)

            // Test past date
            const pastDate = new Date()
            pastDate.setDate(pastDate.getDate() - 1)
            fireEvent.change(dateInput, { target: { value: pastDate.toISOString().split('T')[0] } })
            fireEvent.blur(dateInput)
            expect(await screen.findByText(/please select a future date/i)).toBeInTheDocument()

            // Test future date
            const futureDate = new Date()
            futureDate.setDate(futureDate.getDate() + 1)
            fireEvent.change(dateInput, { target: { value: futureDate.toISOString().split('T')[0] } })
            fireEvent.blur(dateInput)
            expect(screen.queryByText(/please select a future date/i)).not.toBeInTheDocument()
        })

        test('validates guests field correctly', async () => {
            renderComponent()
            const guestsSelect = screen.getByLabelText(/number of guests/i)

            // Test valid number of guests
            fireEvent.change(guestsSelect, { target: { value: '4' } })
            fireEvent.blur(guestsSelect)
            expect(screen.queryByText(/number of guests must be between 1 and 8/i)).not.toBeInTheDocument()
        })
    })

    describe('Form Submission', () => {
        test('submits form with valid data', async () => {
            submitAPI.mockResolvedValueOnce(true)
            await renderComponent()

            await act(async () => {
                // Fill out the form with valid data
                fireEvent.change(screen.getByLabelText(/full name/i), {
                    target: { value: 'John Doe' },
                })
                fireEvent.change(screen.getByLabelText(/email/i), {
                    target: { value: 'john@example.com' },
                })
                fireEvent.change(screen.getByLabelText(/phone/i), {
                    target: { value: '123-456-7890' },
                })

                const futureDate = new Date()
                futureDate.setDate(futureDate.getDate() + 1)
                fireEvent.change(screen.getByLabelText(/date/i), {
                    target: { value: futureDate.toISOString().split('T')[0] },
                })

                // Wait for time options to be available and select one
                await waitFor(() => {
                    const timeSelect = screen.getByLabelText(/time/i)
                    fireEvent.change(timeSelect, { target: { value: '18:00' } })
                })

                fireEvent.change(screen.getByLabelText(/number of guests/i), {
                    target: { value: '2' },
                })
            })

            // Submit the form
            const submitButton = screen.getByRole('button', { name: /confirm reservation/i })
            await waitFor(() => {
                expect(submitButton).not.toBeDisabled()
            })

            await act(async () => {
                fireEvent.click(submitButton)
            })

            // Wait for navigation
            await waitFor(() => {
                expect(mockNavigate).toHaveBeenCalledWith('/booking-confirmed')
            })
        })

        test('shows error message on submission failure', async () => {
            submitAPI.mockRejectedValueOnce(new Error('Submission failed'))
            await renderComponent()

            await act(async () => {
                // Fill out the form with valid data
                fireEvent.change(screen.getByLabelText(/full name/i), {
                    target: { value: 'John Doe' },
                })
                fireEvent.change(screen.getByLabelText(/email/i), {
                    target: { value: 'john@example.com' },
                })
                fireEvent.change(screen.getByLabelText(/phone/i), {
                    target: { value: '123-456-7890' },
                })

                const futureDate = new Date()
                futureDate.setDate(futureDate.getDate() + 1)
                fireEvent.change(screen.getByLabelText(/date/i), {
                    target: { value: futureDate.toISOString().split('T')[0] },
                })

                // Wait for time options to be available and select one
                await waitFor(() => {
                    const timeSelect = screen.getByLabelText(/time/i)
                    fireEvent.change(timeSelect, { target: { value: '18:00' } })
                })

                fireEvent.change(screen.getByLabelText(/number of guests/i), {
                    target: { value: '2' },
                })
            })

            // Submit the form
            const submitButton = screen.getByRole('button', { name: /confirm reservation/i })
            await waitFor(() => {
                expect(submitButton).not.toBeDisabled()
            })

            await act(async () => {
                fireEvent.click(submitButton)
            })

            // Wait for error message
            await waitFor(() => {
                expect(screen.getByText(/failed to submit booking/i)).toBeInTheDocument()
            })
        })

        test('disables submit button when form is invalid', async () => {
            await renderComponent()

            await waitFor(() => {
                const submitButton = screen.getByRole('button', { name: /confirm reservation/i })
                expect(submitButton).toBeDisabled()
            })
        })

        test('enables submit button when form is valid', async () => {
            await renderComponent()

            await act(async () => {
                // Fill out the form with valid data
                fireEvent.change(screen.getByLabelText(/full name/i), {
                    target: { value: 'John Doe' },
                })
                fireEvent.change(screen.getByLabelText(/email/i), {
                    target: { value: 'john@example.com' },
                })
                fireEvent.change(screen.getByLabelText(/phone/i), {
                    target: { value: '123-456-7890' },
                })

                const futureDate = new Date()
                futureDate.setDate(futureDate.getDate() + 1)
                fireEvent.change(screen.getByLabelText(/date/i), {
                    target: { value: futureDate.toISOString().split('T')[0] },
                })

                // Wait for time options to be available and select one
                await waitFor(() => {
                    const timeSelect = screen.getByLabelText(/time/i)
                    fireEvent.change(timeSelect, { target: { value: '18:00' } })
                })

                fireEvent.change(screen.getByLabelText(/number of guests/i), {
                    target: { value: '2' },
                })
            })

            // Check if submit button is enabled
            await waitFor(() => {
                const submitButton = screen.getByRole('button', { name: /confirm reservation/i })
                expect(submitButton).not.toBeDisabled()
            })
        })
    })

    describe('API Integration', () => {
        test('fetches available times when date changes', async () => {
            await renderComponent()

            await act(async () => {
                const dateInput = screen.getByLabelText(/date/i)
                const futureDate = new Date()
                futureDate.setDate(futureDate.getDate() + 1)
                fireEvent.change(dateInput, {
                    target: { value: futureDate.toISOString().split('T')[0] },
                })
            })

            await waitFor(() => {
                expect(fetchAPI).toHaveBeenCalledWith(expect.any(Date))
            })
        })

        test('updates available times in the select field', async () => {
            fetchAPI.mockResolvedValueOnce(['20:00', '21:00'])
            await renderComponent()

            await act(async () => {
                const dateInput = screen.getByLabelText(/date/i)
                const futureDate = new Date()
                futureDate.setDate(futureDate.getDate() + 1)
                fireEvent.change(dateInput, {
                    target: { value: futureDate.toISOString().split('T')[0] },
                })
            })

            await waitFor(() => {
                const timeSelect = screen.getByLabelText(/time/i)
                const options = Array.from(timeSelect.options).map(option => option.value)
                expect(options).toContain('20:00')
                expect(options).toContain('21:00')
            })
        })
    })
}) 