import './header.css';
import Icono from './assets/Logo_VerdeOscuro-removebg-preview.png';
import { useState } from 'react';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className={`header ${menuOpen ? 'active' : ''}`}>
            <div className='icono'>
                <img src={Icono} className='icono' alt='logo'></img>
            </div>
            
            <button className='menu-toggle' onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? 'Cerrar' : 'Menú'}
            </button>
            
            <div className='opciones'>
                <button>Acerca de</button>
                <button>Citas</button>
                <button>Servicios</button>
                <button>Contacto</button>
            </div>

            <button className='login'>Iniciar Sesión</button>
        </div>
    );
}

export default Header;
