import { createSignal, Show, onMount } from 'solid-js';
import { Product, products } from './store';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import EditProductForm from './components/EditProductForm';
import DataManager from './components/DataManager';

const ADMIN_PASSWORD = "chemAdmin123"; // Пароль для админ-панели

export default function App() {
  const [showAddForm, setShowAddForm] = createSignal(false);
  const [editingProduct, setEditingProduct] = createSignal<Product | null>(null);
  const [isAdmin, setIsAdmin] = createSignal(false);
  const [password, setPassword] = createSignal('');
  const [loginError, setLoginError] = createSignal('');
  const [showAdminBtn, setShowAdminBtn] = createSignal(false);

  // Проверяем сохраненную сессию при загрузке
  onMount(() => {
    const savedSession = localStorage.getItem('adminSession');
    if (savedSession === ADMIN_PASSWORD) {
      setIsAdmin(true);
    }
    
    // Показываем кнопку админа через 5 сек
    setTimeout(() => setShowAdminBtn(true), 5000);
  });

  // Обработка входа в админ-панель
  const handleLogin = (e: Event) => {
    e.preventDefault();
    if (password() === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setLoginError('');
      localStorage.setItem('adminSession', ADMIN_PASSWORD);
    } else {
      setLoginError('Неверный пароль!');
    }
    setPassword('');
  };

  // Выход из админ-режима
  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('adminSession');
  };

  return (
    <div class="container">
      <header>
        <h1>Магазин бытовой химии</h1>
        
        <Show when={isAdmin()}>
          <div class="admin-controls">
            <button class="btn" onClick={() => setShowAddForm(true)}>
              + Добавить товар
            </button>
            <button class="btn btn-secondary" onClick={handleLogout}>
              Выйти
            </button>
          </div>
        </Show>
      </header>

      <Show when={showAdminBtn() && !isAdmin()}>
        <div class="admin-btn-container">
          <button 
            class="admin-entry-btn"
            onClick={() => {
              setShowAdminBtn(false);
              setTimeout(() => setShowAdminBtn(true), 30000);
            }}
          >
            Админ-вход
          </button>
        </div>
      </Show>

      <Show when={!isAdmin() && !showAdminBtn()}>
        <div class="admin-login">
          <h2>Вход для администратора</h2>
          <form onSubmit={handleLogin}>
            <label>
              Введите пароль:
              <input 
                type="password" 
                value={password()}
                onInput={(e) => setPassword(e.currentTarget.value)}
                required
              />
            </label>
            <div class="form-actions">
              <button type="submit" class="btn">Войти</button>
              <button 
                type="button" 
                class="btn btn-secondary"
                onClick={() => setShowAdminBtn(true)}
              >
                Отмена
              </button>
            </div>
            <Show when={loginError()}>
              <p class="error">{loginError()}</p>
            </Show>
          </form>
        </div>
      </Show>

      <Show when={isAdmin()}>
        <Show when={showAddForm()}>
          <AddProductForm />
          <button class="btn btn-secondary" onClick={() => setShowAddForm(false)}>
            Закрыть
          </button>
        </Show>

        <Show when={editingProduct()}>
          <EditProductForm 
            product={editingProduct()!} 
            onCancel={() => setEditingProduct(null)} 
          />
        </Show>

        <Show when={!showAddForm() && !editingProduct()}>
          <DataManager />
        </Show>
      </Show>

      <div class="product-view">
        <h2>Наши товары</h2>
        <ProductList 
          products={products} 
          onEdit={isAdmin() ? (product) => setEditingProduct(product) : undefined} 
          isAdmin={isAdmin()}
        />
      </div>
    </div>
  );
}
