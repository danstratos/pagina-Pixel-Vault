/**
 * Servicio de Reviews y Calificaciones
 * Maneja las opiniones y ratings de productos
 */

const API_URL = 'http://localhost:3001/api/products';

export const reviewService = {
  /**
   * Obtener reviews de un producto
   */
  async getReviews(productId) {
    try {
      const response = await fetch(`${API_URL}/${productId}/reviews`);
      
      if (!response.ok) throw new Error('Error al obtener reviews');
      
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  /**
   * Agregar review a un producto
   */
  async addReview(productId, userId, rating, comment) {
    try {
      const response = await fetch(`${API_URL}/${productId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, rating, comment }),
      });

      if (!response.ok) throw new Error('Error al agregar review');
      
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};
