import React, { useEffect, useState, useContext } from 'react'; 
import { db } from './firebase'; 
import { collection, query, orderBy, getDocs, updateDoc, doc } from 'firebase/firestore';
import Header from './HeaderProfes';  
import Footer from './OtroFooter'; 
import './admin.css';
import { DataContext } from './App';

function Profesionales() {
    const [reservas, setReservas] = useState([]); // Estado para almacenar las reservas
    const { role } = useContext(DataContext); // Obtener el rol del contexto

    // Obtener reservas desde Firebase
    useEffect(() => {
        async function obtenerReservas() {
            const q = query(collection(db, "clientes"), orderBy('reservaCompleta.dia', 'asc')); // Ordenar por fecha ascendente
            const querySnapshot = await getDocs(q);
            const reservasData = [];

            querySnapshot.forEach((doc) => {
                const reserva = doc.data().reservaCompleta;
                if (reserva) {
                    const servicio = doc.data().servicio || '';
                    const servicioTipo = servicio.split(' ')[0].toLowerCase(); // Obtener la primera palabra del servicio

                    // Filtrar reservas según el rol del profesional
                    if (
                        (role === 'Masajista' && servicioTipo === 'masaje') ||
                        (role === 'Belleza' && servicioTipo === 'belleza') ||
                        (role === 'TratamientoCorporal' && servicio.includes('corporal')) ||
                        (role === 'TratamientoFacial' && servicio.includes('facial'))
                    ) {
                        reservasData.push({
                            id: doc.id,
                            ...reserva,
                            servicio
                        });
                    }
                }
            });
            
            setReservas(reservasData);
        }

        if (role) {
            obtenerReservas(); // Solo obtener reservas cuando ya tenemos el rol del profesional
        }
    }, [role]);

    // Función para cancelar una reserva
    const cancelarReserva = async (idReserva) => {
        try {
            const reservaRef = doc(db, "clientes", idReserva); // Referencia al documento de la reserva
            await updateDoc(reservaRef, {
                reservaCompleta: null, // Establecer reservaCompleta en null
                servicio: null // Establecer servicio en null
            });
            // Actualizar el estado para reflejar el cambio
            setReservas(reservas.filter((reserva) => reserva.id !== idReserva));
            alert("La cita ha sido cancelada.");
        } catch (error) {
            console.error("Error al cancelar la cita: ", error);
            alert("Hubo un error al cancelar la cita.");
        }
    };

    return (
        <div className="admin-page">
            <Header />
            <div className="admin-reservas">
                <h3>LISTADO DE RESERVAS ORDENADO POR SERVICIO Y FECHA</h3>

                {/* Mostrar las reservas filtradas por rol */}
                {reservas.length > 0 ? (
                    <div>
                        {role === 'Masajista' && (
                            <h4>Reservas para el profesional de Masajes</h4>
                        )}
                        {reservas.map((reserva) => (
                            <div key={reserva.id} className="reserva-item">
                                <div className="reserva-datos">
                                    <p><strong>Email del Cliente:</strong> {reserva.id}</p>
                                    <p><strong>Servicio:</strong> {reserva.servicio}</p>
                                    <p><strong>Día:</strong> {reserva.dia}</p>
                                    <p><strong>Hora:</strong> {reserva.hora}</p>
                                    <button 
                                        className="btn-cancelar"
                                        onClick={() => cancelarReserva(reserva.id)}
                                    >
                                        Cancelar Cita
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No hay reservas para mostrar.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Profesionales;
