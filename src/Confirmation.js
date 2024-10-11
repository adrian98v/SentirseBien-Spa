import './confirmation.css'
import Check from './assets/Eo_circle_green_checkmark.svg.png'
import { DataContext } from './App.js'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase.js"

function Successful(){

    const {fechaReserva, horaReserva, servicio, user} = useContext(DataContext)
    const history = useNavigate()


    async function updateReservas(){

        const updateReservas = doc(db, "reservas", user.email);

        if(fechaReserva && horaReserva && servicio){
            await updateDoc(updateReservas, {
                fechaReserva,
                horaReserva, 
                servicio, 
                estado:"pagado"
            });
        }
    }



    async function handleReserva() {
            await updateReservas(); // Espera a que termine la actualización
        }


    useEffect(()=>{

        handleReserva()
    
    },[])

    

    return <div className='successful_payment_container'>

        <img className='successful_green_check' alt='Green Check' src={Check}></img>

        <p className='successful_payment_p'>Reserva realizada con exito!</p>

        <p className='successful_payment_amount'>Fecha de la reserva: <strong>{fechaReserva}</strong></p>

        <p className='successful_payment_amount'>Hora de la reserva: <strong>{horaReserva}</strong></p>

        <p className='successful_payment_amount'><strong>Te esperamos!</strong></p>

        <div className='confirmation_buttons'>
            <button className='successful_button' onClick={()=>{history('/')}}>Volver</button> 
        </div>
        
    </div>
    
}

export default Successful