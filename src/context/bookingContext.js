import React, { createContext, useReducer, useContext, useEffect } from "react"
import { fetchAPI } from "../api/fetchAPI"

// Create BookingContext
const BookingContext = createContext()

// Reducer function to handle time updates
const timeReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_TIMES":
      return action.payload
    case "UPDATE_TIMES":
      return action.payload
    default:
      return state
  }
}

// Initialize times using the API
const initializeTimes = async () => {
  const today = new Date() // Today's date
  const availableTimes = fetchAPI(today) // Fetch available times for today
  console.log("Available times:", availableTimes)
  return availableTimes || []
}

// BookingProvider Component
export const BookingProvider = ({ children }) => {
  const [availableTimes, dispatch] = useReducer(timeReducer, [])

  // Initialize available times on component mount
  useEffect(() => {
    const initialize = async () => {
      const times = await initializeTimes()
      dispatch({ type: "INITIALIZE_TIMES", payload: times })
    }
    initialize()
  }, [])

  // Function to update available times based on the selected date
  const updateTimes = async (selectedDate) => {
    const availableTimes = fetchAPI(selectedDate) // Fetch times
    console.log("Updated times:", availableTimes)
    dispatch({ type: "UPDATE_TIMES", payload: availableTimes })
  }

  return (
    <BookingContext.Provider value={{ availableTimes, updateTimes }}>
      {children}
    </BookingContext.Provider>
  )
}

// Custom hook to use the BookingContext
export const useBooking = () => {
  return useContext(BookingContext)
}
