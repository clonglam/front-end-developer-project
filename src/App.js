import { ChakraProvider } from "@chakra-ui/react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { AlertProvider } from "./context/alertContext"
import { BookingProvider } from "./context/bookingContext"
import Alert from "./components/Alert"
import BookingForm from "./components/BookingForm"

function App() {
  return (
    <ChakraProvider>
      <BookingProvider>
        <AlertProvider>
          <main>
            <Header />
            <BookingForm />
            <Footer />
            <Alert />
          </main>
        </AlertProvider>
      </BookingProvider>
    </ChakraProvider>
  )
}

export default App
