import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import logo from "@/assets/logo.jpg";

export const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setCanvasSize();

    const particleCount = 150;
    const colors = ["#38bdf8", "#fbbf24", "#cbd5e1", "#6366f1"];
    const particles: {
      radius: number;
      angle: number;
      speed: number;
      color: string;
      distanceFromCenter: number;
    }[] = Array.from({ length: particleCount }, () => ({
      radius: Math.random() * 2,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.002 + 0.0005,
      color: colors[Math.floor(Math.random() * colors.length)],
      distanceFromCenter: Math.random() * (Math.min(width, height) / 1.5),
    }));

    let mouse = { x: width / 2, y: height / 2 };
    let frameId = 0;

    const animate = () => {
      ctx.fillStyle = "rgba(2, 6, 23, 0.1)";
      ctx.fillRect(0, 0, width, height);

      const targetX = width / 2 + (mouse.x - width / 2) * 0.1;
      const targetY = height / 2 + (mouse.y - height / 2) * 0.1;

      for (const p of particles) {
        p.angle += p.speed;

        const x = targetX + Math.cos(p.angle) * p.distanceFromCenter;
        const y = targetY + Math.sin(p.angle) * p.distanceFromCenter * 0.6;

        ctx.beginPath();
        ctx.arc(x, y, p.radius, 0, Math.PI * 2);
        ctx.shadowBlur = 4;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    const handleResize = () => {
      setCanvasSize();
      for (const p of particles) {
        p.distanceFromCenter = Math.random() * (Math.min(width, height) / 1.5);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-cosmic-deep">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0 opacity-80"
      />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
        <motion.div style={{ y: y2, opacity }}>
          <div className="relative mb-10 group">
            <div className="absolute inset-0 bg-golden/20 rounded-full blur-[60px] group-hover:bg-golden/30 transition-all duration-1000" />
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center p-2">
              <div className="absolute inset-0 rounded-full border border-golden/20 animate-[spin_8s_linear_infinite]" />
              <div className="absolute inset-2 rounded-full border border-accent/20 animate-[spin_12s_linear_infinite_reverse]" />
              <img
                src={logo}
                alt="Something Out of Nothing Logo"
                className="w-full h-full object-cover rounded-full border-2 border-golden/50 shadow-[0_0_50px_rgba(251,191,36,0.4)]"
              />
            </div>
          </div>
        </motion.div>

        <motion.div style={{ y: y1, opacity }}>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 mb-6 drop-shadow-lg">
            S O O N
          </h1>
          <p className="text-lg md:text-2xl text-silver-light font-light tracking-widest uppercase">
            Something Out of Nothing
          </p>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-silver">
          Scroll to Explore
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-golden to-transparent" />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-cosmic-deep" />
    </section>
  );
};
