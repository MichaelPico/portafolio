import React, { useEffect, useRef } from 'react';
import { Box, Heading, Text, chakra } from '@chakra-ui/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SummarySection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef<HTMLDivElement>(null);

  const Highlight = chakra('span', {
    baseStyle: {
      position: 'relative',
      color: 'white',
      fontWeight: 'bold',
      px: 1,
      _after: {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        bg: 'blue.400',
        opacity: 0.4,
        zIndex: -1,
        borderRadius: 'md',
      }
    }
  });

  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      snap: 0.5,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        toggleActions: 'play none none reverse',
      }
    });

    // Heading animation
    tl.fromTo(
      headingRef.current, 
      { 
        opacity: 0, 
        y: 50,
        scale: 0.8,
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
      }
    );

    // Text animation with staggered letter reveal
    tl.fromTo(
      textRef.current,
      { 
        opacity: 0, 
        y: 50,
      },
      { 
        opacity: 1, 
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
      },
      '-=0.5'
    );

    // Animate individual highlights
    if (textRef.current) {
      const highlights = textRef.current.querySelectorAll("span");
      tl.fromTo(
        highlights,
        {
          opacity: 0,
          backgroundColor: "rgba(59, 130, 246, 0)",
        },
        {
          opacity: 1,
          backgroundColor: "rgba(59, 130, 246, 0.4)",
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.inOut",
        },
        "-=1"
      );
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <Box
      ref={sectionRef}
      as="section"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="rgba(128, 128, 128, 0.5)"
      padding={{ base: "5%", md: "8%" }}
      color="white"
      textShadow="0 1px 3px rgba(0,0,0,0.6)"
    >
      <Box textAlign="center">
        <Heading
          ref={headingRef}
          as="h1"
          fontSize={{ base: "5xl", md: "6xl", lg: "7xl" }}
          fontWeight="bold"
          mb={8}
        >
          Who I am?
        </Heading>
       
        <Text
          ref={textRef}
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          lineHeight="1.5"
          maxW="5xl"
          mx="auto"
        >
          I'm a <Highlight>Full Stack Developer</Highlight> with a background in Higher Technician Application Development <Highlight>from Spain</Highlight>. I focus on all aspects of software development, from feature <Highlight>design</Highlight> to both <Highlight>frontend</Highlight> and <Highlight>backend</Highlight>, as well as managing <Highlight>CI/CD</Highlight>. I believe in T-shaped skills, where deep expertise in one area helps me contribute more effectively across the entire development process.
        </Text>
      </Box>
    </Box>
  );
};

export default SummarySection;