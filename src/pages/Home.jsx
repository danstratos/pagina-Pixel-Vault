import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/productService';
import '../styles/Home.css';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const products = await productService.getAllProducts();
      // Tomar los 3 productos con mejor rating
      const featured = products
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 3);
      setFeaturedProducts(featured);
    } catch (error) {
      console.error('Error al cargar productos destacados:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* ========== HERO SECTION ========== */}
      <section className="hero">
        <div className="hero__content">
          <div className="hero__text">
            <h1 className="hero__title">
              <span className="hero__title-small">Bienvenido a</span>
              <span className="hero__title-large">PIXEL VAULT</span>
              <span className="hero__title-tagline">Tu destino gaming definitivo</span>
            </h1>
            <p className="hero__description">
              Descubre los mejores videojuegos de todas las plataformas. 
              Desde clásicos nostálgicos hasta los últimos lanzamientos AAA.
              ¡Tu próxima aventura épica comienza aquí!
            </p>
            <div className="hero__cta">
              <Link to="/store" className="hero__btn hero__btn--primary">
                <span className="hero__btn-icon">🎮</span>
                EXPLORAR TIENDA
              </Link>
              <Link to="/about" className="hero__btn hero__btn--secondary">
                SABER MÁS
              </Link>
            </div>
          </div>
          <div className="hero__image">
            <div className="hero__image-glow"></div>
            <div className="hero__image-content">
              <span className="hero__image-icon">🎮</span>
            </div>
          </div>
        </div>
        
        {/* Decoraciones animadas */}
        <div className="hero__decoration hero__decoration--1"></div>
        <div className="hero__decoration hero__decoration--2"></div>
        <div className="hero__decoration hero__decoration--3"></div>
      </section>

      {/* ========== PRODUCTOS DESTACADOS ========== */}
      <section className="featured">
        <div className="container">
          <h2 className="section__title">
            <span className="section__title-icon">⭐</span>
            JUEGOS DESTACADOS
          </h2>
          
          {loading ? (
            <div className="loading">
              <div className="loading__spinner"></div>
              <p>Cargando productos destacados...</p>
            </div>
          ) : (
            <div className="featured__grid">
              {featuredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="featured__card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="featured__card-image">
                    <img src={product.image} alt={product.name} />
                    <div className="featured__card-badge">
                      ⭐ {product.rating || 'N/A'}
                    </div>
                  </div>
                  <div className="featured__card-content">
                    <h3 className="featured__card-title">{product.name}</h3>
                    <p className="featured__card-category">{product.category}</p>
                    <p className="featured__card-description">{product.description}</p>
                    <div className="featured__card-footer">
                      <span className="featured__card-price">${product.price}</span>
                      <Link to={`/store`} className="featured__card-btn">
                        VER MÁS
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="featured__cta">
            <Link to="/store" className="featured__btn">
              VER TODO EL CATÁLOGO
              <span className="featured__btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== CARACTERÍSTICAS ========== */}
      <section className="features">
        <div className="container">
          <div className="features__grid">
            <div className="feature">
              <div className="feature__icon">🚀</div>
              <h3 className="feature__title">Envío Rápido</h3>
              <p className="feature__description">
                Entrega express en 24-48 horas. Tu juego, en tiempo récord.
              </p>
            </div>
            
            <div className="feature">
              <div className="feature__icon">🔒</div>
              <h3 className="feature__title">Compra Segura</h3>
              <p className="feature__description">
                Pagos 100% seguros y protegidos. Tu información está a salvo.
              </p>
            </div>
            
            <div className="feature">
              <div className="feature__icon">⭐</div>
              <h3 className="feature__title">Productos Originales</h3>
              <p className="feature__description">
                Solo vendemos juegos originales y verificados.
              </p>
            </div>
            
            <div className="feature">
              <div className="feature__icon">💬</div>
              <h3 className="feature__title">Soporte 24/7</h3>
              <p className="feature__description">
                Nuestro equipo siempre disponible para ayudarte.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section className="cta">
        <div className="container">
          <div className="cta__content">
            <h2 className="cta__title">¿Listo para tu próxima aventura?</h2>
            <p className="cta__description">
              Únete a miles de gamers que ya confían en Pixel Vault
            </p>
            <Link to="/store" className="cta__btn">
              <span className="cta__btn-icon">🎮</span>
              COMENZAR AHORA
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
