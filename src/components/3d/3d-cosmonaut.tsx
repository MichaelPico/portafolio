import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, useGLTF, useProgress } from "@react-three/drei";
import modelUrl from "../../assets/cosmonaut_on_a_rocket.glb";
import { Box, Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CosmonautModel = ({ isMobile }: { isMobile: boolean }) => {
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

  useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  return <primitive object={scene} scale={isMobile ? 0.4 : 0.55} position={[0, 0, 0]} />;
};

const ScrollCamera = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startingPositionX = screenWidth * 0.2 - 70;

  // Animate camera with GSAP ScrollTrigger
  useEffect(() => {
    if (!cameraRef.current) return;

    const scrollMultiplier = screenWidth <= 768 ? 0.4 : 2;
    
    gsap.to(cameraRef.current.position, {
      x: startingPositionX - 1100 * scrollMultiplier,
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });
  }, [screenWidth, startingPositionX]);

  return (
    <PerspectiveCamera ref={cameraRef} makeDefault position={[startingPositionX, 100, 300]} fov={55} />
  );
};

const LoadingScreen = () => {
  const { progress } = useProgress();
  return (
    <VStack position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" spacing={4}>
      <Spinner size="xl" color="white" />
      <Text color="white" fontSize="lg">Loading... {progress.toFixed(0)}%</Text>
    </VStack>
  );
};

const Cosmonaut3D = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { progress } = useProgress();
  const isLoading = progress < 100;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    console.log(
      "3D Cosmonaut model created by Yury Misiyuk (Tim0)\n" +
      "Licensed under CC Attribution Creative Commons Attribution\n" +
      "Source: https://sketchfab.com/3d-models/cosmonaut-on-a-rocket-e93cbbdb9a2144fb9f63d062566f3e63"
    );
  }, []);

  return (
    <Box h="100%" bg="transparent" display="flex" alignItems="center" justifyContent="center" position="relative" w="100%">
      <Canvas>
        <ScrollCamera />
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
        <CosmonautModel isMobile={isMobile} />
      </Canvas>
      {isLoading && <LoadingScreen />}
    </Box>
  );
};

export default Cosmonaut3D;
