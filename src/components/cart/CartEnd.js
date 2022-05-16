import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { authStateContext } from '../../context/auth/authContext';
import { CartContext } from '../../context/cart/cartContext';
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios';
import PersianNumber from '../common/PersianNumber';

const CartEnd = ({classHover,cartEndHover,hoverCover,authState}) => {

    const {state,dispatch} = useContext(CartContext)
    const {token} = useContext(authStateContext)
    
   
    const clickHandler =()=>{
        hoverCover('')
        cartEndHover('')
         
      }

    const finishOrder =()=>{
        let user;
        if (authState.users !== null && authState.token !== null){
            const indexUser = authState.users.findIndex(item => item.email === authState.user.email)
            user = authState.users[indexUser]
        }
        dispatch({type:"CHECKOUT"})
        const order = {
            id:uuidv4(),
            userId:user.id,
            order:state
        }
        axios.post('http://localhost:3001/userOrders',order)   
        // .then((response) => console.log(response))
    }  
   

    return ( 
    <>
    

    
    <div className={ ` cart-container ${classHover}`}>
        <div className='close-cart' onClick={clickHandler}>بستن</div>
            {state.checkOut &&

            <div className='finish'>
                <div className='finish-title'>از خرید شما متشکریم</div>
                <div onClick={clickHandler} className='continue'>ادامه خرید</div>
            </div>
                
            }
        
        
            {!state.checkOut && 
                <div>
                <div>
                    {token &&  
                        <table>
                                <thead>
                                    <tr>
                                            <td>شرح محصول</td>   
                                            <td>تعداد</td>   
                                            <td>قیمت واحد </td>         
                                            <td>مالیات بر ارزش افزوده </td>         
                                            <td>قیمت کل</td>                          
                                    </tr>
                                </thead>

                            
                                {state.selectedItems.map(item => 
                                <tbody key={item.id}>
                                    <tr>
                                    <td>
                                    <div className='cart-item'>     
                                        <div>          
                                            <img loading="lazy" alt="پیتزا مخصوص بزرگ" src={item.img}/>     
                                        </div>               
                                        <div className='cart-item-desc'>
                                        <div>
                                            <span className="" ></span> {item.name}
                                        </div>   
                                        <div>{item.desc}</div>  </div>    
                                    </div> 
                                    </td>
                                    <td>
                                        <PersianNumber number={item.quantity}/>
                                    </td>
                                    <td>
                                        <PersianNumber number={item.price.toLocaleString()}/> تومان
                                    </td>
                                    <td>
                                        <PersianNumber number={(item.price * (0.09 * item.quantity)).toLocaleString()}/> تومان
                                    </td>
                                    <td>
                                        <PersianNumber number={((item.price * item.quantity) + item.price * (0.09 * item.quantity)).toLocaleString()}/> تومان
                                    </td>
                                </tr>   
                                </tbody>
                                
                                
                            )}
                        </table>       
                    }
            </div>
            
            
            
            {token &&         
            <div className='price-container'>
                <div className='final-price'>
                    <span> جمع کل خرید :</span>
                    <span>{<PersianNumber number={(state.totalPrice + (state.totalPrice * 0.09)).toLocaleString()}/>} تومان</span>
                </div>
                <div className='price-total'>
                    <span>مبلغ قابل پرداخت :</span>
                    <span>{<PersianNumber number={(state.totalPrice + (state.totalPrice * 0.09)).toLocaleString()}/>} تومان</span>
                </div>
                <div><button onClick={finishOrder}  className=' submit-cart'>نهایی کردن خرید</button></div>
            </div>
            }
            </div>
            }
            
            {token === null && <div><span>لطفا <Link onClick={clickHandler} to='/login'>وارد</Link> شوید</span></div>}
        
                                              
    </div>
    
    
    
    
    </> );
}
 
export default CartEnd;