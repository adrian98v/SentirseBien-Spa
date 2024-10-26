//ProfesionalReserva.jsx
import React, { useEffect, useState, useContext } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import dayjs from 'dayjs';
import Header from '../HeaderProfes';
import Footer from '../OtroFooter';
import '../admin.css';
import { DataContext } from '../App';
import ProfesionalMenuDesplegable from '../profesional-componentes-paginas/ProfesionalMenuDesplegable';
import jsPDF from 'jspdf';
import img_logo from '../assets/Logo_SPA-removebg-preview.png';

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
                        estado: reserva.estadoPago,
                        Monto: reserva.Monto
                    });
                }
            });

            setReservas(reservasData);
        }
        if (role) {
            obtenerReservas(); // Solo obtener reservas cuando ya tenemos el rol del profesional
        }
    }, [role]);

    const generarPDF = (reserva) => {
        // Crear un nuevo documento con tamaño personalizado (A6 en lugar de A4)
        const doc = new jsPDF({
            format: [105, 148], // A6 tamaño en mm (más pequeño que A4)
        });
        const { width, height } = doc.internal.pageSize;
    
        const logoWidth = 40; // Reducir el ancho del logotipo
        const logoHeight = 30; // Reducir el alto del logotipo
    
        // Agregar la imagen al PDF
        doc.addImage(img_logo, 'PNG', width / 2 - logoWidth / 2, 10, logoWidth, logoHeight);
    
        // Configurar el diseño del PDF como un ticket
        doc.setFontSize(14); // Reducir el tamaño de la fuente para que se ajuste al tamaño del documento
        doc.text("COMPROBANTE DE RESERVA", width / 2, 50, { align: "center" });
        doc.setFontSize(10); // Reducir el tamaño de la fuente para los detalles
    
        // Agregar detalles de la reserva
        doc.text(`Email: ${reserva.email}`, width / 2, 65, { align: "center" });
        doc.text(`Servicio: ${reserva.servicio}`, width / 2, 75, { align: "center" });
        doc.text(`Fecha: ${reserva.fecha}`, width / 2, 85, { align: "center" });
        doc.text(`Monto: $${reserva.Monto}`, width / 2, 95, { align: "center" });
    
        // Agregar un borde al ticket
        doc.rect(5, 5, width - 10, height - 10);
    
        // Guardar el PDF
        doc.save(`comprobante_reserva_${reserva.id}.pdf`);
    };
    
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
                                    <button
                                    className="btn-generar-pdf"
                                    onClick={() => generarPDF(reserva)}
                                >
                                    Generar PDF
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