import React from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "./layouts/navbar";
import Background3D from "./components/3d-starts-background";
import HelloSection from "./components/hello-section";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Background3D />
      <HelloSection />
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
