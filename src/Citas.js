import './citas.css'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { useState } from 'react';
import 'dayjs/locale/es';
import Footer from './Footer.js'
import FooterSegundo from './OtroFooter.js'

function Citas(){

    const startOfYear = dayjs(); // Primer día del año actual

    const [fechaReserva, setFechaReserva] = useState(dayjs())
    
    console.log(fechaReserva)

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
                        <LocalizationProvider adapterLocale="es" dateAdapter={AdapterDayjs} id='calendario'>
                            <DateCalendar id='custom-calendar'
                            minDate={startOfYear} onChange={(newDate)=>{setFechaReserva(newDate)}}/>

                            <TimePicker ampm={true}></TimePicker>
                        </LocalizationProvider>

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