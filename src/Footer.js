import React from 'react';
import './footer.css'; // Si tienes estilos específicos para el footer

function Footer() {
    return (
      <footer className="footer">

        <section className='sector_izquierdo'>
          <h1>Contacto:</h1>
          <p>Telefono: +555 434 3422</p>
          <p>Correo: sentirsebienspa004@gmail.com</p>
          <p>Direccion: Julio A.Roca 1466</p>
        </section>

        <section className='sector_medio'>
          <h1>Trabaja con nosotros:</h1>
          <p>recursosHumanosSB@gmail.com</p>
        </section>

        <section className='sector_derecho'>
        <h1>Seguinos en nuestras redes:</h1>
          <a href="https://www.youtube.com/@Sentirse-Bien-Spa" target="_blank"><p>YouTube</p></a>
          <a href="https://www.facebook.com/profile.php?id=61565586311256" target="_blank"><p>Facebook</p></a>
          <a href="https://www.instagram.com/sentirsebien_spa/" target="_blank"><p>Instagram</p></a>
        </section>
        
      </footer>
    );
  }
  
  export default Footer;