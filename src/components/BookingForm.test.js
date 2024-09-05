import { render, screen, fireEvent } from "@testing-library/react"
import BookingForm from "./BookingForm"
import { BookingProvider } from "../context/bookingContext"
import React from "react"

// Test block
describe("BookingForm Component", () => {
  // Test case 1: Ensure that all form fields are rendered
  test("renders all form fields correctly", () => {
    render(
      <BookingProvider>
        <BookingForm />
      </BookingProvider>
    )

    // Check if date input is rendered
    expect(screen.getByLabelText(/Choose date/i)).toBeInTheDocument()

    // Check if time select is rendered
    expect(screen.getByLabelText(/Choose time/i)).toBeInTheDocument()

    // Check if guests input is rendered
    expect(screen.getByLabelText(/Number of guests/i)).toBeInTheDocument()

    // Check if occasion select is rendered
    expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument()

    // Check if submit button is rendered
    expect(
      screen.getByRole("button", { name: /Submit Reservation/i })
    ).toBeInTheDocument()
  })

  // Test case 2: Ensure form validation works (showing errors when submitting without filling required fields)
  test("shows validation errors on submitting empty form", async () => {
    render(
      <BookingProvider>
        <BookingForm />
      </BookingProvider>
    )

    // Click on the submit button without filling any fields
    fireEvent.click(screen.getByRole("button", { name: /Submit Reservation/i }))

    // Check if validation errors are displayed
    expect(await screen.findByText(/Please select a date/i)).toBeInTheDocument()
    expect(await screen.findByText(/Please select a time/i)).toBeInTheDocument()
    expect(
      await screen.findByText(/Please specify the number of guests/i)
    ).toBeInTheDocument()
    expect(
      await screen.findByText(/Please select an occasion/i)
    ).toBeInTheDocument()
  })

  // Test case 3: Ensure form submission works when fields are filled correctly
  test("submits the form successfully with valid data", async () => {
    render(
      <BookingProvider>
        <BookingForm />
      </BookingProvider>
    )

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/Choose date/i), {
      target: { value: "2024-09-01" },
    })
    fireEvent.change(screen.getByLabelText(/Choose time/i), {
      target: { value: "18:00" },
    })
    fireEvent.change(screen.getByLabelText(/Number of guests/i), {
      target: { value: "3" },
    })
    fireEvent.change(screen.getByLabelText(/Occasion/i), {
      target: { value: "Birthday" },
    })

    // Click on the submit button
    fireEvent.click(screen.getByRole("button", { name: /Submit Reservation/i }))

    // Check if no validation errors are displayed
    expect(screen.queryByText(/Please select a date/i)).toBeNull()
    expect(screen.queryByText(/Please select a time/i)).toBeNull()
    expect(
      screen.queryByText(/Please specify the number of guests/i)
    ).toBeNull()
    expect(screen.queryByText(/Please select an occasion/i)).toBeNull()

    // You can add more assertions here, such as checking if form submission logic (e.g., an API call) was triggered.
  })
})
