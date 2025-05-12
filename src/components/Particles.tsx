
import { useEffect, useRef } from "react";

const Particles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const particleCount = 20;
    
    // Clear existing particles
    container.innerHTML = '';
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random size
      const size = Math.random() * 3 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      
      // Random opacity
      particle.style.opacity = (Math.random() * 0.5 + 0.1).toString();
      
      // Random animation delay
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      // Random animation duration
      particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
      
      container.appendChild(particle);
    }
  }, []);
  
  return <div ref={containerRef} className="particles-bg" />;
};

export default Particles;
