import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { cartService } from '../services/cartService';
import { productService } from '../services/productService';
import '../styles/Cart.css';

export default function Cart() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadCart();
  }, [user, navigate]);

  const loadCart = async () => {
    try {
      const [cartData, productsData] = await Promise.all([
        cartService.getCart(user.id),
        productService.getAllProducts()
      ]);
      setCart(cartData);
      setProducts(productsData);
    } catch (error) {
      console.error('Error al cargar carrito:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await cartService.removeFromCart(user.id, productId);
      await loadCart();
    } catch (error) {
      alert('Error al eliminar del carrito');
    }
  };

  const getCartItems = () => {
    return cart.map(item => {
      const product = products.find(p => p.id === item.productId);
      return { ...item, product };
    }).filter(item => item.product);
  };

  const getTotal = () => {
    return getCartItems().reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
  };

  if (loading) {
    return <div className="loading">Cargando carrito...</div>;
  }

  const cartItems = getCartItems();

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-title">
          <span className="cart-icon">🛒</span>
          MI CARRITO
        </h1>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty__icon">🎮</div>
            <h2>Tu carrito está vacío</h2>
            <p>¡Agrega algunos juegos increíbles!</p>
            <button onClick={() => navigate('/store')} className="cart-empty__btn">
              IR A LA TIENDA
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.productId} className="cart-item">
                  <img src={item.product.image} alt={item.product.name} className="cart-item__image" />
                  <div className="cart-item__info">
                    <h3 className="cart-item__name">{item.product.name}</h3>
                    <p className="cart-item__category">{item.product.category}</p>
                  </div>
                  <div className="cart-item__quantity">
                    <span>Cantidad: {item.quantity}</span>
                  </div>
                  <div className="cart-item__price">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="cart-item__remove"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3 className="cart-summary__title">Resumen del Pedido</h3>
              <div className="cart-summary__row">
                <span>Subtotal:</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              <div className="cart-summary__row">
                <span>Envío:</span>
                <span>Gratis</span>
              </div>
              <div className="cart-summary__total">
                <span>Total:</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              <button className="cart-summary__btn">
                PROCEDER AL PAGO
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
