import BalenciStore1 from '../assets/main7.jpg';
import { motion, type Variants } from 'framer-motion';

// Явно указываем тип Variants для контейнера
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

// Явно указываем тип Variants. Теперь массивы внутри transition не будут ругаться!
const itemVariants: Variants = {
  hidden: { 
    y: "100%", 
    textShadow: "0 0 0px rgba(255,255,255,0)",
    filter: "blur(10px)", // Добавляем блюр в начале
    opacity: 0
  },
  visible: {
    y: 0,
    filter: "blur(0px)", // Убираем блюр в конце
    opacity: 1,
    textShadow: [
      "0 0 10px rgba(255,255,255,0.2)",
      "0 0 20px rgba(255,255,255,0.5)",
      "0 0 40px rgba(255,255,255,1)",   // Пик вспышки
      "0 0 0px rgba(255,255,255,0)"    // Резкое отрубание
    ],
    transition: {
      y: {
        duration: 1.2,
        ease: [0.215, 0.610, 0.355, 1.000],
      },
      // Увеличиваем длительность для textShadow, чтобы свечение жило дольше
      textShadow: {
        duration: 3.5, // 2.5с (фон) + 1с (твое пожелание)
        times: [0, 0.2, 0.4, 1], // Вспышка произойдет в первой половине, остальное время затухание
        ease: "linear"
      },
      filter: { duration: 1.2, ease: "easeOut" } // Блюр уходит вместе с движением
    },
  },
};

export const Hero = () => {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      
      {/* СЛОЙ 1: Задний фон с наездом камеры и остаточным блюром */}
      <motion.div
        initial={{ scale: 1.25, filter: "blur(12px)", opacity: 0 }}
        animate={{ scale: 1, filter: "blur(1px)", opacity: 0.55 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BalenciStore1})` }}
      />

      {/* Затемняющая подложка поверх фона */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* СЛОЙ 2: Текст поверх фона */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center"
      >
        
        {/* Обертка-маска */}
        <div className="overflow-hidden py-4 px-10">
          <motion.h1
            variants={itemVariants}
            className="font-syne text-7xl md:text-9xl font-black uppercase tracking-tighter text-white animate-headlights cursor-default"
          >
            Fall 2026
          </motion.h1>
        </div>

      </motion.div>
    </section>
  );
};