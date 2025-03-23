import { useRef, useEffect } from "react";
import * as THREE from "three";
import { Box } from "@chakra-ui/react";

const Background3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const originalPositions = useRef<Float32Array | null>(null);

  useEffect(() => {
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
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);
    
    // Add light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    // Create stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      size: 2,
      color: 0xffffff,
    });

    const starsVertices = [];
    for (let i = 0; i < 5000; i++) {
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

    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Slowly rotate the stars
      stars.rotation.y += 0.0005;
      stars.rotation.x += 0.00025;

      if (originalPositions.current) {
        const positions = starsGeometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          // Calculate distance between mouse and star
          const dx = positions[i] / 100 - mousePosition.current.x * 100;
          const dy = positions[i + 1] / 100 - mousePosition.current.y * 100;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Push stars away from mouse
          if (distance < 50) {
            const pushFactor = (50 - distance) / 50; // Stronger effect when closer
            positions[i] += dx * pushFactor * 0.1;
            positions[i + 1] += dy * pushFactor * 0.1;
          }

          // Slowly return to original position
          const origX = originalPositions.current[i];
          const origY = originalPositions.current[i + 1];
          positions[i] = positions[i] + (origX - positions[i]) * 0.01;
          positions[i + 1] = positions[i + 1] + (origY - positions[i + 1]) * 0.01;
        }
        starsGeometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (container) {
        container.removeChild(renderer.domElement);
      }
      starsGeometry.dispose();
      starsMaterial.dispose();
    };
  }, []);

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