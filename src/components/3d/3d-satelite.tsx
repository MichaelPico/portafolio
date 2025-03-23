import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, useGLTF, useProgress } from "@react-three/drei";
import modelUrl from "../../assets/low-polyish_satellite.glb";
import * as THREE from "three";
import { Box } from "@chakra-ui/react";

const SatelliteModel = ({ isMobile }: { isMobile: boolean }) => {
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
  
    const scaleValue = isMobile ? 0.8 : 2;
  
    return <primitive object={scene} scale={scaleValue} position={[0, -30, 0]} />;
  };

  const ScrollCamera = ({ scrollPosition }: { scrollPosition: number }) => {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);
    const [maxScroll, setMaxScroll] = useState(0);
  
    useEffect(() => {
      const updateMaxScroll = () => {
        const docHeight = document.body.scrollHeight;
        const windowHeight = window.innerHeight;
        setMaxScroll(docHeight - windowHeight);
      };
  
      updateMaxScroll();
      
      window.addEventListener("resize", updateMaxScroll);
      
      return () => window.removeEventListener("resize", updateMaxScroll);
    }, []);
  
    useFrame(() => {
      if (cameraRef.current && maxScroll > 0) {
        const scrollProgress = Math.min(scrollPosition / maxScroll, 1);
        const radius = 200;
        
        // Map scroll progress to an angle that goes from top to bottom (π to -π)
        const angle = (Math.PI / 1) * (1 - 2 * scrollProgress);
        
        const x = 50; 
        const y = radius * Math.sin(angle);
        const z = radius * Math.cos(angle);
        
        cameraRef.current.position.set(x, y, z);
        cameraRef.current.lookAt(0, 0, 0);
      }
    });
  
    return (
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[50, 200, 400]}
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
    const [isMobile, setIsMobile] = useState(false);
    const { progress } = useProgress();
    const isLoading = progress < 100;
  
    useEffect(() => {
      const handleScroll = () => {
        setScrollPosition(window.scrollY);
      };
  
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768);
      };
  
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", checkMobile);
  
      // Initial check for mobile state
      checkMobile();
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", checkMobile);
      };
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
          <SatelliteModel isMobile={isMobile} />
        </Canvas>
        {isLoading && <LoadingScreen />}
      </Box>
    );
  };
  
  export default Satellite3D;