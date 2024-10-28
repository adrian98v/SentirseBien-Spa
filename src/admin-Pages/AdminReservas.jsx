import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { jsPDF } from 'jspdf';
import '../admin.css'; 
import SidebarMenu from '../admin-Components/MenuDesplegableAdmin';
import Header from '../HeaderAdmin';
import Footer from '../OtroFooter';
import dayjs from 'dayjs';
import img_logo from '../assets/Logo_SPA-removebg-preview.png';
const AdminReservas = () => {
    const [reservasConfirmadas, setReservasConfirmadas] = useState([]); 
    const [reservasPendientes, setReservasPendientes] = useState([]); 

    useEffect(() => {
        async function obtenerReservas() {
            // Obtener reservas confirmadas
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
                    email: reserva.email,
                    monto: reserva.monto,
                    metodo: reserva.metodo || 'No especificado', // Añadir el atributo metodo
                    ...reserva
                });
            });

            // Obtener reservas pendientes
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
                    email: reserva.email,
                    Monto: reserva.monto || 'No especificado',
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
            alert("La reserva ha sido eliminada.");
        } catch (error) {
            console.error("Error al eliminar la reserva: ", error);
            alert("Hubo un error al eliminar la reserva.");
        }
    };

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
        doc.text(`Fecha: ${reserva.dia}`, width / 2, 85, { align: "center" });
        doc.text(`Monto: $${reserva.Monto}`, width / 2, 95, { align: "center" });
        doc.text(`Método de pago: ${reserva.metodo}`, width / 2, 105, { align: "center" }); // Añadir el método de pago
        doc.text(`ID reserva: ${reserva.id}`, width / 2, 115, { align: "center" }); // Añadir el ID de la reserva
        // Agregar un borde al ticket
        doc.rect(5, 5, width - 10, height - 10);
    
        // Guardar el PDF
        doc.save(`comprobante_reserva_${reserva.id}.pdf`);
    };
    
    return (
        <div>
            <Header />
            <SidebarMenu />
            <div className="admin-reservas">
                <h3>LISTA DE RESERVAS CONFIRMADAS</h3>
                {reservasConfirmadas.length > 0 ? (
                    reservasConfirmadas.map((reserva) => (
                        <div key={reserva.id} className="reserva-item">
                            <div className="reserva-datos">
                                <p><strong>Email del Cliente:</strong> {reserva.email}</p>
                                <p><strong>Servicio:</strong> {reserva.servicio}</p>
                                <p><strong>Fecha y Hora:</strong> {reserva.dia}</p>
                                <p><strong>Monto:</strong> ${reserva.Monto}</p>
                                <p>Método de Pago: {reserva.metodo}</p>
                                
                                <button
                                    className="btn-cancelar"
                                    onClick={() => eliminarReserva(reserva.id, "reservaCompleta")}
                                >
                                    Cancelar Reserva
                                </button>
                                <button
                                    className="btn-generar-pdf"
                                    onClick={() => generarPDF(reserva)} // Generar PDF al hacer click
                                >
                                    Generar Comprobante
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
                                <p><strong>Monto:</strong> ${reserva.Monto}</p>
                                <button
                                    className="btn-cancelar"
                                    onClick={() => eliminarReserva(reserva.id, "reservasPendientes")}
                                >
                                    Cancelar Reserva
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
};

export default AdminReservas;
