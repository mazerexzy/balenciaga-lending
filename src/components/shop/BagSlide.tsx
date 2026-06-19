import type { Product } from '../../data/product';
import { useState, useEffect, useRef } from 'react';
import { OpiumBackground } from '../OpiumBackground';
import { RevealText } from '.././RevealText';

interface BagSlideProps {
  product: Product;
}

export const BagSlide = ({ product }: BagSlideProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // МАГИЯ ЗДЕСЬ: теперь isVisible постоянно обновляется (true/false)
        // в зависимости от того, на экране блок или нет
        setIsVisible(entry.isIntersecting);
      },
      // Поставил 0.3 (30%), чтобы анимация отъезда начиналась чуть раньше,
      // когда блок начинает уходить за пределы экрана
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    // ВАЖНО: Мы убрали observer.disconnect() из самой функции, 
    // чтобы он продолжал следить за блоком бесконечно
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-center overflow-hidden text-white">
      <OpiumBackground />

      {/* Контент (Левая часть) - добавил ему тоже анимацию отъезда/приезда */}
      <div className=' w-1/2 flex flex-col justify-center px-24 z-10 '>
        <h2 className={`text-8xl font-syne uppercase mb-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-32'
          }`}>
          {product.name}
        </h2>
        <p className={`text-2xl font-eater mb-6 transition-all duration-1000 delay-[1000ms] ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-52'
          }`}>
          Price: ${product.price}
        </p>
        <RevealText
          text="A monolithic structure forged for the modern urban landscape. Engineered from matte-black geometric panels, defying traditional proportions. Space redefined."
          className="font-eater text-lg text-gray-400 cursor-default"
        />

        {/* Разделительная линия */}
        <div className={`h-[1px] bg-white/40 transition-all duration-1000 ease-out mt-6 mb-8 delay-700 origin-left 
    ${isVisible ? 'w-full' : 'w-0'}`}
        />

        {/* Технические характеристики */}
        <div className="mt-8 grid grid-cols-2 gap-x-12 gap-y-4 max-w-md">
          {[
            { label: "Material", value: "Matte Polyurethane / Kevlar" },
            { label: "Hardware", value: "Magnetic Fidlock®" },
            { label: "Capacity", value: "15L Main Compartment" },
            { label: "Strap", value: "Adjustable Tactical Webbing" }
          ].map((item, index) => (
            <div
              key={item.label}
              className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${300 + index * 150}ms` }} // Каскадный эффект: каждый следующий чуть медленнее
            >
              <span className="block text-xs uppercase tracking-widest text-gray-500 font-syne">{item.label}</span>
              <span className="text-sm font-medium text-white/90">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Картинка (Правая часть) */}
      <div
        className={`w-1/2 h-screen bg-cover bg-center z-10 shadow-2xl transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0 blur-none' : 'opacity-0 translate-x-32 blur-2xl'
          }`}
        style={{
          backgroundImage: `url(${product.image})`,
          clipPath: 'polygon(5% 0%, 95% 0%, 100% 20%, 92% 40%, 100% 60%, 95% 80%, 95% 100%, 5% 100%, 0% 80%, 8% 60%, 0% 40%, 5% 20%)'
        }}
      />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/40 shadow-[0_0_20px_5px_rgba(255,255,255,0.6)] z-50
      animate-flicker" />
    </section>
  );
};