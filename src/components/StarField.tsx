import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

export const StarField = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.5 + 0.1,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x: x * 30, y: y * 30 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, hsl(220 70% 15%) 0%, hsl(222 55% 8%) 50%, hsl(222 47% 6%) 100%)',
      }}
    >
      {/* Static stars layer */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-star-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.5],
            scale: [1, 1.2, 1],
            x: mousePosition.x * star.speed,
            y: mousePosition.y * star.speed,
          }}
          transition={{
            opacity: {
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
            scale: {
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
            x: { duration: 0.3, ease: "easeOut" },
            y: { duration: 0.3, ease: "easeOut" },
          }}
        />
      ))}
      
      {/* Nebula clouds */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full opacity-20"
        style={{
          left: '10%',
          top: '20%',
          background: 'radial-gradient(circle, hsla(200, 80%, 50%, 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
        }}
      />
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-15"
        style={{
          right: '5%',
          bottom: '10%',
          background: 'radial-gradient(circle, hsla(45, 90%, 55%, 0.2) 0%, transparent 70%)',
          filter: 'blur(80px)',
          transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`,
        }}
      />
    </div>
  );
};
