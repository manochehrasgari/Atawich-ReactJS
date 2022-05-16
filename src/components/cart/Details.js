import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import PersianNumber from '../common/PersianNumber';

export default function Details({data,id,hover,handler}) {

    const [order,setOrder] = useState([])


    useEffect(()=>{
        if (id !== null) {
            const filteredOrder =  data.filter(item=> {return item.id === id})
            setOrder(filteredOrder)
        }
      
    },[id,data])

   

  
  return (
  
            <div className={ `details ${hover}`}>
                <div className='close-cart' onClick={()=>handler('')}>بستن</div>
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

                            {order.length && order[0].order.selectedItems.map(item => 
                            
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


            </div>

  )
}
