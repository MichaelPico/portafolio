import { useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cosmonaut3D from "../3d/3d-cosmonaut";

gsap.registerPlugin(ScrollTrigger);

export default function HelloSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    // Handle window resize to recalculate vh
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    const section = sectionRef.current;
    const text = textRef.current;

    if (section && text) {
      // Create the scroll animation with more precise control
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          markers: false,
        }
      });

      
      tl.fromTo(text, 
        { 
          y: "0%", 
          scale: 1, 
          opacity: 1 
        },
        { 
          y: `-${windowHeight * 0.4}`, 
          scale: 0.7, 
          opacity: 0.5,
          ease: "power2.inOut"
        }
      );
    }

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [windowHeight]);

  const textStyles = {
    fontSize: ["3xl", "5xl", "8xl"],
    fontWeight: "bold",
    color: "white",
    width: "100%",
    transformOrigin: "top left"
  };

  return (
    <Box
      ref={sectionRef}
      h={`${windowHeight}px`}
      position="relative"
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
        top="0"
        pt="80px"
        px={10}
      >
        <Box 
          ref={textRef} 
          {...textStyles}
        >
          Hello,
          <br />
          I am Michael Pico!
        </Box>
      </Box>
    </Box>
  );
}