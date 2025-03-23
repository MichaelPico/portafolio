import React from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from './layouts/navbar';
import Background3D from './components/3d-starts-background';
import Cosmonaut3D from './components/3d-cosmonaut';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Background3D />
      <Box h="100vh" pt="100px" display="flex" alignItems="center" justifyContent="center" overflow="hidden">
          <Cosmonaut3D />
          <Box
            h="100%"
            w="100%"
            bg="transparent"
            display="flex"
            alignItems="flex-start"
            justifyContent="flex-start"
            position="absolute"
            top="74px"
            padding="20px"
          >
             <Box
              fontSize={["4xl", "6xl", "8xl"]}
              fontWeight="bold"
              color="white"
            >
              Hello,
              <br />
              I am Michael Pico
            </Box>
          </Box>
      </Box>
      <Box h="100vh" display="flex" alignItems="center" justifyContent="center">
        Section 3
      </Box>
      <Box h="100vh" display="flex" alignItems="center" justifyContent="center">
        Section 4
      </Box>
      <Box h="100vh" display="flex" alignItems="center" justifyContent="center">
        Section 5
      </Box>
    </div>
  );
}

export default App;
