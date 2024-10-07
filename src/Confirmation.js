import './confirmation.css'
import Check from './assets/Eo_circle_green_checkmark.svg.png'
import { DataContext } from './App.js'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Successful(){

    const {fechaReserva, horaReserva, servicio, user} = useContext(DataContext)
    const history = useNavigate()

    return <div className='successful_payment_container'>

        <img className='successful_green_check' alt='Green Check' src={Check}></img>

        <p className='successful_payment_p'>Reserva realizada con exito!</p>


        <p className='successful_payment_amount'><strong>Te esperamos!</strong></p>

        <div className='confirmation_buttons'>
            <button className='successful_button' onClick={()=>{history('/')}}>Volver</button> 
        </div>
        
    </div>
    
}

export default Successful