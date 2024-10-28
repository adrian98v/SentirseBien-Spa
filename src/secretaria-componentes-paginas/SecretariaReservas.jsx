import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs, deleteDoc, doc ,where} from 'firebase/firestore';
import Header from '../HeaderSecre';
import Footer from '../OtroFooter';
import '../admin.css'; // ADMIN, PROFES y SECRES usan el mismo CSS
import SecretariaMenuDesplegable from './SecretariaMenuDesplegable';
import dayjs from 'dayjs';
import { jsPDF } from 'jspdf'; // Asegúrate de importar jsPDF
import img_logo from '../assets/Logo_SPA-removebg-preview.png';
function SecretariaReservas() {
    const [reservasConfirmadas, setReservasConfirmadas] = useState([]); 
    const [reservasPendientes, setReservasPendientes] = useState([]); 
    const [ingresoTotal, setIngresoTotal] = useState(0);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [metodoPagoFiltro, setMetodoPagoFiltro] = useState('cualquiera'); // Nueva variable para el filtro
    useEffect(() => {
        async function obtenerReservas() {
            const qConfirmadas = query(collection(db, "reservaCompleta"), orderBy('dia', 'asc'));
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
                    monto: reserva.monto || 0, // Asegurarse de que el monto sea un número
                    metodo: reserva.metodo || 'No especificado', // Añadir el atributo metodo
                    ...reserva
                });
                total += reserva.Monto;
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
                    Monto: reserva.monto || 'No especificado',
                    ...reserva
                });
            });

            setIngresoTotal(total);
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
    const filtrarReservasPorFechas = async () => {
        if (!fechaInicio || !fechaFin) {
            alert("Por favor, seleccione ambas fechas.");
            return;
        }
    
        const startDate = dayjs(fechaInicio).startOf('day').toDate();
        const endDate = dayjs(fechaFin).endOf('day').toDate();
    
        // Define la consulta base sin el filtro de metodo
        const qConfirmadas = query(
            collection(db, "reservaCompleta"),
            where('dia', '>=', startDate),
            where('dia', '<=', endDate),
            orderBy('dia', 'asc')
        );
    
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
                monto: reserva.monto || 0,
                metodo: reserva.metodo || 'No especificado',
                tipoServicio: reserva.servicio || 'No especificado', // Asegúrate de que 'tipoServicio' esté presente
                ...reserva
            });
        });
    
        // Filtrar los resultados en el cliente
        const reservasFiltradas = metodoPagoFiltro !== "cualquiera" ? reservasDataConfirmadas.filter(reserva => reserva.metodo === metodoPagoFiltro)  : reservasDataConfirmadas;
        
        let total = 0;
        // Itera sobre reservasFiltradas y suma los montos
        reservasFiltradas.forEach(reserva => {
            total += reserva.Monto || 0; // Asegúrate de que 'monto' sea un número
        });
    
        console.log("Reservas filtradas:", reservasFiltradas); // Para depuración
        console.log("Ingreso total calculado:", total); // Para depuración
    
        setReservasConfirmadas(reservasFiltradas);
        setIngresoTotal(total);
    };


const generarPDFGeneral = () => {
    const doc = new jsPDF({
        format: 'a4', // Puedes ajustar el tamaño según tus necesidades
    });
    const { width, height } = doc.internal.pageSize;

    // Configuración del logo
    const logoWidth = 50; // Ancho del logo
    const logoHeight = 30; // Alto del logo

    // Añadir el logo
    doc.addImage(img_logo, 'PNG', width / 2 - logoWidth / 2, 10, logoWidth, logoHeight);
    
    // Título
    doc.setFontSize(14);
    doc.text("COMPROBANTE DE RESERVAS", width / 2, 50, { align: "center" });
    
    // Separador
    doc.setDrawColor(200); // Color del separador
    doc.setLineWidth(0.5);
    doc.line(10, 55, width - 10, 55); // Línea horizontal
    
    // Establecer el tamaño de fuente para los datos
    doc.setFontSize(10);
    
    // Encabezados de la tabla
    const headers = ["Email", "Fecha", "Monto", "Método de Pago", "Tipo de Servicio"];
    
    // Posición de los encabezados
    headers.forEach((header, index) => {
        doc.text(header, 14 + (index * 40), 65);
    });
    
    // Añadir datos de reservas
    let currentY = 75; // Comienza a dibujar reservas en esta posición vertical
    const reservasData = reservasConfirmadas.map(reserva => [
        reserva.email,
        reserva.dia,
        `$${reserva.Monto.toFixed(2)}`, // Asegúrate de formatear el monto
        reserva.metodo,
        reserva.servicio || 'No especificado',
    ]);
    
    reservasData.forEach((row) => {
        row.forEach((item, colIndex) => {
            doc.text(item, 14 + (colIndex * 40), currentY);
        });
        // Dibuja una línea horizontal después de cada reserva
        currentY += 10; // Espaciado entre la línea y la siguiente reserva
        doc.setDrawColor(0 , 0 ,0); // Color de la línea
        doc.setLineWidth(0.7);
        doc.line(10, currentY, width - 10, currentY); // Línea horizontal
        currentY += 5; // Espacio adicional después de la línea
    });

    // Total
    doc.text(`Ingreso Total: $${ingresoTotal.toFixed(2)}`, width - 50, currentY + 10);

    // Guardar el PDF
    doc.save("reservas.pdf");
};

    return (
        <div className="admin-page">
            <Header />
            <SecretariaMenuDesplegable />
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
                <p>Método de Pago:</p>
                    <select value={metodoPagoFiltro} onChange={(e) => setMetodoPagoFiltro(e.target.value)}>
                        <option value="cualquiera">Cualquiera</option>
                        <option value="credito">Credito</option>
                        <option value="debito">Debito</option>
                    </select>
                <button onClick={filtrarReservasPorFechas} className='btn-filtrar'>Filtrar Reservas</button>

                <h3>Ingreso Total: ${ingresoTotal}</h3>
                <button onClick={generarPDFGeneral} disabled={reservasConfirmadas.length === 0} className='btn-filtrar'>
                 Descargar PDF de Reservas
                </button>
                </div>
                {reservasConfirmadas.length > 0 ? (
                    reservasConfirmadas.map((reserva) => (
                        <div key={reserva.id} className="reserva-item">
                            <div className="reserva-datos">
                                <p><strong>Email del Cliente:</strong> {reserva.email}</p>
                                <p><strong>Servicio:</strong> {reserva.servicio}</p>
                                <p><strong>Fecha y Hora:</strong> {reserva.dia}</p>
                                <p><strong>Estado:</strong> {reserva.estadoPago}</p>
                                <p><strong>Monto:</strong> ${reserva.Monto}</p>
                                <p>Método de Pago: {reserva.metodo}</p>
                                <button
                                    className="btn-cancelar"
                                    onClick={() => eliminarReserva(reserva.id, "reservaCompleta")}
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
