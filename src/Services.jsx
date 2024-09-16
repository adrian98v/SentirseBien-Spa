import React from "react";
import "./Services.css";
import Footer from "./Footer";
import FooterSegundo from "./OtroFooter";
import imagenes_servicio from "./Components/imagenes_servicio.jsx";
import { green } from "@mui/material/colors";




function Services(){
    return(
        <div className="principal">
            <div className="opc_servicios">
       
                <div className="serv_Masaje serv">
                    <img src={imagenes_servicio.masajeDescontracturante} alt="img_masaje" className="img" />
                    <h1>MASAJES</h1>
                    <a href="#Masajes" className="boton">VER MÁS DETALLES</a>
                </div>

                <div className="serv_Belleza serv">
                    <img src={imagenes_servicio.bellezaManosyPies} alt="" className="img" />
                    <h1>BELLEZA</h1>
                    <a href="#Belleza" className="boton">VER MÁS DETALLES</a>
                </div>

                <div className="serv_TratFaciales serv">
                    <img src={imagenes_servicio.tratFacialLimpiezaProfunda} alt="" className="img" />
                    <h1>TRATAMIENTOS FACIALES</h1>
                    <a href="#Facial" className="boton">VER MÁS DETALLES</a>
                </div>

                <div className="serv_TratCorporales serv">
                    <img src={imagenes_servicio.tratCorporalCrioFrecuencia} alt="" className="img" />
                    <h1>TRATAMIENTOS CORPORALES</h1>
                    <a href="#Corporal" className="boton">VER MÁS DETALLES</a>
                </div>
            
            </div>
            <div className="DescripcionServicios">
                <div className="Descripcion" id="Masajes">
                    <h1>MASAJES DISPONIBLES:</h1>
                    <div className="container">

                        <div className='seccion'>
                            <img src={imagenes_servicio.masajeAntiStress} alt="" className="imagenDeServicios" />
                            <h2>Anti-stress: Relaja la mente y el cuerpo a través de técnicas suaves y controladas que alivian el estrés acumulado en el día a día. Estos masajes están diseñados para calmar el sistema nervioso, mejorar la circulación sanguínea y restaurar el equilibrio energético. Ideal para quienes buscan una desconexión profunda y renovadora.
                            <br />Costo: $8,000</h2>
                            
                        </div>
                        <div className='seccion'>
                            <img src={imagenes_servicio.masajeCirculatorio} alt="" className="imagenDeServicios" />
                            <h2>Circulatorios: Estimula la circulación sanguínea y linfática mediante técnicas suaves pero efectivas. Ideal para quienes sufren de piernas cansadas, hinchazón o retención de líquidos, ayudando a mejorar el flujo y oxigenación de los tejidos. <br />Costo: $7,000</h2>
                        </div>
                        <div className='seccion'>
                            <img src={imagenes_servicio.masajeDescontracturante} alt="" className="imagenDeServicios" />
                            <h2>Descontracturantes: Alivia tensiones y contracturas musculares producidas por el estrés, malas posturas o el ejercicio físico. Utilizando movimientos más firmes y específicos, este masaje libera la rigidez y devuelve la flexibilidad a los músculos afectados.<br/>Costo: $9,000</h2>
                        </div>
                        <div className='seccion'>
                            <img src={imagenes_servicio.masajePiedras} alt="" className="imagenDeServicios" />
                            <h2>Masajes con piedras calientes: Combina el masaje tradicional con la aplicación de piedras calientes volcánicas, las cuales ayudan a relajar los músculos en profundidad. Las piedras transmiten calor y energía, lo que permite una sensación de alivio y bienestar duradero. <br />Costo: $10,000</h2>
                        </div>
                    </div>
                </div>
                        
                <div className="Descripcion" id="Belleza">
                    <h1>SERVICIOS DE BELLEZA DISPONIBLES:</h1>
                    <div className="container">
                        <div className='seccion'>
                            <img src={imagenes_servicio.bellezaDepilacionFacial} alt="" className="imagenDeServicios" />
                            <h2> Depilación facial:Elimina el vello no deseado del rostro de manera precisa y efectiva, dejando la piel suave y libre de irritaciones. Este tratamiento también incluye una exfoliación ligera para una piel radiante y lisa. <br />Costo: $5,000</h2>
                        </div>
                        <div className='seccion'>
                            <img src={imagenes_servicio.bellezaLiftingPestaña} alt="" className="imagenDeServicios" />
                            <h2>Lifting de pestañas: Realza la curvatura natural de tus pestañas, logrando una mirada más abierta y definida sin la necesidad de utilizar extensiones. El efecto dura semanas, proporcionando una apariencia natural y elegante. <br />Costo: $8,000</h2>
                        </div>
                        <div className='seccion'>
                            <img src={imagenes_servicio.bellezaManosyPies} alt="" className="imagenDeServicios" />
                            <h2>Manos y Pies: Disfruta de un tratamiento completo que hidrata y embellece tus manos y pies. Incluye corte, limado, exfoliación y esmaltado para un acabado impecable y duradero. ¡Perfecto para lucir una piel suave y uñas impecables. <br />Costo: $15,000</h2>
                        </div>

                    </div>
                </div>

                <div className="Descripcion" id="Facial">
                    <h1>TRATAMIENTOS FACIALES DISPONIBLES:</h1>
                    <div className="container">

                        <div className='seccion'>
                            <img src={imagenes_servicio.tratFacialCrioFrecuencia} alt="" className="imagenDeServicios" />
                            <h2>Crio Frecuencia Facial: Reafirma y tonifica tu piel con este tratamiento avanzado que combina frío y radiofrecuencia. Reduce arrugas y líneas de expresión, mejorando la elasticidad y luminosidad del rostro para un efecto rejuvenecedor inmediato. <br />Costo: $11,000</h2>
                        </div>
                        <div className='seccion'>
                            <img src={imagenes_servicio.tratFacialLimpiezaProfunda} alt="" className="imagenDeServicios" />
                            <h2>Limpieza profunda + Hidratación: Este tratamiento incluye una limpieza exhaustiva de los poros seguida de una hidratación profunda, devolviendo a la piel su vitalidad y suavidad. Perfecto para quienes buscan una piel luminosa y libre de impurezas. <br />Costo: $8,000</h2>
                        </div>
                        <div className='seccion'>
                            <img src={imagenes_servicio.tratFacialPuntadiamante} alt="" className="imagenDeServicios" />
                            <h2>Punta de Diamante: Un tratamiento de microdermoabrasión que exfolia suavemente la piel, eliminando células muertas y promoviendo la regeneración celular. Ideal para mejorar la textura de la piel, suavizar líneas finas y minimizar manchas. <br />Costo: $8,500</h2>
                        </div>
                        
                    </div>
                </div>

                <div className="Descripcion" id="Corporal">
                    <h1>TRATAMIENTOS CORPORALES DISPONIBLES:</h1>
                    <div className="container">
                        <div className='seccion'>
                            <img src={imagenes_servicio.tratCorpDermoHealth} alt="" className="imagenDeServicios" />
                            <h2>DermoHealth: Un tratamiento que estimula la microcirculación de la piel y moviliza los distintos tejidos, generando un drenaje linfático eficaz. Es perfecto para combatir la celulitis, mejorar la textura de la piel y desintoxicar el cuerpo. <br />Costo: $7,500</h2>
                        </div>
                        <div className='seccion'>
                            <img src={imagenes_servicio.tratCorpUltraCavitacion} alt="" className="imagenDeServicios" />
                            <h2>Ultracavitación: Una técnica reductora no invasiva que utiliza ondas ultrasónicas para romper las células de grasa localizada, permitiendo una reducción de medidas significativa. Es ideal para quienes buscan esculpir su figura de manera segura. <br />Costo: $12,500</h2>
                        </div>
                        <div className='seccion'>
                            <img src={imagenes_servicio.tratCorpVelaSlim} alt="" className="imagenDeServicios" />
                            <h2>VelaSlim: Un tratamiento avanzado que ayuda a reducir la circunferencia corporal y la apariencia de la celulitis mediante la combinación de tecnologías como radiofrecuencia y succión. Ideal para modelar el cuerpo y mejorar la firmeza de la piel. <br />Costo: $12,000</h2>
                        </div>
                        <div className='seccion'>
                            <img src={imagenes_servicio.tratCorporalCrioFrecuencia} alt="" className="imagenDeServicios" />
                            <h2>Crio Frecuencia Corporal: Moldea y reafirma tu cuerpo con este tratamiento innovador que combina frío y radiofrecuencia. Ayuda a reducir la flacidez y mejorar la textura de la piel, brindando un efecto tonificante y rejuvenecedor en áreas específicas. <br />Costo: $14,000</h2>
                        </div>
                        
                    </div>
                </div>
            </div>
            <Footer></Footer>
            <FooterSegundo></FooterSegundo>
        </div>

        
    )
}
export default Services;