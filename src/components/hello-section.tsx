import { Box } from "@chakra-ui/react";
import Cosmonaut3D from "./3d-cosmonaut";
import { useEffect, useState } from "react";

export default function HelloSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textStyles = {
    fontSize: ["3xl", "5xl", "8xl"],
    fontWeight: "bold", 
    color: "white",
    opacity: 0,
    transform: "translateY(20px)",
    animation: "fadeIn 1s ease-out forwards",
    sx: {
      "@keyframes fadeIn": {
        "0%": {
          opacity: 0,
          transform: "translateY(20px)",
        },
        "100%": {
          opacity: 1,
          transform: "translateY(0)",
        },
      },
      "@keyframes fadeOut": {
        "0%": {
          opacity: 1,
          transform: "translateY(0)",
        },
        "50%": {
          transform: "translateY(10px)",
        },
        "100%": {
          opacity: 0,
          transform: "translateY(-20px)",
        },
      },
      "&.fade-out": {
        animation: "fadeOut 1.5s ease-out forwards",
      },
    }
  };

  return (
    <Box
      h="100vh"
      pt="100px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
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
        top="74px"
        padding="40px"
      >
        <Box
          {...textStyles}
          mb={`${Math.max(0, 2.5 - scrollY/40)}vh`}
          className={scrollY > 100 ? "fade-out" : ""}
        >
          Hello,
        </Box>
        <Box
          {...textStyles}
          className={scrollY > 100 ? "fade-out" : ""}
        >
          I am Michael Pico
        </Box>
      </Box>
    </Box>
  );
}
