import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useBooking } from "../context/bookingContext" // Use the custom hook to access context
import { fetchAPI } from "../api/fetchAPI"
import { submitAPI } from "../api/submitAPI"
import "./BookingForm.css" // Import the CSS file

// Validation schema
const BookingSchema = Yup.object().shape({
  date: Yup.date().required("Please select a date"),
  time: Yup.string().required("Please select a time"),
  guests: Yup.number()
    .min(1, "At least 1 guest is required")
    .max(10, "Maximum 10 guests allowed")
    .required("Please specify the number of guests"),
  occasion: Yup.string().required("Please select an occasion"),
})

const BookingForm = () => {
  const { availableTimes, updateTimes } = useBooking() // Access state and update function

  const handleSubmit = async (values) => {
    const success = await submitAPI(values)
    if (success) {
      alert("Reservation submitted successfully!")
    } else {
      alert("Failed to submit reservation.")
    }
  }

  const onClickHandler = async (e) => {
    e.preventDefault()
    console.log("Button clicked")
    console.log(await fetchAPI(new Date()))
  }

  return (
    <div className="form-container">
      <h2>Book a Table</h2>

      <Formik
        initialValues={{
          date: "",
          time: "",
          guests: "",
          occasion: "",
        }}
        validationSchema={BookingSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            {/* Date Field */}
            <label htmlFor="date">Choose date</label>
            <Field
              type="date"
              name="date"
              id="date"
              onChange={(e) => {
                setFieldValue("date", e.target.value)
                updateTimes(e.target.value) // Dispatch state update on date change
              }}
            />
            <ErrorMessage
              name="date"
              component="div"
              className="error-message"
            />

            {/* Time Field */}
            <label htmlFor="time">Choose time</label>
            <Field as="select" name="time" id="time">
              <option value="">Select a time</option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="time"
              component="div"
              className="error-message"
            />

            {/* Guests Field */}
            <label htmlFor="guests">Number of guests</label>
            <Field type="number" name="guests" id="guests" min="1" max="10" />
            <ErrorMessage
              name="guests"
              component="div"
              className="error-message"
            />

            {/* Occasion Field */}
            <label htmlFor="occasion">Occasion</label>
            <Field as="select" name="occasion" id="occasion">
              <option value="">Select an occasion</option>
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
            </Field>
            <ErrorMessage
              name="occasion"
              component="div"
              className="error-message"
            />

            {/* Submit Button */}
            <button type="submit">Submit Reservation</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default BookingForm
