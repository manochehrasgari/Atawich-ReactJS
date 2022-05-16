import React, { createContext, useReducer } from 'react';
import { initialState, reducer } from './reducer';


export const authStateContext = createContext()
export const authDispatcherContext = createContext()



const AuthProvider = ({children}) => {

    const [state , dispatch] = useReducer(reducer,initialState)


    return ( 
        <authStateContext.Provider value={state}>
            <authDispatcherContext.Provider value={dispatch}>
                {children}
            </authDispatcherContext.Provider>
        </authStateContext.Provider>
     );
}
 
export default AuthProvider;