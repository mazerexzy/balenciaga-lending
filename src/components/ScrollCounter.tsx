import { useLenis } from 'lenis/react';
import { useEffect, useState } from 'react';

export const ScrollCounter = () => {
  const [progress, setProgress] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Lenis передает объект с параметром progress (от 0 до 1)
    const onScroll = ({ progress }: { progress: number }) => {
      // Превращаем 0.53 в 53
      setProgress(Math.round(progress * 100));
    };

    lenis.on('scroll', onScroll);
    return () => lenis.off('scroll', onScroll);
  }, [lenis]);

  return (
    <div className="fixed bottom-6 left-6 z-[100] text-white/50 font-eater text-xs uppercase tracking-[0.2em] pointer-events-none">
      Scroll {progress}%
    </div>
  );
};