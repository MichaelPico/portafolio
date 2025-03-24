import { Box } from "@chakra-ui/react";
import Cosmonaut3D from "../3d/3d-cosmonaut";

export default function HelloSection() {
  const textStyles = {
    fontSize: ["3xl", "5xl", "8xl"],
    fontWeight: "bold",
    color: "white",
  };

  return (
    <Box
      h="100vh"
      pt="100px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      as="section"
    >
      <Cosmonaut3D />
      <Box
        h="100%"
        w="100%"
        bg="transparent"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        position="absolute"
        top="6vh"
        padding="40px"
      >
        <Box {...textStyles} mb="-40vh">
          Hello,
          <br/>
          I am Michael Pico!
        </Box>
      </Box>
    </Box>
  );
}
