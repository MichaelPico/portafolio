import React from 'react';
import { Box, Heading, Text, chakra } from '@chakra-ui/react';

const SummarySection = () => {
  // Define animations in style objects
  const fadeInKeyframes = {
    "0%": {
      opacity: 0,
      transform: "translateY(20px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  };

  // Custom highlighted span component
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

  return (
    <Box
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
          as="h1"
          fontSize={{ base: "5xl", md: "6xl", lg: "7xl" }}
          fontWeight="bold"
          mb={8}
          opacity="0"
          animation="fadeInTitle 1s ease-out forwards"
          sx={{
            "@keyframes fadeInTitle": fadeInKeyframes
          }}
        >
          Who I am?
        </Heading>
        
        <Text
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          lineHeight="1.5"
          maxW="5xl"
          mx="auto"
          opacity="0"
          animation="fadeInDescription 1.5s ease-out 0.3s forwards"
          sx={{
            "@keyframes fadeInDescription": fadeInKeyframes
          }}
        >
          I'm a <Highlight>Full Stack Developer</Highlight> with a background in Higher Technician Application Development <Highlight>from Spain</Highlight>. I focus on all aspects of software development, from feature <Highlight>design</Highlight> to both <Highlight>frontend</Highlight> and <Highlight>backend</Highlight>, as well as managing <Highlight>CI/CD</Highlight>. I believe in T-shaped skills, where deep expertise in one area helps me contribute more effectively across the entire development process.
        </Text>
      </Box>
    </Box>
  );
};

export default SummarySection;