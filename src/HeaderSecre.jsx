import './HeaderProfes.css'; // header usa mismo css que profesionales
import Icono from './assets/Logo_VerdeOscuro-removebg-preview.png';
import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { DataContext } from './App.js';
import { signOut } from 'firebase/auth';
import { auth } from './firebase.js';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { setUserFlag, userFlag, user } = useContext(DataContext);
    const history = useNavigate();

    return (
        <div className={`header ${menuOpen ? 'active' : ''}`}>
            <div className='icono'>
                {/* Elimina el Link para que el logo no redirija */}
                <img src={Icono} className='icono' alt='logo'></img>
            </div>
            
            <button className='menu-toggle' onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? 'Cerrar' : 'Menú'}
            </button>
            
            <div className='opciones'>
                {/* Cambia la ruta para que redirija a la página Secretaria */}
                <button onClick={() => { history('/secretaria') }}>SECTOR SECRETARIAS/OS</button>
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
