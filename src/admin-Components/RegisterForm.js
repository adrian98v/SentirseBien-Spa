import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase.js";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Icono from '../assets/Logo_VerdeOscuro-removebg-preview.png';
import { doc, setDoc } from "firebase/firestore";
import { DataContext } from '../App.js';
import "./RegisterForm.css";

function Sign_up() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(""); // Nuevo estado para el rol
    const [emailExists, setEmailExists] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);

    const { reservaCompleta, servicio, horaReserva, fechaReserva } = useContext(DataContext);

    async function addNewDocument() {
        await setDoc(doc(db, "clientes", email), {
            email,
            userName,
            role, // Guardar el rol del usuario
            reservaCompleta,
            servicio
        });
    }

    async function addNewDocumentReservas() {
        await setDoc(doc(db, "reservas", email), {
            fechaReserva,
            horaReserva,
            servicio,
            estado: "pendiente"
        });
    }

    return (
        <div className="sign_up_page">
            <Link to='/'>
                <img src={Icono} className="signup_logo" alt='logo' />
            </Link>

            <div className="signup_container">
                <h2 className="titulo_form">Crear nuevo usuario:</h2>

                <form>
                    <h4>Usuario</h4>
                    <input type='text' value={userName} onChange={(e) => setUserName(e.target.value)} />

                    <h4>E-mail</h4>
                    <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <span className="signup_mail_warning">{emailExists && "E-mail ya existe"}</span>
                    <span className="signup_mail_warning">{invalidEmail && "E-mail inválido"}</span>

                    <h4>Contraseña</h4>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
                    <span>{password.length < 6 && 'La contraseña debe tener al menos 6 caracteres'}</span>

                    <h4>Rol</h4>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="">Seleccione un rol</option>
                        <option value="Masajista">Masajista</option>
                        <option value="Belleza">Belleza</option>
                        <option value="TratamientoCorporal">Tratamiento Corporal</option>
                        <option value="TratamientoFacial">Tratamiento Facial</option>
                        <option value="Secretaria">Secretaria</option>
                    </select>
                    <span>{!role && 'Debe seleccionar un rol'}</span>

                    <button
                        disabled={!userName || !password || !role}
                        onClick={(e) => {
                            e.preventDefault();

                            createUserWithEmailAndPassword(auth, email, password)
                                .then(() => {
                                    addNewDocument();
                                    addNewDocumentReservas();
                                    alert("Usuario creado correctamente");
                                })
                                .catch((error) => {
                                    if (error.message.includes("auth/email-already-in-use")) { setEmailExists(true); }
                                    if (error.message.includes("auth/invalid-email")) { setInvalidEmail(true); }
                                    console.log(error);
                                });
                        }}
                        className="signup_button"
                    >
                        Registrar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Sign_up;
