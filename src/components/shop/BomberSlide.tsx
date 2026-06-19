import { useState, useEffect, useRef } from 'react';
import type { Product } from '../../data/product';
import { DustEffect } from '../DustEffect';
import bomber2 from '../../assets/bomber2.jpg';

interface BomberSlideProps {
    product: Product;
}

export const BomberSlide = ({ product }: BomberSlideProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Обновляем состояние при каждом входе и выходе из зоны видимости
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.3 } // Порог 30%, чтобы анимация начиналась чуть раньше
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        // Отключаем наблюдатель только при полном удалении компонента со страницы
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full min-h-screen flex bg-black text-white snap-section overflow-hidden relative"
        >
            <div className="absolute inset-0 z-0">
                <DustEffect isTriggered={isVisible} />
            </div>


            {/* Левая картинка */}
            <div className={`w-1/3 h-screen bg-cover bg-center z-10
                rounded-[60%_40%_30%_70%/60%_30%_70%_40%] shadow-2xl object-cover
                transition-all duration-1000 ease-out
                ${isVisible
                    ? 'opacity-100 translate-x-0 blur-none'
                    : 'opacity-0 -translate-x-32 blur-2xl'
                }`}
                style={{ backgroundImage: `url(${product.image})` }}
            />

            {/* Центральный текст */}
            <div className={`w-2/3 flex flex-col justify-center px-24 relative z-10
                transition-all duration-1000 ease-out
                ${isVisible
                    ? 'opacity-100 translate-x-0 blur-none'
                    : 'opacity-0 translate-x-16 blur-md'
                }`}>
                <h2 className="text-8xl font-syne uppercase mb-6">{product.name}</h2>
                <p className="font-eater text-4xl text-gray-400">{product.price} $</p>

                <p className="mt-6 max-w-xl text-lg text-gray-400 leading-relaxed font-eater">
                    An oversized silhouette inspired by the aesthetics of industrial deconstructivism.
                    Made from ultra-dense nylon with a water-repellent finish.
                    Each detail is hand-finished to create a unique vintage distressed effect.
                </p>

                {/* Линия, растущая слева направо */}
                <div className={`h-[1px] bg-white/40 origin-left transition-all duration-1000 ease-out mt-6 mb-8 delay-300
    ${isVisible ? 'w-full' : 'w-0'}`}
                />

                {/* Характеристики */}
                <div className="mt-8 grid grid-cols-2 gap-x-12 gap-y-4 max-w-md">
                    {[
                        { label: "Material", value: "100% Heavy Nylon (450g/m²)" },
                        { label: "Hardware", value: "YKK Matte Black Iron" },
                        { label: "Fit", value: "Extreme Oversized Fit" },
                        { label: "Made in", value: "Earth (Underground)" }
                    ].map((item, index) => {
                        // Логика: если индекс четный (0, 2) — левая колонка, едет слева (-translate-x). 
                        // Если нечетный (1, 3) — правая, едет справа (translate-x).
                        const isLeftColumn = index % 2 === 0;

                        return (
                            <div
                                key={item.label}
                                className={`transition-all duration-700 ease-out ${isVisible
                                        ? 'opacity-100 translate-x-0'
                                        : `opacity-0 ${isLeftColumn ? '-translate-x-10' : 'translate-x-10'}`
                                    }`}
                                style={{ transitionDelay: `${400 + index * 100}ms` }}
                            >
                                <span className="block text-xs uppercase tracking-widest text-gray-500 font-syne">{item.label}</span>
                                <span className="text-sm font-medium text-white/90">{item.value}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Глитч-стрелка */}
                <div className="absolute left-[-40px] top-1/2 -translate-y-1/2 text-white">
                    <span className="text-[120px] leading-none">
                        <svg
                            viewBox="0 0 100 100"
                            className={`w-32 h-32 text-white/80 drop-shadow-lg -scale-x-100
                                transition-all duration-700 delay-[1500ms]
                                ease-[cubic-bezier(0.34,1.56,0.64,1)]
                                ${isVisible
                                    ? 'opacity-100 translate-y-0 animate-glitch-arrow'
                                    : 'opacity-0 -translate-y-20'
                                }`}
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M20 80 Q 40 20, 80 30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-80" />
                            <path d="M60 10 L 85 30 L 70 55" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="30" cy="50" r="2" fill="currentColor" className="opacity-50" />
                            <circle cx="50" cy="70" r="1.5" fill="currentColor" className="opacity-60" />
                        </svg>
                    </span>
                </div>
            </div>

            {/* Правая картинка */}
            <div className={`w-1/3 h-screen bg-cover bg-center z-10 shadow-2xl object-cover mr-30
                transition-all duration-1000 ease-out
                ${isVisible
                    ? 'opacity-100 translate-x-0 blur-none'
                    : 'opacity-0 translate-x-32 blur-2xl'
                }`}
                style={{ backgroundImage: `url(${bomber2})`, clipPath: 'polygon(20% 0%, 85% 2%, 100% 20%, 90% 45%, 98% 75%, 80% 100%, 15% 95%, 5% 70%, 18% 40%, 0% 15%)' }}
            />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/40 shadow-[0_0_20px_5px_rgba(255,255,255,0.6)] z-50
            animate-flicker" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-white/40 shadow-[0_0_20px_5px_rgba(255,255,255,0.6)] z-50
      animate-flicker" />
        </section>
    );
};