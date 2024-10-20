import React, { useEffect, useState, useContext, useCallback } from 'react'; 
import { db } from './firebase'; 
import { collection, query, where, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Header from './Header';  
import Footer from './Footer'; 
import './admin.css'; 
import { DataContext } from './App.js';
import dayjs from 'dayjs'; 

function ReservasCliente() {
    const [reservasPagadas, setReservasPagadas] = useState([]);  
    const [reservasPendientes, setReservasPendientes] = useState([]);  
    const { user } = useContext(DataContext); 

    // Función para obtener reservas pagadas desde la colección "reservaCompleta"
    const obtenerReservasPagadas = useCallback(async () => {
        if (!user) return;
        const q = query(
            collection(db, "reservaCompleta"),
            where("email", "==", user.email),
            orderBy('dia', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const reservasData = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.dia && data.dia.seconds) {
                data.dia = dayjs(data.dia.toDate()).format('DD/MM/YYYY HH:mm');
            }
            reservasData.push({
                id: doc.id,
                ...data,
            });
        });
        setReservasPagadas(reservasData);
    }, [user]);

    // Función para obtener reservas pendientes desde la colección "reservasPendientes"
    const obtenerReservasPendientes = useCallback(async () => {
        if (!user) return;
        const q = query(
            collection(db, "reservasPendientes"),
            where("email", "==", user.email),
            orderBy('dia', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const reservasData = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.dia && data.dia.seconds) {
                data.dia = dayjs(data.dia.toDate()).format('DD/MM/YYYY HH:mm');
            }
            reservasData.push({
                id: doc.id,
                ...data,
            });
        });
        setReservasPendientes(reservasData);
    }, [user]);

    // Función para cancelar reservas que están a menos de 48 horas y no están pagadas
    const cancelarReservasExpiradas = useCallback(async () => {
        if (!user) return;
        const ahora = dayjs(); // Fecha y hora actual
        const q = query(
            collection(db, "reservasPendientes"),
            where("email", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        const reservasAEliminar = [];

        querySnapshot.forEach((docSnapshot) => {
            const reserva = docSnapshot.data();
            const fechaReserva = dayjs(reserva.dia.toDate()); // Convertir el timestamp a Dayjs

            // Verifica si faltan menos de 48 horas para la reserva
            if (fechaReserva.diff(ahora, 'hour') <= 48) {
                reservasAEliminar.push(docSnapshot.id); // Agrega la reserva a la lista
            }
        });

        for (const id of reservasAEliminar) {
            await deleteDoc(doc(db, "reservasPendientes", id)); // Elimina las reservas expiradas
        }

        obtenerReservasPendientes(); // Refresca las reservas pendientes
    }, [user, obtenerReservasPendientes]);

    // useEffect para cargar las reservas cuando el usuario está logueado
    useEffect(() => {
        if (user) {
            obtenerReservasPagadas();
            obtenerReservasPendientes();
            cancelarReservasExpiradas(); // Ejecutar al cargar la página
        }
    }, [user, cancelarReservasExpiradas, obtenerReservasPagadas, obtenerReservasPendientes]);

    // Función para cancelar manualmente una reserva pendiente
    const cancelarReservaPendiente = async (idReserva) => {
        try {
            await deleteDoc(doc(db, "reservasPendientes", idReserva));
            setReservasPendientes(reservasPendientes.filter((reserva) => reserva.id !== idReserva));
            alert("La cita pendiente ha sido cancelada.");
        } catch (error) {
            console.error("Error al cancelar la cita pendiente: ", error);
            alert("Hubo un error al cancelar la cita.");
        }
    };

    return (
        <div className="admin-page">
            <Header />  
            <div className="admin-reservas">
                <h3>Mis Reservas Pagadas</h3>
                {reservasPagadas.length > 0 ? reservasPagadas.map((reserva) => (
                    <div key={reserva.id} className="reserva-item">
                        <div className="reserva-datos">
                            <p><strong>Servicio:</strong> {reserva.servicio}</p>
                            <p><strong>Día:</strong> {reserva.dia}</p>
                            <p><strong>Hora:</strong> {reserva.hora}</p>
                            <p><strong>Estado del Pago:</strong> {reserva.estadoPago ? reserva.estadoPago : 'Pagado'}</p>
                            <button 
                                className="btn-cancelar"
                                onClick={() => cancelarReservaPendiente(reserva.id)}
                            >
                                Cancelar Cita
                            </button>
                        </div>
                    </div>
                )) : <p>No tienes reservas pagadas.</p>}
            </div>

            <div className="admin-reservas">
                <h3>Mis Reservas Pendientes de Pago</h3>
                {reservasPendientes.length > 0 ? reservasPendientes.map((reserva) => (
                    <div key={reserva.id} className="reserva-item">
                        <div className="reserva-datos">
                            <p><strong>Servicio:</strong> {reserva.servicio}</p>
                            <p><strong>Día:</strong> {reserva.dia}</p>
                            <p><strong>Hora:</strong> {reserva.hora}</p>
                            <p><strong>Estado del Pago:</strong> {reserva.estadoPago ? reserva.estadoPago : 'Pendiente'}</p>
                            <button 
                                className="btn-cancelar"
                                onClick={() => cancelarReservaPendiente(reserva.id)}
                            >
                                Cancelar Cita
                            </button>
                        </div>
                    </div>
                )) : <p>No tienes reservas pendientes de pago.</p>}
            </div>
            <Footer />
        </div>
    );
}

export default ReservasCliente;
