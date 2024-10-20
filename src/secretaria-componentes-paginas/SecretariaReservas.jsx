import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Header from '../HeaderSecre';
import Footer from '../OtroFooter';
import '../admin.css'; // ADMIN, PROFES y SECRES usan el mismo CSS
import SecretariaMenuDesplegable from './SecretariaMenuDesplegable';
import dayjs from 'dayjs';

function SecretariaReservas() {
    const [reservasConfirmadas, setReservasConfirmadas] = useState([]); 
    const [reservasPendientes, setReservasPendientes] = useState([]); 

    useEffect(() => {
        async function obtenerReservas() {
            const qConfirmadas = query(collection(db, "reservaCompleta"), orderBy('dia', 'asc'));
            const querySnapshotConfirmadas = await getDocs(qConfirmadas);
            const reservasDataConfirmadas = [];
            querySnapshotConfirmadas.forEach((doc) => {
                const reserva = doc.data();
                if (reserva.dia && reserva.dia.seconds) {
                    reserva.dia = dayjs(reserva.dia.toDate()).format('DD/MM/YYYY HH:mm');
                }
                reservasDataConfirmadas.push({
                    id: doc.id,
                    ...reserva
                });
            });

            const qPendientes = query(collection(db, "reservasPendientes"), orderBy('dia', 'asc'));
            const querySnapshotPendientes = await getDocs(qPendientes);
            const reservasDataPendientes = [];
            querySnapshotPendientes.forEach((doc) => {
                const reserva = doc.data();
                if (reserva.dia && reserva.dia.seconds) {
                    reserva.dia = dayjs(reserva.dia.toDate()).format('DD/MM/YYYY HH:mm');
                }
                reservasDataPendientes.push({
                    id: doc.id,
                    ...reserva
                });
            });

            setReservasConfirmadas(reservasDataConfirmadas);
            setReservasPendientes(reservasDataPendientes);
        }
        obtenerReservas();
    }, []);

    const eliminarReserva = async (idReserva, coleccion) => {
        try {
            const reservaRef = doc(db, coleccion, idReserva);
            await deleteDoc(reservaRef);
            if (coleccion === "reservaCompleta") {
                setReservasConfirmadas(reservasConfirmadas.filter((reserva) => reserva.id !== idReserva));
            } else {
                setReservasPendientes(reservasPendientes.filter((reserva) => reserva.id !== idReserva));
            }
            alert("La cita ha sido eliminada.");
        } catch (error) {
            console.error("Error al eliminar la cita: ", error);
            alert("Hubo un error al eliminar la cita.");
        }
    };

    return (
        <div className="admin-page">
            <Header />
            <SecretariaMenuDesplegable />
            <div className="admin-reservas">
                <h3>LISTA DE RESERVAS CONFIRMADAS</h3>
                {reservasConfirmadas.length > 0 ? (
                    reservasConfirmadas.map((reserva) => (
                        <div key={reserva.id} className="reserva-item">
                            <div className="reserva-datos">
                                <p><strong>Email del Cliente:</strong> {reserva.email}</p>
                                <p><strong>Servicio:</strong> {reserva.servicio}</p>
                                <p><strong>Fecha y Hora:</strong> {reserva.dia}</p>
                                <p><strong>Estado:</strong> {reserva.estadoPago}</p>
                                <button
                                    className="btn-cancelar"
                                    onClick={() => eliminarReserva(reserva.id, "reservaCompleta")}
                                >
                                    Cancelar Cita
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay reservas confirmadas.</p>
                )}

                {/* Separador distintivo entre las dos listas */}
                <div className="separador-listas"></div>

                <h3>LISTA DE RESERVAS PENDIENTES DE PAGO</h3>
                {reservasPendientes.length > 0 ? (
                    reservasPendientes.map((reserva) => (
                        <div key={reserva.id} className="reserva-item">
                            <div className="reserva-datos">
                                <p><strong>Email del Cliente:</strong> {reserva.email}</p>
                                <p><strong>Servicio:</strong> {reserva.servicio}</p>
                                <p><strong>Fecha y Hora:</strong> {reserva.dia}</p>
                                <button
                                    className="btn-cancelar"
                                    onClick={() => eliminarReserva(reserva.id, "reservasPendientes")}
                                >
                                    Cancelar Cita
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay reservas pendientes de pago.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default SecretariaReservas;
