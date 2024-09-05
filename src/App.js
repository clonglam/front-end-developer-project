import { ChakraProvider } from "@chakra-ui/react"
import { AlertProvider } from "./context/alertContext"
import { BookingProvider } from "./context/bookingContext"
import LandingPage from "./pages/LandingPage"

function App() {
  return (
    <ChakraProvider>
      <BookingProvider>
        <AlertProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/confirmed" element={<ConfirmedBooking />} /> */}
          </Routes>
        </AlertProvider>
      </BookingProvider>
    </ChakraProvider>
  )
}

export default App
