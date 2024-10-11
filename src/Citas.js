import './citas.css'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { useContext, useState, useEffect } from 'react';
import 'dayjs/locale/es';
import Footer from './Footer.js'
import FooterSegundo from './OtroFooter.js'
import { useNavigate } from 'react-router-dom';
import { DataContext } from './App.js';
import { doc, updateDoc,  collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase.js"

function Citas(){

    const startOfYear = dayjs();
    const endOfYear = dayjs().endOf('year'); // Último día del año actual
    
    const history = useNavigate();

    const [serviceLink, setServiceLink] = useState("")
    

    const {user, horaReserva, setHoraReserva, 
        fechaReserva, setFechaReserva,
        horariosTomados, setHorariosTomados,
        servicio, setServicio} = useContext(DataContext)
    


    async function updateReserva(){
        const updateCliente = doc(db, "clientes", user.email);

        if(fechaReserva && horaReserva && servicio){
            await updateDoc(updateCliente, {
                reservaCompleta: {dia: fechaReserva,
                hora: horaReserva,
                },
                servicio: servicio
            });
        }
      
    }




    async function updateReservas(){

        const updateReservas = doc(db, "reservas", user.email);

        if(fechaReserva && horaReserva && servicio){
            await updateDoc(updateReservas, {
                fechaReserva,
                horaReserva, 
                servicio, 
                estado:"pendiente"
            });
        }
    }



    async function changeEstadoPendiente() {
            await updateReservas(); // Espera a que termine la actualización
        }




    async function handleReserva() {
        if (!user) {
            setFechaReserva(null);
            setHoraReserva(null);
        } else {
            
            await updateReserva(); // Espera a que termine la actualización
            await changeEstadoPendiente();
            // Abre el popup para Stripe con la URL del servicio
        const stripePopup = window.open(serviceLink, '_blank', 'width=500,height=600');

        // Monitorea el cierre del popup cada 1000ms
        const checkPopupClosed = setInterval(() => {
            if (stripePopup.closed) {
                clearInterval(checkPopupClosed); // Deja de monitorear el popup

                // Aquí puedes redirigir a la página de confirmación o mostrar el mensaje de éxito
                history('/confirmation'); // Esto redirige a la página de confirmación
            }
        }, 1000); // Cada 1000 ms se verifica si el popup fue cerrado
        }
    }
    

    async function getReservas(){
        setHorariosTomados([])
        const q = query(collection(db, "clientes"), where("servicio", "==", servicio));

        const querySnapshot = await getDocs(q);
        const nuevosHorarios = []; // Crear un array temporal para almacenar los nuevos horarios

        querySnapshot.forEach((doc) => {
            nuevosHorarios.push(doc.data().reservaCompleta); // Agregar cada reserva al array temporal
        });

        setHorariosTomados(nuevosHorarios);
        

    }
    
    useEffect(() => {
        setHorariosTomados([])   
 
    }, []); // Dependencia en servicio

    useEffect(() => {
        
        if(user) getReservas();
    }, [servicio]); // Dependencia en servicio


    useEffect(()=>{
        switch(servicio){
            case "Masaje AntiStress": setServiceLink("https://buy.stripe.com/test_aEUcPQaSm8NB5uE000"); break;
            case "Masaje Circulatorio": setServiceLink("https://buy.stripe.com/test_28o7vwaSm8NB7CM5kl"); break;
            case "Masaje Descontracturante": setServiceLink("https://buy.stripe.com/test_28o7vw7Ga5Bp0ak7su"); break;
            case "Masaje c/Piedras": setServiceLink("https://buy.stripe.com/test_9AQ034gcG8NBf5e5kn"); break;
            case "belleza Manos y Pies": setServiceLink("https://buy.stripe.com/test_6oEeXYf8C3thf5e5kq"); break;
            case "belleza Depilacion Facial": setServiceLink("https://buy.stripe.com/test_eVa1781hMaVJf5e004"); break;
            case "belleza Lifting Pestaña": setServiceLink("https://buy.stripe.com/test_5kAg22f8CfbZ1eo4gl"); break;
            case "facial CrioFrecuencia Facial": setServiceLink("https://buy.stripe.com/test_7sI8zAe4ygg3bT2fZ5"); break;
            case "facial LimpiezaProfunda+Hidr": setServiceLink("https://buy.stripe.com/test_9AQ4jkd0u1l96yIcMU"); break;
            case "facial PuntaDiamnte": setServiceLink("https://buy.stripe.com/test_8wM8zA8Ke4xl3mw28h"); break;
            case "corporal CrioFrecuencia Corpo": setServiceLink("https://buy.stripe.com/test_dR64jk5y29RF6yI5kx"); break;
            case "corporal DermoHealth": setServiceLink("https://buy.stripe.com/test_5kAdTU4tY3th6yI00a"); break;
            case "corporal Ultracavitacion": setServiceLink("https://buy.stripe.com/test_5kAeXY7Gad3RcX68wH"); break;
            case "corporal VelaSlim": setServiceLink("https://buy.stripe.com/test_6oEeXYf8CbZNf5e00c"); break;
        }

    }, [servicio])
   

    return <div className="citas">

        <div className='fondo_oscuro'></div>
        
        <div className='citas_contenedor'>
            <div className='seccion_reservas'>

                <div className='seccion_reservas_parrafo'>
                    <label>Reserva una cita con nosotros</label>
                    <p>En Sentirse Bien, creemos que cada visita es una oportunidad para rejuvenecer cuerpo y mente. 
                        Reserva tu cita con facilidad y déjanos cuidar de ti. 
                        Desde masajes relajantes hasta tratamientos faciales revitalizantes, 
                        estamos aquí para brindarte una experiencia personalizada y única. 
                        Tu bienestar es nuestra prioridad, y estamos comprometidos a ofrecerte el máximo confort y 
                        serenidad en cada visita. ¡Reserva hoy y descubre el arte de la relajación!</p>
                </div>


                <div className='calendario'>
                    <div className='calendarioHora'>

                        <div class="dropdown">
                            <button class="dropdown-button">{servicio == "" ? 'Servicio' : servicio.charAt(0).toUpperCase() + servicio.slice(1)}</button>
                            <div class="dropdown-content">
                            <button onClick={()=>{setServicio("Masaje AntiStress")}}>Masaje AntiStress</button>
                                <button onClick={()=>{setServicio("Masaje Circulatorio")}}>Masaje Circulatorio</button>
                                <button onClick={()=>{setServicio("Masaje Descontracturante")}}>Masaje Descontracturante</button>
                                <button onClick={()=>{setServicio("Masaje c/Piedras")}}>Masaje c/Piedras</button>

                                <button onClick={()=>{setServicio("belleza Manos y Pies")}}>Manos y Pies</button>
                                <button onClick={()=>{setServicio("belleza Depilacion Facial")}}>Depilacion Facial</button>
                                <button onClick={()=>{setServicio("belleza Lifting Pestaña")}}>Lifting Pestaña</button>

                                <button onClick={()=>{setServicio("facial CrioFrecuencia Facial")}}>CrioFrecuencia Facial</button>
                                <button onClick={()=>{setServicio("facial LimpiezaProfunda+Hidr")}}>LimpiezaProfunda+Hidr</button>
                                <button onClick={()=>{setServicio("facial PuntaDiamnte")}}>PuntaDiamnte</button>

                                <button onClick={()=>{setServicio("corporal CrioFrecuencia Corpo")}}>CrioFrecuencia Corpo</button>
                                <button onClick={()=>{setServicio("corporal DermoHealth")}}>DermoHealth</button>
                                <button onClick={()=>{setServicio("corporal Ultracavitacion")}}>Ultracavitacion</button>
                                <button onClick={()=>{setServicio("corporal VelaSlim")}}>VelaSlim</button>
                            </div>
                        </div>

                        <LocalizationProvider adapterLocale="es" dateAdapter={AdapterDayjs} id='calendario'>
                            <DateCalendar id='custom-calendar'
                            
                            shouldDisableDate={(date) => {
                                const day = date.day();
                                
                                const objetoFecha = horariosTomados[0]


                                if(objetoFecha && user) {return day === 0  }
                               
                                
                            }
                                
                            }


                            minDate={startOfYear} maxDate={endOfYear} onChange={(newDate)=>{
                                const formattedDate = dayjs(newDate).format('DD/MM/YYYY');  // Formato personalizado
                                setFechaReserva(formattedDate)
                                
                            }}/>


<TimePicker 
    minTime={dayjs().set('hour', 8).startOf('hour')}
    maxTime={dayjs().set('hour', 20).startOf('hour')}
    views={['hours']}

    shouldDisableTime={(value, view) => {
        // Verifica si la vista actual es 'hours'
        if (view === 'hours' && horariosTomados.length > 0 && fechaReserva) {
            // Recorre las reservas existentes
            for (let i = 0; i < horariosTomados.length; i++) {
                const reserva = horariosTomados[i];
                // Compara la fecha de la reserva con la fecha seleccionada
                if (reserva.dia === fechaReserva) {
                    // Obtén la hora reservada (primero asegurando que tiene el formato adecuado)
                    const horaReservada = reserva.hora.substring(0, 2);  // Solo la parte de la hora
                    // Convierte la hora actual (del TimePicker) al mismo formato de 2 dígitos
                    let horaActual = value.hour().toString();
                    if (horaActual.length === 1) {
                        horaActual = "0" + horaActual;
                    }
                    // Si la hora del TimePicker coincide con la hora reservada, la deshabilita
                    if (horaActual === horaReservada) {
                        return true;
                    }
                }
            }
        }
        return false;
    }}
    
    onChange={(e) => {
        const formattedTime = dayjs(e).format('HH:mm');  // Formato de 24 horas
        setHoraReserva(formattedTime);
    }}
/>

                            
                        </LocalizationProvider>

                        <button 
    className='reservar_button' 
    onClick={handleReserva}
    style={{ 
        pointerEvents: (!horaReserva || !fechaReserva || servicio === "") ? "none" : "auto",
        opacity: (!horaReserva || !fechaReserva || servicio === "") ? 0.5 : 1 
    }} 
>
    Reservar
</button>



                    </div>
                    
                </div>
            </div>


            <div className="politicas">
                <label>Políticas de Reserva</label>

                <div className='politicas_container'>
                    <div className='politica_cancelacion'>
                        <label className='cancelacion_label'>Política de Cancelación:</label>
                        <p className='cancelacion_parrafo'>Las cancelaciones o cambios de cita deben realizarse con al menos 24 horas de anticipación para evitar cargos. 
                            Las cancelaciones realizadas con menos de 24 horas de antelación estarán sujetas a un cargo del 50% del valor del servicio. 
                            Las citas no canceladas o las ausencias se cobrarán en su totalidad.
                        </p>
                    </div>
                    
                    <div className='politica_retraso'>
                        <label className='retraso_label'>Política de Llegada Tardía:</label>
                        <p className='retraso_parrafo'>Te recomendamos llegar al menos 15 minutos antes de tu cita para disfrutar de una experiencia sin prisas. 
                            Si llegas tarde, intentaremos ofrecerte el tiempo completo de tu tratamiento, pero esto no siempre será posible. 
                            Las llegadas tardías pueden resultar en una reducción del tiempo de tratamiento sin una reducción del precio.
                        </p>
                    </div>

                    <div className='politica_edad'>
                        <label className='edad_label'>Política de Edad Mínima:</label>
                        <p className='edad_parrafo'>Por razones de seguridad y para asegurar un ambiente de tranquilidad, todos los clientes deben tener al menos 16 años para acceder a los servicios de spa.
                             Los menores de edad deben estar acompañados por un adulto en todo momento. 
                            Algunos tratamientos específicos pueden estar restringidos a mayores de 18 años.
                        </p>
                    </div>
                </div>
            </div>


            <Footer></Footer>

            <FooterSegundo></FooterSegundo>
            
        </div>

    </div>
}


export default Citas