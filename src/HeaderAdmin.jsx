import './HeaderAdmin.css';
import Icono from './assets/Logo_VerdeOscuro-removebg-preview.png';
import { useState, useContext} from 'react';
import { Link, useNavigate } from "react-router-dom"
import { DataContext } from './App.js';
import { signOut } from 'firebase/auth'
import { auth } from './firebase.js';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const {setUserFlag, userFlag, user} = useContext(DataContext);

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
                
                <button onClick={() => {history('/admin')}}>SECTOR PARA ADMINISTRADORA "DRA FELICIDAD"</button>

            </div>

            <button className='login' onClick={()=>{

                if(user){
                    signOut(auth)
                    setUserFlag(false)
                }else{
                    history('/login')
                } 
                
                }}>{userFlag ? "Cerrar sesión" : "Iniciar sesión"}</button>
        </div>
    );
}

export default Header;