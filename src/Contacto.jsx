import React from "react";
import "./Contacto.css";
import { LuYoutube,LuInstagram,LuFacebook } from "react-icons/lu";

function Contacto(){
    return(
        <div className="Principal">
            <div className="Contacto">

                <div className="parte_Izq">
                    
                    <h1>¡Contáctanos!</h1>
                    <h3>En Sentirse Bien, estamos aquí para ayudarte a encontrar el equilibrio perfecto entre cuerpo, mente y espíritu. Si tienes alguna pregunta sobre nuestros servicios, deseas reservar una cita o simplemente necesitas más información, no dudes en ponerte en contacto con nosotros. Nuestro equipo amable y profesional estará encantado de asistirte.</h3>
                    <h2>Telefonos:</h2>
                    <h3>+54 3624 256699<br/>+54 3625 293546</h3>
                    <h2>Dirección:</h2>
                    <h3>Julio A. Roca, 1466</h3>
                    <h3>Resistencia, Chaco</h3>
                    <h2>Correos Electrónicos:</h2>
                    <h3>sentirsebienspa004@gmail.com</h3>
                    <h2 className="TextoFinal">¡No dudes en ponerte en contacto con nosotros! Estamos aquí para asistirte y esperamos poder ofrecerte una experiencia de bienestar inigualable.</h2>
                    
                    <div className="redes_Sociales">
                        <div className="instagram red">
                            <a href="https://www.instagram.com/sentirsebien_spa/" target="_blank">
                                <LuInstagram size={40} />
                            </a>
                            
                        </div>
                        
                        <div className="youtube red">
                            <a href="https://www.youtube.com/@Sentirse-Bien-Spa" target="_blank">
                                <LuYoutube size={40} />
                            </a>
                            
                        </div>

                        <div className="facebook red">
                            <a href="https://www.facebook.com/profile.php?id=61565586311256" target="_blank">
                                <LuFacebook size={40} />
                            </a>
                            
                        </div>
                    </div>
                </div>
                <div className="parte_derecha">
                    <div className="mapa">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d885.2333150002306!2d-59.00112693036926!3d-27.440190608300686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94450c6551428645%3A0x86b0f8794a49b6e1!2sJulio%20Argentino%20Roca%201466%2C%20H3506ASQ%20Resistencia%2C%20Chaco!5e0!3m2!1ses!2sar!4v1726380696501!5m2!1ses!2sar"
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                
                    <div className="FormContacto">
                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeAGLkn1wvS3UMFZC5mJJ2Gy5MbVZI4BNbDaBVFbS6UHiNAUg/viewform?embedded=true" width="640" height="600" frameborder="0" marginheight="0" marginwidth="0" className="formGoogle">Loading…</iframe>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Contacto;