import { createSignal, onMount } from 'solid-js';
import { Product, updateProduct } from '../store';

type Props = {
  product: Product;
  onCancel: () => void;
};

export default function EditProductForm(props: Props) {
  const [editedProduct, setEditedProduct] = createSignal({ ...props.product });

  onMount(() => {
    setEditedProduct({ ...props.product });
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    updateProduct(props.product.id, editedProduct());
    props.onCancel();
  };

  return (
    <form onSubmit={handleSubmit} class="product-form">
      <h2>Редактировать товар</h2>
      
      <label>
        Название товара:
        <input 
          type="text" 
          value={editedProduct().name}
          onInput={(e) => setEditedProduct({...editedProduct(), name: e.currentTarget.value})}
          required
        />
      </label>
      
      <label>
        Цена (руб.):
        <input 
          type="number" 
          value={editedProduct().price}
          onInput={(e) => setEditedProduct({...editedProduct(), price: Number(e.currentTarget.value)})}
          required
        />
      </label>
      
      <label>
        Описание:
        <textarea 
          value={editedProduct().description}
          onInput={(e) => setEditedProduct({...editedProduct(), description: e.currentTarget.value})}
        />
      </label>
      
      <label>
        Категория:
        <input 
          type="text" 
          value={editedProduct().category}
          onInput={(e) => setEditedProduct({...editedProduct(), category: e.currentTarget.value})}
          required
        />
      </label>
      
      <div class="form-actions">
        <button type="submit" class="btn">Сохранить</button>
        <button type="button" class="btn btn-secondary" onClick={props.onCancel}>Отмена</button>
      </div>
    </form>
  );
}
