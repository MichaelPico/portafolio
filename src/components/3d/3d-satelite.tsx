import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, useGLTF, useProgress } from "@react-three/drei";
import modelUrl from "../../assets/low-polyish_satellite.glb";
import * as THREE from "three";
import { Box } from "@chakra-ui/react";

const SatelliteModel = () => {
  const { scene, animations } = useGLTF(modelUrl);
  const mixer = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    if (animations && animations.length) {
      mixer.current = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => {
        const action = mixer.current!.clipAction(clip);
        action.play();
      });
    }
  }, [scene, animations]);

  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  return <primitive object={scene} scale={2} position={[0, -30, 0]} />;
};

const ScrollCamera = ({ scrollPosition }: { scrollPosition: number }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Track the maximum scroll position to normalize values
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    const updateMaxScroll = () => {
      // Calculation for maximum possible scroll
      const docHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;
      setMaxScroll(docHeight - windowHeight);
    };
    
    checkMobile();
    updateMaxScroll();
    
    window.addEventListener("resize", () => {
      checkMobile();
      updateMaxScroll();
    });
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useFrame(() => {
    if (cameraRef.current && maxScroll > 0) {
      // Calculate normalized scroll progress (0 to 1)
      const scrollProgress = Math.min(scrollPosition / maxScroll, 1);
      
      // Define the orbit path
      const radius = 200; // Distance from center
      
      // Map scroll progress to an angle that goes from top to bottom (π/2 to -π/2)
      // Start at top (π/2 radians or 90 degrees)
      // End at bottom (-π/2 radians or -90 degrees)
      const angle = (Math.PI / 2) * (1 - 2 * scrollProgress);
      
      // Calculate camera position using spherical coordinates
      const x = 50; // Keep camera centered horizontally
      const y = radius * Math.sin(angle); // Vertical position (top to bottom)
      const z = radius * Math.cos(angle); // Depth position
      
      // Update camera position
      cameraRef.current.position.set(x, y, z);
      
      // Always look at the center where the satellite is
      cameraRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[50, 200, 400]} // Initial position at the top
      fov={45}
    />
  );
};

const LoadingScreen = () => {
  const { progress } = useProgress();

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <div className="text-white text-lg">
        Loading... {progress.toFixed(0)}%
      </div>
    </div>
  );
};

const Satellite3D = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { progress } = useProgress();
  const isLoading = progress < 100;

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      h="100%"
      bg="transparent"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      w="100%"
    >
      <Canvas>
        <ScrollCamera scrollPosition={scrollPosition} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[100, 100, 100]}
          intensity={1.5}
          castShadow
        />
        <SatelliteModel />
      </Canvas>
      {isLoading && <LoadingScreen />}
    </Box>
  );
};

export default Satellite3D;