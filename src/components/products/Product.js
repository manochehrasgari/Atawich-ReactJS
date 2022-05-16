import React, { useContext } from 'react';
import { CartContext } from '../../context/cart/cartContext';
import PersianNumber from '../common/PersianNumber';
import { quantity, quanType, type } from '../help/help';


const Product = ({product}) => {


    const {state,dispatch} = useContext(CartContext)
    const {id,name,img,price} = product


    return ( 
        
            <div className='products'>
                <img src={img} alt='product'/>
                <p className='p-name'>{name}</p>
                <div className='p-footer'>
                    <p><PersianNumber number={price.toLocaleString()}/>  تومان</p>
                    <div id='shop' className=" fas fa-cart-plus">
                        <span className='count'>{quantity(state,id) ? quantity(state,id) : 0}</span>
                    </div>
                    <div className='cart-btn'>
                        
                        <button onClick={()=>dispatch({type:type(state,id),payload:product})}>+</button>
                        <button onClick={()=>dispatch({type:quanType(state,id),payload:product})}>-</button>
               
                    </div>
                </div>
            </div>
       
     );
}
 
export default Product;