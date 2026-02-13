import React, { useState, useEffect } from 'react';
import '../styles/ProductForm.css';

/**
 * Componente ProductForm
 * 
 * Formulario modal para crear o editar productos.
 * - Si recibe un producto como prop, es modo EDICIÓN (campos prellenados)
 * - Si NO recibe producto, es modo CREACIÓN (campos vacíos)
 * 
 * Props:
 * @param {Object|null} product - Producto a editar (null para crear nuevo)
 * @param {Function} onSave - Callback que se ejecuta al guardar
 * @param {Function} onCancel - Callback que se ejecuta al cancelar
 */
export default function ProductForm({ product, onSave, onCancel }) {
  
  // ==================== ESTADO DEL FORMULARIO ====================
  // Estado que almacena todos los valores del formulario
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    image: ''
  });

  // ==================== EFECTOS ====================
  /**
   * Cuando el componente recibe un producto (modo edición),
   * prellenar el formulario con los datos del producto
   */
  useEffect(() => {
    if (product) {
      setFormData(product); // Copiar todos los datos del producto al estado
    }
  }, [product]); // Se ejecuta cada vez que cambia 'product'

  // ==================== MANEJADORES DE EVENTOS ====================
  
  /**
   * Manejar cambios en cualquier campo del formulario
   * Esta función se usa para todos los inputs
   */
  const handleChange = (e) => {
    const { name, value } = e.target; // Extraer nombre y valor del input
    
    // Actualizar el estado de forma inmutable
    setFormData(prev => ({
      ...prev, // Mantener todos los valores anteriores
      [name]: value // Actualizar solo el campo que cambió
    }));
  };

  /**
   * Manejar el envío del formulario
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir recarga de página
    
    // ========== VALIDACIÓN BÁSICA ==========
    // Verificar que los campos obligatorios estén llenos
    if (!formData.name || !formData.description || !formData.price || 
        !formData.quantity || !formData.category) {
      alert('Por favor, completa todos los campos obligatorios');
      return; // Detener el envío
    }

    // ========== PREPARAR DATOS ==========
    // Convertir tipos de datos (price a número, quantity a entero)
    const productData = {
      ...formData,
      price: parseFloat(formData.price), // String → Number con decimales
      quantity: parseInt(formData.quantity) // String → Number entero
    };

    // Ejecutar callback de guardado (crear o actualizar)
    onSave(productData);
  };

  return (
    // ========== OVERLAY MODAL ==========
    // Fondo oscuro que cubre toda la pantalla
    <div className="product-form-overlay">
      {/* ========== FORMULARIO MODAL ========== */}
      <div className="product-form">
        
        {/* ========== HEADER DEL MODAL ========== */}
        <div className="product-form__header">
          {/* Título dinámico según si es edición o creación */}
          <h2 className="product-form__title">
            {product ? '⚡ ACTUALIZAR JUEGO' : '🎮 NUEVO JUEGO'}
          </h2>
          
          {/* Botón X para cerrar */}
          <button 
            className="product-form__close"
            onClick={onCancel}
          >
            ✕
          </button>
        </div>

        {/* ========== FORMULARIO ========== */}
        <form onSubmit={handleSubmit} className="product-form__form">
          
          {/* ========== CAMPO: NOMBRE ========== */}
          <div className="product-form__group">
            <label className="product-form__label">
              Nombre del Juego *
            </label>
            <input
              type="text"
              name="name" // Importante: coincide con la propiedad en formData
              value={formData.name}
              onChange={handleChange}
              className="product-form__input"
              placeholder="Ej: The Legend of Zelda"
              required // HTML5 validation
            />
          </div>

          {/* ========== CAMPO: DESCRIPCIÓN ========== */}
          <div className="product-form__group">
            <label className="product-form__label">
              Descripción *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="product-form__textarea"
              placeholder="Describe el juego..."
              rows="4"
              required
            />
          </div>

          {/* ========== FILA DE 2 COLUMNAS: PRECIO Y CANTIDAD ========== */}
          <div className="product-form__row">
            
            {/* CAMPO: PRECIO */}
            <div className="product-form__group">
              <label className="product-form__label">
                Precio ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="product-form__input"
                placeholder="59.99"
                step="0.01" // Permitir decimales
                min="0" // No permitir negativos
                required
              />
            </div>

            {/* CAMPO: CANTIDAD */}
            <div className="product-form__group">
              <label className="product-form__label">
                Cantidad *
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="product-form__input"
                placeholder="10"
                min="0"
                required
              />
            </div>
          </div>

          {/* ========== CAMPO: CATEGORÍA (SELECT) ========== */}
          <div className="product-form__group">
            <label className="product-form__label">
              Categoría *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="product-form__select"
              required
            >
              <option value="">Selecciona una categoría</option>
              <option value="Acción">Acción</option>
              <option value="Aventura">Aventura</option>
              <option value="RPG">RPG</option>
              <option value="Deportes">Deportes</option>
              <option value="Carreras">Carreras</option>
              <option value="Estrategia">Estrategia</option>
              <option value="Shooter">Shooter</option>
              <option value="Plataformas">Plataformas</option>
            </select>
          </div>

          {/* ========== CAMPO: URL DE IMAGEN (OPCIONAL) ========== */}
          <div className="product-form__group">
            <label className="product-form__label">
              URL de la Imagen
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="product-form__input"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          {/* ========== PREVIEW DE IMAGEN ========== */}
          {/* Solo se muestra si hay una URL de imagen */}
          {formData.image && (
            <div className="product-form__preview">
              <img 
                src={formData.image} 
                alt="Preview"
                className="product-form__preview-img"
              />
            </div>
          )}

          {/* ========== BOTONES DE ACCIÓN ========== */}
          <div className="product-form__actions">
            {/* Botón Cancelar */}
            <button 
              type="button" // No envía el formulario
              onClick={onCancel}
              className="product-form__btn product-form__btn--cancel"
            >
              CANCELAR
            </button>
            
            {/* Botón Guardar (dinámico según modo) */}
            <button 
              type="submit" // Envía el formulario
              className="product-form__btn product-form__btn--submit"
            >
              {product ? 'ACTUALIZAR' : 'CREAR'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
