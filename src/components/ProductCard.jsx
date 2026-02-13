import React from 'react';
import '../styles/ProductCard.css';

export default function ProductCard({ product, onEdit, onDelete }) {
  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de eliminar "${product.name}"?`)) {
      onDelete(product.id);
    }
  };

  return (
    <div className="product-card">
      <div className="product-card__ribbon">
        <span className="product-card__category">{product.category}</span>
      </div>
      
      <div className="product-card__image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-card__image"
        />
        <div className="product-card__overlay">
          <button 
            className="product-card__btn product-card__btn--edit"
            onClick={() => onEdit(product)}
          >
            ✎ EDITAR
          </button>
          <button 
            className="product-card__btn product-card__btn--delete"
            onClick={handleDelete}
          >
            ✕ ELIMINAR
          </button>
        </div>
      </div>

      <div className="product-card__content">
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        
        <div className="product-card__footer">
          <div className="product-card__price-tag">
            <span className="product-card__price">${product.price}</span>
          </div>
          <div className="product-card__stock">
            <span className="product-card__stock-label">Stock:</span>
            <span className="product-card__stock-value">{product.quantity}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
