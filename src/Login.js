import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import './login.css'
import Icono from './assets/Logo_VerdeOscuro-removebg-preview.png';
// import {auth} from './firebase.js'
// import { signInWithEmailAndPassword } from "firebase/auth"
import { DataContext } from "./App.js"



function Login(){

    const history = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [boolLogin, setBoolLogin] = useState(false)
    // const {setUserFlag} = useContext(DataContext)

    return <div className="login_page">
        <Link to='/'>
             <img src={Icono} className="login_logo" alt='amazon logo'></img>
        </Link>
        
        {/* Login form */}

        <div className="login_container">
            <h2>Iniciar sesión</h2>

            <form>

                <h4>E-mail</h4>

                <input type='text' value={email} onChange={(e)=> {
                    setEmail(e.target.value)
                }}/>

                <h4>Contraseña</h4>

                <input type='password' value={password} onChange={e => {
                    setPassword(e.target.value)
                }}/>

                <button onClick={(e)=>{
                    // e.preventDefault()

                    // signInWithEmailAndPassword(auth, email, password)
                    // .then(res => {
                    //     setUserFlag(true)
                    //     history('/')})
                    // .catch(error => {
                    //     setBoolLogin(true)
                    // })

                }} className="login_button">Iniciar sesión</button>
            </form>

            <div className="login_fail">
                <span>{boolLogin && 'Wrong e-mail and password'}</span>
            </div>

        </div>
        
        
        <button className="login_create_account_button" onClick={()=>{history('/signup')}}>Crear una cuenta</button>
        
        
    </div>
}



export default Login