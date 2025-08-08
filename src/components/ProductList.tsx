import { For } from 'solid-js';
import { Product, deleteProduct } from '../store';

type Props = {
  products: Product[];
  onEdit?: (product: Product) => void;
  isAdmin: boolean;
};

export default function ProductList(props: Props) {
  return (
    <div class="product-grid">
      <For each={props.products}>
        {(product) => (
          <div class="product-card">
            <img src={product.image} alt={product.name} />
            <div class="product-info">
              <h3>{product.name}</h3>
              <p class="price">{product.price.toLocaleString()} руб.</p>
              <p>{product.description}</p>
              <div class="category-badge">{product.category}</div>
            </div>
            
            <Show when={props.isAdmin && props.onEdit}>
              <div class="product-actions">
                <button class="btn" onClick={() => props.onEdit?.(product)}>
                  Изменить
                </button>
                <button 
                  class="btn btn-danger" 
                  onClick={() => deleteProduct(product.id)}
                >
                  Удалить
                </button>
              </div>
            </Show>
          </div>
        )}
      </For>
    </div>
  );
}
