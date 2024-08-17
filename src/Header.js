import './header.css'
import Icono from './assets/Logo_VerdeOscuro-removebg-preview.png'


function Header(){

    return <div class='header'>
        <div class='icono'>
            <img src={Icono} className='icono' alt='logo'></img>
        </div>
        
        <div class='opciones'>
            <button>Acerca de</button>
            <button>Citas</button>
            <button>Servicios</button>
            <button>Contacto</button>
        </div>

        <button className='login'>Iniciar Sesión</button>
    </div>
}

export default Header