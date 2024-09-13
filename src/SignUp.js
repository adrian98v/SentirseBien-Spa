import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "./firebase.js"
import { useState, useContext } from "react"
import { Link, useNavigate} from "react-router-dom"
import Icono from './assets/Logo_VerdeOscuro-removebg-preview.png';
import './signup.css'
import { doc, setDoc } from "firebase/firestore"
import { DataContext } from './App.js';

function Sign_up(){

    const history = useNavigate()

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailExists, setEmailExists] = useState(false)
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    
    const {reservaCompleta, servicio} = useContext(DataContext)

    async function addNewDocument(){
        await setDoc(doc(db, "clientes", email), {country, city, address, email, 
            userName, reservaCompleta, servicio});
    }
   

    return <div className="sign_up_page">
        <Link to='/'>
             <img src={Icono} className="signup_logo" alt='amazon logo'></img>
        </Link>
        

        <div className="signup_container">
            <h2>Sign-up</h2>

            <form>

                <h4>Username</h4>

                <input type='text' value={userName} onChange={(e)=> {
                    setUserName(e.target.value)
                }}/>

                <h4>Address</h4>

                <input type='text' value={address} onChange={(e)=> {
                    setAddress(e.target.value)
                }}/>

                <h4>City</h4>

                <input type='text' value={city} onChange={(e)=> {
                    setCity(e.target.value)
                }}/>

                <h4>Country</h4>

                <input type='text' value={country} onChange={(e)=> {
                    setCountry(e.target.value)
                }}/>
                <h4>E-mail</h4>

                <input type='text' value={email} onChange={(e)=> {
                    setEmail(e.target.value)
                }}/>

                <span className="signup_mail_warning">{emailExists && "E-mail already exists"}</span>
                <span className="signup_mail_warning">{invalidEmail && "Invalid E-mail"}</span>

                <h4>Password</h4>

                <input type='password' value={password} onChange={e => {
                    setPassword(e.target.value)
                }}/>

                <span>{password.length < 6 && 'Password should be at least 6 characters'}</span>
            

                <button disabled={!userName || !address || !city || !country || !password} onClick={(e)=>{
                    e.preventDefault()

                    createUserWithEmailAndPassword(auth, email, password)
                        .then(()=> {         
                            history('/')
                            addNewDocument()
                            })
                        .catch((error) => {
                            if(error.message.includes("auth/email-already-in-use")) {setEmailExists(true)}
                            if(error.message.includes("auth/invalid-email")) {setInvalidEmail(true)}
                            console.log(error)})
                            

                }} className="signup_button">Sign up</button>
            </form>

            
        </div>
    </div>
}

export default Sign_up