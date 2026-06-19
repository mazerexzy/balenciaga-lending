import { useState, useEffect } from 'react';

import logo from '../assets/logo.png'; // импорт логотипа из папки assets
import { SocialLinks } from './SocialLinks';

export const Header = () => {

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Функция очистки (вызовется, когда компонент исчезнет)
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
    // 1. Меняем flex на grid
    // 2. grid-cols-3 делит шапку на 3 равные части
    // 3. items-center центрирует всё по вертикали
    <header className={`fixed top-0 w-full z-50 grid grid-cols-3 items-center px-12 py-0.5 transition-all duration-300 rounded-md ${isScrolled ? 'bg-white/15 backdrop-blur-md' : 'bg-transparent'}`}>
      
      {/* Левая колонка: Логотип */}
      <a href="/" className="justify-self-start">
        <img src={logo} alt="Balenciaga Logo" className="w-16 h-auto opacity-40 transition-all duration-500 hover:grayscale-0 hover:scale-125 hover:-rotate-12 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]
        hover:opacity-100" />
      </a>
      
      {/* Центральная колонка: Соцсети (абсолютный центр) */}
      <nav className="justify-self-center">
        <SocialLinks />
      </nav>

      {/* Правая колонка: Пустой div для симметрии (чтобы центр был ровно посередине) */}
      <div className="justify-self-end">
        {/* Сюда можно добавить, например, кнопку корзины потом */}
      </div>
    </header>
  );
};