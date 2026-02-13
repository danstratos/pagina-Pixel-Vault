import React, { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import ProductForm from './components/ProductForm';
import SearchBar from './components/SearchBar';
import { productService } from './services/productService';
import './styles/App.css';

function App() {
  // ==================== ESTADOS ====================
  // Estado para almacenar todos los productos de la base de datos
  const [products, setProducts] = useState([]);
  
  // Estado para almacenar los productos filtrados por búsqueda
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Estado para mostrar/ocultar el spinner de carga
  const [loading, setLoading] = useState(true);
  
  // Estado para controlar la visibilidad del formulario modal
  const [showForm, setShowForm] = useState(false);
  
  // Estado para almacenar el producto que se está editando (null si es creación)
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Estado para saber si hay una búsqueda activa
  const [searchActive, setSearchActive] = useState(false);

  // ==================== EFECTOS ====================
  // useEffect se ejecuta cuando el componente se monta (carga inicial)
  useEffect(() => {
    loadProducts(); // Cargar productos al iniciar la aplicación
  }, []); // Array vacío [] significa "solo ejecutar una vez al montar"

  // ==================== FUNCIONES DE CRUD ====================
  
  /**
   * Cargar todos los productos desde el backend
   */
  const loadProducts = async () => {
    try {
      setLoading(true); // Mostrar spinner de carga
      const data = await productService.getAllProducts(); // Petición GET al backend
      setProducts(data); // Guardar productos en el estado
      setFilteredProducts(data); // Inicialmente, productos filtrados = todos los productos
    } catch (error) {
      // Si hay error (ej: servidor no está corriendo), mostrar alerta
      alert('Error al cargar los productos. Asegúrate de que el servidor esté ejecutándose.');
    } finally {
      setLoading(false); // Ocultar spinner independientemente del resultado
    }
  };

  /**
   * Crear un nuevo producto
   * @param {Object} productData - Datos del producto a crear
   */
  const handleCreate = async (productData) => {
    try {
      await productService.createProduct(productData); // Petición POST al backend
      await loadProducts(); // Recargar la lista de productos
      setShowForm(false); // Cerrar el formulario modal
      alert('¡Producto creado exitosamente!');
    } catch (error) {
      alert('Error al crear el producto');
    }
  };

  /**
   * Actualizar un producto existente
   * @param {Object} productData - Datos actualizados del producto
   */
  const handleUpdate = async (productData) => {
    try {
      // Petición PUT al backend con el ID del producto a actualizar
      await productService.updateProduct(editingProduct.id, productData);
      await loadProducts(); // Recargar la lista
      setShowForm(false); // Cerrar formulario
      setEditingProduct(null); // Limpiar el producto en edición
      alert('¡Producto actualizado exitosamente!');
    } catch (error) {
      alert('Error al actualizar el producto');
    }
  };

  /**
   * Eliminar un producto
   * @param {string} id - ID del producto a eliminar
   */
  const handleDelete = async (id) => {
    try {
      await productService.deleteProduct(id); // Petición DELETE al backend
      await loadProducts(); // Recargar la lista
      alert('¡Producto eliminado exitosamente!');
    } catch (error) {
      alert('Error al eliminar el producto');
    }
  };

  /**
   * Preparar el formulario para editar un producto
   * @param {Object} product - Producto a editar
   */
  const handleEdit = (product) => {
    setEditingProduct(product); // Guardar el producto en el estado
    setShowForm(true); // Mostrar el formulario modal
  };

  /**
   * Buscar productos por nombre, descripción o categoría
   * @param {string} query - Término de búsqueda
   */
  const handleSearch = async (query) => {
    // Si la búsqueda está vacía, mostrar todos los productos
    if (!query.trim()) {
      setFilteredProducts(products);
      setSearchActive(false);
      return;
    }

    try {
      // Realizar búsqueda en el servicio
      const results = await productService.searchProducts(query);
      setFilteredProducts(results); // Actualizar productos filtrados
      setSearchActive(true); // Marcar que hay una búsqueda activa
    } catch (error) {
      alert('Error al buscar productos');
    }
  };

  /**
   * Cancelar el formulario (crear o editar)
   */
  const handleCancelForm = () => {
    setShowForm(false); // Ocultar formulario
    setEditingProduct(null); // Limpiar producto en edición
  };

  // ==================== CÁLCULOS DE ESTADÍSTICAS ====================
  // Total de productos en el inventario
  const totalProducts = products.length;
  
  // Suma total de todas las cantidades en stock
  const totalStock = products.reduce((sum, p) => sum + p.quantity, 0);
  
  // Extraer categorías únicas usando Set (elimina duplicados)
  const categories = [...new Set(products.map(p => p.category))];

  // ==================== RENDERIZADO ====================
  return (
    <div className="app">
      {/* ========== HEADER ========== */}
      <header className="header">
        <div className="header__content">
          {/* Título principal con icono y subtítulo */}
          <h1 className="header__title">
            <span className="header__icon">🎮</span>
            PIXEL VAULT
            <span className="header__subtitle">GAME STORE</span>
          </h1>
          
          {/* Estadísticas en tiempo real */}
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

      {/* ========== CONTENIDO PRINCIPAL ========== */}
      <main className="main">
        <div className="container">
          {/* ========== CONTROLES (Búsqueda + Agregar) ========== */}
          <div className="controls">
            {/* Componente de búsqueda */}
            <SearchBar onSearch={handleSearch} />
            
            {/* Botón para abrir el formulario de crear producto */}
            <button 
              onClick={() => setShowForm(true)}
              className="btn-add"
            >
              <span className="btn-add__icon">+</span>
              AGREGAR JUEGO
            </button>
          </div>

          {/* ========== INFORMACIÓN DE RESULTADOS DE BÚSQUEDA ========== */}
          {searchActive && (
            <div className="search-results">
              <p className="search-results__text">
                {filteredProducts.length} resultado(s) encontrado(s)
              </p>
            </div>
          )}

          {/* ========== GRID DE PRODUCTOS ========== */}
          {loading ? (
            // Mostrar spinner mientras se cargan los productos
            <div className="loading">
              <div className="loading__spinner"></div>
              <p className="loading__text">Cargando juegos...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            // Mostrar mensaje si no hay productos
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
            // Mostrar grid de productos
            <div className="product-grid">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id} // Key único para React
                  product={product} // Pasar datos del producto
                  onEdit={handleEdit} // Callback para editar
                  onDelete={handleDelete} // Callback para eliminar
                />
              ))}
            </div>
          )}

          {/* ========== TABLA DE INVENTARIO COMPLETO ========== */}
          {/* Solo se muestra si NO hay búsqueda activa y HAY productos */}
          {!searchActive && products.length > 0 && (
            <section className="product-list-section">
              <h2 className="section-title">
                <span className="section-title__icon">📋</span>
                INVENTARIO COMPLETO
              </h2>
              <div className="product-table">
                {/* Encabezado de la tabla */}
                <div className="product-table__header">
                  <div className="product-table__col">Juego</div>
                  <div className="product-table__col">Categoría</div>
                  <div className="product-table__col">Stock</div>
                  <div className="product-table__col">Descripción</div>
                </div>
                {/* Filas de la tabla */}
                {products.map(product => (
                  <div key={product.id} className="product-table__row">
                    <div className="product-table__col product-table__name">
                      {product.name}
                    </div>
                    <div className="product-table__col">
                      <span className="badge">{product.category}</span>
                    </div>
                    <div className="product-table__col">
                      {/* Cambiar estilo si el stock es bajo (< 10) */}
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

      {/* ========== MODAL DE FORMULARIO ========== */}
      {/* Solo se muestra si showForm es true */}
      {showForm && (
        <ProductForm
          product={editingProduct} // null = crear, objeto = editar
          onSave={editingProduct ? handleUpdate : handleCreate} // Función según el modo
          onCancel={handleCancelForm} // Función para cerrar
        />
      )}

      {/* ========== FOOTER ========== */}
      <footer className="footer">
        <p className="footer__text">
          © 2026 Pixel Vault Game Store - Tu tienda de videojuegos de confianza
        </p>
      </footer>
    </div>
  );
}

export default App;
