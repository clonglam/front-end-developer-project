import React from "react"
import ReactDOM from "react-dom/client"

import "./index.css"
import reportWebVitals from "./reportWebVitals"
import LandingPage from "./pages/LandingPage"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import BookingPage from "./pages/BookingPage"
import { ChakraProvider } from "@chakra-ui/react"
import { AlertProvider } from "./context/alertContext"
import { BookingProvider } from "./context/bookingContext"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [
      {
        path: "booking",
        element: <BookingPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ChakraProvider>
    <BookingProvider>
      <AlertProvider>
        <RouterProvider router={router} />
      </AlertProvider>
    </BookingProvider>
  </ChakraProvider>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
