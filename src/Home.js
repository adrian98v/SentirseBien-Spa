// src/App.js
import React from 'react';
import './Home.css';
import Footer from './Footer.js';
import Header from './Header.js'


function Home() {
  return (
    <div className="App">
      {/* Sección de Bienvenida */}
      <section className="bienvenida">
        
        <h1>Sentirse Bien</h1>
        <p>Recibe a quienes visitan el sitio con una presentación breve, amable y genuina.</p>
        <button >Más Información</button>
      </section>

      {/* Sección de Contenido 1 */}
      <section className='seccion1'>
        <article className='seccion1_articulo'>
          <h1 className='seccion1_titulo'>Más sobre nuestro SPA</h1>
          <p className='seccion1_texto'>Cuenta quién eres, tus orígenes, tu proceso o lo que te inspira. Aprovecha tu creatividad. ¡Tú puedes! La manera en la que cuentes tu historia en línea puede marcar la diferencia. No te preocupes por sonar profesional. Suena genuino.</p>
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
          <h3>Mensaje(obligatorio)</h3>
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
    </div>
    
  );
}

export default Home;
