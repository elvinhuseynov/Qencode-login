import { Spinner, Flex, Box } from "@chakra-ui/react";

export const Loader = () => (
  <Flex
    position="fixed"
    top="0"
    right="0"
    bottom="0"
    left="0"
    justifyContent="center"
    alignItems="center"
    zIndex="modal"
  >
    <Box
      position="absolute"
      top="0"
      right="0"
      bottom="0"
      left="0"
      bg="blackAlpha.300" 
      backdropFilter="blur(3px)"
      zIndex="overlay"
    />
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
      zIndex="modal"
    />
  </Flex>
);
