import React, {  useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import styles from './SignUp.module.css'
import { Validate } from './Validate';
import { notify } from './Toast';
import { authStateContext } from '../../context/auth/authContext';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'



const SignUp = () => {

     
    const {users,token} = useContext(authStateContext)
    let navigate = useNavigate()

    if (token) {
        navigate('/dashboard')
    }

    

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        isAccepted: false
    })

    const [errors , setError] = useState({})
    const [touched , setTouched] = useState({})

    

    useEffect(()=>{

        setError(Validate(data,'signup'))

    },[data])

    const changeHandler = event => {
        if (event.target.name === "isAccepted") {
            setData({ ...data, [event.target.name]: event.target.checked })
        } else {
            setData({ ...data, [event.target.name]: event.target.value })
        }
    }

    const focusHandler = (event)=>{
        setTouched({...touched , [event.target.name] : true})
    }

   

        
        const submitHandler = (e)=>{
            e.preventDefault()
            
            if (!data.name) {
                setTouched({...touched,name : true})  
                
            } else if (!data.email) {
                setTouched({...touched,email : true})
                
            }else if (!data.password) {
                setTouched({...touched,password : true})
                
            }else if (!data.confirmPassword) {
                setTouched({...touched,confirmPassword : true})
                
            }else if (!data.isAccepted) {
                setTouched({...touched,isAccepted : true})
            }
            
            
            // if (!Object.keys(errors).length) {
            //     notify('SignUp Successfully','success')
            // } else {
            //     notify('invalid Data','error')
            // }
            
            const user = {
                id:uuidv4(),
                name: data.name,
                email: data.email,
                password: data.password
                }

            if (!users.find(item => item.email === user.email)) {
                
                axios.post('http://localhost:3001/users',user)   
                // .then((response) => console.log(response))
    
                fetch('https://api.freerealapi.com/auth/register', {
                    method:'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user)
                    })
                    .then((response) => response.json())
                    .then(({success}) => {
                        if (success) {
                            notify('SignUp Successfully','success')
                            setData({
                                name: "",
                                email: "",
                                password: "",
                                confirmPassword: "",
                                isAccepted: false
                            })
                            setTouched({})
                        }else{
                            notify('invalid Data','error')
                        }
                    })
            } else{
                notify('Email already registered','error')
            }

           
            
    }


    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler} className={styles.formContainer}>
                <h2 className={styles.header}>SignUp</h2>
                <div className={styles.formField}>
                    <label>Name</label>
                    <input
                        className={(errors.name && touched.name) ? styles.uncompleted : styles.formInput}
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                    />
                    {errors.name && touched.name && <span>{errors.name}</span>}
                </div>
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
                <div className={styles.formField}>
                    <label>Confirm Password</label>
                    <input
                        className={(errors.confirmPassword && touched.confirmPassword) ? styles.uncompleted : styles.formInput}
                        type="password"
                        name="confirmPassword"
                        value={data.confirmPassword}
                        onChange={changeHandler}
                        onFocus={focusHandler} />
                    {errors.confirmPassword && touched.confirmPassword && <span>{errors.confirmPassword}</span>}
                </div>
                <div className={styles.formField}>
                    <div className={styles.checkBoxContainer}>
                        <label>I accet terms of privacy policy</label>
                        <input
                            type="checkbox"
                            name="isAccepted"
                            value={data.isAccepted}
                            onChange={changeHandler}
                            onFocus={focusHandler} />
                    </div>
                    {errors.isAccepted && touched.isAccepted && <span>{errors.isAccepted}</span>}
                </div>
                <div className={styles.formButtons}>
                    <Link to="/login">Login</Link>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;

// !/\S+@\S+\.\S+/.test(data.email)