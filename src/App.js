//App.js
import './App.css';
import Header from './Header.js'
import Citas from './Citas.js'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import {createContext, useEffect, useState} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import Home from './Home.js'
import Login from './Login.js'
import Contacto from './Contacto.jsx';
import Services from './Services.jsx';
import Footer from './Footer.js';
import FooterSegundo from './OtroFooter.js';
import SignUp from './SignUp.js'
import Confirmation from './Confirmation.js'
import { auth } from "./firebase.js"
import AcercaDe from './AcercaDe.jsx';
import Noticias from './Noticias.jsx';
import Admin from './admin.jsx'; 
import Profesionales from './Profesionales.jsx'; // Importa el nuevo componente para profesionales
import Secretaria from './Secretaria.jsx'; // Importa el nuevo componente para secretaria

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
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser !== null) {
        setUser(authUser);
        setUserName(authUser.email);
      } else {
        setUser(null);
        setUserName("");
      }
    });
  }, [userFlag]);

  // Componente para ruta protegida (Admin)
  const ProtectedRouteAdmin = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    } else if (userName !== "admin1@gmail.com") { // Reemplaza con el email del usuario Admin
      return <Navigate to="/" />;
    }
    return children;
  };

  const ProtectedRouteProfesional = ({ children }) => {
    const allowedEmails = [
      "profesional1@gmail.com",
      "profesional2@gmail.com",
      "profesional3@gmail.com",
      "profesional4@gmail.com"
    ];
  
    if (!user) {
      return <Navigate to="/login" />;
    } else if (!allowedEmails.includes(userName)) {
      // Verifica si el email del usuario está en la lista de correos permitidos
      return <Navigate to="/" />;
    }
  
    return children;
  };

   // Componente para ruta protegida (Secretaria)
   const ProtectedRouteSecretaria = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    } else if (userName !== "secre1@gmail.com") { 
      return <Navigate to="/" />;
    }
    return children;
  };
  

  return (
    <DataContext.Provider value={{
      user, userFlag, setUserFlag,
      userName, setUserName, fechaReserva, setFechaReserva,
      horaReserva, setHoraReserva, reservaCompleta, setReservaCompleta,
      horariosTomados, setHorariosTomados,
      servicio, setServicio
    }}>

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
            </>}/>

            <Route path="/about" element={<>
              <Header/>
              <AcercaDe/> 
            </>}/>

            <Route path="/contacto" element={<>
              <Header/>
              <Contacto/>
              <Footer/>
              <FooterSegundo/>
            </>}/>

            <Route path="/noticias" element={<>
              <Header/>
              <Noticias/>
              <Footer/>
              <FooterSegundo/>
            </>}/>

            <Route path="/signup" element={<>
              <SignUp/>
            </>}/>

            <Route path="/confirmation" element={<>
              <Header/>
              <Confirmation/> 
            </>}/>

            {/* Ruta protegida para la página Admin */}
            <Route path="/admin" element={
              <ProtectedRouteAdmin>
                <Admin />
              </ProtectedRouteAdmin>
            } />

            {/* Ruta protegida para la página Profesionales */}
            <Route path="/profesionales" element={
              <ProtectedRouteProfesional>
                <Profesionales />
              </ProtectedRouteProfesional>
            } />

            {/* Ruta protegida para la página Secretaria */}
            <Route path="/secretaria" element={
              <ProtectedRouteSecretaria>
                <Secretaria />
              </ProtectedRouteSecretaria>
            } />

          </Routes>
        </div>
      </Router>
    </DataContext.Provider>
  );
}

export default App;