import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, deleteDoc, doc, where } from 'firebase/firestore';
import { db } from '../firebase';
import { jsPDF } from 'jspdf';
import '../admin.css'; 
import SidebarMenu from '../admin-Components/MenuDesplegableAdmin';
import Header from '../HeaderAdmin';
import Footer from '../OtroFooter';
import dayjs from 'dayjs';
import img_logo from '../assets/Logo_SPA-removebg-preview.png';

const AdminIngresos = () => {
    const [reservasConfirmadas, setReservasConfirmadas] = useState([]); 
    const [reservasPendientes, setReservasPendientes] = useState([]); 
    const [ingresoTotal, setIngresoTotal] = useState(0);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    useEffect(() => {
        obtenerReservas();
    }, []);

    const obtenerReservas = async () => {
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
                monto: reserva.monto || 0, // Asegurarse de que el monto sea un número
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
                ...reserva
            });
        });

        setReservasConfirmadas(reservasDataConfirmadas);
        setReservasPendientes(reservasDataPendientes);
    };

    const filtrarReservasPorFechas = async () => {
        if (!fechaInicio || !fechaFin) {
            alert("Por favor, seleccione ambas fechas.");
            return;
        }

        const startDate = dayjs(fechaInicio).startOf('day').toDate();
        const endDate = dayjs(fechaFin).endOf('day').toDate();

        const qConfirmadas = query(
            collection(db, "reservaCompleta"),
            where('dia', '>=', startDate),
            where('dia', '<=', endDate),
            orderBy('dia', 'asc')
        );

        const querySnapshotConfirmadas = await getDocs(qConfirmadas);
        const reservasDataConfirmadas = [];
        let total = 0;

        querySnapshotConfirmadas.forEach((doc) => {
            const reserva = doc.data();
            if (reserva.dia && reserva.dia.seconds) {
                reserva.dia = dayjs(reserva.dia.toDate()).format('DD/MM/YYYY HH:mm');
            }
            reservasDataConfirmadas.push({
                id: doc.id,
                email: reserva.email,
                monto: reserva.monto || 0, // Asegurarse de que el monto sea un número
                ...reserva
            });

            total += reserva.Monto || 0;
        });

        setReservasConfirmadas(reservasDataConfirmadas);
        setIngresoTotal(total);
    };

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
        const doc = new jsPDF({
            format: [105, 148], // A6 tamaño en mm (más pequeño que A4)
        });
        const { width, height } = doc.internal.pageSize;

        const logoWidth = 40;
        const logoHeight = 30;

        doc.addImage(img_logo, 'PNG', width / 2 - logoWidth / 2, 10, logoWidth, logoHeight);
        doc.setFontSize(14);
        doc.text("COMPROBANTE DE RESERVA", width / 2, 50, { align: "center" });
        doc.setFontSize(10);

        doc.text(`Email: ${reserva.email}`, width / 2, 65, { align: "center" });
        doc.text(`Servicio: ${reserva.servicio}`, width / 2, 75, { align: "center" });
        doc.text(`Fecha: ${reserva.dia}`, width / 2, 85, { align: "center" });
        doc.text(`Monto: $${reserva.Monto}`, width / 2, 95, { align: "center" });

        doc.rect(5, 5, width - 10, height - 10);
        doc.save(`comprobante_reserva_${reserva.id}.pdf`);
    };

    return (
        <div>
            <Header />
            <SidebarMenu />
            <div className="admin-reservas">
                <h3>LISTA DE RESERVAS CONFIRMADAS</h3>
                <div className='seccion-filtro'>
                <p>Fecha Inicio:</p>
                <input 
                    type="date" 
                    value={fechaInicio} 
                    onChange={(e) => setFechaInicio(e.target.value)} 
                />
                <p>Fecha Fin:</p>
                <input 
                    type="date" 
                    value={fechaFin} 
                    onChange={(e) => setFechaFin(e.target.value)} 
                />
                <button onClick={filtrarReservasPorFechas} className='btn-filtrar'>Filtrar Reservas</button>

                <h3>Ingreso Total: ${ingresoTotal}</h3>
                </div>

                {reservasConfirmadas.length > 0 ? (
                    reservasConfirmadas.map((reserva) => (
                        <div key={reserva.id} className="reserva-item">
                            <div className="reserva-datos">
                                <p><strong>Email del Cliente:</strong> {reserva.email}</p>
                                <p><strong>Servicio:</strong> {reserva.servicio}</p>
                                <p><strong>Fecha y Hora:</strong> {reserva.dia}</p>
                                <p><strong>Monto:</strong> ${reserva.Monto}</p>
                                <button
                                    className="btn-cancelar"
                                    onClick={() => eliminarReserva(reserva.id, "reservaCompleta")}
                                >
                                    Cancelar Reserva
                                </button>
                                <button
                                    className="btn-generar-pdf"
                                    onClick={() => generarPDF(reserva)}
                                >
                                    Generar Comprobante
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay reservas confirmadas.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default AdminIngresos;
