import React from 'react';
import {range} from 'lodash'

const Pagination = ({pages,currentPage,pageHandler}) => {

    
    const newPages = range(1,pages + 1)

    return ( 
        <nav className='nav-pageination'>
            <ul className="pagination">
               {newPages.map(page=>(
                    <li onClick={()=> pageHandler(page)} key={page} className={page === currentPage ? "page-item active" : "page-item"}>
                    <span className="page-link" style={{cursor:'pointer'}} >
                        {page}
                    </span>
                </li>
               ))}
               
            </ul>
        </nav>
     );
}
 
export default Pagination;

