export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

import bagImg from '../assets/bag.jpg';
/*import hoodieImg from '../assets/hoodie.jpg';
import glassesImg from '../assets/glasses.jpg';*/
import bomberImg from '../assets/bomber.jpg';

export const products: Product[] = [
  { id: 1, name: "Bomber", price: 1700, image: bomberImg },
  { id: 2, name: "Bag", price: 1500, image: bagImg },
  /* { id: 3, name: "Hoodie", price: 1300, image: hoodieImg },
   { id: 4, name: "Glasses", price: 960, image: glassesImg },*/
];