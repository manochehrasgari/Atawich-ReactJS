import React, { useContext, useState } from 'react';
import Product from './Product';
import Category from '../category/Category'
import { ProductsContext } from '../../context/product/productContext';
import Banner from '../common/Banner'
const Products = () => {

     const products = useContext(ProductsContext)
     const [category , setCategory] = useState(1)
  
     const categoryHandler = (id)=>{
          setCategory(id)
     }
   
   
   let filteredProducts
   
   if(products.length) filteredProducts = products.filter(item =>{return item.category === category} )
      
    
    return ( 
         <>
               <Banner/>
               <div className='main'>
               <Category handler={categoryHandler}/>
               <div className='container'>
                    {products.length && filteredProducts.map(item => <Product key={item.id} product={item} />)}
               </div>
               </div>
        </>
     );
}
 
export default Products;