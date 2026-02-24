import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Store from './pages/Store';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import './styles/App.css';
import './styles/Navigation.css';

// Componente de Navegación
function Navigation() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">🎮</span>
          <span className="navbar__logo-text">PIXEL VAULT</span>
        </Link>

        {/* Navigation Links */}
        <div className="navbar__menu">
          <Link 
            to="/" 
            className={`navbar__link ${isActive('/') ? 'navbar__link--active' : ''}`}
          >
            Inicio
          </Link>
          <Link 
            to="/store" 
            className={`navbar__link ${isActive('/store') ? 'navbar__link--active' : ''}`}
          >
            Tienda
          </Link>
          <Link 
            to="/about" 
            className={`navbar__link ${isActive('/about') ? 'navbar__link--active' : ''}`}
          >
            Nosotros
          </Link>
        </div>

        {/* User Actions */}
        <div className="navbar__actions">
          {user ? (
            <>
              <Link to="/cart" className="navbar__cart">
                <span className="navbar__cart-icon">🛒</span>
                <span className="navbar__cart-text">Carrito</span>
              </Link>
              <div className="navbar__user">
                <span className="navbar__user-name">{user.username}</span>
                <button onClick={logout} className="navbar__logout">
                  Salir
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar__btn navbar__btn--login">
                Ingresar
              </Link>
              <Link to="/register" className="navbar__btn navbar__btn--register">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

// Componente de Footer
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h3 className="footer__title">
            <span className="footer__icon">🎮</span>
            PIXEL VAULT
          </h3>
          <p className="footer__text">
            Tu tienda de videojuegos de confianza desde 2020
          </p>
        </div>

        <div className="footer__section">
          <h4 className="footer__heading">Enlaces</h4>
          <Link to="/" className="footer__link">Inicio</Link>
          <Link to="/store" className="footer__link">Tienda</Link>
          <Link to="/about" className="footer__link">Nosotros</Link>
        </div>

        <div className="footer__section">
          <h4 className="footer__heading">Soporte</h4>
          <a href="#" className="footer__link">FAQ</a>
          <a href="#" className="footer__link">Envíos</a>
          <a href="#" className="footer__link">Contacto</a>
        </div>

        <div className="footer__section">
          <h4 className="footer__heading">Síguenos</h4>
          <div className="footer__social">
            <a href="#" className="footer__social-link">📘</a>
            <a href="#" className="footer__social-link">📸</a>
            <a href="#" className="footer__social-link">🐦</a>
            <a href="#" className="footer__social-link">📺</a>
          </div>
        </div>
      </div>
      
      <div className="footer__bottom">
        <p className="footer__copyright">
          © 2026 Pixel Vault Game Store - Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}

// Componente principal de la App
function AppContent() {
  return (
    <div className="app">
      <Navigation />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

// App con Router y Auth Provider
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
