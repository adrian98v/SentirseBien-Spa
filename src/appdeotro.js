import Header from './Header.js'
import Home from './Home.js' 
import Checkout from './Checkout.js'
import Login from './Login.js'
import Orders from './Orders.js'
import Declined from './DeclinedPayment.js'
import Successful from './SuccessfulPayment.js'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {createContext, useEffect, useState} from 'react'
import './app.css'
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from './firebase.js'
import SignUp from './Sign_up.js'
import Payment from './Payment.js'
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_51MtHEKIyp0hRR6qrRQxfIjkoGzT3PLyCDk1cSOUI0htQNQQpVue1DXjpAnuU00bKkfwWls7hAgiGQHfw2jLg2pUJ00DgzPt84r', {
  locale:'en'
})

export const DataContext = createContext()


function App() {

  // States used in different components

  const [basketCount, setBasketCount] = useState(0)
  const [basketPrice, setBasketPrice] = useState(0)
  const [basketProducts, setBasketProducts] = useState([])
  const [user, setUser] = useState(null)
  const [userFlag, setUserFlag] = useState(false)
  const [userName, setUserName] = useState("")
  const [basketProductsPopUp, setBasketProductsPopUp] = useState([])
  const [newPopUp, setNewPopUp] = useState(false)
  const [popUpExit, setPopUpExit] = useState(false)
  const [paymentDoneAmount, setPaymentDoneAmount] = useState(0)


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

 
 
  return(
    <DataContext.Provider value={
      {basketCount, setBasketCount, 
      basketPrice, setBasketPrice,
      basketProducts, setBasketProducts,
      user,
      userFlag, setUserFlag,
      userName, setUserName, 
      basketProductsPopUp, setBasketProductsPopUp, 
      newPopUp, setNewPopUp, 
      popUpExit, setPopUpExit,
      paymentDoneAmount, setPaymentDoneAmount}}>

      <Router>
      <div className="App">
        <Routes>
          
          <Route path="/checkout" element={<>
            <Header/>
            <Checkout/>
          </>} />

          <Route path="/payment" element={<>
            <Header/>

            <Elements stripe={stripePromise}>
                <Payment/>
            </Elements>
            
          </>} />

          <Route path='/orders' element={<>
            <Header/>
            <Orders/>
          </>
          }></Route>

          <Route path='/login' element={<Login/>}/>

          <Route path='/signup' element={<SignUp/>}/>

          <Route path='/successful' element={<>
          <Header/>
          <Successful/></>
          }/>

          <Route path='/declined' element={<>
          <Header/>
          <Declined/>
          </>}/>

          <Route path="/" element={<>
            <Header/>
             <Home/>
          </>} />
        </Routes>
      </div>
      </Router>
    </DataContext.Provider>
    
  );

 
}