// App.js
import './App.css';
import Header from './Header.js'
import Citas from './Citas.js'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import Home from './Home.js'
import Login from './Login.js'
import Contacto from './Contacto.jsx';
import Services from './Services.jsx';
import Footer from './Footer.js';
import FooterSegundo from './OtroFooter.js';
import SignUp from './SignUp.js'
import Confirmation from './Confirmation.js'
import { auth, db } from "./firebase.js"
import { doc, getDoc } from 'firebase/firestore';
import AcercaDe from './AcercaDe.jsx';
import Noticias from './Noticias.jsx';
import Admin from './admin.jsx';
import Profesionales from './Profesionales.jsx';
import Secretaria from './Secretaria.jsx';
import PaymentConfirmation from './PaymentConfirmation.js'
import AdminComments from './admin-Pages/AdminComments.jsx';
import AdminReservas from './admin-Pages/AdminReservas.jsx';
import AdminCreateUser from './admin-Pages/AdminCreateUser.jsx';
import ReservasCliente from './ReservasCliente.jsx';  
import ProfesionalesReeservas from './profesional-componentes-paginas/ProfesionalReservas.jsx'; 
import SecretariaReservas from './secretaria-componentes-paginas/SecretariaReservas.jsx';
import AdminIngresos from './admin-Pages/AdminIngresosFecha.jsx';
export const DataContext = createContext()

function App() {
  const [user, setUser] = useState(null)
  const [userFlag, setUserFlag] = useState(false)
  const [userName, setUserName] = useState("")
  const [role, setRole] = useState("") // Nuevo estado para el rol del usuario
  const [fechaReserva, setFechaReserva] = useState(null)
  const [horaReserva, setHoraReserva] = useState(null)
  const [reservaCompleta, setReservaCompleta] = useState({})
  const [horariosTomados, setHorariosTomados] = useState([])
  const [servicio, setServicio] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [IDPendienteState, setIDPendienteState] = useState(null)
  const [boolLogin, setBoolLogin] = useState(false);

  // Authorization observer to know when a user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser !== null) {
        setUser(authUser);
        sessionStorage.setItem('user', user);
        setUserName(authUser.email);

        // Obtener el documento del usuario desde Firebase
        const userDoc = await getDoc(doc(db, 'clientes', authUser.email));
        if (userDoc.exists()) {
          setRole(userDoc.data().role); // Obtener el rol del documento y guardarlo en el estado
        } else {
          setRole(""); // Si el documento no existe, limpiar el rol
        }
      } else {
        setUser(null);
        setUserName("");
        setRole(""); // Limpiar el rol cuando no hay usuario
      }
    });

    return () => unsubscribe();
  }, [userFlag]);

  // Componente para ruta protegida (Admin)
  const ProtectedRouteAdmin = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    } else if (userName !== "admin1@gmail.com") {
      return <Navigate to="/" />;
    }
    return children;
  };

  const ProtectedRouteProfesional = ({ children }) => {
    const allowedRoles = [
      "Masajista",
      "Belleza",
      "TratamientoCorporal",
      "TratamientoFacial"
    ];

    if (!user) {
      return <Navigate to="/login" />;
    } else if (!allowedRoles.includes(role)) {
      // Verifica si el rol del usuario está en la lista de roles permitidos
      return <Navigate to="/" />;
    }

    return children;
  };

  // Componente para ruta protegida (Secretaria)
  const ProtectedRouteSecretaria = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    } else if (role !== "Secretaria") {
      return <Navigate to="/" />;
    }
    return children;
  };


 
  return (
    <DataContext.Provider value={{
      user, userFlag, setUserFlag,
      userName, setUserName, role, // Pasar el rol al contexto
      fechaReserva, setFechaReserva,
      horaReserva, setHoraReserva, reservaCompleta, setReservaCompleta,
      horariosTomados, setHorariosTomados,
      servicio, setServicio, email, setEmail, password, setPassword,
      IDPendienteState, setIDPendienteState, boolLogin, setBoolLogin
    }}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/citas" element={<>
              <Header />
              <Citas />
            </>} />
            
            <Route path='/paymentConfirmation' element={<>
              <Header />
              <PaymentConfirmation />
            </>}></Route>

            <Route path="/login" element={<>
              <Login />
            </>} />

            <Route path="/" element={<>
              <Header />
              <Home />
            </>} />
            

            <Route path="/servicios" element={<>
              <Header />
              <Services />
            </>} />

            <Route path="/about" element={<>
              <Header />
              <AcercaDe />
            </>} />

            <Route path="/contacto" element={<>
              <Header />
              <Contacto />
              <Footer />
              <FooterSegundo />
            </>} />

            <Route path="/noticias" element={<>
              <Header />
              <Noticias />
              <Footer />
              <FooterSegundo />
            </>} />

            <Route path="/signup" element={<>
              <SignUp />
            </>} />

            <Route path="/confirmation" element={<>
              <Header />
              <Confirmation />
            </>} />

            {/* Ruta protegida para la página Admin */}
            <Route path="/admin" element={
              <ProtectedRouteAdmin>
                <Admin />
              </ProtectedRouteAdmin>
            } />
            <Route path="/comentarios" element={
              <ProtectedRouteAdmin>
                <AdminComments />
              </ProtectedRouteAdmin>
            } />
            <Route path="/reservas" element={
              <ProtectedRouteAdmin>
                <AdminReservas/>
              </ProtectedRouteAdmin>
            } />
            <Route path="/createUser" element={
              <ProtectedRouteAdmin>
                <AdminCreateUser />
              </ProtectedRouteAdmin>
            } />
            <Route path="/ingresos" element={
              <ProtectedRouteAdmin>
                <AdminIngresos />
              </ProtectedRouteAdmin>
            } />

            {/* Ruta protegida para la página Profesionales */}
            <Route path="/profesionales" element={
              <ProtectedRouteProfesional>
                <Profesionales />
              </ProtectedRouteProfesional>
            } />
            {/* Ruta protegida para la página Profesionales */}
            <Route path="/reservasProfesionales" element={
              <ProtectedRouteProfesional>
                <ProfesionalesReeservas />
              </ProtectedRouteProfesional>
            } />

            {/* Ruta protegida para la página Secretaria */}
            <Route path="/secretaria" element={
              <ProtectedRouteSecretaria>
                <Secretaria />
              </ProtectedRouteSecretaria>
            } />
            <Route path="/secretariaReservas" element={
              <ProtectedRouteSecretaria>
                <SecretariaReservas />
              </ProtectedRouteSecretaria>
            } />

            < Route path="/misreservas" element={<ReservasCliente />} />

          </Routes>
        </div>
      </Router>
    </DataContext.Provider>
  );

  return (
    <DataContext.Provider value={{
      // el resto de los valores que pasas al contexto
    }}>
      <Router>
        <div className="App">
          <Routes>
            {/* Otras rutas existentes */}

            {/* Nueva ruta para el cliente logueado */}
            <Route path="/misreservas" element={<ReservasCliente />} />

          </Routes>
        </div>
      </Router>
    </DataContext.Provider>
  );


}

export default App;
