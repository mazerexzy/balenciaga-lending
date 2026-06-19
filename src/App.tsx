import { Header } from './components/Header'; // Импорт компонента навигации
import { Hero } from './components/Hero'; // Импорт компонента героя
import { PromoSection } from './components/Promo';
import { ReactLenis } from 'lenis/react';
import './styles/index.css';
import { FeatureSection } from './components/FeatureSection';
import { ShopSlider } from './components/ShopSlider';
import { useState } from 'react';
import { ScrollCounter } from './components/ScrollCounter';


function App() {
  const [isBarrierActive, setIsBarrierActive] = useState(true);


  return (
    <ReactLenis root options={{
      duration: 1.7,   // Время доезда (секунды)
      lerp: 0.07,      // Скорость торможения (чем меньше, тем маслянистее "занос")
      smoothWheel: true
    }}>
      <div className="bg-black min-h-screen text-white">
        <Header />
        <Hero />
        <PromoSection />
        {/* Передаем состояние и сеттер */}
        <FeatureSection
          isBarrierActive={isBarrierActive}
          setIsBarrierActive={setIsBarrierActive}
        />

        <ShopSlider />
        <ScrollCounter />


      </div>
    </ReactLenis>
  );
}


export default App