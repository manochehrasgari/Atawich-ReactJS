import React, { useReducer } from 'react';
import { createContext } from 'react/cjs/react.production.min';
import { initialState, reducer } from './reducer';



export const CartContext = createContext()


const CartContextProvider = ({children}) => {

    const [state , dispatch] = useReducer(reducer,initialState)


    return ( 
        <CartContext.Provider value={{state,dispatch}}>
            {children}
        </CartContext.Provider>
     );
}
 
export default CartContextProvider