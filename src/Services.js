import React from 'react';
import './Services.css';
import masaje1 from './img/servicios1.png'; // Imagen para el primer servicio
import servicio2 from './img/servicios2.png'; // Imagen para el segundo servicio
import servicio3 from './img/servicios1.png'; // Imagen para el segundo servicio
import servicio4 from './img/servicios4.png'; // Imagen para el cuarto servicio
import servicio5 from './img/servicios1.png'; // Imagen para el quinto servicio
import servicio6 from './img/servicios6.png'; // Imagen para el sexto servicio


function Services() {
    return (
        <div className="services-container">
            <h1>Nuestros Servicios</h1>
            
             {/* Primera fila de servicios */}
            <div className="services-row">
                <div className="col-lg-4">
                    <img src={masaje1} alt="Masajes" className="bd-placeholder-img rounded-circle" width="140" height="140" />
                    <h2 className="fw-normal">MASAJES</h2>
                    <p>Muchos masajes mucho muy bien hechos por mucho muy tiempo y algo más que no se me ocurre que poner.</p>
                    <p><a className="btn btn-secondary" href="#">Ver detalles »</a></p>
                </div>
                <div className="col-lg-4">
                    <img src={servicio2} alt="Servicio2" className="bd-placeholder-img rounded-circle" width="140" height="140" />
                    <h2 className="fw-normal">LIFTING</h2>
                    <p>Descripción del segundo servicio ofrecido.</p>
                    <p><a className="btn btn-secondary" href="#">Ver detalles »</a></p>
                </div>

                <div className="col-lg-4">
                    <img src={servicio3} alt="Servicio3" className="bd-placeholder-img rounded-circle" width="140" height="140" />
                    <h2 className="fw-normal">MAS MASAJES</h2>
                    <p>Descripción del tercer servicio ofrecido.</p>
                    <p><a className="btn btn-secondary" href="#">Ver detalles »</a></p>
                </div>
            </div>

            {/* Segunda fila de servicios */}
            <div className="services-row">
                <div className="col-lg-4">
                    <img src={servicio4} alt="Servicio 4" className="bd-placeholder-img rounded-circle" width="140" height="140" />
                    <h2 className="fw-normal">SERVICIO 4</h2>
                    <p>Descripción del cuarto servicio ofrecido.</p>
                    <p><a className="btn btn-secondary" href="#">Ver detalles »</a></p>
                </div>
                <div className="col-lg-4">
                    <img src={servicio5} alt="Servicio 5" className="bd-placeholder-img rounded-circle" width="140" height="140" />
                    <h2 className="fw-normal">SERVICIO 5</h2>
                    <p>Descripción del quinto servicio ofrecido.</p>
                    <p><a className="btn btn-secondary" href="#">Ver detalles »</a></p>
                </div>
                <div className="col-lg-4">
                    <img src={servicio6} alt="Servicio 6" className="bd-placeholder-img rounded-circle" width="140" height="140" />
                    <h2 className="fw-normal">SERVICIO 6</h2>
                    <p>Descripción del sexto servicio ofrecido.</p>
                    <p><a className="btn btn-secondary" href="#">Ver detalles »</a></p>
                </div>
            </div>
            
            
        </div>
            
    );
}

export default Services;
