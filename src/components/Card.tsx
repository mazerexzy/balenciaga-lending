import type { Product } from '../data/product'; // Импорт интерфейса с продуктами

interface CardProps {
    product: Product; // Пропс для передачи данных продукта
}
export const Card = ({ product }: CardProps) => {
    return (
        <div className="card">
            <img src={product.image} alt={product.image} /> {/* Изображение продукта */}
            <h3>{product.name}</h3>
            <p>{product.price} $</p>
        </div>
    );
};