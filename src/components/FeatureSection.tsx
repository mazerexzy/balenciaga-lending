import { motion, useInView } from 'framer-motion';
import { RevealText } from './RevealText';
import ModelImage from '../assets/main6.jpg';
import { DustEffect } from './DustEffect';
import { useLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';

// Компонент для "собирающейся" картинки (сетка 4x4)
const AssemblingImage = ({ imageSrc, isVisible }: { imageSrc: string, isVisible: boolean }) => {
  const rows = 4;
  const cols = 4;
  const tiles = [...Array(rows * cols)];

  return (
    <div className="grid grid-cols-4 grid-rows-4 w-full h-full">
      {tiles.map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        
        return (
          <div
            key={i}
            className={`transition-all duration-[1200ms] ease-out 
              ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            style={{
              backgroundImage: `url(${imageSrc})`,
              backgroundSize: `${cols * 100}% ${rows * 100}%`,
              backgroundPosition: `${(col / (cols - 1)) * 100}% ${(row / (rows - 1)) * 100}%`,
              transitionDelay: `${(row + col) * 100}ms` // Эффект волны
            }}
          />
        );
      })}
    </div>
  );
};

interface FeatureSectionProps {
  isBarrierActive: boolean;
  setIsBarrierActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FeatureSection = ({ isBarrierActive, setIsBarrierActive }: FeatureSectionProps) => {
  const lenis = useLenis();
  const containerRef = useRef(null);
  // Используем useInView для синхронизации анимации плиток с появлением блока
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  useEffect(() => {
    if (!lenis) return;
    const onScroll = ({ scroll }: { scroll: number }) => {
      const section = document.getElementById('feature-section');
      if (!section || !isBarrierActive) return;
      const limit = section.offsetTop + section.offsetHeight - window.innerHeight;
      if (scroll > limit) lenis.scrollTo(limit, { immediate: true });
    };
    lenis.on('scroll', onScroll);
    return () => lenis.off('scroll', onScroll);
  }, [lenis, isBarrierActive]);

  const handleScrollToShop = () => {
    const target = document.getElementById('shop-section');
    if (lenis && target) {
      setIsBarrierActive(false);
      lenis.scrollTo(target, { lerp: 0.07, duration: 1.5 });
    }
  };

  return (
    <section ref={containerRef} id="feature-section" className="relative h-screen w-full bg-black text-white flex overflow-hidden">
      
      {/* ЛЕВАЯ ЧАСТЬ */}
      <div className="w-1/2 flex flex-col justify-center px-16 relative">
        <DustEffect isTriggered={true} />
        <div className="relative z-10 max-w-xl">
          <motion.h2
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl font-syne uppercase mb-6 cursor-default"
          >
            Future Vision
          </motion.h2>
          <RevealText
            text="THE ARCHITECTURE OF THE FUTURE IS NOT BUILT, IT IS EVOLVED. WE ARE DEFINING THE NEW SILHOUETTE."
            className="font-eater text-lg text-gray-400 cursor-default"
          />
        </div>
      </div>

      {/* ПРАВАЯ ЧАСТЬ: Собирающаяся картинка */}
      <div
        className="w-1/2 overflow-hidden bg-black" 
        style={{ 
            clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 15% 100%, 0% 50%)' 
        }}
      >
        <AssemblingImage imageSrc={ModelImage} isVisible={isInView} />
      </div>

      {/* Кнопка скролла */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        animate={{
          boxShadow: [
            "0 0 0px rgba(255, 255, 255, 0)",
            "0 0 20px rgba(255, 255, 255, 0.4)",
            "0 0 0px rgba(255, 255, 255, 0)",
          ],
        }}
        transition={{
          boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" },
          opacity: { duration: 0.8 },
        }}
        onClick={handleScrollToShop}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 w-16 h-16 rounded-full border border-white/50 flex items-center justify-center bg-white/10 backdrop-blur-md hover:bg-white hover:text-black transition-colors cursor-pointer"
      >
        <span className="text-2xl">↓</span>
      </motion.button>
      
      {/* Нижняя линия */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/40 shadow-[0_0_20px_5px_rgba(255,255,255,0.6)] z-50 animate-flicker" />
    </section>
  );
};