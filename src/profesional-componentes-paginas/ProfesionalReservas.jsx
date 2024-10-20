import React, { useEffect, useState, useContext } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import dayjs from 'dayjs';
import Header from '../HeaderProfes';
import Footer from '../OtroFooter';
import '../admin.css';
import { DataContext } from '../App';
import ProfesionalMenuDesplegable from '../profesional-componentes-paginas/ProfesionalMenuDesplegable';

function ProfesionalesReservas() {
    const [reservas, setReservas] = useState([]); // Estado para almacenar las reservas
    const { role } = useContext(DataContext); // Obtener el rol del contexto

    // Obtener reservas desde Firebase
    useEffect(() => {
        async function obtenerReservas() {
            const q = query(collection(db, "reservaCompleta"), orderBy('dia', 'asc')); // Ordenar por "dia" ascendente
            const querySnapshot = await getDocs(q);
            const reservasData = [];

            querySnapshot.forEach((doc) => {
                const reserva = doc.data();
                const servicio = reserva.servicio || '';
                const servicioTipo = servicio.split(' ')[0].toLowerCase(); // Obtener la primera palabra del servicio

                // Formatear la fecha usando dayjs si existe la propiedad "dia"
                if (reserva.dia && reserva.dia.seconds) {
                    reserva.dia = dayjs(reserva.dia.toDate()).format('DD/MM/YYYY HH:mm');
                }

                // Filtrar reservas según el rol del profesional
                if (
                    (role === 'Masajista' && servicioTipo === 'masaje') ||
                    (role === 'Belleza' && servicioTipo === 'belleza') ||
                    (role === 'TratamientoCorporal' && servicio.includes('corporal')) ||
                    (role === 'TratamientoFacial' && servicio.includes('facial'))
                ) {
                    reservasData.push({
                        id: doc.id,
                        fecha: reserva.dia, // Fecha formateada
                        email: reserva.email,
                        servicio: reserva.servicio,
                        estado: reserva.estadoPago
                    });
                }
            });

            setReservas(reservasData);
        }
        if (role) {
            obtenerReservas(); // Solo obtener reservas cuando ya tenemos el rol del profesional
        }
    }, [role]);

    // Función para eliminar una reserva
    const eliminarReserva = async (idReserva) => {
        try {
            const reservaRef = doc(db, "reservaCompleta", idReserva); // Referencia al documento de la reserva
            await deleteDoc(reservaRef); // Eliminar el documento de la base de datos
            // Actualizar el estado para reflejar el cambio
            setReservas(reservas.filter((reserva) => reserva.id !== idReserva));
            alert("La cita ha sido eliminada.");
        } catch (error) {
            console.error("Error al eliminar la cita: ", error);
            alert("Hubo un error al eliminar la cita.");
        }
    };

    return (
        <div className="admin-page">
            <Header />
            <ProfesionalMenuDesplegable />
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
                                    <p><strong>Email del Cliente:</strong> {reserva.email}</p>
                                    <p><strong>Servicio:</strong> {reserva.servicio}</p>
                                    <p><strong>Fecha y Hora:</strong> {reserva.fecha}</p>
                                    <p><strong>Estado:</strong> {reserva.estado}</p>
                                    <button
                                        className="btn-cancelar"
                                        onClick={() => eliminarReserva(reserva.id)}
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

export default ProfesionalesReservas;
