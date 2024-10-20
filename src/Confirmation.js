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
    const [serviceLink, setServiceLink] = useState("")
    


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

    

    return <div className='successful_payment_container'>

        <img className='successful_green_check' alt='Green Check' src={Check}></img>

        <p className='successful_payment_p'>Reserva realizada con exito!</p>

        <p className='successful_payment_amount'>Fecha de la reserva: <strong>{fechaReserva}</strong></p>

        <p className='successful_payment_amount'>Hora de la reserva: <strong>{horaReserva}</strong></p>

        <p className='successful_payment_amount'><strong>Te esperamos!</strong></p>

        <div className='confirmation_buttons'>
            <button className='pay_button' onClick={async()=>{
                await saveInfo()
                window.location.href = serviceLink; // Redirigir en la misma pestaña
                }}>Pagar ahora</button>
            <button className='successful_button' onClick={()=>{history('/')}}>Volver</button> 
        </div>
        
    </div>
    
}

export default Successful