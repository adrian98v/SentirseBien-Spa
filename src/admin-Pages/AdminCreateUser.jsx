import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import {db} from '../firebase'; // Asegúrate de importar tu configuración de Firebase
import '../admin.css'; // Importa los estilos personalizados
import SidebarMenu from '../admin-Components/MenuDesplegableAdmin';
import Header from '../HeaderAdmin';
import Footer from '../OtroFooter'; 
import RegisterForm from "../admin-Components/RegisterForm";

function AdminCreateUser() {
    
    return (
        <div>
            <Header />

            <SidebarMenu></SidebarMenu>
            <div>

            <RegisterForm />
            </div>
        </div>
    );
}

export default AdminCreateUser;
