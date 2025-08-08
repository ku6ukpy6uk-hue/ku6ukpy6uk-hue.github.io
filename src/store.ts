import { createStore } from 'solid-js/store';

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

// Начальные товары для магазина бытовой химии
export const [products, setProducts] = createStore<Product[]>([
  {
    id: 1,
    name: "Средство для мытья посуды",
    price: 249,
    description: "Экологичное средство с ароматом лимона, 500 мл",
    image: "https://via.placeholder.com/150/4facfe/ffffff?text=Dish+Soap",
    category: "Кухня"
  },
  {
    id: 2,
    name: "Стиральный порошок",
    price: 799,
    description: "Для цветного белья, 3 кг",
    image: "https://via.placeholder.com/150/00f2fe/ffffff?text=Detergent",
    category: "Стирка"
  },
  {
    id: 3,
    name: "Чистящее средство для сантехники",
    price: 349,
    description: "Удаляет известковый налёт и ржавчину",
    image: "https://via.placeholder.com/150/2af598/ffffff?text=Cleaner",
    category: "Ванная"
  }
]);

export const addProduct = (product: Omit<Product, 'id'>) => {
  setProducts(products => [
    ...products, 
    {
      ...product,
      id: Math.max(0, ...products.map(p => p.id)) + 1
    }
  ]);
};

export const updateProduct = (id: number, updates: Partial<Product>) => {
  setProducts(
    p => p.id === id,
    (prev) => ({ ...prev, ...updates })
  );
};

export const deleteProduct = (id: number) => {
  setProducts(products.filter(p => p.id !== id));
};
