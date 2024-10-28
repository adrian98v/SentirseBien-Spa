import React, { useState } from 'react';
import { HiOutlineMenu } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import './MenuDesplegableAdmin.css'; // Estilos personalizados para el menú

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
                        <Link to="/admin" onClick={toggleMenu}>Inicio</Link>
                        <Link to="/createUser" onClick={toggleMenu}>Crear Usuario</Link>
                        <Link to="/comentarios" onClick={toggleMenu}>Comentarios</Link>
                        <Link to="/ingresos" onClick={toggleMenu}>Reservas + Ingresos</Link>
                    </nav>
                </div>
            )}
        </div>
    );
}

export default SidebarMenu;
