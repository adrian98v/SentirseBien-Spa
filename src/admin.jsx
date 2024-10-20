// Admin.jsx
import React, { useEffect, useState } from 'react'; 
import { db } from './firebase'; 
import { collection, query, orderBy, onSnapshot, getDocs } from 'firebase/firestore'; 
import Header from './HeaderAdmin';  
import Footer from './OtroFooter'; 
import './admin.css';
import SidebarMenu from './admin-Components/MenuDesplegableAdmin';


function Admin() {
    const [comentarios, setComentarios] = useState([]);
    const [reservas, setReservas] = useState([]);
    const [menuAbierto, setMenuAbierto] = useState(false); // Estado para controlar el menú desplegable

    // Función para alternar el menú
    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };


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

            <SidebarMenu></SidebarMenu>
            
            <Footer />
        </div>
    );
}

export default Admin;
