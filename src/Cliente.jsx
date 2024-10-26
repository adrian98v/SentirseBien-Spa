//Clientes.jsx
import React, { useEffect, useState, useContext } from 'react'; 
import { db } from './firebase'; 
import { collection, query, orderBy, getDocs, updateDoc, doc } from 'firebase/firestore';
import Header from './HeaderCliente';  
import Footer from './OtroFooter'; 
import './admin.css';
import { DataContext } from './App';
import ClienteMenuDesplegable from "./cliente-componentes-paginas/ClienteMenuDesplegable";


function Clientes() {
   

    return (
        <div className="admin-page">
        <Header />
        <ClienteMenuDesplegable></ClienteMenuDesplegable>
        <div className="admin-intro">
                <h1>Bienvenido!!!! </h1>
                <p>
                    Esta es tu sección podrás gestionar tus reservas, pagos y revisar la
                    información de tus citas. Gracias por elegirnos!!!!!.
                </p>
            </div>
        <Footer />
        </div>
    );
}

export default Clientes;