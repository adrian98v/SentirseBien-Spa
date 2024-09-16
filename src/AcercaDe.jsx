import React from 'react'

import Footer from './Footer.js'
import FooterSegundo from './OtroFooter.js'
import './AcercaDe.css';
import DraFelicidad from "./img/DraFelicidad.webp"
import { BsCalendarDate,BsStopwatch  } from "react-icons/bs";
import { FaMedal } from "react-icons/fa6";


function AcercaDe(){
    return(
    

    <div className='Section_1'>
        <h1 className='Titulo'>SOBRE NOSOTROS</h1>
        <div className='Izq'>
            <img src={DraFelicidad} alt="img Dra" className='Section_1_Img' />
            <h2 className='text'>La Dra. Felicidad, fundadora de nuestro consultorio de belleza "Sentirse Bien", ha dedicado más de 20 años a perfeccionar el arte del bienestar y la belleza. Con una pasión innata por la salud holística y una formación rigurosa en dermatología y terapias alternativas, la Dra. Felicidad ha creado un espacio donde la ciencia y el lujo se encuentran. Su visión es simple: brindar a cada cliente una experiencia transformadora que despierte todos los sentidos.</h2>
        </div>

        <div className='Der'>
            <h2 className='text'>En "Sentirse Bien", creemos que cada visita debe ser un viaje hacia la renovación y el equilibrio profundo. Nuestro SPA es un santuario de tranquilidad donde el cuerpo, la mente y el espíritu se alinean para crear un estado de total armonía y bienestar.Nuestro equipo de profesionales altamente capacitados se dedica a proporcionarte un servicio excepcional, combinando conocimientos avanzados con una atención sincera a cada detalle.</h2>
            <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/yINohy8lfyY?si=5sKVJWI7X9euG1Gr" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className='Section_1_Video'>
            </iframe>

        </div>

        <div className='Premios'>
            <div className="calendar iconos">
            <BsCalendarDate size={50}></BsCalendarDate>
            <p className='CalendarioData '>Lunes a Sabados</p>

            </div>
            <div className="horario iconos">
            <BsStopwatch size={50}></BsStopwatch>
            <p >8hs a 20hs</p>
            </div>
            <div className="medalla iconos">
                <FaMedal size={50}></FaMedal>
                <p className="Medalla ">+8 Reconocimientos</p>
            </div>

            
        </div>
        <Footer></Footer>
        <FooterSegundo></FooterSegundo>
    </div>
    
)}

export default AcercaDe;