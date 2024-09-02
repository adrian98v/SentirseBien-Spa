import './App.css';
import Header from './Header.js'
import Citas from './Citas.js'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {createContext, useEffect, useState} from 'react'
import Home from './Home.js'
import Login from './Login.js'
import Contact from './Contact.jsx';
import AboutUs from './AboutUs.jsx';
import Services from './Services.js';
import Footer from './Footer.js';
import FooterSegundo from './OtroFooter.js';

export const DataContext = createContext()

function App() {
  return (
    <DataContext.Provider>
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
          </Routes>
          
        </div>

      </Router>

    </DataContext.Provider>
    
  );
}

export default App;
