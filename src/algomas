import {Link} from 'react-router-dom'
import './header.css'
import {AiOutlineSearch} from 'react-icons/ai'
import {GiShoppingCart} from 'react-icons/gi'
import { useContext, useEffect, useState } from 'react'
import { DataContext } from './App.js'
import { signOut } from 'firebase/auth'
import { auth, db } from './firebase.js'
import { doc, getDoc } from "firebase/firestore";
import LoginAttempt from './Login_attempt.js'

function Header(){

    const {basketCount, user, userName, setUserName, setBasketProductsPopUp} = useContext(DataContext)
    const [boolUser, setBoolUser] = useState(false)


    async function getUserName(){
        if(user){
            const docRef = doc(db, `users/${user.email}`) 
            const mySnapShot = await getDoc(docRef);
            if(mySnapShot.exists()){
                setUserName(mySnapShot.get("userName"))
            }
        }
    }

    getUserName()

    useEffect(()=>{
        if(user) setBoolUser(false)
    }, [user])

    return <div className='header'>
        
        {/* Logo de Amazon */}

        <Link to='/'>
            <img src='https://pngimg.com/uploads/amazon/amazon_PNG11.png' className='header_logo' alt='Logo'></img>
        </Link>
        
        
        {/* Input para busqueda */}

        <div className='search_header'>
            <input placeholder='Search' className='search_header_input'></input>
            <AiOutlineSearch className='search_icon'></AiOutlineSearch>
        </div>

        {/* Opciones de navegación en el Header */}

        <div className='header_options'>

            <Link to={user == null && '/login'} style={{textDecoration: 'none'}} onClick={()=>{setBasketProductsPopUp([])}}>
            
                <div className='header_option' onClick={e=>{
                    signOut(auth)
                }}>
                    <span className='header_option_firstLine'>Hello {user && userName}</span>
                    <span className='header_option_secondLine'>{
                        user !== null ? 'Sign out' : 'Sign in'
                        }</span>
                </div>
            </Link>

            

            <Link to={user && '/orders'} style={{textDecoration: 'none'}} onClick={()=> {
                if(!user) {setBoolUser(true)} setBasketProductsPopUp([])}}>

                <div className='header_option'>
                
                    <span className='header_option_firstLine'>Returns</span>
                    <span className='header_option_secondLine'>& Orders</span>
                    
                </div>

            </Link>


            <div className={boolUser ? 'orders_login_popup' : 'orders_login_transparent'}>

                <div className='orders_login_background' onClick={()=>{setBoolUser(false)}}></div>
                {boolUser && <LoginAttempt></LoginAttempt>}
            </div>


            <div className='header_option'>
                <span className='header_option_firstLine'>Your</span>
                <span className='header_option_secondLine'>Prime</span>
            </div>

            <Link style={{textDecoration: 'none'}} to='/checkout' onClick={()=>{setBasketProductsPopUp([])}}>
                <div className='header_basket'>
                    <GiShoppingCart className='basket'></GiShoppingCart>
                    <span className='basket_count' >{basketCount}</span>
                </div>
            </Link>
            

        </div>

    </div>
}

export default Header