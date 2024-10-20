import React, { useEffect, useState, useContext } from 'react'; 
import { db } from './firebase'; 
import { collection, query, orderBy, getDocs, updateDoc, doc } from 'firebase/firestore';
import Header from './HeaderProfes';  
import Footer from './OtroFooter'; 
import './admin.css';
import { DataContext } from './App';
import ProfesionalMenuDesplegable from "./profesional-componentes-paginas/ProfesionalMenuDesplegable";

function Profesionales() {
   

    return (
        <div className="admin-page">
        <Header />
        <ProfesionalMenuDesplegable></ProfesionalMenuDesplegable>
        <div className="admin-intro">
                <h1>Bienvenido, Profesional</h1>
                <p>
                    Esta es tu sección dedicada, donde podrás gestionar tus reservas, revisar la
                    información de tus citas y actualizar tu disponibilidad. Gracias por formar
                    parte de nuestro equipo y brindar un excelente servicio a nuestros clientes.
                </p>
            </div>
        <Footer />
        </div>
    );
}

export default Profesionales;