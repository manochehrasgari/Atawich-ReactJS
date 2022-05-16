import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './SignUp.module.css'
import { Validate } from './Validate';
import { notify } from './Toast';
import { authDispatcherContext, authStateContext } from '../../context/auth/authContext';
import axios from 'axios';

const Login = () => {

    

    const {token} = useContext(authStateContext)
    let navigate = useNavigate()
 

      
  
    // const login = JSON.parse(localStorage.getItem('login'))
    // if (login) {
    //     navigate('/dashboard')
    // }

    const dispatch = useContext(authDispatcherContext)


    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const [errors , setError] = useState({})
    const [touched , setTouched] = useState({})

    useEffect(()=>{
        
        setError(Validate(data,'login'))
        if (token) {
            navigate('/dashboard')
        }

    },[data,token,navigate])


    /////////////////////////

    const changeHandler = event => {

            setData({ ...data, [event.target.name]: event.target.value })
    }

    ////////////////////////////

    const focusHandler = (event)=>{
        setTouched({...touched , [event.target.name] : true})
    }

    /////////////////

    const submitHandler = (e)=>{
        e.preventDefault()

         if (!data.email) {
            setTouched({...touched,email : true})

        }else if (!data.password) {
            setTouched({...touched,password : true})

        }

        // if (!Object.keys(errors).length) {
        //     notify('SignUp Successfully','success')
        // } else {
        //     notify('invalid Data','error')
        // }

        const user = {
            email: data.email,
            password: data.password,
            }
        
        fetch('https://api.freerealapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
        })
        .then((response) => response.json())
        // .then((json)=>console.log(json))
        .then(({success,token}) => {
            if(success){
                 notify('Login Successfully','success')
                 dispatch({type : "LOGIN_SUCCESS" , payload : {user,token}})
                localStorage.setItem('login',JSON.stringify({user,token}))
                axios.get('http://localhost:3001/users')
                .then(res=>dispatch({type:"SET_USERS",payload:res.data}))
                navigate('/dashboard')
            }
        })

    }


    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler} className={styles.formContainer}>
                <h2 className={styles.header}>Login</h2>
                <div className={styles.formField}>
                    <label>Email</label>
                    <input
                        className={(errors.email && touched.email) ? styles.uncompleted : styles.formInput}
                        type="text"
                        name="email"
                        value={data.email}
                        onChange={changeHandler}
                        onFocus={focusHandler} />
                    {errors.email && touched.email && <span>{errors.email}</span>}
                </div>
                <div className={styles.formField}>
                    <label>Password</label>
                    <input
                        className={(errors.password && touched.password) ? styles.uncompleted : styles.formInput}
                        type="password" name="password"
                        value={data.password}
                        onChange={changeHandler}
                        onFocus={focusHandler} />
                    {errors.password && touched.password && <span>{errors.password}</span>}
                </div>
                <div className={styles.formButtons}>
                    <Link to="/signup">Sign Up</Link>
                    <button type="login">Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;

// !/\S+@\S+\.\S+/.test(data.email)