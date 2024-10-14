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

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [boolLogin, setBoolLogin] = useState(false);
    const { setUserFlag } = useContext(DataContext);

    const auth = getAuth();

    const handleLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then(async (res) => {
                setUserFlag(true);

                // Obtener el rol del usuario desde Firestore
                const userDoc = await getDoc(doc(db, "clientes", email));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const userRole = userData.role;

                    // Redireccionar según el rol
                    if (email === "admin1@gmail.com") {
                        history('/admin'); // Redirigir a la página de admin
                    } else if (userRole === "Masajista" || userRole === "Belleza" || userRole === "TratamientoCorporal" || userRole === "TratamientoFacial") {
                        history('/profesionales'); // Redirigir a la página de profesionales
                    } else if (userRole === "Secretaria") {
                        history('/secretaria'); // Redirigir a la página de secretaria
                    } else {
                        history('/'); // Redirigir a la página principal para otros usuarios
                    }
                } else {
                    console.log("El usuario no tiene información de rol en la base de datos.");
                    history('/'); // Redirigir a la página principal en caso de error
                }
            })
            .catch((error) => {
                setBoolLogin(true);
                console.log("Error de inicio de sesión:", error);
            });
    };

    return (
        <div className="login_page">
            <Link to='/'>
                <img src={Icono} className="login_logo" alt='amazon logo' />
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
