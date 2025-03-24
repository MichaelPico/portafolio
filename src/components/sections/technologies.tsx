import React from 'react';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { Technology, TechnologyCard } from '../technology-icon';  // Your existing component

const TechnologiesSection = () => {
  // Define animations for fade-in effect
  const fadeInKeyframes = {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  };

  // Updated technology groupings
  const technologies = {
    languages: [
      Technology.HTML,
      Technology.CSS,
      Technology.TYPESCRIPT,
      Technology.CSHARP,
      Technology.PYTHON,
    ],
    frameworksAndLibraries: [
      Technology.REACT,
      Technology.BLAZOR,
      Technology.THREEJS,
      Technology.SASS,
    ],
    services: [
      Technology.AZURE,
      Technology.AZURE_DEVOPS,
      Technology.GITHUB_ACTIONS,
    ],
  };

  // More compact category styling
  const categoryStyle = {
    bg: "rgba(0,0,0,0.2)",
    borderRadius: "lg",
    p: 4,
    mb: 4,
    boxShadow: "0 4px 6px rgba(0,0,0,0.2)"
  };

  return (
    <Box
      as="section"
      minHeight={{ base: "100vh", md: "95vh" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="rgba(128, 128, 128, 0.5)"
      padding={{ base: '3%', md: '5%' }}
      color="white"
      textShadow="0 1px 3px rgba(0,0,0,0.6)"
      overflowY="auto"
    >
      <Box width="100%" py={{ base: 6, md: 0 }}>
        {/* Main Heading - reduced size */}
        <Heading
          as="h1"
          fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
          fontWeight="bold"
          mb={{ base: 4, md: 6 }}
          textAlign="center"
          opacity="0"
          animation="fadeInTitle 1s ease-out forwards"
          sx={{
            '@keyframes fadeInTitle': fadeInKeyframes,
          }}
        >
          Technologies I use
        </Heading>

        <Box
          opacity="0"
          animation="fadeInCategories 1.5s ease-out 0.3s forwards"
          sx={{
            '@keyframes fadeInCategories': fadeInKeyframes,
          }}
        >
          {/* Languages Section */}
          <Box {...categoryStyle}>
            <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} mb={3} borderBottom="2px solid" borderColor="gray.600" pb={1}>
              Languages
            </Heading>
            <SimpleGrid columns={{ base: 2, md: 5, lg: 5 }} spacing={{ base: 2, md: 4 }}>
              {technologies.languages.map(tech => (
                <TechnologyCard key={tech} technology={tech} />
              ))}
            </SimpleGrid>
          </Box>

          {/* Frameworks & Libraries Section */}
          <Box {...categoryStyle}>
            <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} mb={3} borderBottom="2px solid" borderColor="gray.600" pb={1}>
              Frameworks & Libraries
            </Heading>
            <SimpleGrid columns={{ base: 2, md: 4, lg: 4 }} spacing={{ base: 2, md: 4 }}>
              {technologies.frameworksAndLibraries.map(tech => (
                <TechnologyCard key={tech} technology={tech} />
              ))}
            </SimpleGrid>
          </Box>

          {/* Services Section */}
          <Box {...categoryStyle}>
            <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} mb={3} borderBottom="2px solid" borderColor="gray.600" pb={1}>
              Services
            </Heading>
            <SimpleGrid columns={{ base: 2, md: 3, lg: 3 }} spacing={{ base: 2, md: 4 }}>
              {technologies.services.map(tech => (
                <TechnologyCard key={tech} technology={tech} />
              ))}
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TechnologiesSection;