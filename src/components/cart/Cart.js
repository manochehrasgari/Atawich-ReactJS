import React, { useContext } from 'react';
import { CartContext } from '../../context/cart/cartContext';
import { quanType, type } from '../help/help';
import PersianNumber from '../common/PersianNumber';



const Cart = ({classHover,hoverCover,hoverCart,cartEndHover}) => {
  
  const {state,dispatch} = useContext(CartContext)
 


  const clickHandler =()=>{
    hoverCart('')
    cartEndHover('active')
  }

  const closeHandler = ()=>{
    hoverCart('')
    hoverCover('')
  }

  
 
    return ( 
        <div>
          <div className={ `showbasket  ${classHover}`}>
            <div className='basket-header'>
              <span className="text-center text-dark py-5">سبد خرید</span>
              <span onClick={closeHandler} className='close'>بستن</span>
            </div>
         
            <div className="showbasketDiv"><div>
       
                     {state.selectedItems.map(product => 
                      
                      <div className="product-cart" key={product.id}>
                         <div>
                           <img src={product.img} width="80" height="80" alt=""/>
                         </div>
                         <div className="info-product">
                           <ul>
                             <li className="id" data-id="3">{product.name}</li> 
                             {/* <li> قیمت این محصول : <span data-price="350" className="price-pro">{product.price * product.quantity}</span> تومان</li> */}
      
                           </ul>
                         </div>
                         <div className="cart-btn">
                             <button onClick={()=>dispatch({type:type(state,product.id),payload:product})}>+</button>
                             <span className="length">{product.quantity}</span>
                             <button onClick={()=>dispatch({type:quanType(state,product.id),payload:product})}>-</button>
                         </div>
                      </div>
                      
                      )}
       </div></div>

          <div className='total-price'>
            <span className="text-center text-dark py-2">جمع کل خرید : <span className="totalprice"><PersianNumber number={state.totalPrice}/></span>تومان   </span>
            <span className="text-center text-dark py-2">جمع مالیات و عوارض : <span className="totalprice"><PersianNumber number={state.totalPrice * 0.09}/></span>تومان   </span>
            <span className="text-center text-dark py-2">مبلغ قابل پرداخت : <span className="totalprice"><PersianNumber number={state.totalPrice + state.totalPrice * 0.09}/></span>تومان   </span>
          </div>
          <div className='submit'>
            {state.selectedItems.length ? 
            <button onClick={clickHandler} className="submit-cart">ثبت سفارش</button>
            :''}
          </div>
    </div>
        </div>
     );
}
 
export default Cart;