// src/App.js
import React, { useState } from 'react';
import './Home.css';
import Footer from './Footer.js';
import FooterSegundo from './OtroFooter.js'
import { Link } from 'react-router-dom';
import { db } from './firebase'; // Importamos la configuración de Firebase
import { collection, addDoc } from 'firebase/firestore'; // Para agregar a Firestore

function Home() {
  // Estados para manejar el nombre y el mensaje
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [mensajeEnvio, setMensajeEnvio] = useState('');

  // Función para manejar el envío de la opinión
  const handleEnviar = async () => {
    if (nombre !== '' && mensaje !== '' && email !== '' && apellido !== '') {
      try {
        // Agregar el documento a la colección "comentarios" en Firestore
        await addDoc(collection(db, 'comentarios'), {
          nombre: nombre,
          apellido: apellido,
          email: email,
          consulta: mensaje,
          fecha: new Date(),
        });
        // Limpiar los campos después de enviar
        setNombre('');
        setMensaje('');
        setApellido('');
        setEmail('');
        setMensajeEnvio('Comentario enviado con éxito.');
      } catch (error) {
        setMensajeEnvio('Error al enviar el comentario: ' + error.message);
      }
    } else {
      setMensajeEnvio('Por favor, completa todos los campos antes de enviar.');
    }
  };

  return (
    <div className="App">
      {/* Sección de Bienvenida */}
      <section className="bienvenida">
        
        <h1>Sentirse Bien</h1>
        <p>Te ofrecemos una experiencia única para revitalizar tu cuerpo y mente. Descubre una amplia gama de servicios relajantes diseñados para liberar el estrés y reconectar con tu bienestar interior.</p>
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
          <h3>Nombre:</h3>
          <input
            type="text"
            className="nombre inputComent"
            name="nombre"
            placeholder="Escribe tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <h3>Apellido:</h3>
          <input
            type="text"
            className="apellido inputComent"
            name="apellido"
            placeholder="Escribe tu apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
          <h3>Email:</h3>
          <input
            type="email"
            className="email inputComent"
            name="email"
            placeholder="Escribe tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3>Tu mensaje:</h3>
          <input
            type="text"
            className="mensaje inputComent"
            name="mensaje"
            placeholder="Escribe tu comentario"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
          <button onClick={handleEnviar}>Enviar</button>
          {mensajeEnvio && <p>{mensajeEnvio}</p>}
        </aside>
      </section>
      <Footer />

      <FooterSegundo></FooterSegundo>
    </div>
    
  );
}

export default Home;
