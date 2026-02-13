import React, { useState, useEffect } from 'react';
import '../styles/ProductForm.css';

export default function ProductForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.name || !formData.description || !formData.price || 
        !formData.quantity || !formData.category) {
      alert('Por favor, completa todos los campos obligatorios');
      return;
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity)
    };

    onSave(productData);
  };

  return (
    <div className="product-form-overlay">
      <div className="product-form">
        <div className="product-form__header">
          <h2 className="product-form__title">
            {product ? '⚡ ACTUALIZAR JUEGO' : '🎮 NUEVO JUEGO'}
          </h2>
          <button 
            className="product-form__close"
            onClick={onCancel}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="product-form__form">
          <div className="product-form__group">
            <label className="product-form__label">
              Nombre del Juego *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="product-form__input"
              placeholder="Ej: The Legend of Zelda"
              required
            />
          </div>

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

          <div className="product-form__row">
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
                step="0.01"
                min="0"
                required
              />
            </div>

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

          {formData.image && (
            <div className="product-form__preview">
              <img 
                src={formData.image} 
                alt="Preview"
                className="product-form__preview-img"
              />
            </div>
          )}

          <div className="product-form__actions">
            <button 
              type="button"
              onClick={onCancel}
              className="product-form__btn product-form__btn--cancel"
            >
              CANCELAR
            </button>
            <button 
              type="submit"
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
