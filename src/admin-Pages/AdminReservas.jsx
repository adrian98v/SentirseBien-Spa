import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import {db} from '../firebase'; // Asegúrate de importar tu configuración de Firebase
import '../admin.css'; // Importa los estilos personalizados
import SidebarMenu from '../admin-Components/MenuDesplegableAdmin';
import Header from '../HeaderAdmin';
import Footer from '../OtroFooter'; 

const AdminReservas = () => {
    const [reservas, setReservas] = useState([]);

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
        
        <div>
            <Header></Header>
            <SidebarMenu></SidebarMenu>
            <div className="admin-reservas">
            <h3>LISTADO DE RESERVAS</h3>
            {reservas.length > 0 ? (
                reservas.map((reserva) => (
                    <div key={reserva.id} className="reserva-item">
                        <div className="reserva-datos">
                            <p><strong>Email del Cliente:</strong> {reserva.id}</p>
                            <p><strong>Servicio:</strong> {reserva.servicio}</p>
                            <p><strong>Día:</strong> {reserva.dia}</p>
                            <p><strong>Hora:</strong> {reserva.hora}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay reservas hechas.</p>
            )}
        </div>
        <Footer></Footer>
        </div>
    );
};

export default AdminReservas;
