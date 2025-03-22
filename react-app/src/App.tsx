import React from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from './layouts/navbar';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Box h="100vh" bg="black" display="flex" alignItems="center" justifyContent="center">
        Section 1
      </Box>
      <Box h="100vh" bg="green.500" display="flex" alignItems="center" justifyContent="center">
        Section 2
      </Box>
      <Box h="100vh" bg="red.500" display="flex" alignItems="center" justifyContent="center">
        Section 3
      </Box>
    </div>
  );
}

export default App;
