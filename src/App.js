import './App.css';
import Header from './Header.js'
import Citas from './Citas.js'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {createContext, useEffect, useState} from 'react'
import Home from './Home.js'
import Login from './Login.js'
import Contact from './Contact.jsx';

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
