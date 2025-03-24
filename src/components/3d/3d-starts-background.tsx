import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Box } from "@chakra-ui/react";

const Background3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const touchActive = useRef(false);
  const originalPositions = useRef<Float32Array | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      );
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Store the current ref value to use in cleanup
    const container = containerRef.current;
    if (!container) return;
    
    // Setup scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = 5;
    
    // Set lower pixel ratio for mobile devices
    const pixelRatio = isMobile ? Math.min(window.devicePixelRatio, 1.5) : window.devicePixelRatio;
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: !isMobile, // Disable antialiasing on mobile
      alpha: true,
      powerPreference: "high-performance" 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);
    
    // Add light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    // Create stars - reduced count for mobile
    const starCount = isMobile ? 1500 : 5000;
    const starSize = isMobile ? 2.5 : 2;
    
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      size: starSize,
      color: 0xffffff,
      sizeAttenuation: !isMobile, // Disable size attenuation on mobile for better performance
    });

    const starsVertices = [];
    for (let i = 0; i < starCount; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000);
      const y = THREE.MathUtils.randFloatSpread(2000);
      const z = THREE.MathUtils.randFloatSpread(2000);
      starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(starsVertices, 3)
    );
    
    // Store original positions for reference
    const positions = starsGeometry.attributes.position.array as Float32Array;
    originalPositions.current = new Float32Array(positions.length);
    for (let i = 0; i < positions.length; i++) {
      originalPositions.current[i] = positions[i];
    }

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Handle mouse/touch events
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchActive.current = true;
      if (event.touches.length > 0) {
        mousePosition.current = {
          x: (event.touches[0].clientX / window.innerWidth) * 2 - 1,
          y: -(event.touches[0].clientY / window.innerHeight) * 2 + 1,
        };
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mousePosition.current = {
          x: (event.touches[0].clientX / window.innerWidth) * 2 - 1,
          y: -(event.touches[0].clientY / window.innerHeight) * 2 + 1,
        };
      }
    };

    const handleTouchEnd = () => {
      touchActive.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // Animation with frame rate limiting for mobile
    let frameId: number;
    let lastTime = 0;
    const frameInterval = isMobile ? 1000 / 30 : 0; // Cap at 30fps on mobile
    
    const animate = (time: number) => {
      frameId = requestAnimationFrame(animate);
      
      // Throttle frame rate on mobile
      const delta = time - lastTime;
      if (isMobile && delta < frameInterval) return;
      lastTime = time;

      // Slowly rotate the stars (reduced rotation speed on mobile)
      const rotationFactor = isMobile ? 0.5 : 1;
      stars.rotation.y += 0.0005 * rotationFactor;
      stars.rotation.x += 0.00025 * rotationFactor;

      // Only process interactive effects if we have original positions stored
      if (originalPositions.current && (!isMobile || touchActive.current)) {
        const positions = starsGeometry.attributes.position.array as Float32Array;
        
        // Process fewer vertices per frame on mobile
        const stride = isMobile ? 9 : 3; // Process 1/3 of points on mobile
        
        for (let i = 0; i < positions.length; i += stride) {
          // Calculate distance between mouse and star
          const dx = positions[i] / 100 - mousePosition.current.x * 100;
          const dy = positions[i + 1] / 100 - mousePosition.current.y * 100;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Push stars away from mouse (smaller effect range on mobile)
          const effectRange = isMobile ? 30 : 50;
          if (distance < effectRange) {
            const pushFactor = (effectRange - distance) / effectRange;
            positions[i] += dx * pushFactor * 0.1;
            positions[i + 1] += dy * pushFactor * 0.1;
          }

          // Slowly return to original position
          const origX = originalPositions.current[i];
          const origY = originalPositions.current[i + 1];
          const returnSpeed = isMobile ? 0.02 : 0.01;
          positions[i] = positions[i] + (origX - positions[i]) * returnSpeed;
          positions[i + 1] = positions[i + 1] + (origY - positions[i + 1]) * returnSpeed;
        }
        starsGeometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate(0);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (container) {
        container.removeChild(renderer.domElement);
      }
      starsGeometry.dispose();
      starsMaterial.dispose();
    };
  }, [isMobile]);

  return (
    <Box
      ref={containerRef}
      h="100vh"
      bg="black"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="-1"
    />
  );
};

export default Background3D;