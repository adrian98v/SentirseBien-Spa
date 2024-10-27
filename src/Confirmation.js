import './confirmation.css'
import Check from './assets/Eo_circle_green_checkmark.svg.png'
import { DataContext } from './App.js'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, updateDoc,  collection, addDoc } from "firebase/firestore";
import { db } from "./firebase.js"
import dayjs from 'dayjs';
import sjcl from 'sjcl';


function Successful(){

    const {fechaReserva, horaReserva, servicio, user, email, password, IDPendienteState} = useContext(DataContext)
    const history = useNavigate()
    
    


    async function saveInfo(){

        const key = process.env.REACT_APP_CONFIRMATION_KEY;

        const encryptedEmail = sjcl.encrypt(key, email);
        const encryptedPassword = sjcl.encrypt(key, password);


        // Guarda los detalles de la reserva y del usuario en sessionStorage
        sessionStorage.setItem('fechaReserva', fechaReserva);
        sessionStorage.setItem('horaReserva', horaReserva);
        sessionStorage.setItem('email', encryptedEmail);
        sessionStorage.setItem('password', encryptedPassword);
        sessionStorage.setItem('servicio', servicio);
        sessionStorage.setItem('IDPendiente', IDPendienteState);

        
    }



    

    

    return <div className='successful_payment_container'>

        <img className='successful_green_check' alt='Green Check' src={Check}></img>

        <p className='successful_payment_p'>Reserva realizada con exito!</p>

        <p className='successful_payment_amount'>Fecha de la reserva: <strong>{fechaReserva}</strong></p>

        <p className='successful_payment_amount'>Hora de la reserva: <strong>{horaReserva}</strong></p>

        <p className='successful_payment_amount'><strong>Te esperamos!</strong></p>

        <div className='confirmation_buttons'>
            <button className='pay_button' onClick={async()=>{
                await saveInfo()
                history('/opcionPago')
                }}>Pagar ahora</button>
            <button className='successful_button' onClick={()=>{history('/')}}>Volver</button> 
        </div>
        
    </div>
    
}

export default Successful