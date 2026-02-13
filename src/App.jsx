import React, { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import ProductForm from './components/ProductForm';
import SearchBar from './components/SearchBar';
import { productService } from './services/productService';
import './styles/App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchActive, setSearchActive] = useState(false);

  // Cargar productos al iniciar
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      alert('Error al cargar los productos. Asegúrate de que el servidor esté ejecutándose.');
    } finally {
      setLoading(false);
    }
  };

  // Crear producto
  const handleCreate = async (productData) => {
    try {
      await productService.createProduct(productData);
      await loadProducts();
      setShowForm(false);
      alert('¡Producto creado exitosamente!');
    } catch (error) {
      alert('Error al crear el producto');
    }
  };

  // Actualizar producto
  const handleUpdate = async (productData) => {
    try {
      await productService.updateProduct(editingProduct.id, productData);
      await loadProducts();
      setShowForm(false);
      setEditingProduct(null);
      alert('¡Producto actualizado exitosamente!');
    } catch (error) {
      alert('Error al actualizar el producto');
    }
  };

  // Eliminar producto
  const handleDelete = async (id) => {
    try {
      await productService.deleteProduct(id);
      await loadProducts();
      alert('¡Producto eliminado exitosamente!');
    } catch (error) {
      alert('Error al eliminar el producto');
    }
  };

  // Editar producto
  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  // Buscar productos
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setFilteredProducts(products);
      setSearchActive(false);
      return;
    }

    try {
      const results = await productService.searchProducts(query);
      setFilteredProducts(results);
      setSearchActive(true);
    } catch (error) {
      alert('Error al buscar productos');
    }
  };

  // Cancelar formulario
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  // Calcular estadísticas
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.quantity, 0);
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header__content">
          <h1 className="header__title">
            <span className="header__icon">🎮</span>
            PIXEL VAULT
            <span className="header__subtitle">GAME STORE</span>
          </h1>
          
          <div className="header__stats">
            <div className="stat">
              <span className="stat__value">{totalProducts}</span>
              <span className="stat__label">Juegos</span>
            </div>
            <div className="stat">
              <span className="stat__value">{totalStock}</span>
              <span className="stat__label">Stock Total</span>
            </div>
            <div className="stat">
              <span className="stat__value">{categories.length}</span>
              <span className="stat__label">Categorías</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        <div className="container">
          {/* Search and Add Section */}
          <div className="controls">
            <SearchBar onSearch={handleSearch} />
            <button 
              onClick={() => setShowForm(true)}
              className="btn-add"
            >
              <span className="btn-add__icon">+</span>
              AGREGAR JUEGO
            </button>
          </div>

          {/* Results Info */}
          {searchActive && (
            <div className="search-results">
              <p className="search-results__text">
                {filteredProducts.length} resultado(s) encontrado(s)
              </p>
            </div>
          )}

          {/* Product Grid */}
          {loading ? (
            <div className="loading">
              <div className="loading__spinner"></div>
              <p className="loading__text">Cargando juegos...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state__icon">🎯</div>
              <h2 className="empty-state__title">No hay juegos disponibles</h2>
              <p className="empty-state__text">
                {searchActive 
                  ? 'No se encontraron resultados. Intenta con otra búsqueda.'
                  : 'Comienza agregando tu primer juego al inventario.'}
              </p>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {/* Product List Section */}
          {!searchActive && products.length > 0 && (
            <section className="product-list-section">
              <h2 className="section-title">
                <span className="section-title__icon">📋</span>
                INVENTARIO COMPLETO
              </h2>
              <div className="product-table">
                <div className="product-table__header">
                  <div className="product-table__col">Juego</div>
                  <div className="product-table__col">Categoría</div>
                  <div className="product-table__col">Stock</div>
                  <div className="product-table__col">Descripción</div>
                </div>
                {products.map(product => (
                  <div key={product.id} className="product-table__row">
                    <div className="product-table__col product-table__name">
                      {product.name}
                    </div>
                    <div className="product-table__col">
                      <span className="badge">{product.category}</span>
                    </div>
                    <div className="product-table__col">
                      <span className={`stock-badge ${product.quantity < 10 ? 'stock-badge--low' : ''}`}>
                        {product.quantity} unidades
                      </span>
                    </div>
                    <div className="product-table__col product-table__desc">
                      {product.description}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSave={editingProduct ? handleUpdate : handleCreate}
          onCancel={handleCancelForm}
        />
      )}

      {/* Footer */}
      <footer className="footer">
        <p className="footer__text">
          © 2026 Pixel Vault Game Store - Tu tienda de videojuegos de confianza
        </p>
      </footer>
    </div>
  );
}

export default App;
