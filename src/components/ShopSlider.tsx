import { products } from '../data/product';
import { ShopItem } from './ShopItem';
import { BomberSlide } from './shop/BomberSlide';
import { BagSlide } from './shop/BagSlide';

export const ShopSlider = () => {
    return (
        // УБРАЛИ: h-screen, overflow-y-scroll, snap-y, snap-mandatory, data-lenis-prevent
        // Теперь это просто длинный контейнер (flex-col), который тянется вниз по мере добавления товаров
        <div id="shop-section" className="relative w-full flex flex-col bg-black">
            {products.map((product) => {
                if (product.id === 1) {
                    return <BomberSlide key={product.id} product={product} />;
                } else if (product.id === 2) {
                    return <BagSlide key={product.id} product={product} />;
                }

                return <ShopItem key={product.id} product={product} />;
            })}
        </div>
    );
};