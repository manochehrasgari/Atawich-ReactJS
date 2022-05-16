import React, { useContext, useEffect, useState  } from 'react';
import { Routes , Route } from 'react-router-dom';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashborad from './components/dashboard/Dashboard';
import { authDispatcherContext, authStateContext } from './context/auth/authContext';
import Products from './components/products/Products';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer'
import Cart from './components/cart/Cart';
import CartEnd from './components/cart/CartEnd';
import Cover from './components/common/Cover';
import axios from 'axios';





function App() {

  const [cartHover,setCartHover] = useState('')
  const [cartEndHover , setCartEndHover] = useState('')
  const [coverHover , setCoverHover] = useState('')
 
  const hoverCartHandler = (data)=>{
    setCartHover(data)
  }

  const hoverCartEndHandler = (data)=>{
    setCartEndHover(data)
  }

  const hoverCoverHandler = (data)=>{
      setCoverHover(data)
  } 


  const dispatch = useContext(authDispatcherContext)
  const state = useContext(authStateContext)
  
  useEffect(()=>{
    
      const login = JSON.parse(localStorage.getItem('login'))
      if (login) {
      const {user , token} = login
      dispatch({type : "LOGIN_SUCCESS" , payload : {user,token}})
    }
    
  },[dispatch])

  useEffect(()=>{
    axios.get('http://localhost:3001/users')
    .then(res=>dispatch({type:"SET_USERS",payload:res.data}))
    
  },[dispatch])


  

  return (
    <div className="App">
        <Navbar stateUser={state} hoverCover={hoverCoverHandler} hoverCart={hoverCartHandler}/>
        <Routes>
          <Route path="/" element={<Products/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/dashboard"  element={<Dashborad auth={dispatch} hoverCover={hoverCoverHandler}/>}/> 
        </Routes>
        <Footer/>
        <CartEnd authState={state} classHover={cartEndHover} cartEndHover={hoverCartEndHandler} hoverCover={hoverCoverHandler}/>
        <Cart  classHover={cartHover} hoverCover={hoverCoverHandler} cartEndHover={hoverCartEndHandler}  hoverCart={hoverCartHandler} />
        <Cover classHover={coverHover} hoverCover={hoverCoverHandler} hoverCart={hoverCartHandler}/>
      <ToastContainer/>
    </div>
  );
}

export default App;
