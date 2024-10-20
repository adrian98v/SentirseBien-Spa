import React, { useState } from 'react';
import { HiOutlineMenu } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import '../admin-Components/MenuDesplegableAdmin.css'; // Estilos personalizados para el menú

function SidebarMenu() {
    const [menuAbierto, setMenuAbierto] = useState(false);

    // Función para alternar el menú
    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    return (
        <div>
            {/* Botón para abrir/cerrar el menú */}
            <button className="menu-button" onClick={toggleMenu}>
                <HiOutlineMenu />
            </button>

            {/* Menú desplegable */}
            {menuAbierto && (
                <div className="menu-desplegable">
                    {/* Opciones de navegación */}
                    <nav className="menu-opciones">
                        <Link to="/profesionales" onClick={toggleMenu}>Inicio</Link>
                        <Link to="/reservasProfesionales" onClick={toggleMenu}>Reservas</Link>
                    </nav>
                </div>
            )}
        </div>
    );
}

export default SidebarMenu;
