// src/App.js
import React from 'react';
import './Home.css';
import Footer from './Footer.js';
import FooterSegundo from './OtroFooter.js'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="App">
      {/* Sección de Bienvenida */}
      <section className="bienvenida">
        
        <h1>Sentirse Bien</h1>
        <p>Recibe a quienes visitan el sitio con una presentación breve, amable y genuina.</p>
        <Link to="/about" className="botonMasInfo">
        Más Información
      </Link>
      </section>

      {/* Sección de Contenido 1 */}
      <section className='seccion1'>
        <article className='seccion1_articulo'>
          <h1 className='seccion1_titulo'>Más sobre nuestro SPA</h1>
          <p className='seccion1_texto'>¡Bienvenido a Sentirse Bien! 🌿✨
          Descubre un oasis de paz y renovación en nuestro spa, donde cada servicio está diseñado para ofrecerte una experiencia de bienestar inigualable. Desde masajes relajantes hasta tratamientos de belleza revitalizantes, nuestro equipo de expertos se dedica a cuidar de ti y ayudarte a alcanzar el equilibrio perfecto entre cuerpo y mente. ¡Permítenos ser parte de tu viaje hacia un tú más feliz y saludable!</p>
        </article>
        <aside className='seccion1_aside'></aside>
      </section>

      {/* Sección de Contenido 2 */}
      <section className='seccion2'>
        <article className='seccion2_articulo'>
          <h2 >Dejanos tu opinion:</h2>
          <p>Cuentanos tus experiencias sobre nuestros servicios y ayudanos a mejorar.</p>
          <p>Se agradece la amabilidad</p>
        </article>
        <aside className='seccion2_aside'>
          <h3>Escriba su nombre completo:</h3>
        <input
          type="text"
          className="nombre"
          name="nombre"
          placeholder="Deje su nombre completo"
        />
        <h3>Escriba su mensaje:</h3>
        <input
          type="text"
          className="nombre"
          name="nombre"
          placeholder="Escriba su reseña aqui"
        />
          <button >Enviar</button>
          
        </aside>
      </section>
      <Footer />

      <FooterSegundo></FooterSegundo>
    </div>
    
  );
}

export default Home;
