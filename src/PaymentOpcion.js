import './paymentOpcion.css'
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from './App.js';
import { db } from "./firebase.js"

function PaymentOption(){

    const {servicio, metodoPago, setMetodoPago} = useContext(DataContext)

    const [serviceLink, setServiceLink] = useState("")



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

  


    return <div className='payment_container'>

        <div className='imagen_container'></div>
        <div className="paymentOption">

        <div className='text_container'>
            <p>Elija su método de pago</p>
        </div>
            <div className="creditoDebito_container">
                <button className="debitoButton" onClick={ ()=>{
                    // setMetodoPago("debito")
                    sessionStorage.setItem('metodo', "debito");
                    
                    window.location.href = serviceLink;

                }}>Débito</button>
                <button className="creditoButton" onClick={ ()=>{
                    // setMetodoPago("credito")
                    sessionStorage.setItem('metodo', "credito");
                    
                    window.location.href = serviceLink;
                    
                }}>Crédito</button>
                
            </div>
        </div>
    </div>
}

export default PaymentOption