import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileDevices = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      setIsMobile(mobileDevices.test(userAgent) || window.innerWidth <= 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const elementsToExpand = [
      'a',
      'input[type="text"]',
      'input[type="email"]',
      'input[type="number"]',
      'input[type="submit"]',
      'input[type="image"]',
      'label[for]',
      'select',
      'textarea',
      'button',
      '.link',
      '.chakra-link',
    ];

    const handleHover = (e: MouseEvent) => {
      let target = e.target as HTMLElement;
      let isOverExpandingElement = false;
      
      let depth = 0;
      while (target && !isOverExpandingElement && depth < 5) {
        
        for (const selector of elementsToExpand) {
          if (target.matches && target.matches(selector)) {
            isOverExpandingElement = true;
            break;
          }
        }
        
        target = target.parentElement as HTMLElement;
        depth++;
      }
      
      setIsHovered(isOverExpandingElement);
    };

    if (!isMobile) {
      window.addEventListener("mousemove", updatePosition);
      window.addEventListener("mouseover", handleHover);
    }
    
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        width: isHovered ? "70px" : "30px",
        height: isHovered ? "70px" : "30px",
        borderRadius: "50%",
        background: "white",
        mixBlendMode: "difference",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        transition: "width 0.2s, height 0.2s",
      }}
    />
  );
};

export default CustomCursor;