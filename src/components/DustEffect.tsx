import { useEffect, useRef } from 'react';

interface DustEffectProps {
  isTriggered: boolean;
}

interface Particle {
  x: number; y: number; vx: number; vy: number; size: number; alpha: number;
}

export const DustEffect = ({ isTriggered }: DustEffectProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  // ... дальше твой useEffect

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const mouse = { x: -1000, y: -1000 };

    if (particlesRef.current.length === 0) {
      particlesRef.current = Array.from({ length: 80 }, (): Particle => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2
      }));
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((p) => {
        // Движение пылинки
        p.x += p.vx;
        p.y += p.vy;

        if (Math.abs(p.vx) > 0.5) p.vx *= 0.988;
        if (Math.abs(p.vy) > 0.5) p.vy *= 0.988;

        // Эффект слежения: частицы немного тянутся к мыши
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && Math.abs(p.vx) < 1 && Math.abs(p.vy) < 1) {
          p.x += dx * 0.02;
          p.y += dy * 0.02;
        }

        // Возврат в границы
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Рисуем мягкую частицу
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        gradient.addColorStop(0, `rgba(200, 200, 200, ${p.alpha})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (isTriggered) {
      particlesRef.current.forEach((p) => {
        p.vx = (Math.random() - 0.5) * 20;
        p.vy = (Math.random() - 0.5) * 20;
      });
    }
  }, [isTriggered]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto" />;
};