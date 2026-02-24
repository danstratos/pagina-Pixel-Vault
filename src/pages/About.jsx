import React from 'react';
import '../styles/About.css';

export default function About() {
  return (
    <div className="about">
      <div className="container">
        {/* Hero de About */}
        <section className="about__hero">
          <h1 className="about__title">
            <span className="about__title-icon">🎮</span>
            SOBRE NOSOTROS
          </h1>
          <p className="about__tagline">
            Más que una tienda, somos una comunidad de gamers apasionados
          </p>
        </section>

        {/* Nuestra Historia */}
        <section className="about__section">
          <div className="about__content">
            <div className="about__text">
              <h2 className="about__section-title">Nuestra Historia</h2>
              <p className="about__paragraph">
                Pixel Vault nació en 2020 con una misión simple: hacer que los mejores 
                videojuegos sean accesibles para todos los gamers, sin importar su 
                plataforma favorita.
              </p>
              <p className="about__paragraph">
                Lo que comenzó como una pequeña tienda online ha crecido hasta convertirse 
                en una de las comunidades gaming más vibrantes de la región, con miles de 
                jugadores satisfechos que confían en nosotros para sus próximas aventuras.
              </p>
            </div>
            <div className="about__image">
              <div className="about__image-placeholder">
                <span className="about__image-icon">📖</span>
              </div>
            </div>
          </div>
        </section>

        {/* Nuestra Misión */}
        <section className="about__section about__section--reverse">
          <div className="about__content">
            <div className="about__image">
              <div className="about__image-placeholder">
                <span className="about__image-icon">🎯</span>
              </div>
            </div>
            <div className="about__text">
              <h2 className="about__section-title">Nuestra Misión</h2>
              <p className="about__paragraph">
                Creemos que el gaming no es solo un pasatiempo, es una forma de arte, 
                una experiencia social y una pasión que une a personas de todo el mundo.
              </p>
              <p className="about__paragraph">
                Por eso nos comprometemos a ofrecer los mejores productos, el mejor 
                servicio y la mejor experiencia de compra para nuestra comunidad de gamers.
              </p>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="about__values">
          <h2 className="about__section-title centered">Nuestros Valores</h2>
          
          <div className="values__grid">
            <div className="value">
              <div className="value__icon">🎮</div>
              <h3 className="value__title">Pasión por el Gaming</h3>
              <p className="value__description">
                Somos gamers, para gamers. Entendemos tu pasión porque la compartimos.
              </p>
            </div>

            <div className="value">
              <div className="value__icon">✨</div>
              <h3 className="value__title">Calidad Garantizada</h3>
              <p className="value__description">
                Solo productos originales y verificados. Tu satisfacción es nuestra prioridad.
              </p>
            </div>

            <div className="value">
              <div className="value__icon">🤝</div>
              <h3 className="value__title">Comunidad</h3>
              <p className="value__description">
                Construimos relaciones, no solo transacciones. Eres parte de nuestra familia.
              </p>
            </div>

            <div className="value">
              <div className="value__icon">🚀</div>
              <h3 className="value__title">Innovación</h3>
              <p className="value__description">
                Siempre buscamos mejorar y ofrecer la mejor experiencia de compra.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="about__stats">
          <div className="stats__grid">
            <div className="stat">
              <span className="stat__number">5000+</span>
              <span className="stat__label">Clientes Felices</span>
            </div>
            <div className="stat">
              <span className="stat__number">500+</span>
              <span className="stat__label">Juegos Disponibles</span>
            </div>
            <div className="stat">
              <span className="stat__number">4.9</span>
              <span className="stat__label">Rating Promedio</span>
            </div>
            <div className="stat">
              <span className="stat__number">24/7</span>
              <span className="stat__label">Soporte</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
