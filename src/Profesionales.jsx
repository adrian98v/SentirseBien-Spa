import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import './login.css';
import Icono from './assets/Logo_VerdeOscuro-removebg-preview.png';
import { auth } from './firebase.js';
import { DataContext } from "./App.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    const history = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [boolLogin, setBoolLogin] = useState(false);
    const { setUserFlag } = useContext(DataContext);
    const { role } = useContext(DataContext); // Obtener el rol del contexto

    const auth = getAuth();

    const handleLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                setUserFlag(true);

                // Verificar el rol y redirigir en función de este
                if (role === "Admin") {
                    history('/admin'); // Redirigir a la página de admin
                } else if (["Masajista", "Belleza", "TratamientoFacial", "TratamientoCorporal"].includes(role)) {
                    history('/profesionales'); // Redirigir a la página de profesionales
                } else if (role === "Secretaria") {
                    history('/secretaria'); // Redirigir a la página de secretaria
                } else {
                    history('/'); // Redirigir a la página principal para otros usuarios
                }
            })
            .catch(error => {
                setBoolLogin(true);
            });
    };

    return (
        <div className="login_page">
            <Link to='/'>
                <img src={Icono} className="login_logo" alt='Logo'></img>
            </Link>

            {/* Login form */}
            <div className="login_container">
                <h2>Iniciar sesión</h2>

                <form onSubmit={handleLogin}>
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

                    <button type="submit" className="login_button">Iniciar sesión</button>
                </form>

                <div className="login_fail">
                    <span>{boolLogin && 'E-mail o contraseña incorrectos'}</span>
                </div>
            </div>

            <button className="login_create_account_button" onClick={() => history('/signup')}>
                Crear una cuenta
            </button>
        </div>
    );
}

export default Login;
