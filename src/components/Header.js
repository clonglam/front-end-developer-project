import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

import { Box, HStack } from "@chakra-ui/react"

const Header = () => {
  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <Box
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <a>Little Lemon</a>
          <HStack
            gap={2}
            justifyContent="space-between"
            alignItems="center"
            as="nav"
          ></HStack>

          <nav>
            <HStack spacing={8}>
              <a onClick={handleClick("/")}>Home</a>
              <a onClick={handleClick("/")}>About</a>
              <a onClick={handleClick("/")}>Menu</a>
              <a onClick={handleClick("/")}>Contact</a>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  )
}
export default Header
