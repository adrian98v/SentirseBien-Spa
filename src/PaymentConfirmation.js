import './paymentConfirmation.css'
import Check from './assets/Eo_circle_green_checkmark.svg.png'
import { DataContext } from './App.js'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, updateDoc,  collection, addDoc, deleteDoc } from "firebase/firestore";
import dayjs from 'dayjs';
import { auth, db } from './firebase.js';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import sjcl from 'sjcl';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

function Successful(){

    const {setFechaReserva, setHoraReserva, fechaReserva, horaReserva, setUserFlag, setEmail, setPassword} = useContext(DataContext)
    const history = useNavigate()

    
  
    async function updateReservas() {
        const emailCifrado = sessionStorage.getItem('email');
        const passwordCifrado = sessionStorage.getItem('password');
        const fechaReservaDeStorage = sessionStorage.getItem('fechaReserva');
        const horaReservaDeStorage = sessionStorage.getItem('horaReserva');
        const servicioDeStorage = sessionStorage.getItem('servicio');
        const IDDeStorage = sessionStorage.getItem('IDPendiente');
    
        const key = process.env.REACT_APP_CONFIRMATION_KEY;
        // Desencriptar el email y la contraseña
        const emailDesencriptado = sjcl.decrypt(key, emailCifrado);
        const passwordDesencriptado = sjcl.decrypt(key, passwordCifrado);

        console.log("no se que pasa")
        console.log(typeof emailDesencriptado, typeof passwordDesencriptado)
        console.log(emailDesencriptado, passwordDesencriptado)




        // Iniciar sesión en Firebase con el email y contraseña desencriptados
        await signInWithEmailAndPassword(auth, emailDesencriptado, passwordDesencriptado)
            .then(async (res) => {
                setUserFlag(true);
                
            }).catch((error)=>{console.log(error)});
    
            
    
        setFechaReserva(fechaReservaDeStorage);
        setHoraReserva(horaReservaDeStorage);
        
        setEmail(emailDesencriptado)
        setPassword(passwordDesencriptado)

       
    
        // Obtener referencia a la colección 'reservas'
        const reservasRef = collection(db, "reservaCompleta");
    

        // Convertir fechaReserva a un objeto de fecha
        const fecha = fechaReservaDeStorage ? dayjs(fechaReservaDeStorage, 'DD/MM/YYYY') : null;
        
        
        const fechaConHora = fecha && horaReservaDeStorage 
        ? fecha.set('hour', parseInt(horaReservaDeStorage.split(':')[0])).set('minute', 0)
        : null;
    
        // Usar addDoc para agregar un nuevo documento sin especificar el ID
        await addDoc(reservasRef, {
            dia: fechaConHora ? fechaConHora.toDate() : null, 
            email: emailDesencriptado,
            estadoPago: "pagado",
            hora: horaReservaDeStorage,
            servicio: servicioDeStorage,
            userName: emailDesencriptado
        });

        console.log(IDDeStorage.id)

        // const reservaPendienteRef = await doc(db, "reservasPendientes", IDDeStorage);
        // await deleteDoc(reservaPendienteRef);
    }
    

    // async function updateReservas(){


    //     const emailCifrado = sessionStorage.getItem('email');
    //     const passwordCifrado = sessionStorage.getItem('password');
    //     const fechaReserva = sessionStorage.getItem('fechaReserva');
    //     const horaReserva = sessionStorage.getItem('horaReserva');

        


    //       // Desencriptar el email y la contraseña
    //     const emailDesencriptado = CryptoJS.AES.decrypt(emailCifrado, process.env.REACT_APP_CONFIRMATION_KEY).toString(CryptoJS.enc.Utf8);
    //     const passwordDesencriptado = CryptoJS.AES.decrypt(passwordCifrado, process.env.REACT_APP_CONFIRMATION_KEY).toString(CryptoJS.enc.Utf8);

    //     signInWithEmailAndPassword(auth, emailDesencriptado, passwordDesencriptado)
    //     .then(async (res) => {
    //         setUserFlag(true);})

    //     setFechaReserva(fechaReserva)
    //     setHoraReserva(horaReserva)


    //     // Obtener referencia a la colección 'reservas'
    //     const reservasRef = collection(db, "reservaCompleta");

    //     // Convertir fechaReserva a un objeto de fecha si es un string
    //     const fecha = fechaReserva ? dayjs(fechaReserva, 'DD/MM/YYYY') : null;
        
    //     const fechaConHora = fecha && horaReserva 
    //     ? fecha.set('hour', parseInt(horaReserva.split(':')[0])).set('minute', 0)
    //     : null;

    // // Usar addDoc para agregar un nuevo documento sin especificar el ID
    // await addDoc(reservasRef, {
    //     dia: fechaConHora ? fechaConHora.toDate() : null, 
    //             email: emailDesencriptado,
    //             estadoPago: "pagado",
    //             hora: horaReserva,
    //             servicio: servicio,
    //             userName: emailDesencriptado
    //         }
    //     );
    // }


    useEffect(()=>{

        updateReservas()

    }, [])



    return <div className='successful_payment_container'>

        <img className='successful_green_check' alt='Green Check' src={Check}></img>

        <p className='successful_payment_p'>Reserva pagada con exito!</p>

        <p className='successful_payment_amount'>Fecha de la reserva: <strong>{fechaReserva}</strong></p>

        <p className='successful_payment_amount'>Hora de la reserva: <strong>{horaReserva}</strong></p>

        <p className='successful_payment_amount'><strong>Te esperamos!</strong></p>

        <div className='confirmation_buttons'>
            <button className='successful_button' onClick={()=>{history('/')}}>Volver</button> 
        </div>
        
    </div>
    
}

export default Successful