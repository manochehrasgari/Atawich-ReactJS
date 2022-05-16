import axios from 'axios';
import React, { useContext, useEffect ,useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import { authStateContext } from '../../context/auth/authContext';
import { CartContext } from '../../context/cart/cartContext';
import Details from '../cart/Details';
import Pagination from '../common/Pagination';
import PersianNumber from '../common/PersianNumber';



const Dashborad = ({auth,hoverCover}) => {

    // states
    const [hover,setHover] = useState('')
    const [orders , setOrders] = useState(null)
    const [orderID , setOrderID] = useState(null)
    const [currentPage , setCurrentPage] = useState(1)

    //Context 
    const {dispatch} = useContext(CartContext)
    const {users,user,token} = useContext(authStateContext)
    let navigate = useNavigate()

    //useEffects
    useEffect(()=>{
    
        if (token == null ) {
            navigate('/login',{replace:true})
        }

    },[token,navigate])

    useEffect(()=>{
    
        axios.get('http://localhost:3001/userOrders')
        .then(res=>setOrders(res.data))
     
    },[])

    // others
    let newUser;
    if (users !== null && token !== null){
     const indexUser = users.findIndex(item => item.email === user.email)
     newUser = users[indexUser]
    }

    let ordersUser = []
    if (orders) {
        ordersUser = orders.filter(item => {
            return item.userId === newUser.id
        })
    }
    
    let count = 5;
    const pages =  Math.ceil(ordersUser.length / count)
    let filterOrders = ordersUser.slice((currentPage - 1) * (count) , count * currentPage)




   // Handlers 
   const logoutHandler = ()=>{
        auth({type:"LOGOUT"})
        dispatch({type:"CLEAR"})
        localStorage.removeItem('login')
        navigate('/login')
   }

   const orderHandler = (id,data)=>{
        setOrderID(id)
        setHover(data)
        hoverCover(data)
   }

   const changePageHandler = (page)=>{
        setCurrentPage(page)
   }




  
  
    return ( 
        
        <div className='dashboard'>
            <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                <h1>پنل کاربری</h1>
                <button className='submit-cart' onClick={logoutHandler}>خروج</button>
            </div>
            {newUser && 
            <div className='user-info'>
                <div>نام و نام خانوادگی : {newUser.name}</div>
                <div>ایمیل : {newUser.email}</div>
             </div>
            }
            <div>
                
                    {!ordersUser.length && <div className='buy-info'> کاربر عزیز تاکنون خریدی نداشته اید </div>}
                    
                   
                    {ordersUser.length >0  ?
                          <table>
                            <thead>
                                <tr>
                                        <td>تعداد</td>   
                                        <td>قیمت کل</td>   
                                        <td>عملیات پرداخت </td>         
                                        <td>جزییات </td>                                   
                                </tr>
                            </thead>
                          {filterOrders.map((item , index) => 
                          <tbody key={item.id}>
                              <tr>
                              <td>
                              <PersianNumber number={index+1}/>
                              </td>
                              <td>
                              <PersianNumber number={(item.order.totalPrice + (item.order.totalPrice * 0.09)).toLocaleString()}/> تومان
                              </td>
                              <td className='confrim'>
                              انجام شده
                              </td>
                              <td onClick={()=>orderHandler(item.id,'active')}>
                              <span className='preview'>مشاهده</span>
                              </td>
                          </tr>   
                          </tbody>
                          
                          
                      )}
                          </table>       
                    :''}
                    
                      
            </div>
            <Pagination pages={pages} currentPage={currentPage} pageHandler={changePageHandler}/>
            <Details handler={orderHandler} hover={hover} data={ordersUser} id={orderID}/>
        </div>
     );
}
 
export default Dashborad;