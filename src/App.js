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
  

  // Componente para ruta protegida
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    } else if (userName !== "admin1@gmail.com") { // Reemplaza con el email del usuario "Admin"
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
              <Contacto></Contacto>
              <Footer></Footer>
              <FooterSegundo></FooterSegundo>
              
            </>}/>
            <Route path="/noticias" element={<>
              <Header/>
              <Noticias></Noticias>
              <Footer></Footer>
              <FooterSegundo></FooterSegundo>
              
            </>}/>
              

            <Route path="/signup" element={<><SignUp/></>}/>

            <Route path="/confirmation" element={<>
              <Header/>
              <Confirmation/> 
              
            </>}/>

          {/* Ruta protegida para la página Admin */}
          <Route path="/admin" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />

          </Routes>
        </div>
      </Router>
    </DataContext.Provider>
  );
}

export default App;
