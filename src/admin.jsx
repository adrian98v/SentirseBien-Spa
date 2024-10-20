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

    return (
        <div className="admin-page">
            <Header />
            <SidebarMenu />

            
            {/* Introducción de la página de administración */}
            <div className="admin-intro">
            <h1>BIENVENIDO ADMINISTRADOR: Dra. Felicidad</h1>
                <p>
                    En esta sección, podrás gestionar y supervisar todas las actividades relacionadas con los 
                    comentarios y reservas de tus clientes. Aquí tendrás acceso a un listado completo de los 
                    comentarios recibidos y las reservas realizadas, lo que te permitirá brindar un servicio 
                    más eficiente y personalizado. Utiliza el menú de la izquierda para navegar entre las diferentes 
                    secciones y mantener todo organizado y accesible.
                </p>
            </div>
            
            <Footer />
        </div>
    );
}

export default Admin;
