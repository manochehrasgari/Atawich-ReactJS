import React, { useEffect, useState } from 'react';
import { createContext } from 'react/cjs/react.production.min';
import { getProducts } from '../../api/api';




export const ProductsContext = createContext()

const ProductsContextProvider = ({children}) => {
    
    const [productList , setProductList] = useState({})

    useEffect(()=>{
    
      const fetch = async ()=>{
          
        const data = await getProducts()
        setProductList(data)
      } 
  
      fetch()      
  
    },[])

    

    return ( 
        <ProductsContext.Provider value={productList}>
            {children}
        </ProductsContext.Provider>
     );
}
 
export default ProductsContextProvider;