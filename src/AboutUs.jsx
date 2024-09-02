import React from 'react';
import './AboutUs.css';
import fondo1 from './img/fondo1.png';
import fondo2 from './img/fondo2.png';
import fondo3 from './img/fondo3.png';
import fondo4 from './img/fondo4.png';
import fondo5 from './img/fondo5.png';


function AboutUs() {
    return (
        <div className="about-us-container">
            <div className="about-us-text">
            <h1>Quienes Somos</h1>
                <p>
                    La Dra. Felicidad, fundadora de nuestro consultorio de belleza "Sentirse Bien", ha dedicado más de 20 años a perfeccionar el arte del bienestar y la belleza. Con una pasión innata por la salud holística y una formación rigurosa en dermatología y terapias alternativas, la Dra. Felicidad ha creado un espacio donde la ciencia y el lujo se encuentran. Su visión es simple: brindar a cada cliente una experiencia transformadora que despierte todos los sentidos.
                </p>
                <p>
                    A lo largo de su carrera, la Dra. Felicidad ha sido reconocida internacionalmente por su enfoque innovador y su dedicación incansable al cuidado personal. Su equipo, cuidadosamente seleccionado, comparte su compromiso con la excelencia, y juntos, han ganado numerosos premios en el campo de la estética y el bienestar. 
                </p>
                <p>
                    En "Sentirse Bien", creemos que cada visita debe ser un viaje hacia la renovación, donde cuerpo, mente y espíritu se alinean para crear un estado de total armonía. Ven y descubre por qué nuestros clientes salen sintiéndose revitalizados y llenos de energía.
                </p>
            </div>
            <div className="about-us-images">
                <img src={fondo1} alt="Descripción de la primera imagen" />
                <img src={fondo2} alt="Descripción de la segunda imagen" className="rotate-image"/>
            </div>
            
            <hr className="section-divider" />


            {/* Nueva sección debajo */}
            <div className="about-us-container">
                <div className="about-us-text">
                <h1>Reconocimientos Internacionales</h1>
                    <p>
                    La excelencia en el cuidado de la belleza y el bienestar que ofrece la Dra. Felicidad ha trascendido fronteras. Su dedicación y enfoque innovador no han pasado desapercibidos, y en los últimos años, ha sido galardonada con múltiples reconocimientos por parte de prestigiosas asociaciones médicas europeas.
                    </p>
                    <p>
                    En 2022, la Dra. Felicidad fue honrada con el Premio Europeo a la Innovación en Dermatología, otorgado por la Asociación de Dermatología de París, en reconocimiento a su contribución pionera en el campo de las terapias holísticas aplicadas a la estética. Este premio destacó no solo su conocimiento técnico, sino también su capacidad para integrar la ciencia médica con técnicas que promueven el bienestar integral.
                    </p>
                    <p>
                    El equipo de "Sentirse Bien" también ha sido parte de este éxito. En 2023, durante el Congreso Internacional de Estética de Barcelona, fueron reconocidos con el Premio a la Excelencia en Terapias de Rejuvenecimiento, una distinción que se otorga a aquellos que sobresalen en el desarrollo de tratamientos que combinan eficacia y experiencia sensorial. Este logro es un testimonio del compromiso colectivo del equipo con la calidad y la innovación en cada servicio que ofrecemos.
                    </p>
                    <p>
                    Estos reconocimientos reflejan nuestro compromiso continuo con la excelencia y nuestra misión de ofrecer a nuestros clientes lo mejor en cuidado personal. Seguiremos avanzando con la misma pasión y dedicación que nos ha llevado hasta aquí, siempre buscando nuevas formas de mejorar y enriquecer la experiencia de quienes nos visitan.
                    </p>

                    
                </div>
                <div className="about-us-images">
                <img src={fondo3} alt="Descripción de la primera imagen" />
                <img src={fondo5} alt="Descripción de la primera imagen" className="rotate-image"/>
                <img src={fondo4} alt="Descripción de la segunda imagen" />
                </div>
            </div>
            

        </div>
        

        




    );
}

export default AboutUs;