import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface RevealTextProps {
  text: string;
  className?: string;
}

interface CharacterProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  fontClass?: string;
}

const Character: React.FC<CharacterProps> = ({ children, progress, range, fontClass = "" }) => {
  // Убираем нижний порог 0.1, ставим 0, чтобы буква была полностью невидимой в начале
  const opacity = useTransform(progress, range, [0.1, 1], { clamp: true });

  return (
    <motion.span style={{ opacity }} className={`inline-block ${fontClass}`}>
      {children}
    </motion.span>
  );
};

export const RevealText: React.FC<RevealTextProps> = ({ text, className = "" }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Начинаем анимацию раньше (0.8), заканчиваем позже (0)
    offset: ["start 0.7", "end 0.7"], 
  });

  // Уменьшаем damping, чтобы анимация была менее "вязкой" и быстрее доходила до 1
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100, 
    damping: 40,    
    restDelta: 0.001
  });

  const fontClass = className.includes('font-eater') 
    ? 'font-eater' 
    : className.includes('font-rubik') 
      ? 'font-rubik' 
      : '';

  const words = text.split(" ");
  const totalLetters = words.join("").length;
  let globalIndex = 0;

  return (
    <p ref={containerRef} className={`${className} flex flex-wrap leading-relaxed`}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap mr-3">
          {word.split("").map((char, charIdx) => {
            const start = globalIndex / totalLetters;
            const end = globalIndex === totalLetters - 1 ? 1 : (globalIndex + 1) / totalLetters;
            globalIndex++; 

            return (
              <Character 
                key={`${wordIdx}-${charIdx}`} 
                progress={smoothProgress} 
                range={[start, end]}
                fontClass={fontClass}
              >
                {char}
              </Character>
            );
          })}
        </span>
      ))}
    </p>
  );
};

export default RevealText;