import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import './login.css';
import Icono from './assets/Logo_VerdeOscuro-removebg-preview.png';
import { auth, db } from './firebase.js';
import { DataContext } from "./App.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function Login() {
    const history = useNavigate();
    
    const { setUserFlag, email, password, setEmail, setPassword, boolLogin, setBoolLogin } = useContext(DataContext);
    const auth = getAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Primero iniciar sesión usando Firebase Auth
            const res = await signInWithEmailAndPassword(auth, email, password);
            setUserFlag(true);

            // Ahora obtener el documento del usuario usando el email exacto
            const userDocRef = doc(db, "clientes", email);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                const userRole = userData.role;
                const storedEmail = userDoc.id; // El ID del documento es el email almacenado
                
                // Verificar si el email es exactamente igual (case-sensitive)
                if (storedEmail === email) {
                    // Redireccionar según el rol del usuario
                    if (email === "admin1@gmail.com") {
                        history('/admin'); // Redirigir a la página de admin
                    } else if (["Masajista", "Belleza", "TratamientoCorporal", "TratamientoFacial"].includes(userRole)) {
                        history('/profesionales'); // Redirigir a la página de profesionales
                    } else if (userRole === "Secretaria") {
                        history('/secretaria'); // Redirigir a la página de secretaria
                    } else {
                        history('/'); // Redirigir a la página principal para otros usuarios
                    }
                } else {
                    console.log("El email no coincide exactamente (case-sensitive).");
                    setBoolLogin(true); // Mostrar error de inicio de sesión
                }
            } else {
                console.log("El usuario no tiene información de rol en la base de datos.");
                setBoolLogin(true); // Mostrar error de inicio de sesión
            }
        } catch (error) {
            console.log("Error de inicio de sesión:", error);
            setBoolLogin(true); // Mostrar error de inicio de sesión
        }
    };

    return (
        <div className="login_page">
            <Link to='/'>
                <img src={Icono} className="login_logo" alt='logo' />
            </Link>

            <div className="login_container">
                <h2>Iniciar sesión</h2>

                <form>
                    <h4>E-mail</h4>
                    <input
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <h4>Contraseña</h4>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button onClick={handleLogin} className="login_button">
                        Iniciar sesión
                    </button>
                </form>

                <div className="login_fail">
                    <span>{boolLogin && 'Correo electrónico o contraseña incorrectos'}</span>
                </div>
            </div>

            <button className="login_create_account_button" onClick={() => { history('/signup'); }}>
                Crear una cuenta
            </button>
        </div>
    );
}

export default Login;
