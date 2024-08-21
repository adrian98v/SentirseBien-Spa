import React from 'react';
import './footer.css'; // Si tienes estilos específicos para el footer

function Footer() {
    return (
      <footer className="footer">

        <section className='sector_izquierdo'>
            <h1>Contacto:</h1>
            <p>Telefono: +555 434 3422</p>
            <p>Correo: SpaSentirsebien@gmail.com</p>
            <p>Direccion: Julio A.Roca 1534</p>
        </section>

        <section className='sector_medio'>
            <h1>Trabaja con nosotros:</h1>
            <p>recursosHumanosSB@gmail.com</p>
        </section>

        <section className='sector_derecho'>
            <h1>Seguinos en nuestras redes:</h1>
            <p>Facebook</p>
            <p>Twitter</p>
            <p>Instagram</p>
            <p>YouTube</p>
        </section>
        
      </footer>
    );
  }
  
  export default Footer;