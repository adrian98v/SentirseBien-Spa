import React from 'react';
import './footerSegundo.css';
import logo from './assets/logoCarpinchos.png';

function FooterSegundo() {
    return (
        <div className='segundo_footer'>
            <div className="footer-left"></div> {/* Sección vacía a la izquierda */}
            
            <div className="footer-center">
                <img src={logo} alt="Logo" className="logo-footer" />
                <label>Carpinchos Inc ©</label>
            </div>
            
            <div className="footer-right">
                <label>Contacto: tel 3624-019118</label>
                
            </div>
        </div>
    );
}

export default FooterSegundo;