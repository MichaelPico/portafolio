import React from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "./layouts/navbar";
import Background3D from "./components/3d/3d-starts-background";
import HelloSection from "./components/sections/hello-section";
import SummarySection from "./components/sections/summary-section";
import Satellite3D from "./components/3d/3d-satelite";
import TechnologiesSection from "./components/sections/technologies";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Background3D />
      <HelloSection />
      <SummarySection />
      <Satellite3D />
      <TechnologiesSection />
      <Box h="100vh" display="flex" alignItems="center" justifyContent="center">
        Section 1
      </Box>
      <Box h="100vh" display="flex" alignItems="center" justifyContent="center">
        Section 2
      </Box>
    </div>
  );
}

export default App;
