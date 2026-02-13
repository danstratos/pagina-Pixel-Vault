import React from 'react';
import '../styles/ProductCard.css';

/**
 * Componente ProductCard
 * 
 * Muestra una tarjeta individual de producto con:
 * - Imagen del juego
 * - Nombre y descripción
 * - Precio y cantidad en stock
 * - Categoría (ribbon en la esquina)
 * - Botones de Editar y Eliminar (aparecen en hover)
 * 
 * Props:
 * @param {Object} product - Objeto con los datos del producto
 * @param {Function} onEdit - Callback que se ejecuta al hacer click en Editar
 * @param {Function} onDelete - Callback que se ejecuta al hacer click en Eliminar
 */
export default function ProductCard({ product, onEdit, onDelete }) {
  
  /**
   * Manejar la eliminación del producto
   * Muestra una confirmación antes de ejecutar la eliminación
   */
  const handleDelete = () => {
    // window.confirm muestra un cuadro de confirmación
    if (window.confirm(`¿Estás seguro de eliminar "${product.name}"?`)) {
      onDelete(product.id); // Ejecutar callback de eliminación
    }
  };

  return (
    <div className="product-card">
      {/* ========== RIBBON DE CATEGORÍA ========== */}
      {/* Cinta diagonal en la esquina superior derecha */}
      <div className="product-card__ribbon">
        <span className="product-card__category">{product.category}</span>
      </div>
      
      {/* ========== CONTENEDOR DE IMAGEN ========== */}
      <div className="product-card__image-container">
        {/* Imagen del producto */}
        <img 
          src={product.image} 
          alt={product.name}
          className="product-card__image"
        />
        
        {/* ========== OVERLAY CON BOTONES ========== */}
        {/* Este overlay aparece cuando haces hover sobre la tarjeta */}
        <div className="product-card__overlay">
          {/* Botón de Editar */}
          <button 
            className="product-card__btn product-card__btn--edit"
            onClick={() => onEdit(product)} // Pasar el producto completo
          >
            ✎ EDITAR
          </button>
          
          {/* Botón de Eliminar */}
          <button 
            className="product-card__btn product-card__btn--delete"
            onClick={handleDelete} // Llama a handleDelete que pide confirmación
          >
            ✕ ELIMINAR
          </button>
        </div>
      </div>

      {/* ========== CONTENIDO DE LA TARJETA ========== */}
      <div className="product-card__content">
        {/* Nombre del juego */}
        <h3 className="product-card__title">{product.name}</h3>
        
        {/* Descripción del juego */}
        <p className="product-card__description">{product.description}</p>
        
        {/* ========== FOOTER CON PRECIO Y STOCK ========== */}
        <div className="product-card__footer">
          {/* Etiqueta de precio con efecto neón */}
          <div className="product-card__price-tag">
            <span className="product-card__price">${product.price}</span>
          </div>
          
          {/* Información de stock */}
          <div className="product-card__stock">
            <span className="product-card__stock-label">Stock:</span>
            <span className="product-card__stock-value">{product.quantity}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
