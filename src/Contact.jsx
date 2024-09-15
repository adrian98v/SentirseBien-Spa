import React from "react";

import { MdOutlinePhoneIphone } from "react-icons/md";
import { LuMapPin,LuInstagram,LuFacebook } from "react-icons/lu";
import { SiGmail, SiTiktok } from "react-icons/si";
import Footer from "./Footer";
import FooterSegundo from "./OtroFooter";

import './Contact.css';


function Contact(){
    return(
      <div className="Contact">
            <h1 className="titulo">Contacto:</h1>
        <section className="section1">

            <section className="section1_izquierda section1_div">
                <div className="Circulo">
                    <MdOutlinePhoneIphone size={70}/>
                </div>
                <h2>Telefonos:</h2>
                <p>+555 434 3422</p>
                <p>+555 123 6343</p>
               
            </section>
            
            <section className="section1_medio section1_div">
                <div className="Circulo">
                    <LuMapPin size={70}/>
                </div>
                    <h2>Direccion:</h2>
                    <p>Julio A.Roca, 1534</p>
                    <p>Resistencia, Chaco</p>
            </section>

            <section className="section1_derecha section1_div">
                <div className="Circulo">
                    <SiGmail size={70}/>
                </div>
                <h2>Correos:</h2>
                <p>SpaSentirsebien@gmail.com</p>
                <p>DocFelicidadSB@gmail.com</p>
            </section>
            
        </section>
        
        <section className="section2">
            <div className="section2_redes">
                <h1 className="titulo">Seguinos en nuestras redes:</h1>
                <div className="Redes">
                    <div className="parte_Insagram partes">

                        <div className="Instagram Circulo_redes">
                            <LuInstagram size={70}/>
                        </div>
                        <h2>Instagram</h2>
                    </div>
                    
                    <div className="parte_Facebook partes">
                        <div className="Facebook Circulo_redes">
                            <LuFacebook size={70}/>
                        </div>
                        <h2>Facebook</h2>
                    </div>

                    <div className="parte_TikTok partes">
                        <div className="TikTok Circulo_redes">
                            <SiTiktok size={70}/>
                        </div>
                        <h2>TikTok</h2>
                    </div>

                </div>
            </div>

            <div className="section2_map">
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.3935114535384!2d-58.51940622339367!3d-34.568908255662116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb704f959e4b7%3A0xcef6f928ff78c28e!2sJ.A.%20Roca%201534%2C%20B1650%20Villa%20Maip%C3%BA%2C%20Provincia%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1sen!2sus!4v1724718827306!5m2!1sen!2sus"
                className="Mapa"
                style={{ border: 0}}
                allowFullScreen=""
                loading="lazy"
            ></iframe>
            </div>

        </section>
        
    
      </div>    
      
      
    );
    
    
}
export default Contact;