import React, { useState, useContext } from 'react';
import NewsItem from './Components/newItem';
import NewsForm from './Components/NewsForm'; // Asegúrate de ajustar la ruta si es necesario
import promo1 from './img/img_noticias/Leonardo_Phoenix_promotion_banner_50_discount_paying_in_cash_f_1.jpg';
import promo3 from './img/img_noticias/Leonardo_Phoenix_promotion_banner_massages_30_discount_on_mont_3.jpg';
import promo4 from './img/img_noticias/Leonardo_Phoenix_voucher_de_promocin_un_tratamiento_de_belleza_3.jpg';
import './Noticias.css';
import { DataContext } from './App'; // Ajusta la ruta si es necesario

function Noticias() {
  const { user } = useContext(DataContext);
  const [newsItems, setNewsItems] = useState([
    {
      title: "¡Oferta Especial del 50% de Descuento!",
      description: "¡Aprovecha nuestra oferta exclusiva! Obtén un 50% de descuento en tu primer servicio al pagar en efectivo. No dejes pasar esta oportunidad para disfrutar de nuestros tratamientos de alta calidad a un precio inigualable. ¡Agenda tu cita hoy y empieza a sentirte bien!",
      imageUrl: promo1
    },
    {
      title: "¡Primer Servicio de Prueba Totalmente Gratis!",
      description: "¡Descubre nuestros servicios sin compromiso! Tu primer servicio de prueba es completamente gratis. Ven y experimenta la excelencia de nuestros tratamientos sin ningún costo. No te pierdas esta oportunidad de probar lo mejor en masajes y belleza sin gastar un centavo.",
      imageUrl: promo4
    },
    {
      title: "¡30% de Descuento en tu Primer Tratamiento Facial!",
      description: "¡Embellece tu rostro con nuestra oferta especial! Obtén un 30% de descuento en tu primer tratamiento facial. Disfruta de un cuidado profesional para tu piel y revela una apariencia radiante y fresca. Reserva tu cita y aprovecha este descuento exclusivo para nuevos clientes.",
      imageUrl: promo3
    }
  ]);

  const [showForm, setShowForm] = useState(false);

  const handleAddNews = (newNews) => {
    setNewsItems([...newsItems, newNews]);
  };

  // Verifica si el usuario es admin
  const isAdmin = user && user.email === 'admin1@gmail.com'; // Ajusta esta lógica según tu implementación

  return (
    <div className='Contenedor_Noticias'>
      <h1 className='TituloNoticias'>NOTICIAS:</h1>
      {isAdmin && (
        <button onClick={() => setShowForm(true)} className='add-news-button'>
          Agregar Noticia
        </button>
      )}
      <div className='Noticias'>
        {newsItems.map((item, index) => (
          <NewsItem
            key={index}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
      {showForm && <NewsForm onAddNews={handleAddNews} onClose={() => setShowForm(false)} />}
    </div>
  );
}

export default Noticias;
