//Profesionales.jsx
import React, { useEffect, useState } from 'react'; 
import { db } from './firebase'; 
import { collection, query, orderBy, onSnapshot, getDocs } from 'firebase/firestore'; // getDocs para obtener reservas
import Header from './HeaderProfes';  
import Footer from './OtroFooter'; // Asegúrate de importar Footer si lo estás utilizando

import './admin.css';// ADMIN .. PROFES y SECRES usan mismo css!!



function Profesionales() {
    const [reservas, setReservas] = useState([]); // Estado para almacenar las reservas


    // Obtener reservas desde Firebase
    useEffect(() => {
        async function obtenerReservas() {
            const q = query(collection(db, "clientes"), orderBy('reservaCompleta.dia', 'desc'));
            const querySnapshot = await getDocs(q);
            const reservasData = [];
            querySnapshot.forEach((doc) => {
                if (doc.data().reservaCompleta) {
                    reservasData.push({
                        id: doc.id,
                        ...doc.data().reservaCompleta,
                        servicio: doc.data().servicio
                    });
                }
            });
            setReservas(reservasData);
        }
        obtenerReservas();
    }, []);


  return (
    <div className="admin-page">
        <Header />
        <div className="admin-reservas">
                <h3>LISTADO DE RESERVAS ORDENADO POR FECHA</h3>
                {reservas.length > 0 ? reservas.map((reserva) => (
                    <div key={reserva.id} className="reserva-item">
                        <div className="reserva-datos">
                            <p><strong>Email del Cliente:</strong> {reserva.id}</p>
                            <p><strong>Servicio:</strong> {reserva.servicio}</p>
                            <p><strong>Día:</strong> {reserva.dia}</p>
                            <p><strong>Hora:</strong> {reserva.hora}</p>
                        </div>
                    </div>
                )) : <p>No hay reservas hechas.</p>}
            </div>

            
            <Footer />
        </div>
  );
}
export default Profesionales;