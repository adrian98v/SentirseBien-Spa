import './App.css';
import Header from './Header.js'
import Citas from './Citas.js'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {createContext, useEffect, useState} from 'react'


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

                
          </Routes>
          
        </div>

      </Router>

    </DataContext.Provider>
    
  );
}

export default App;
