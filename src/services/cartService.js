/**
 * Servicio de Carrito de Compras
 * Maneja operaciones del carrito de cada usuario
 */

const API_URL = 'http://localhost:3001/api/cart';

export const cartService = {
  /**
   * Obtener carrito del usuario
   */
  async getCart(userId) {
    try {
      const response = await fetch(`${API_URL}/${userId}`);
      
      if (!response.ok) throw new Error('Error al obtener carrito');
      
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  /**
   * Agregar producto al carrito
   */
  async addToCart(userId, productId, quantity = 1) {
    try {
      const response = await fetch(`${API_URL}/${userId}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) throw new Error('Error al agregar al carrito');
      
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  /**
   * Eliminar producto del carrito
   */
  async removeFromCart(userId, productId) {
    try {
      const response = await fetch(`${API_URL}/${userId}/remove/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error al eliminar del carrito');
      
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  /**
   * Obtener total del carrito
   */
  async getCartTotal(userId, products) {
    try {
      const cart = await this.getCart(userId);
      
      let total = 0;
      cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (product) {
          total += product.price * item.quantity;
        }
      });
      
      return total;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};
