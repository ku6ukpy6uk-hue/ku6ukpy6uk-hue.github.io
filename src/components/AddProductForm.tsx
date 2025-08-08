import { createSignal } from 'solid-js';
import { addProduct } from '../store';

export default function AddProductForm() {
  const [newProduct, setNewProduct] = createSignal({
    name: '',
    price: 0,
    description: '',
    image: 'https://via.placeholder.com/150',
    category: ''
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    addProduct(newProduct());
    setNewProduct({
      name: '',
      price: 0,
      description: '',
      image: 'https://via.placeholder.com/150',
      category: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} class="product-form">
      <h2>Добавить новый товар</h2>
      
      <label>
        Название товара:
        <input 
          type="text" 
          value={newProduct().name}
          onInput={(e) => setNewProduct({...newProduct(), name: e.currentTarget.value})}
          required
        />
      </label>
      
      <label>
        Цена (руб.):
        <input 
          type="number" 
          value={newProduct().price}
          onInput={(e) => setNewProduct({...newProduct(), price: Number(e.currentTarget.value)})}
          required
        />
      </label>
      
      <label>
        Описание:
        <textarea 
          value={newProduct().description}
          onInput={(e) => setNewProduct({...newProduct(), description: e.currentTarget.value})}
        />
      </label>
      
      <label>
        Категория:
        <input 
          type="text" 
          value={newProduct().category}
          onInput={(e) => setNewProduct({...newProduct(), category: e.currentTarget.value})}
          required
        />
      </label>
      
      <div class="form-actions">
        <button type="submit" class="btn">Добавить товар</button>
      </div>
    </form>
  );
}
