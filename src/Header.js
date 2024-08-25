import './header.css';
import Icono from './assets/Logo_VerdeOscuro-removebg-preview.png';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const history = useNavigate();

    return (
        <div className={`header ${menuOpen ? 'active' : ''}`}>
            <div className='icono'>
                
            <Link to='/'>
                <img src={Icono} className='icono' alt='logo'></img>
            </Link>
                
            </div>
            
            <button className='menu-toggle' onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? 'Cerrar' : 'Menú'}
            </button>
            
            <div className='opciones'>
                <button onClick={()=>{history('/about')}}>Acerca de</button>
                <button onClick={()=>{history('/citas')}}>Citas</button>
                <button onClick={()=>{history('/servicios')}}>Servicios</button>
                <button onClick={()=>{history('/contacto')}}>Contacto</button>
            </div>

            <button className='login' onClick={()=>{history('/login')}}>Iniciar Sesión</button>
        </div>
    );
}

export default Header;
