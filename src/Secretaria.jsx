// Secretaria.jsx
import React from 'react';
import Header from './HeaderSecre';
import Footer from './OtroFooter';
import SecretariaMenuDesplegable from './secretaria-componentes-paginas/SecretariaMenuDesplegable';
import './admin.css'; // Usamos el mismo CSS para mantener el estilo consistente

function Secretaria() {
    return (
        <div className="admin-page">
            <Header />
            <SecretariaMenuDesplegable />
            <div className="admin-intro">
                <h1>Bienvenida, Secretaria</h1>
                <p>
                    Nos complace darte la bienvenida a tu espacio de trabajo. Aquí podrás gestionar 
                    las reservas de nuestros clientes, coordinar citas y garantizar que los servicios 
                    se programen de manera eficiente para mantener una operación fluida. Este portal 
                    está diseñado para facilitarte la organización de las tareas diarias, brindándote 
                    herramientas para revisar detalles de las citas, actualizar información y hacer 
                    cambios cuando sea necesario.
                </p>
                <p>
                    Tu papel es fundamental para asegurar que cada cliente reciba la mejor atención. 
                    Al gestionar las reservas y coordinar con los profesionales, estás contribuyendo 
                    a que cada sesión se lleve a cabo sin inconvenientes y en el horario adecuado. 
                    Aprovecha este espacio para optimizar tu trabajo y mantener la comunicación abierta 
                    con el equipo y los clientes.
                </p>
                
            </div>
            <Footer />
        </div>
    );
}

export default Secretaria;
