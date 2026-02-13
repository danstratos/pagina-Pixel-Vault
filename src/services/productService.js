const API_URL = 'http://localhost:3001/products';

export const productService = {
  // Obtener todos los productos
  async getAllProducts() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error al obtener productos');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // Obtener un producto por ID
  async getProductById(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error('Error al obtener el producto');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // Crear un nuevo producto
  async createProduct(product) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error('Error al crear el producto');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // Actualizar un producto
  async updateProduct(id, product) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
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

  // Eliminar un producto
  async deleteProduct(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar el producto');
      return true;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // Buscar productos
  async searchProducts(query) {
    try {
      const products = await this.getAllProducts();
      const searchTerm = query.toLowerCase();
      
      return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};
