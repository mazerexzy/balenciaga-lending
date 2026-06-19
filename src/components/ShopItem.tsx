import type { Product } from '../data/product';

interface ShopItemProps {
  product: Product;
}

export const ShopItem = ({ product }: ShopItemProps) => {
  return (
    <section className="w-full min-h-screen flex flex-shrink-0 bg-zinc-900 text-white snap-section">
      <div className="w-1/2 flex flex-col justify-center px-16 relative">
        <h2 className="text-6xl font-syne uppercase mb-6">{product.name}</h2>
        <p className="text-3xl text-gray-400">{product.price} $</p>
      </div>
      <div 
        className="w-1/2 h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${product.image})` }}
      />
    </section>
  );
};