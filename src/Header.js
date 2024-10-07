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
    // Verifica si el usuario es un profesional
    const isProfesional = user && userName === "profesional1@gmail.com";
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

                {/* Botón "Profesionales" que solo aparece si el usuario es un profesional */}
                {isProfesional && (
                    <button onClick={() => { history('/profesionales') }}>Profesionales</button>
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