import React, { useEffect, useState } from 'react'; 
import { db } from './firebase'; 
import { collection, query, orderBy, getDocs, updateDoc, doc } from 'firebase/firestore';
import { getAuth } from "firebase/auth"; 
import Header from './HeaderProfes';  
import Footer from './OtroFooter'; 
import './admin.css';

function Profesionales() {
    const [reservas, setReservas] = useState([]); // Estado para almacenar las reservas
    const [emailProfesional, setEmailProfesional] = useState(null); // Estado para almacenar el email del profesional conectado

    // Obtener el email del usuario conectado
    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            setEmailProfesional(user.email);
        }
    }, []);

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

                    // Filtrar según el email del profesional
                    if (
                        (emailProfesional === 'profesional1@gmail.com' && servicioTipo === 'masaje') ||
                        (emailProfesional === 'profesional2@gmail.com' && servicioTipo === 'belleza') ||
                        (emailProfesional === 'profesional3@gmail.com' && servicio.includes('corporal')) ||
                        (emailProfesional === 'profesional4@gmail.com' && servicio.includes('facial'))
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

        if (emailProfesional) {
            obtenerReservas(); // Solo obtener reservas cuando ya tenemos el email del profesional
        }
    }, [emailProfesional]);

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

    // Función para ordenar reservas por fecha
    const ordenarReservasPorFecha = (reservas) => {
        return reservas.sort((a, b) => new Date(a.dia) - new Date(b.dia));
    };

    // Agrupar las reservas por servicio
    const reservasMasajes = ordenarReservasPorFecha(reservas.filter(r => r.servicio.toLowerCase().includes('masaje')));
    const reservasBelleza = ordenarReservasPorFecha(reservas.filter(r => r.servicio.toLowerCase().includes('belleza')));
    const reservasCorporal = ordenarReservasPorFecha(reservas.filter(r => r.servicio.toLowerCase().includes('corporal')));
    const reservasFacial = ordenarReservasPorFecha(reservas.filter(r => r.servicio.toLowerCase().includes('facial')));

    return (
        <div className="admin-page">
            <Header />
            <div className="admin-reservas">
                <h3>LISTADO DE RESERVAS ORDENADO POR SERVICIO Y FECHA</h3>

                {/* Mostrar las reservas de Masajes */}
                {reservasMasajes.length > 0 && (
                    <div>
                        <h4>Para el profesional dedicado al area de Masajes</h4>
                        {reservasMasajes.map((reserva) => (
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
                )}

                {/* Mostrar las reservas de Belleza */}
                {reservasBelleza.length > 0 && (
                    <div>
                        <h4>Para el profesional dedicado al area de Belleza</h4>
                        {reservasBelleza.map((reserva) => (
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
                )}

                {/* Mostrar las reservas de Tratamiento Corporal */}
                {reservasCorporal.length > 0 && (
                    <div>
                        <h4>Para el profesional dedicado al area de Tratamientos Corporales</h4>
                        {reservasCorporal.map((reserva) => (
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
                )}

                {/* Mostrar las reservas de Tratamiento Facial */}
                {reservasFacial.length > 0 && (
                    <div>
                        <h4>Para el profesional dedicado al area de Tratamientos Faciales</h4>
                        {reservasFacial.map((reserva) => (
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
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Profesionales;
