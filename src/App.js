import './App.css';
import Header from './Header.js'
import Citas from './Citas.js'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {createContext, useEffect, useState} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import Home from './Home.js'
import Login from './Login.js'
import Contact from './Contact.jsx';
import AboutUs from './AboutUs.jsx';
import Services from './Services.js';
import Footer from './Footer.js';
import FooterSegundo from './OtroFooter.js';
import SignUp from './SignUp.js'
import Confirmation from './Confirmation.js'
import { auth } from "./firebase.js"

export const DataContext = createContext()

function App() {

  
  const [user, setUser] = useState(null)
  const [userFlag, setUserFlag] = useState(false)
  const [userName, setUserName] = useState("")
  const [fechaReserva, setFechaReserva] = useState(null)
  const [horaReserva, setHoraReserva] = useState(null)
  const [reservaCompleta, setReservaCompleta] = useState({})
  const [horariosTomados, setHorariosTomados] = useState([])
  const [servicio, setServicio] = useState("")

// Authorization observer used in order to know when a user is logged in

useEffect(()=>{

  onAuthStateChanged(auth, (authUser)=>{
    if(authUser !== null && userFlag) {
      setUser(authUser)
    }
    else {
      setUser(null)
    }
  })
}, [userFlag])

 
  return (
    <DataContext.Provider value={
      {user,
      userFlag, setUserFlag,
      userName, setUserName, fechaReserva, setFechaReserva, 
      horaReserva, setHoraReserva, reservaCompleta, setReservaCompleta,
      horariosTomados, setHorariosTomados,
      servicio, setServicio}}>

      <Router>

        <div className="App">
          <Routes>
  
            <Route path="/citas" element={<>
              <Header/>
              <Citas/> 
              
            </>}/>

            <Route path="/login" element={<>
              <Login/>
            </>}/>

            <Route path="/" element={<>
              <Header/>
              <Home/> 
              
            </>}/>
            <Route path="/servicios" element={<>
              <Header/>
              <Services/> 
              <Footer></Footer>
              <FooterSegundo></FooterSegundo>
              
            </>}/>
            <Route path="/about" element={<>
              <Header/>
              <AboutUs/> 
              
              <Footer></Footer>
              <FooterSegundo></FooterSegundo>
              
            </>}/>
            <Route path="/contacto" element={<>
              <Header/>
              <Contact/> 
              
              
            </>}/>


            <Route path="/signup" element={<><SignUp/></>}/>

            <Route path="/confirmation" element={<>
              <Header/>
              <Confirmation/> 
              
            </>}/>

          </Routes>


          
        </div>

      </Router>

    </DataContext.Provider>
    
  );
}

export default App;
