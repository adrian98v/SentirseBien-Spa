
//ReservasCliente.jsx
import React, { useEffect, useState, useContext, useCallback } from 'react'; 
import { db } from '../firebase'; 
import { collection, query, where, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Header from '../HeaderCliente';  
import Footer from '../OtroFooter'; 
import '../admin.css'; 
import { DataContext } from '../App.js';
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'; 
import jsPDF from 'jspdf';
import sjcl from 'sjcl';
import img_logo from '../assets/Logo_SPA-removebg-preview.png';


function ClienteReservas() {
    const [reservasPagadas, setReservasPagadas] = useState([]);  
    const [reservasPendientes, setReservasPendientes] = useState([]);  
    const { user, password } = useContext(DataContext); 
    const history = useNavigate()

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
    
        // Agregar un borde al ticket
        doc.rect(5, 5, width - 10, height - 10);
    
        // Guardar el PDF
        doc.save(`comprobante_reserva_${reserva.id}.pdf`);
    };
    

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

    // Función para cancelar manualmente una reserva pagada
    const cancelarReservaPagada = async (idReserva) => {
        try {
            await deleteDoc(doc(db, "reservaCompleta", idReserva)); // Elimina de la colección de reservas pagadas
            setReservasPagadas(reservasPagadas.filter((reserva) => reserva.id !== idReserva));
            alert("La cita pagada ha sido cancelada.");
        } catch (error) {
            console.error("Error al cancelar la cita pagada: ", error);
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
                                onClick={() => cancelarReservaPagada(reserva.id)}
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

                            <button 
                                className="btn-pagar"
                                    onClick={async () => {

                                        const fechaDeReserva = reserva.dia.toString()

                                        const soloFecha = fechaDeReserva.slice(0, -5).trim();

                                        const key = process.env.REACT_APP_CONFIRMATION_KEY;

                                        const encryptedEmail = sjcl.encrypt(key, reserva.email);
                                        const encryptedPassword = sjcl.encrypt(key, password);

                                        // Guarda los detalles de la reserva y del usuario en sessionStorage
                                        sessionStorage.setItem('fechaReserva', soloFecha);
                                        sessionStorage.setItem('horaReserva', reserva.hora);
                                        sessionStorage.setItem('email', encryptedEmail);
                                        sessionStorage.setItem('password', encryptedPassword);
                                        sessionStorage.setItem('servicio', reserva.servicio);
                                        sessionStorage.setItem('IDPendiente', reserva.id);

                                        const miServicio = reserva.servicio;
                                        // switch(miServicio){
                                        //     case "Masaje AntiStress": window.location.href = "https://buy.stripe.com/test_aEUcPQaSm8NB5uE000"; break;
                                        //     case "Masaje Circulatorio": window.location.href = "https://buy.stripe.com/test_28o7vwaSm8NB7CM5kl"; break;
                                        //     case "Masaje Descontracturante": window.location.href = "https://buy.stripe.com/test_28o7vw7Ga5Bp0ak7su"; break;
                                        //     case "Masaje c/Piedras": window.location.href = "https://buy.stripe.com/test_9AQ034gcG8NBf5e5kn"; break;
                                        //     case "belleza Manos y Pies": window.location.href = "https://buy.stripe.com/test_6oEeXYf8C3thf5e5kq"; break;
                                        //     case "belleza Depilacion Facial": window.location.href = "https://buy.stripe.com/test_eVa1781hMaVJf5e004"; break;
                                        //     case "belleza Lifting Pestaña": window.location.href = "https://buy.stripe.com/test_5kAg22f8CfbZ1eo4gl"; break;
                                        //     case "facial CrioFrecuencia Facial": window.location.href = "https://buy.stripe.com/test_7sI8zAe4ygg3bT2fZ5"; break;
                                        //     case "facial LimpiezaProfunda+Hidr": window.location.href = "https://buy.stripe.com/test_9AQ4jkd0u1l96yIcMU"; break;
                                        //     case "facial PuntaDiamnte": window.location.href = "https://buy.stripe.com/test_8wM8zA8Ke4xl3mw28h"; break;
                                        //     case "corporal CrioFrecuencia Corpo": window.location.href = "https://buy.stripe.com/test_dR64jk5y29RF6yI5kx"; break;
                                        //     case "corporal DermoHealth": window.location.href = "https://buy.stripe.com/test_5kAdTU4tY3th6yI00a"; break;
                                        //     case "corporal Ultracavitacion": window.location.href = "https://buy.stripe.com/test_5kAeXY7Gad3RcX68wH"; break;
                                        //     case "corporal VelaSlim": window.location.href = "https://buy.stripe.com/test_6oEeXYf8CbZNf5e00c"; break;
                                        // }

                                        history('/opcionPago')
                                        
                                    }} // Asegúrate de implementar esta función
                                    >
                                Pagar Reserva
                            </button>
                        </div>
                    </div>
                )) : <p>No tienes reservas pendientes de pago.</p>}
            </div>
            <Footer />
        </div>
    );
}

export default ClienteReservas;