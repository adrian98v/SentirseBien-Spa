//Header.js
import './header.css';
import Icono from './assets/Logo_VerdeOscuro-removebg-preview.png';
import { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from './App.js';
import { signOut } from 'firebase/auth';
import { auth } from './firebase.js';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { setUserFlag, userFlag, user, userName } = useContext(DataContext);
    const history = useNavigate();

    // Verifica si el usuario es administrador
    const isAdmin = user && userName === "admin1@gmail.com";

    // Verificar si el usuario es un masajista
    const isMasajista = userName === "profesional1@gmail.com";

    // Verificar si el usuario es de belleza
    const isBelleza = userName === "profesional2@gmail.com";

    // Verificar si el usuario es de tratamiento corporal
    const isTratamientoCorporal = userName === "profesional3@gmail.com";

    // Verificar si el usuario es de tratamiento facial
    const isTratamientoFacial = userName === "profesional4@gmail.com";

    // Verifica si el usuario es secretaria
    const isSecretaria = user && userName === "secre1@gmail.com";

    return (
        <div className={`header ${menuOpen ? 'active' : ''}`}>
            <div className='icono'>
                <Link to='/'>
                    <img src={Icono} className='icono' alt='logo' />
                </Link>
            </div>

            <button className='menu-toggle' onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? 'Cerrar' : 'Menú'}
            </button>

            <div className='opciones'>
                <button onClick={() => { history('/about') }}>Acerca de</button>
                <button onClick={() => { history('/citas') }}>Citas</button>
                <button onClick={() => { history('/servicios') }}>Servicios</button>
                <button onClick={() => { history('/contacto') }}>Contacto</button>
                <button onClick={() => { history('/noticias') }}>Noticias</button>

                {/* Botón "Admin" que solo aparece si el usuario es administrador */}
                {isAdmin && (
                    <button onClick={() => { history('/admin') }}>Admin</button>
                )}

                {/* Botones por profesional que solo aparecen si el usuario es del área correspondiente */}
                {isMasajista && (
                    <button onClick={() => { history('/profesionales') }}>Profesional - Masajista</button>
                )}

                {isBelleza && (
                    <button onClick={() => { history('/profesionales') }}>Profesional - Belleza</button>
                )}

                {isTratamientoCorporal && (
                    <button onClick={() => { history('/profesionales') }}>Profesional - Tratamiento Corporal</button>
                )}

                {isTratamientoFacial && (
                    <button onClick={() => { history('/profesionales') }}>Profesional - Tratamiento Facial</button>
                )}

                {/* Botón "Secretaria" que solo aparece si el usuario es una secretaria */}
                {isSecretaria && (
                    <button onClick={() => { history('/secretaria') }}>Secretaria</button>
                )}
            </div>

            <button className='login' onClick={() => {
                if (user) {
                    signOut(auth);
                    setUserFlag(false);
                } else {
                    history('/login');
                }
            }}>
                {user ? "Cerrar sesión" : "Iniciar sesión"}
            </button>
        </div>
    );
}

export default Header;
