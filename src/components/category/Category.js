import axios from 'axios';
import React, { useEffect, useState } from 'react';



const Category = ({handler}) => {

    const [data , setData] = useState([])
    const [classhover , setClassHover] = useState('active')
    const [id , setId] = useState(1)


    useEffect(()=>{

        axios.get('http://localhost:3001/category')
        .then(res=> setData(res.data))

    },[])

    const hover =(id)=>{
        setClassHover('active')
        setId(id)
    }

    return ( 
        <div className='category'>
            <ul>
                {data.length && data.map(item => 
                  <li onClick={()=>handler(item.id)} key={item.id} className={item.id === id ? `${classhover}` : ''} >
                       <label onClick={()=>hover(item.id)} className='category-nav'>
                           <span  className='category-item'>
                                <img src={item.img} alt='category'/>
                           </span>
                           {item.title}
                       </label>
                  </li>  
                    )}
            </ul>
        </div>
     );
}
 
export default Category;