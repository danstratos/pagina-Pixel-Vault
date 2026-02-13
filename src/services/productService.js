/**
 * Servicio de Productos
 * 
 * Este archivo maneja todas las peticiones HTTP al backend (JSON Server).
 * Centraliza toda la lógica de comunicación con la API REST.
 * 
 * Endpoints disponibles:
 * - GET    /products      → Obtener todos los productos
 * - GET    /products/:id  → Obtener un producto específico
 * - POST   /products      → Crear un nuevo producto
 * - PUT    /products/:id  → Actualizar un producto
 * - DELETE /products/:id  → Eliminar un producto
 */

// URL base de la API (JSON Server corriendo en puerto 3001)
const API_URL = 'http://localhost:3001/products';

export const productService = {
  /**
   * Obtener todos los productos
   * Realiza una petición GET al endpoint /products
   * 
   * @returns {Promise<Array>} Array con todos los productos
   * @throws {Error} Si hay un error en la petición
   */
  async getAllProducts() {
    try {
      // fetch es la API nativa de JavaScript para hacer peticiones HTTP
      const response = await fetch(API_URL);
      
      // Verificar si la respuesta fue exitosa (status 200-299)
      if (!response.ok) throw new Error('Error al obtener productos');
      
      // Convertir la respuesta JSON a objeto JavaScript
      return await response.json();
    } catch (error) {
      // Mostrar error en consola para debugging
      console.error('Error:', error);
      throw error; // Re-lanzar el error para que lo maneje el componente
    }
  },

  /**
   * Obtener un producto por su ID
   * Realiza una petición GET al endpoint /products/:id
   * 
   * @param {string} id - ID del producto a buscar
   * @returns {Promise<Object>} Objeto con los datos del producto
   * @throws {Error} Si hay un error en la petición
   */
  async getProductById(id) {
    try {
      // Template literal para construir la URL con el ID
      const response = await fetch(`${API_URL}/${id}`);
      
      if (!response.ok) throw new Error('Error al obtener el producto');
      
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  /**
   * Crear un nuevo producto
   * Realiza una petición POST al endpoint /products
   * 
   * @param {Object} product - Objeto con los datos del producto a crear
   * @param {string} product.name - Nombre del producto
   * @param {string} product.description - Descripción del producto
   * @param {number} product.price - Precio del producto
   * @param {number} product.quantity - Cantidad en stock
   * @param {string} product.category - Categoría del producto
   * @param {string} product.image - URL de la imagen
   * @returns {Promise<Object>} Producto creado (incluye el ID generado)
   * @throws {Error} Si hay un error en la petición
   */
  async createProduct(product) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST', // Método HTTP para crear
        headers: {
          'Content-Type': 'application/json', // Indicar que enviamos JSON
        },
        body: JSON.stringify(product), // Convertir objeto a string JSON
      });
      
      if (!response.ok) throw new Error('Error al crear el producto');
      
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  /**
   * Actualizar un producto existente
   * Realiza una petición PUT al endpoint /products/:id
   * 
   * @param {string} id - ID del producto a actualizar
   * @param {Object} product - Objeto con los datos actualizados
   * @returns {Promise<Object>} Producto actualizado
   * @throws {Error} Si hay un error en la petición
   */
  async updateProduct(id, product) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT', // Método HTTP para actualizar
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      
      if (!response.ok) throw new Error('Error al actualizar el producto');
      
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  /**
   * Eliminar un producto
   * Realiza una petición DELETE al endpoint /products/:id
   * 
   * @param {string} id - ID del producto a eliminar
   * @returns {Promise<boolean>} true si se eliminó correctamente
   * @throws {Error} Si hay un error en la petición
   */
  async deleteProduct(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE', // Método HTTP para eliminar
      });
      
      if (!response.ok) throw new Error('Error al eliminar el producto');
      
      return true; // Retornar true si fue exitoso
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  /**
   * Buscar productos por nombre, descripción o categoría
   * 
   * Nota: Esta búsqueda se hace en el CLIENTE (frontend), no en el servidor.
   * Primero obtiene todos los productos y luego filtra localmente.
   * 
   * Para una búsqueda más eficiente en producción, se debería implementar
   * en el backend con parámetros de query: /products?q=término
   * 
   * @param {string} query - Término de búsqueda
   * @returns {Promise<Array>} Array con productos que coinciden
   * @throws {Error} Si hay un error en la petición
   */
  async searchProducts(query) {
    try {
      // Obtener todos los productos
      const products = await this.getAllProducts();
      
      // Convertir búsqueda a minúsculas para comparación case-insensitive
      const searchTerm = query.toLowerCase();
      
      // Filtrar productos que contengan el término de búsqueda
      return products.filter(product => 
        // Buscar en nombre
        product.name.toLowerCase().includes(searchTerm) ||
        // Buscar en descripción
        product.description.toLowerCase().includes(searchTerm) ||
        // Buscar en categoría
        product.category.toLowerCase().includes(searchTerm)
      );
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};
