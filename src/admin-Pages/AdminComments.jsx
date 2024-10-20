import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import {db} from '../firebase'; // Asegúrate de importar tu configuración de Firebase
import '../admin.css'; // Importa los estilos personalizados
import SidebarMenu from '../admin-Components/MenuDesplegableAdmin';
import Header from '../HeaderAdmin';
import Footer from '../OtroFooter'; 

const AdminComments = () => {
    const [comentarios, setComentarios] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'comentarios'), orderBy('fecha', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const comentariosData = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const fecha = data.fecha ? data.fecha.toDate() : null;
                comentariosData.push({ id: doc.id, ...data, fecha });
            });
            setComentarios(comentariosData);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className='Comentarios'>
            <Header></Header>
            <SidebarMenu></SidebarMenu>
        <div className="admin-consultas">
            <h3>LISTADO DE COMENTARIOS RECIBIDOS</h3>
            {comentarios.length === 0 ? (
                <p>No hay comentarios disponibles.</p>
            ) : (
                comentarios.map((comentario) => (
                    <div key={comentario.id} className="comentario-item">
                        <div className="comentario-datos">
                            <p><strong>Nombre:</strong> {comentario.nombre}</p>
                            <p><strong>Apellido:</strong> {comentario.apellido}</p>
                            <p><strong>Email:</strong> {comentario.email}</p>
                            {comentario.fecha && (
                                <p><strong>Fecha:</strong> {comentario.fecha.toLocaleString()}</p>
                            )}
                        </div>
                        <div className="comentario-texto">
                            <p><strong>Comentario:</strong> {comentario.consulta}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
            <Footer></Footer>
        </div>
    );
};

export default AdminComments;
