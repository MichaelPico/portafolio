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
  
    const scaleValue = isMobile ? 2 : 3;
  
    return <primitive object={scene} scale={scaleValue} position={[0, -30, 0]} />;
};

const ScrollCamera = ({ scrollProgress }: { scrollProgress: number }) => {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);
    const currentAngle = useRef<number>(0);
    
    // Calculate the target angle based on scroll progress
    const getTargetAngle = (progress: number) => {
      // Map progress (0-1) to angle range (start at π/3 to -π/3)
      return (Math.PI / 2.8) * (1 - 2.8 * progress);
    };
  
    useFrame(() => {
      if (cameraRef.current) {
        // Calculate the target angle based on scroll progress
        const targetAngle = getTargetAngle(scrollProgress);
        
        // Smooth transition between angles
        currentAngle.current += (targetAngle - currentAngle.current) * 0.1;
        
        const radius = 200;
        
        // Fixed x position for stability
        const x = -50;
        
        // Calculate y and z based on the current angle
        const y = radius * Math.sin(currentAngle.current);
        const z = radius * Math.cos(currentAngle.current);
        
        cameraRef.current.position.set(x, y, z);
        cameraRef.current.lookAt(0, 0, 0);
      }
    });
  
    return (
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[200, 550, 750]}
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
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const { progress } = useProgress();
    const isLoading = progress < 100;
    const containerRef = useRef<HTMLDivElement>(null);
    const targetScrollProgress = useRef<number>(0);
    const animationFrameRef = useRef<number | null>(null);
    
    // Reference for viewport height
    const viewportHeight = useRef<number>(window.innerHeight);
  
    // Calculate scroll progress with 100vh before and after the component
    const calculateScrollProgress = () => {
      if (!containerRef.current) return 0;
      
      const rect = containerRef.current.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const vh = viewportHeight.current;
      
      // Total animation distance: 100vh before element + element height + 100vh after element
      const totalAnimationDistance = vh + elementHeight + vh;
      
      // Animation starts 100vh before the element enters the viewport
      const animationStartPosition = vh;
      
      // Current position relative to the animation start
      const currentPosition = animationStartPosition - elementTop;
      
      // Calculate progress based on the current position within the total animation distance
      const progress = currentPosition / totalAnimationDistance;
      
      // Clamp between 0 and 1
      return Math.max(0, Math.min(1, progress));
    };
  
    useEffect(() => {
      const handleScroll = () => {
        targetScrollProgress.current = calculateScrollProgress();
      };
  
      const handleResize = () => {
        viewportHeight.current = window.innerHeight;
        setIsMobile(window.innerWidth <= 768);
        handleScroll(); // Recalculate on resize
      };
  
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleResize);
      
      // Initial calculation
      handleResize();
      handleScroll();
  
      // Animation loop for smooth scrolling
      const smoothScrollAnimation = () => {
        // Use a slightly higher factor for smoother but responsive animation
        const newProgress = scrollProgress + (targetScrollProgress.current - scrollProgress) * 0.075;
        
        // Only update if there's a noticeable change
        if (Math.abs(newProgress - scrollProgress) > 0.0005) {
          setScrollProgress(newProgress);
        }
        
        animationFrameRef.current = requestAnimationFrame(smoothScrollAnimation);
      };
      
      animationFrameRef.current = requestAnimationFrame(smoothScrollAnimation);
      
      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [scrollProgress]);

      // Log credits in the console
      useEffect(() => {
        console.log(
          "Low-poly(ish) satellite model created by Icilaba\n" +
            "Source: https://sketchfab.com/3d-models/low-polyish-satellite-f22852a97c1e4d08b3e9da12277cf531"
        );
      }, []);
      
  
    return (
      <Box
        ref={containerRef}
        h={isMobile ? "40vh" : "100vh"}
        bg="transparent"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        w="100%"
      >
        <Canvas>
          <ScrollCamera scrollProgress={scrollProgress} />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[100, 100, 100]}
            intensity={3.5}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-left={-100}
            shadow-camera-right={100}
            shadow-camera-top={100}
            shadow-camera-bottom={-100}
          />
          <SatelliteModel isMobile={isMobile} />
        </Canvas>
        {isLoading && <LoadingScreen />}
      </Box>
    );
};
  
export default Satellite3D;