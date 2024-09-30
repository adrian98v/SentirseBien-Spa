//Admin.jsx
import React, { useEffect, useState } from 'react'; 
import { db } from './firebase'; 
import { collection, query, orderBy, onSnapshot, getDocs } from 'firebase/firestore'; // getDocs para obtener reservas
import Header from './HeaderAdmin';  
import Footer from './OtroFooter'; // Asegúrate de importar Footer si lo estás utilizando
import './admin.css';

function Admin() {
    const [comentarios, setComentarios] = useState([]);
    const [reservas, setReservas] = useState([]); // Estado para almacenar las reservas
    const [mensaje, setMensaje] = useState('');

    // Obtener comentarios desde Firebase
useEffect(() => {
    const q = query(collection(db, 'comentarios'), orderBy('fecha', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const comentariosData = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // Convertir el campo 'fecha' a un objeto Date si es un Timestamp
            const fecha = data.fecha ? data.fecha.toDate() : null;
            comentariosData.push({ id: doc.id, ...data, fecha });
        });
        setComentarios(comentariosData);
    });

    return () => unsubscribe();
}, []);

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

            {/* Sección de comentarios */}
            <div className="admin-consultas">
        <h3>LISTADO DE COMENTARIOS RECIBIDOS</h3>
        {comentarios.map((comentario) => (
            <div key={comentario.id} className="comentario-item">
                <div className="comentario-datos">
                    <p><strong>Nombre:</strong> {comentario.nombre}</p>
                    <p><strong>Apellido:</strong> {comentario.apellido}</p>
                    <p><strong>Email:</strong> {comentario.email}</p>
                    {comentario.fecha && (
                        <p><strong>Fecha:</strong> {comentario.fecha.toLocaleString()}</p> // Formato de fecha y hora legible
                    )}
                </div>
                <div className="comentario-texto">
                    <p><strong>Comentario:</strong> {comentario.consulta}</p>
                </div>
            </div>
        ))}
    </div>

            {/* Nueva sección de Reservas Hechas */}
            <div className="admin-reservas">
                <h3>LISTADO DE RESERVAS</h3>
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

export default Admin;