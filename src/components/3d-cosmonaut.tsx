import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import modelUrl from "../assets/cosmonaut_on_a_rocket.glb";
import { Box } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const CosmonautModel = () => {
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

  // Update the animation every frame
  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  return <primitive object={scene} scale={0.5} />;
};

const ScrollCamera = ({ scrollPosition }: { scrollPosition: number }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useFrame(() => {
    if (cameraRef.current) {
      // Reduce scroll sensitivity for mobile devices
      const scrollMultiplier = isMobile ? 0.5 : 1;
      const startingPostion = isMobile ? 20 : 200;
      cameraRef.current.position.x = startingPostion - scrollPosition * scrollMultiplier;
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[300, 100, 300]}
      fov={55}
    />
  );
};

const Cosmonaut3D = () => {
  // State to track scroll position
  const [scrollPosition, setScrollPosition] = useState(0);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Log credits in the console
  useEffect(() => {
    console.log(
      "3D Cosmonaut model created by Yury Misiyuk (Tim0)\n" +
        "Licensed under CC Attribution Creative Commons Attribution\n" +
        "Source: https://sketchfab.com/3d-models/cosmonaut-on-a-rocket-e93cbbdb9a2144fb9f63d062566f3e63"
    );
  }, []); // Empty dependency array ensures this only runs once on mount

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
          position={[0, 50, 300]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-100}
          shadow-camera-right={100}
          shadow-camera-top={100}
          shadow-camera-bottom={-100}
        />
        <CosmonautModel />
      </Canvas>
    </Box>
  );
};

export default Cosmonaut3D;
