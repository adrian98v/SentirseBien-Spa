import './citas.css'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { useState } from 'react';
import 'dayjs/locale/es';

function Citas(){

    const startOfYear = dayjs().startOf('year'); // Primer día del año actual

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
                    <LocalizationProvider adapterLocale="es" dateAdapter={AdapterDayjs} id='calendario'>
                        <DateCalendar id='custom-calendar'
                        minDate={startOfYear} onChange={(newDate)=>{setFechaReserva(newDate)}}/>

                    </LocalizationProvider>
                </div>
            </div>


<div className="politicas"></div>
        </div>

    </div>
}


export default Citas