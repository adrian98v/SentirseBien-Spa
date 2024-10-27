// Header.js
import './header.css';
import Icono from './assets/Logo_VerdeOscuro-removebg-preview.png';
import { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from './App.js';
import { signOut } from 'firebase/auth';
import { auth } from './firebase.js';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { setUserFlag, userFlag, user, userName, role } = useContext(DataContext); // Obtener el userRole del contexto
    const history = useNavigate();


    // Verifica si el usuario es administrador
    const isAdmin = user && userName === "admin1@gmail.com";

    // Verificaciones de rol en lugar de correos electrónicos específicos
    const isMasajista = user && role === "Masajista"; // Agregado "user &&" para verificar si está logueado
    const isBelleza = user && role === "Belleza"; // Agregado "user &&" para verificar si está logueado
    const isTratamientoCorporal = user && role === "TratamientoCorporal"; // Agregado "user &&" para verificar si está logueado
    const isTratamientoFacial = user && role === "TratamientoFacial"; // Agregado "user &&" para verificar si está logueado
    const isSecretaria = user && role === "Secretaria"; // Agregado "user &&" para verificar si está logueado

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
                <button onClick={() => { history('/about'); setMenuOpen(!menuOpen)}}>Sobre nosotros</button>
                <button onClick={() => { history('/citas'); setMenuOpen(!menuOpen) }}>Citas</button>
                <button onClick={() => { history('/servicios'); setMenuOpen(!menuOpen) }}>Servicios</button>
                <button onClick={() => { history('/contacto'); setMenuOpen(!menuOpen) }}>Contacto</button>
                <button onClick={() => { history('/noticias'); setMenuOpen(!menuOpen) }}>Noticias</button>

                {user && (
                <button onClick={() => { history('/misreservas'); setMenuOpen(!menuOpen) }}>Ir a Pagina Cliente</button>
                )}
                
                {/* Botón "Admin" que solo aparece si el usuario es administrador */}
                {isAdmin && (
                    <button onClick={() => { history('/admin'); setMenuOpen(!menuOpen) }}>Admin</button>
                )}

                {/* Botones por profesional que solo aparecen si el usuario está logueado y es del área correspondiente */}
                {isMasajista && (
                    <button onClick={() => { history('/profesionales'); setMenuOpen(!menuOpen) }}>Profesional - Masajista</button>
                )}

                {isBelleza && (
                    <button onClick={() => { history('/profesionales'); setMenuOpen(!menuOpen) }}>Profesional - Belleza</button>
                )}

                {isTratamientoCorporal && (
                    <button onClick={() => { history('/profesionales'); setMenuOpen(!menuOpen) }}>Profesional - Tratamiento Corporal</button>
                )}

                {isTratamientoFacial && (
                    <button onClick={() => { history('/profesionales'); setMenuOpen(!menuOpen) }}>Profesional - Tratamiento Facial</button>
                )}

                {/* Botón "Secretaria" que solo aparece si el usuario es una secretaria */}
                {isSecretaria && (
                    <button onClick={() => { history('/secretaria'); setMenuOpen(!menuOpen) }}>Secretaria</button>
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
                {userFlag ? "Cerrar sesión" : "Iniciar sesión"}
            </button>
        </div>
    );
}

export default Header;
